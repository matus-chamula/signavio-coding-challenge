// Helper function for converting date from dd-mm-yyyy to mm-dd-yyyy format
export const convertDate = (date) => {
  const resultDate = date.split(/-/);
  // First condition handles special case for values like "2020" or "Unknown" where the resultDate array contains a single value
  return resultDate[1] === undefined ? resultDate[0] : [resultDate[1], resultDate[0], resultDate[2]].join("-");
};
