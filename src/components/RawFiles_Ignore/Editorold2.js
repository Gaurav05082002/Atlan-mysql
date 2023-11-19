//wc final 
//all imports
import { useState , useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
// import { CsvToHtmlTable } from "react-csv-to-table";
import React from "react";
import { GrBladesVertical } from "react-icons/gr";
import { GrActions } from "react-icons/gr";
import { GrApps } from "react-icons/gr";
import { AiFillGithub, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { IoBugSharp } from "react-icons/io5";
import SqlQuery1 from "../QueryInputs/SqlQuery1.js";
import SqlQuery2 from "../QueryInputs/SqlQuery2.js";
import "./Editor.css";

import Viewer from "../table/Viewer.js";
const Editor = () => {
  var a = 300;
  const [savedData, setSavedData] = useState([]);
  useEffect(() => {
    // Retrieve saved data from local storage

    console.log("am i creating prob")
    const storedData = JSON.parse(localStorage.getItem("savedData")) || [];
    setSavedData(storedData);
  }, []);

  const [size, setsize] = useState(a);
  const [visi, setvisi] = useState("visible");
  // const [data, setdata] = useState();
  const [stl, setstl] = useState("inputcode");
  const [theme , setTheme] = useState("lighttheme")
  const [file, setfile] = useState("categories.csv");




  // Define parameters in Editor.js state
  const [selectedTable, setSelectedTable] = React.useState('DefaultTable');
  // const [selectedNum , setSelectedNumber] =  React.useState();
  const [selectedOperator, setSelectedOperator] = React.useState('DefaultOperator');
  const [numberValue, setNumberValue] = useState('inputnum');


   //for query 2
   const [selectedColumnQ2, setSelectedColumnQ2] = React.useState('DefaultCol');
  // Handler to update parameters based on QueryInput selections
  const handleExecuteQuery1 = (table, operator , num ) => {
    setSelectedTable(table);
    
    setSelectedOperator(operator);
    setNumberValue(num);
  };


  const handleExecuteQuery2 = (columnq2)=> {
    setSelectedColumnQ2(columnq2)
  }

  const handleExecuteSavedQuery = (item) => {
    if (item.parameters.runningQuery === 1) {
      handleExecuteQuery1(item.parameters.selectedTable ,  item.parameters.selectedOperator, item.parameters.numberValue )
      // Execute Query 1
      // Query1Logic(item.parameters.selectedTable, item.parameters.selectedOperator, item.parameters.numberValue);
    } else if (item.parameters.runningQuery === 2) {
      // Execute Query 2
      handleExecuteQuery2(item.parameters.selectedColumnQ2)
      // Query2Logic(item.parameters.selectedColumnQ2);
    }
  };

  // Function to remove a saved query from local storage
  const handleRemoveSavedQuery = (index) => {
    // Retrieve existing saved data from local storage
    const existingSavedData = JSON.parse(localStorage.getItem("savedData")) || [];

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
  //the below functions are for rendering different datas on choosing different file in file explorer , when backend done it can be made more dynamic and we can switch all this function to one function
 
 
  //rendering the page
  return (<>   
<div className={`nav2 ${theme}`}>
  SQL EDITOR
</div>
  
   <div id="main" className={theme}>
      {/* div LEFTONE is leftest div in winddow where all buttons with different functions are given */}
      <div id="leftone">
        <button className="lbtn" onClick={sizechange} id="plus">
          <GrBladesVertical />
        </button>
        <button className="lbtn" onClick={themeing} id="minus">
          <GrActions />
        </button>
        <button
          className="lbtn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal3"
        >
          {" "}
          <IoBugSharp />
        </button>
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
      <div id="lefttwo" style={{ width: size, visibility: visi  ,   backgroundColor:'#6c757e'}}>
        <h6 style={{ marginTop:'10px' , color:"white" , fontFamily:"Lobster cursive" }} >Old Queries</h6>
       


        {/* this MODAL FOR BUG BUTTON present in LEFTONE div  */}
        <div
          class="modal fade"
          id="exampleModal3"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Bugs
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                No bugs in your code
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* insert button in file explorer for inserting file and starting work on it  */}
        <button
          type="button"
          style={{ marginRight: "0.5rem" , border:"solid 1px white" }}
          class="btn btn-secondary btn-sm"
          onClick={()=>{localStorage.removeItem("savedData");}}
          // data-bs-toggle="modal"
          // data-bs-target="#exampleModal"
        >
          Delete All
        </button>

        {/* modal that will work on clicking above insert button  */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Insert File
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                insert your file from device <br></br> OR <br></br>
                directly drop file here
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-secondary btn-sm"
        style={{border:"solid 1px white"}}
        onClick={()=>{
          const storedData = JSON.parse(localStorage.getItem("savedData")) || [];
    setSavedData(storedData);
        }}
        >
          Refresh
        </button>
        {/* all files in file explorer select file for editing viewing or removing it  */}
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
          style={{ marginLeft: "5px" , border: "solid 1px white", }}
          onClick={() => handleRemoveSavedQuery(index)}
        >
          X
        </button>
      </div>
    </li>
  ))}
</ul>

        {/*  */}
      </div>

      {/* right div startedwhich contains code editor and view data part */}
      <div id="right">
        {/* <div id='rightup'></div> */}
        {/* the below div is code edit part  */}
        <div id="rightmid">
          {/* <h6 className="ediname"> Please Complete query feilds </h6> */}
          <h6 style={{ marginTop:'10px' , color:"white" , fontFamily:"Lobster cursive" }} >Please Complete query feilds </h6>
            
          <Container fluid>
      <Row className="mt-4">
        <Col>
          <SqlQuery1 onExecute={handleExecuteQuery1} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <SqlQuery2 onExecute = {handleExecuteQuery2}/>
        </Col>
      </Row>
    </Container>
           
          {/* <textarea
            className={stl}
            placeholder="write your code here"
           
          ></textarea> */}
          

          {/* <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
          >
            Run Query
          </button> */}
        
          {/* this modal is for result button once the code is done ,this will also allow us to send the result to particular gmail id  */}
          <div
            class="modal fade"
            id="exampleModal2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Results
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {/* <CsvToHtmlTable data={Data[8]} csvDelimiter="," /> */}
                </div>
                <div class="modal-footer">
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          SEND THIS RESULTS TO :
                        </label>
                        <input
                          type="text"
                          placeholder="xyz@gmail.com"
                          class="form-control"
                          id="recipient-name"
                        ></input>
                      </div>
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Message:
                        </label>
                        <textarea
                          class="form-control"
                          placeholder="hey, this query is performed on "
                          id="message-text"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        {/* the below div is for viewing data  */}
        <div id="rightdown">
          {/* <h6 className="ediname">VIEW DATA of </h6> */}
          <Viewer selectedTable={selectedTable}  selectedOperator={selectedOperator} numberValue={numberValue} selectedColumnQ2={selectedColumnQ2} />
          {/* csv to html is used to convert csv data to html table form  */}
         
          {/* <CsvToHtmlTable data={data} csvDelimiter="," /> */}
        </div>
      </div>
    </div>
    </>

  );
};

export default Editor;
