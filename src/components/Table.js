import TableBody from "./TableBody";
import classNames from "./Table.module.css";
import { useState } from "react";
import { convertDate } from "./helpers";
import { ReactComponent as AscIcon } from "./order-ascending.svg";
import { ReactComponent as DescIcon } from "./order-descending.svg";

const Table = ({ columns, rows, types, initialSortColumn, initialSortOrder }) => {
  ///////////////////////////
  // Sorting functionality //
  ///////////////////////////

  const [sortParams, setSortParams] = useState(() => ({ column: initialSortColumn, order: initialSortOrder }));

  const sortTable = (newSortParams) => {
    if (newSortParams.order === "ascending") {
      if (types[newSortParams.column] === "number" || types[newSortParams.column] === "money") {
        return [...rows].sort((a, b) => (a[newSortParams.column] === undefined ? 1 : a[newSortParams.column] > b[newSortParams.column] ? 1 : -1));
      }
      if (types[newSortParams.column] === "text") {
        return [...rows].sort((a, b) => (a[newSortParams.column].toLowerCase() > b[newSortParams.column].toLowerCase() ? 1 : -1));
      }
      if (types[newSortParams.column] === "date") {
        // isNaN handles special case for values like "Unknown"
        return [...rows].sort((a, b) => (Date.parse(convertDate(a[newSortParams.column])) > Date.parse(convertDate(b[newSortParams.column])) || isNaN(Date.parse(convertDate(a[newSortParams.column]))) ? 1 : -1));
      }
    }

    if (newSortParams.order === "descending") {
      if (types[newSortParams.column] === "number" || types[newSortParams.column] === "money") {
        return [...rows].sort((a, b) => (a[newSortParams.column] < b[newSortParams.column] ? 1 : -1));
      }
      if (types[newSortParams.column] === "text") {
        return [...rows].sort((a, b) => (a[newSortParams.column].toLowerCase() < b[newSortParams.column].toLowerCase() ? 1 : -1));
      }
      if (types[newSortParams.column] === "date") {
        return [...rows].sort((a, b) => (Date.parse(convertDate(a[newSortParams.column])) < Date.parse(convertDate(b[newSortParams.column])) ? 1 : -1));
      }
    }
  };

  const [tableData, setTableData] = useState(() => sortTable({ column: initialSortColumn, order: initialSortOrder }));

  const handleSort = (column) => {
    // Switch sort order in case the user clicks on the same column as before
    const order = column === sortParams.column && sortParams.order === "ascending" ? "descending" : "ascending";
    setSortParams({ column, order });
    setTableData(sortTable({ column, order }));
  };

  /////////////////////////////
  // Filtering functionality //
  /////////////////////////////

  const [filterParams, setFilterParams] = useState(() => {});

  const filterTable = (rows, filters) => {
    // Return the whole table in case there are no filters
    if (!filters) {
      return rows;
    }
    if (filters) {
      return rows.filter((row) => {
        return Object.keys(filters).every((column) => {
          const value = row[column];
          const searchValue = filters[column];
          return value.toString().toLowerCase().includes(searchValue.toLowerCase());
        });
      });
    }
  };

  const handleFilter = (expression, column) => {
    const newFilters = { ...filterParams };
    // If the expression is empty, delete the given key. Otherwise add the property to newFilters object
    !expression ? delete newFilters[column] : (newFilters[column] = expression);
    setFilterParams(newFilters);
    setTableData(filterTable([...rows], newFilters));
  };

  return (
    <table
      title="Movies"
      className={classNames.table}>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <td key={id}>
              <input
                type="search"
                placeholder={`Search ${title}`}
                onChange={(e) => handleFilter(e.target.value, id)}
              />
            </td>
          ))}
        </tr>
        <tr>
          {columns.map(({ id, title }) => (
            <th
              key={id}
              onClick={() => handleSort(id)}>
              {title}
              {id === sortParams.column && sortParams.order === "ascending" ? <AscIcon /> : null}
              {id === sortParams.column && sortParams.order === "descending" ? <DescIcon /> : null}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <TableBody
          rows={tableData}
          columns={columns}
          types={types}
        />
      </tbody>
    </table>
  );
};

export default Table;
