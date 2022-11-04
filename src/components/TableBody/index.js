import classNames from "../../assets/Styles/Table.module.css";

export const TableBody = ({ rows, columns, types }) => {
  return (
    <>
      {rows.map((row, index) => (
        <tr key={row.number}>
          {columns.map(({ id }) => (
            <td
              data-testid={`row-${index}-${id}`}
              className={classNames[`cell-type-${types[id]}`]}
              key={id}
            >
              {row[id]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
