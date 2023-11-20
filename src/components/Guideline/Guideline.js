// Guideline.js
import React from "react";
import "./Guideline.css";

const Guideline = () => {
  return (
    <div className="guideline-container">
      <h2>Features</h2>

      <h3>Dynamic Query</h3>
      <p>
        <strong>Query 1:</strong> Allows you to execute a dynamic WHERE query.
        Input the necessary fields and execute the query.
      </p>
      <p>
        <strong>Query 2:</strong> Executes a DISTINCT query. Select the input
        and execute the query.
      </p>

      <h3>Results Panel</h3>
      <ul>
        <li>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            ▲
          </button>
          Ascending/Descending sorting for columns by clicking on ▲
        </li>
        <li>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Reset
          </button>
          Updates the table with original data
        </li>
        <li>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Stats
          </button>
           Open statistics for result of current query results
        </li>
        <li>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Save Query
          </button>{" "}
          Saves the query and displays it in the Old Queries panel
        </li>
        <li>
          {" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Row
          </button>
          Dropdown: Allows selection of the number of rows per page
        </li>
        <li>
          {" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Search
          </button>{" "}
          by Order ID: Filters data with the given order ID
        </li>
        <li>
          {" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Download
          </button>
          JSON Button: Downloads the result array as JSON
        </li>
        <li>
          {" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Dynamic Pagination
          </button>
          : Customized pagination for selecting rows and direct page navigation
        </li>
      </ul>

      <h3>Old Query Panel</h3>
      <ul>
        <li>Acts as a history of saved queries</li>
        <li>Queries can be executed directly by clicking on them</li>
        <li>Refresh Button: Refreshes the panel</li>
        <li>Delete All Button: Clears the Old Query Panel</li>
      </ul>
      <h3>Statistics and analysis</h3>
      <ul>   <li>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Stats
          </button>
          Stats Button: Dynamically see analysis for the result of any query.
          </li>
          <li>
          <button   type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
            >Download Report as PDF</button>
             clicking on it download analysis report as pdf
          </li>
          
        </ul>
      

        <h3>Documentation</h3>
        <ul>
        <li>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >
            Documentation
          </button>
          Documentation Button: Check the documentation as guidefor using the
          application.
        </li>
        </ul>

      <h3>Theme Change</h3>
      <p>The second button on the left allows you to change the theme.</p>
    </div>
  );
};

export default Guideline;
