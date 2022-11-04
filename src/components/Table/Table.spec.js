const numberColumn = { id: "numberColumn", title: "Number column" };
const textColumn = { id: "textColumn", title: "Text column" };
const dateColumn = { id: "dateColumn", title: "Date column" };
const moneyColumn = { id: "moneyColumn", title: "Money column" };

const columns = [numberColumn, textColumn, dateColumn, moneyColumn];

describe("Table", () => {
  const columnTable = columns.map(({ id, title }) => [id, title]);

  describe("sorting", () => {
    describe.each(columnTable)('"%s" column', (id, title) => {
      it.todo("should be possible to sort a column.");

      it.todo(
        "should be possible to toggle the sorting direction of a column."
      );
    });
  });

  describe("filtering", () => {
    describe.each(columnTable)(
      'should offer a means to filter the "%s" column',
      (id, title) => {
        it.todo("should be possible to filter a column.");
      }
    );

    it.todo("should be possible to combine filters.");
  });
});
