export const Query2Logic = (data, columnName) => {
    console.log("dat in logic2" ,  data)
    console.log("IN QUERY LOGIC2", columnName);
    
    const distinctValues = [...new Set(data.map(item => item[columnName]))];
    console.log("distict values" , distinctValues);
    return distinctValues.map(value => ({ [columnName]: value }));
  };