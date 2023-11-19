// // filterUtils.js

// // filterUtils.js

// export const Query2Logic = (data, columnName) => {
//     console.log("IN QUERY LOGIC2", columnName);
  
//     const uniqueValuesMap = new Map();
  
//     const distinctValues = data.filter(item => {
//       const value = item[columnName];
//       const existingValue = uniqueValuesMap.get(value);
  
//       if (existingValue === undefined || item.id < existingValue) {
//         uniqueValuesMap.set(value, item.id);
//         return true;
//       }
  
//       return false;
//     });
  
//     return distinctValues;
//   };


//   export const Query2Logic = (data, propertyName) => {
//     const uniqueValuesMap = new Map();
  
//     const uniqueObjects = data.filter(item => {
//       const value = item[propertyName];
//       const existingValue = uniqueValuesMap.get(value);
  
//       if (existingValue === undefined || item.id < existingValue) {
//         uniqueValuesMap.set(value, item.id);
//         return true;
//       }
  
//       return false;
//     });
  
//     return uniqueObjects;
//   };
  
export const Query2Logic = (data, columnName) => {
    console.log("column name in q2", columnName);
    console.log("data in q2", data);
  
    const uniqueColumnValues = Array.from(new Set(data.map(product => product[columnName])));
    console.log("uniqueColumnValues", uniqueColumnValues);
  
    const uniqueProducts = uniqueColumnValues.map(columnValue => {
      return data.find(product => product[columnName] === columnValue);
    });
  
    console.log("unique products", uniqueProducts);
    return uniqueProducts;
  };
  

