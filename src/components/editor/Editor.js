//all imports
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { GrBladesVertical } from "react-icons/gr";
import { GrActions } from "react-icons/gr";
import { GrApps } from "react-icons/gr";
import { AiFillGithub, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { IoBugSharp } from "react-icons/io5";
import { GrBarChart } from "react-icons/gr";
import SqlQuery1 from "../QueryInputs/SqlQuery1.js";
import SqlQuery2 from "../QueryInputs/SqlQuery2.js";
import "./Editor.css";
import Viewer from "../table/Viewer.js";
import { Link } from "react-router-dom";

const Editor = () => {
  var a = 300;
  const [savedData, setSavedData] = useState([]);
  const [size, setsize] = useState(a);
  const [visi, setvisi] = useState("visible");
  const [theme, setTheme] = useState("lighttheme");

  //query 1
  const [selectedTable, setSelectedTable] = React.useState("DefaultTable");
  const [selectedOperator, setSelectedOperator] =
    React.useState("DefaultOperator");
  const [numberValue, setNumberValue] = useState("inputnum");
  const handleExecuteQuery1 = (table, operator, num) => {
    setSelectedColumnQ2("DefaultCol");
    setSelectedTable(table);
    setSelectedOperator(operator);
    setNumberValue(num);
  };

  // query 2
  const [selectedColumnQ2, setSelectedColumnQ2] = React.useState("DefaultCol");
  const handleExecuteQuery2 = (columnq2) => {
    setSelectedColumnQ2(columnq2);
    setSelectedTable("DefaultTable");
    setSelectedOperator("DefaultOperator");
    setNumberValue("inputnum");
  };

  //getting old queries
  useEffect(() => {
    // Retrieve saved data from local storage
    const storedData = JSON.parse(localStorage.getItem("savedData")) || [];
    setSavedData(storedData);
  }, []);

  //Implementing queries from old query panel
  const handleExecuteSavedQuery = (item) => {
    if (item.parameters.runningQuery === 1) {
      handleExecuteQuery1(
        item.parameters.selectedTable,
        item.parameters.selectedOperator,
        item.parameters.numberValue
      );
    } else if (item.parameters.runningQuery === 2) {
      handleExecuteQuery2(item.parameters.selectedColumnQ2);
    }
  };

  // Function to remove a saved query from local storage
  const handleRemoveSavedQuery = (index) => {
    // Retrieve existing saved data from local storage
    const existingSavedData =
      JSON.parse(localStorage.getItem("savedData")) || [];

    // Remove the item at the specified index
    existingSavedData.splice(index, 1);

    // Save the updated data back to local storage
    localStorage.setItem("savedData", JSON.stringify(existingSavedData));

    // Update the state to reflect the change
    setSavedData(existingSavedData);
  };

  //this function is for removing or changing  size of file explorer in our window
  function sizechange() {
    if (size) {
      setvisi("hidden");
      setsize(0);
    } else {
      setsize(a);

      setvisi("visible");
    }
  }

  //this function is for chnaging style of code editor
  function themeing() {
    if (theme == "darktheme") {
      setTheme("lighttheme");
    } else {
      setTheme("darktheme");
    }
  }

  //rendering the page
  return (
    <>
      <div className={`nav2 ${theme}`}>SQL EDITOR</div>

      <div id="main" className={theme}>
        {/* div LEFTONE is leftest div in winddow where all buttons with different functions are given */}
        <div id="leftone">
          <button className="lbtn" onClick={sizechange} id="plus">
            <GrBladesVertical />
          </button>
          <button className="lbtn" onClick={themeing} id="minus">
            <GrActions />
          </button>
          <Link to="/Stats">
          <button
            className="lbtn"
            
          >
         
            <GrBarChart/>
          </button>
          </Link>
          <a target="blank" href="https://atlan.com/">
            <button className="lbtn">
              <GrApps />
            </button>
          </a>
          <a target="blank" href="https://github.com/join/get-started">
            <button className="lbtn">
              <AiFillGithub />
            </button>
          </a>
          <a target="blank" href="https://facebook.com">
            <button className="lbtn">
              <AiFillFacebook />
            </button>
          </a>
          <a target="blank" href="https://twitter.com">
            <button className="lbtn">
              <AiOutlineTwitter />
            </button>
          </a>
        </div>

        {/* div LEFTTWO  is second div from left side and it is file explorer which will also help us in inserting and remove a particular file 
  from here you can choose a file and then can view its data or edit its data or remove that file  */}
        <div
          id="lefttwo"
          style={{ width: size, visibility: visi, backgroundColor: "#6c757e" }}
        >
          <h6
            style={{
              marginTop: "10px",
              color: "white",
              fontFamily: "Lobster cursive",
            }}
          >
            Old Queries
          </h6>

          <button
            type="button"
            style={{ marginRight: "0.5rem", border: "solid 1px white" }}
            class="btn btn-secondary btn-sm"
            onClick={() => {
              localStorage.removeItem("savedData");
              const storedData =
                JSON.parse(localStorage.getItem("savedData")) || [];
              setSavedData(storedData);
            }}
          >
            Delete All
          </button>

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
            onClick={() => {
              const storedData =
                JSON.parse(localStorage.getItem("savedData")) || [];
              setSavedData(storedData);
            }}
          >
            Refresh
          </button>

          <ul
            className="list-group"
            style={{
              padding: "0.2rem",
              fontFamily: "georgia",
              fontSize: "14px",
              textAlign: "left",
              color: "white",
            }}
          >
            {savedData.map((item, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{
                      border: "0px",
                      margin: "2px",
                      width: "90%",
                      marginLeft: "1%",
                      marginRight: "1%",
                      fontFamily: "Lobster",
                      textAlign: "left",
                      border: "solid 1px white",
                    }}
                    onClick={() => handleExecuteSavedQuery(item)}
                  >
                    {item.parameters.runningQuery === 1
                      ? `${item.parameters.selectedTable} ${item.parameters.selectedOperator} ${item.parameters.numberValue}`
                      : `DISTINCT ${item.parameters.selectedColumnQ2}`}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ marginLeft: "5px", border: "solid 1px white" }}
                    onClick={() => handleRemoveSavedQuery(index)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="right">
          <div id="rightmid">
            <h6
              style={{
                marginTop: "10px",
                color: "white",
                fontFamily: "Lobster cursive",
              }}
            >
              Please Complete query feilds{" "}
            </h6>

            <Container fluid>
              <Row className="mt-4">
                <Col>
                  <SqlQuery1 onExecute={handleExecuteQuery1} />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <SqlQuery2 onExecute={handleExecuteQuery2} />
                </Col>
              </Row>
            </Container>
          </div>

          <div id="rightdown">
            <Viewer
              selectedTable={selectedTable}
              selectedOperator={selectedOperator}
              numberValue={numberValue}
              selectedColumnQ2={selectedColumnQ2}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
