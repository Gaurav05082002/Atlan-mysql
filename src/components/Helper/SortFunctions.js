// sortFunctions.js

// export const sortByAsc = (data , indeex) => {
//     return [...data.sort((a, b) => a.indeex - b.indeex)];
//   };

export const sortByAsc = (data, propertyName) => {
    return [...data.sort((a, b) => a[propertyName] - b[propertyName])];
  };

  export const sortByDeAsc = (data, propertyName) => {
    return [...data.sort((a, b) => b[propertyName] - a[propertyName])];
  };
  
  
  // Add more sorting functions as needed
  