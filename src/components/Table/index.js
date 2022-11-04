import { TableBody } from "../TableBody";
import classNames from "../../assets/Styles/Table.module.css";
import { useState } from "react";
import { convertDate } from "../../helpers/helpers";
import { ReactComponent as AscIcon } from "../../assets/Images/order-ascending.svg";
import { ReactComponent as DescIcon } from "../../assets/Images/order-descending.svg";

export const Table = ({
  columns,
  rows,
  types,
  initialSortColumn,
  initialSortOrder,
}) => {
  // Sorting functionality
  const [sortParams, setSortParams] = useState(() => ({
    column: initialSortColumn,
    order: initialSortOrder,
  }));

  const sortTable = (currRows, newSortParams) => {
    if (newSortParams.order === "ascending") {
      if (
        types[newSortParams.column] === "number" ||
        types[newSortParams.column] === "money"
      ) {
        return [...currRows].sort((a, b) =>
          a[newSortParams.column] === undefined
            ? 1
            : a[newSortParams.column] > b[newSortParams.column]
            ? 1
            : -1
        );
      }
      if (types[newSortParams.column] === "text") {
        return [...currRows].sort((a, b) =>
          a[newSortParams.column].toLowerCase() >
          b[newSortParams.column].toLowerCase()
            ? 1
            : -1
        );
      }
      if (types[newSortParams.column] === "date") {
        // isNaN handles special case for values like "Unknown"
        return [...currRows].sort((a, b) =>
          Date.parse(convertDate(a[newSortParams.column])) >
            Date.parse(convertDate(b[newSortParams.column])) ||
          isNaN(Date.parse(convertDate(a[newSortParams.column])))
            ? 1
            : -1
        );
      }
    }

    if (newSortParams.order === "descending") {
      if (
        types[newSortParams.column] === "number" ||
        types[newSortParams.column] === "money"
      ) {
        return [...currRows].sort((a, b) =>
          a[newSortParams.column] < b[newSortParams.column] ? 1 : -1
        );
      }
      if (types[newSortParams.column] === "text") {
        return [...currRows].sort((a, b) =>
          a[newSortParams.column].toLowerCase() <
          b[newSortParams.column].toLowerCase()
            ? 1
            : -1
        );
      }
      if (types[newSortParams.column] === "date") {
        return [...currRows].sort((a, b) =>
          Date.parse(convertDate(a[newSortParams.column])) <
          Date.parse(convertDate(b[newSortParams.column]))
            ? 1
            : -1
        );
      }
    }
  };

  const [tableData, setTableData] = useState(() =>
    sortTable(rows, { column: initialSortColumn, order: initialSortOrder })
  );

  const handleSort = (column) => {
    // Switch sort order in case the user clicks on the same column as before
    const order =
      column === sortParams.column && sortParams.order === "ascending"
        ? "descending"
        : "ascending";
    setSortParams({ column, order });
    setTableData(sortTable(tableData, { column, order }));
  };

  // Filtering functionality
  const [filterParams, setFilterParams] = useState();

  const filterTable = (newFilters) => {
    // Return the whole table in case there are no filters
    if (!newFilters) {
      return rows;
    }
    if (newFilters) {
      return rows.filter((row) => {
        return Object.keys(newFilters).every((column) => {
          const value = row[column];
          const searchValue = newFilters[column];
          return value
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });
      });
    }
  };

  const handleFilter = (expression, column) => {
    const filters = { ...filterParams };
    // If the expression is empty, delete the given key. Otherwise add the property to newFilters object
    !expression ? delete filters[column] : (filters[column] = expression);
    setFilterParams(filters);
    setTableData(sortTable(filterTable(filters), sortParams));
  };

  return (
    <table title="Movies" className={classNames.table}>
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
            <th key={id} onClick={() => handleSort(id)}>
              {title}
              {id === sortParams.column && sortParams.order === "ascending" ? (
                <AscIcon />
              ) : null}
              {id === sortParams.column && sortParams.order === "descending" ? (
                <DescIcon />
              ) : null}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <TableBody rows={tableData} columns={columns} types={types} />
      </tbody>
    </table>
  );
};
