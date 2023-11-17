import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./Viewer.css";
import Data from "../editor/Data";
import Data1 from "../editor/Data1";
import {
  Table,
  Button,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";

const Viewer = () => {
  // const [details, setDetails] = useState([]);
  const [text1, setText1] = useState(false);
  const [text2, setText2] = useState(false);
  const [text3, setText3] = useState(false);
  const [text4, setText4] = useState(false);
  const [typedData, setTypedData] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagiNation, setPagiNation] = useState(true);
  const [inputValue, setInputValue] = useState('');


  
 


  //   useEffect(() => {
  //     axios
  //       .get("https://jsonplaceholder.typicode.com/posts/1/comments")
  //       .then((res) => {
  //         const data = res.data;
  //         console.log(data);
  //         setDetails(data);
  //         setFilterData(data);
  //       })
  //       .catch((error) => {
  //         console.log(error, "error occurred while fetching data..");
  //       });
  //   }, []);

  useEffect(() => {
    const data = Data1;
    // setDetails(data);
    setFilterData(data);
    hidePagination(data);
  }, []);
  

  const handleClick = (event, index) => {
    // event.preventDefault();
    setCurrentPage(index);
    console.log(`Viewing Page ${index + 1} Data`);
  };

  const changeText = (setText, sortAsc, sortDesc) => {
    setText((prevState) => !prevState);
    if (text1) {
      sortAsc();
      console.log(`Table sorted in Ascending order`);
    } else {
      sortDesc();
      console.log(`Table sorted in Descending order`);
    }
  };

  const sortByIdAsc = () => {
    setFilterData((filterData) => {
      filterData.sort((a, b) => a.orderID - b.orderID);
      return [...filterData];
    });
    // handleSort((a, b) => a.id - b.id);
    // setFilterData([...filterData.sort((a, b) => a.id - b.id)]);
  };

  // const filterByOrderId = (orderId) => {
  //   if (orderId) {
  //     setFilterData((currentFilterData) => {
  //       const filteredData = currentFilterData.filter((item) => item.id === orderId);
  //       return [...filteredData];
  //     });
  //   }
  //   // If no orderId is provided, do nothing and keep filterData unchanged
  // };

  const sortByIdDesc = () => {
    setFilterData((filterData) => {
      filterData.sort((a, b) => b.orderID - a.orderID);
      return [...filterData];
    });
    
    // handleSort((a, b) => b.id - a.id);
    // setFilterData([...filterData.sort((a, b) => a.id - b.id).reverse()]);
  };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//  };

  const sortByNameAsc = () => {
    setFilterData([...filterData.sort((a, b) => a.name.localeCompare(b.name))]);
  };
  

  const sortByNameDesc = () => {
    setFilterData([...filterData.sort((a, b) => b.name.localeCompare(a.name))]);
  };

  const sortBySalaryAsc = () => {
    setFilterData([
      ...filterData.sort((a, b) => a.employee_salary - b.employee_salary),
    ]);
  };

  const sortBySalaryDesc = () => {
    setFilterData([
      ...filterData
        .sort((a, b) => a.employee_salary - b.employee_salary)
        .reverse(),
    ]);
  };

  const sortByAgeAsc = () => {
    setFilterData([
      ...filterData.sort((a, b) => a.employee_age - b.employee_age),
    ]);
  };

  const sortByAgeDesc = () => {
    setFilterData([
      ...filterData.sort((a, b) => a.employee_age - b.employee_age).reverse(),
    ]);
  };
    
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // }; 

  // const handleSort = (sortFunction) => {
  //   const sortedData = [...filterData].sort(sortFunction);
  //   setFilterData(sortedData);
  //   setCurrentPage(0); // Reset to the first page after sorting
  // };

  const hidePagination = (data) => {
    let pageSize = 5;
    if (data.length <= pageSize) {
      setPagiNation(false);
    } else {
      setPagiNation(true);
    }
  };

  // code to download json file 
  const dataArray = filterData;
  const downloadJsonFile = () => {
    // Convert the array to JSON string
    const jsonContent = JSON.stringify(dataArray, null, 2);

    // Create a Blob with the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute and file name
    link.download = 'data.json';

    // Create a URL for the Blob and set it as the link's href
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  
  const originalData = filterData;
  // const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSearchClick = () => {
    if (inputValue) {
      setPrevData(originalData);
      setFilterData(originalData.filter((item) => item.orderID === parseInt(inputValue)));
      setIsSearching(true);
    }
  };
  const handleResetClick = () => {
    setFilterData(prevData);
    setInputValue('');
    setIsSearching(false);
  };






  const pageSize = 10;
  const pagesCount = Math.ceil(filterData.length / pageSize);
  const renderPaginationButtons = () => {
    const buttonsToShow = 10; // Number of buttons to show in a group
    const start = Math.max(0, currentPage - Math.floor(buttonsToShow / 2));
    const end = Math.min(pagesCount, start + buttonsToShow);


    
    return (
      <>
    
        {Array.from({ length: end - start }, (_, i) => start + i).map((i) => (
          <PaginationItem active={i === currentPage} key={i}>
            <PaginationLink
              className="page-numbers"
              onClick={(e) => handleClick(e, i)}
              href="#"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </>
    );
  };

  return (<>
  <div  className="button-container" >
  {/* <input
        
        type="number"
        className="form-control-sm"
        placeholder="Search By order id"
        
        value={inputValue}
        onChange={handleInputChange}
      /> */}




      <input
        type="number"
        className="form-control-sm"
        placeholder="Search By order id"
        // value={inputValue}
        onChange={handleInputChange}
      />

      {isSearching ? (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleResetClick}
        >
          Reset
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleSearchClick}
        >
          Search
        </button>
      )}




  <button
            type="button"
            class="btn btn-secondary btn-sm"
           
            onClick={downloadJsonFile}
          >

      Download JSON
    </button>
      </div>
    <div className="search-block">
      <h3 className="search-heading d-flex justify-content-center"></h3>
      
      <Table className="table table-striped table-dark">
        <thead>
          <th className="heading">
          OrderID
            <Button
              outline
              color="primary"
              type="button"
              onClick={() => changeText(setText1, sortByIdAsc, sortByIdDesc)}
            >
              {text1 ? "▲" : "▼"}
            </Button>
          </th>
          <th className="heading">
          ProductID
            <Button
              outline
              color="success"
              type="button"
              onClick={() =>
                changeText(setText2, sortByNameAsc, sortByNameDesc)
              }
            >
              {text2 ? "▲" : "▼"}
            </Button>
          </th>
          <th className="heading">
          UnitPrice 
            <Button
              outline
              color="danger"
              type="button"
              onClick={() =>
                changeText(setText3, sortBySalaryAsc, sortBySalaryDesc)
              }
            >
              {text3 ? "▲" : "▼"}
            </Button>
          </th>
          <th className="heading">
          Quantity
            <Button
              outline
              color="danger"
              type="button"
              onClick={() =>
                changeText(setText3, sortBySalaryAsc, sortBySalaryDesc)
              }
            >
              {text3 ? "▲" : "▼"}
            </Button>
          </th>
          <th className="heading">
          Discount
            <Button
              outline
              color="danger"
              type="button"
              onClick={() =>
                changeText(setText3, sortBySalaryAsc, sortBySalaryDesc)
              }
            >
              {text3 ? "▲" : "▼"}
            </Button>
          </th>
        </thead>
        <tbody>
          {filterData.slice(currentPage * 5, (currentPage + 2) * 5).map((i, index) => (
            <tr key={i.orderID + '_'+ index}>
              <td>{i.orderID}</td>
              <td>{i.productID}</td>
              <td>{i.unitPrice}</td>
              <td>{i.quantity}</td>
              <td>{i.discount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {pagiNation && (
          <Pagination>
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                className="prev-next-buttons"
                onClick={(e) => handleClick(e, currentPage - 1)}
                href="#"
              >
                Previous
              </PaginationLink>
            </PaginationItem>

            {renderPaginationButtons()}

            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              <PaginationLink
                className="prev-next-buttons"
                onClick={(e) => handleClick(e, currentPage + 1)}
                href="#"
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        )}
      </div>
    </div>
    </>
  );
};

export default Viewer;
