export const Query1Logic = (data, selectedTable, selectedOperator, numberValue) => {
    console.log("IN QUERY LOGIC1", selectedTable, selectedOperator, numberValue);
  
    return data
      .filter(item => {
        switch (selectedOperator) {
          case '=':
            return item[selectedTable]=== Number(numberValue);
          case '!=':
            return item[selectedTable] !== Number(numberValue);
          case '>':
            return item[selectedTable] > Number(numberValue);
          case '<':
            return item[selectedTable] < Number(numberValue);
          default:
            return true; // Default to include all items
        }
      })
      .map(item => ({ ...item }));
  };
  