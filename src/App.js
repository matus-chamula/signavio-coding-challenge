import classNames from "./App.module.css";
import { Table } from "./components";
import tableData from "./data";

const types = {
  number: "number",
  title: "text",
  releaseDate: "date",
  productionBudget: "money",
  worldwideBoxOffice: "money",
};

function App() {
  return (
    <div className={classNames.app}>
      <Table
        columns={tableData.columns}
        rows={tableData.rows}
        types={types}
        initialSortColumn="number"
        initialSortDirection="ascending"
      />
    </div>
  );
}

export default App;
