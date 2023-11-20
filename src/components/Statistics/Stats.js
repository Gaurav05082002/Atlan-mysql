import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Data from '../editor/Data';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';


const Stats = ({ data=Data, runningQuery, selectedTable, selectedOperator, numberValue, selectedColumnQ2, searchedOrderID ,isSearching }) => {
  // Calculate statistics
  const avgUnitPrice = data.reduce((sum, product) => sum + product.unitPrice, 0) / data.length;
  const maxUnitPrice = Math.max(...data.map(product => product.unitPrice));
  const minUnitPrice = Math.min(...data.map(product => product.unitPrice));
  const avgQuantitySold = data.reduce((sum, product) => sum + product.quantity, 0) / data.length;
  const maxQuantitySold = Math.max(...data.map(product => product.quantity));
  const minQuantitySold = Math.min(...data.map(product => product.quantity));
  const totalOrders = data.reduce((acc, product) => {
    acc[product.productID] = (acc[product.productID] || 0) + 1;
    return acc;
  }, {});
  const avgDiscount = data.reduce((sum, product) => sum + product.discount, 0) / data.length;
  const maxDiscount = Math.max(...data.map(product => product.discount));
  const minDiscount = Math.min(...data.map(product => product.discount));
  const totalRevenue = data.map(product => product.unitPrice * product.quantity * (1 - product.discount));
  const getHeading = () => {
    if (runningQuery === 1) {
        return <div>
        <h5>QUERY: Select * From Data Where</h5>
        <p> {selectedTable} {selectedOperator} {numberValue}</p>
      </div>

    } else if (runningQuery === 2) {
        return <div>
        <h5>QUERY: Select * From Data With</h5>
        <p> Distinct {selectedColumnQ2}</p>
      </div>

    } else {
        return <div>
        
        <p>FOR ALL DATA</p>
        <h5>You can also get statistics for specific query results , please click on <button
            type="button"
            class="btn btn-secondary btn-sm"
            style={{ border: "solid 1px white" }}
          >Stats</button> btn after executing query </h5>
      </div>
    }
  };

  // Function to download the content as PDF
  const statsRef = useRef();

  const downloadPDF = () => {
    const content = statsRef.current;

    html2pdf(content)
      .from(content)
      .outputPdf()
      .then(pdf => {
        // You can save the PDF or display it, for example:
        // pdf.save('statistics.pdf');
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'statistics.pdf';
        link.click();
      });
  };

  return (
    <div className="guideline-container" ref={statsRef}>
     <h3>{getHeading()}</h3>
     {searchedOrderID && (
        <p>Search Result for Order ID: {searchedOrderID}</p>
      )}
      <button   type="button"
            class="btn btn-secondary btn"
            style={{ border: "solid 1px white" }}
            onClick={downloadPDF}>Download Report as PDF</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average Unit Price</td>
            <td>{avgUnitPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum Unit Price</td>
            <td>{maxUnitPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum Unit Price</td>
            <td>{minUnitPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Average Quantity Sold</td>
            <td>{avgQuantitySold.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum Quantity Sold</td>
            <td>{maxQuantitySold}</td>
          </tr>
          <tr>
            <td>Minimum Quantity Sold</td>
            <td>{minQuantitySold}</td>
          </tr>
          <tr>
            <td>Total Orders for Each Product</td>
            <td>
              <ul>
                {Object.keys(totalOrders).map(productID => (
                  <li key={productID}>
                    Product {productID}: {totalOrders[productID]}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Average Discount</td>
            <td>{avgDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Maximum Discount</td>
            <td>{maxDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Minimum Discount</td>
            <td>{minDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Revenue for Each Product</td>
            <td>
              <ul>
                {totalRevenue.map((revenue, index) => (
                  <li key={index}>
                    Product {data[index].productID}: {revenue.toFixed(2)}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Stats;
