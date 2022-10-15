import { useState } from "react";
import TableBody from "./TableBody";
import classNames from "./Table.module.css";
import { ReactComponent as AscIcon } from "./order-ascending.svg";
import { ReactComponent as DescIcon } from "./order-descending.svg";

const Table = ({ columns, rows, types, initialSortColumn, initialSortOrder }) => {
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

  // Helper function for converting date from dd-mm-yyyy to mm-dd-yyyy format
  const convertDate = (date) => {
    const resultDate = date.split(/-/);
    // First condition handles special case for values like "2020" or "Unknown" where the resultDate array contains a single value
    return resultDate[1] === undefined ? resultDate[0] : [resultDate[1], resultDate[0], resultDate[2]].join("-");
  };

  const [tableData, setTableData] = useState(() => sortTable({ column: initialSortColumn, order: initialSortOrder }));

  const handleSort = (column) => {
    // Switch sort order in case the user clicks on the same column as before
    const order = column === sortParams.column && sortParams.order === "ascending" ? "descending" : "ascending";
    setSortParams({ column, order });
    setTableData(sortTable({ column, order }));
  };

  return (
    <table
      title="Movies"
      className={classNames.table}>
      <thead>
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
