import classNames from "./assets/Styles/App.module.css";
import { Table } from "./components/Table";
import tableData from "./data";

const types = {
  number: "number",
  title: "text",
  releaseDate: "date",
  productionBudget: "money",
  worldwideBoxOffice: "money",
};

export const App = () => {
  return (
    <div className={classNames.app}>
      <Table
        columns={tableData.columns}
        rows={tableData.rows}
        types={types}
        initialSortColumn="number"
        initialSortOrder="ascending"
      />
    </div>
  );
};
