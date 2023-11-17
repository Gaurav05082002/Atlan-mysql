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
import { sortByAsc, sortByDeAsc } from "../Helper/SortFunctions";
import downloadJsonFile from "../Helper/DownloadJSON";

const Viewer = () => {
  const [filterData, setFilterData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagiNation, setPagiNation] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState({
    orderID: false,
    productID: false,
    unitPrice: false,
    quantity: false,
    discount: false,
  });

  const properties = [
    "orderID",
    "productID",
    "unitPrice",
    "quantity",
    "discount",
  ];

  useEffect(() => {
    const data = Data1;

    setFilterData(data);
    hidePagination(data);
  }, []);

  const handleClick = (event, index) => {
    setCurrentPage(index);
    console.log(`Viewing Page ${index + 1} Data`);
  };

  //sorting
  const sortDataAsc = (property) => {
    const sortedData = sortByAsc(filterData, property);
    setFilterData(sortedData);
  };
  const sortDataDeAsc = (property) => {
    const sortedData = sortByDeAsc(filterData, property);
    setFilterData(sortedData);
  };
  const changeText = (property) => {
    setText((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));

    if (text[property]) {
      // If the button was not previously clicked (indicating descending order)
      sortDataAsc(property);
      console.log(`Table sorted in Ascending order based on ${property}`);
    } else {
      // If the button was previously clicked (indicating ascending order)
      sortDataDeAsc(property);
      console.log(`Table sorted in Descending order based on ${property}`);
    }
  };

  // headers for table
  const renderTableHeader = () => {
    return properties.map((property, index) => (
      <th className="heading" key={index}>
        {property}
        <Button
          outline
          color="primary"
          type="button"
          onClick={() => changeText(property)}
        >
          {text[property] ? "▲" : "▼"}
        </Button>
      </th>
    ));
  };

  // downloading json file
  const downloadJsonFileFun = () => {
    downloadJsonFile(filterData);
  };

  const hidePagination = (data) => {
    let pageSize = 5;
    if (data.length <= pageSize) {
      setPagiNation(false);
    } else {
      setPagiNation(true);
    }
  };

  const originalData = filterData;
  const [isSearching, setIsSearching] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSearchClick = () => {
    if (inputValue) {
      setPrevData(originalData);
      setFilterData(
        originalData.filter((item) => item.orderID === parseInt(inputValue))
      );
      setIsSearching(true);
    }
  };
  const handleResetClick = () => {
    setFilterData(prevData);
    setInputValue("");
    setIsSearching(false);
  };

  const pageSize = 5;
  const pagesCount = Math.ceil(filterData.length / pageSize);
  const renderPaginationButtons = () => {
    const buttonsToShow = 5; // Number of buttons to show in a group
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

  return (
    <>
      <div className="button-container">
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
          onClick={downloadJsonFileFun}
        >
          Download JSON
        </button>
      </div>
      <div className="search-block">
        <h3 className="search-heading d-flex justify-content-center"></h3>

        <Table className="table table-striped table-dark">
          <thead>{renderTableHeader()}</thead>
          <tbody>
            {filterData
              .slice(currentPage * 5, (currentPage + 1) * 5)
              .map((i, index) => (
                <tr key={i.orderID + "_" + index}>
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
