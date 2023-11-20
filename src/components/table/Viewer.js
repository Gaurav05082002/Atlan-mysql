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
import DropDown from "../Helper/DropDown";
import { Query1Logic } from "../QueryInputs/Query1Logic";
import { Query2Logic } from "../QueryInputs/Query2Logic";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Modal } from 'react-bootstrap'; // Import Bootstrap modal components
import Stats from "../Statistics/Stats";

const Viewer = ({
  selectedTable = "DefaultTable",
  selectedOperator = "DefaultOperator",
  numberValue = "input num",
  selectedColumnQ2 = "DefaultCol",
}) => {
  console.log(
    "paramsin viewer.js",
    selectedTable,
    selectedOperator,
    numberValue,
    selectedColumnQ2
  );
  const [filterData, setFilterData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagiNation, setPagiNation] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [rowsNumber, setRowsNumber] = useState(5);
  const [actualData, setActualData] = useState([]);
  const [runningQuery, setRunningQuery] = useState();

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
    const data = Data;

    setFilterData(data);
    setActualData(data);

    // setFilterData(result);
    // console.log(result);
    hidePagination(data);
  }, []);

  // console.log("filterdata in view" , filterData);

  useEffect(() => {
    // Check if any of the values have changed
    const isChanged =
      selectedTable !== "DefaultTable" ||
      selectedOperator !== "DefaultOperator" ||
      numberValue !== "inputnum";

    if (isChanged) {
      // Apply the filter and set filtered data
      const newData = Query1Logic(
        actualData,
        selectedTable,
        selectedOperator,
        numberValue
      );
      setFilterData(newData);
      setRunningQuery(1);
      setInputValue("");
    setIsSearching(false);
    }
  }, [selectedTable, selectedOperator, numberValue]);

  useEffect(() => {
    // Check if columnName has changed
    const isChanged = selectedColumnQ2 !== "DefaultCol";
    if (isChanged && actualData.length != 0) {
      // Apply the query and set result

      const result = Query2Logic(actualData, selectedColumnQ2);

      setFilterData(result);
      setRunningQuery(2);
      setInputValue("");
    setIsSearching(false);
    }
  }, [selectedColumnQ2]);

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
      <th className="heading" style={{ color: "white" }} key={index}>
        {property}
        <Button
          outline
          color="white"
          // color="grey"
          type="button"
          style={{ marginLeft: "4px", color: "white" }}
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

  const handleSaveClick = () => {
    // Save the current filter data and parameters in local storage
    if (runningQuery == 1 || runningQuery == 2) {
      const savedData = {
        // filterData: filterData,
        parameters: {
          runningQuery: runningQuery,
          selectedTable: selectedTable,
          selectedOperator: selectedOperator,
          numberValue: numberValue,
          selectedColumnQ2: selectedColumnQ2,
        },
      };
      // Retrieve existing saved data from local storage
      const existingSavedData =
        JSON.parse(localStorage.getItem("savedData")) || [];

      // Add the current data to the existing saved data
      const newSavedData = [...existingSavedData, savedData];

      // Save the updated data back to local storage
      localStorage.setItem("savedData", JSON.stringify(newSavedData));
      alert(
        "you can see saved queries by REFRESH in Old Queries Panel and can directly run by clicking them "
      );
      console.log("Data saved successfully!");
    } else {
      alert("give parameters for query properly");
    }
    // setRunningQuery(0);
  };

  //statistics
  const [statsModal, setStatsModal] = useState(false);
  const handleCloseStatsModal = () => setStatsModal(false);
  const paramsForStats = {};
  const openStatsModal = () => {
    setStatsModal(true)
  }

  const pageSize = 5;
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

  return (
    <>
      <div className="button-container small-buttons">
        <div className="results-heading">
          <h5>RESULTS</h5>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm, downloadbtn"
          onClick={() => {
            setFilterData(actualData);
          }}
          size="sm"
          
        >
          Reset
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm, downloadbtn"
          onClick={() => {
            openStatsModal();
          }}
          size="sm"
        >
          Stats
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm, downloadbtn"
          onClick={handleSaveClick}
          size="sm"
        >
          Save Query
        </button>
        <DropDown setRowsNumber={setRowsNumber} />

        <input
          type="number"
          className="form-control-sm "
          placeholder="Search By order id"
          size="sm"
          value={inputValue}
          onChange={handleInputChange}
        />

        {isSearching ? (
          <button
            type="button"
            className="btn btn-secondary btn-sm "
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
          class="btn btn-secondary btn-sm, downloadbtn"
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
              .slice(currentPage * 5, (currentPage + rowsNumber / 5) * 5)
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

          <Modal show={ statsModal } onHide={handleCloseStatsModal } dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Statistics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stats data={filterData} runningQuery={runningQuery}   selectedTable={selectedTable} selectedOperator={selectedOperator}  numberValue={numberValue} selectedColumnQ2= {selectedColumnQ2} searchedOrderID={inputValue} isSearching={isSearching} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStatsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    </>
  );
};

export default Viewer;
