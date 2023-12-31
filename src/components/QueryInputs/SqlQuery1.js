import React, { useState } from 'react';
import { Form, Row, Col, Dropdown, Button } from 'react-bootstrap';
import "./Glow.css";

const SqlQuery1 = ({ onExecute }) => {
  const [selectedTable, setSelectedTable] = useState('choose');
  const [selectedOperator, setSelectedOperator] = useState('choose');
  const [numberValue, setNumberValue] = useState('input num');

  const tableOptions = ['orderID', 'productID', 'unitPrice' , 'quantity' , 'discount'];
  const operatorOptions = ['=', '!=', '>', '<'];

  const handleExecute = () => {
    onExecute(selectedTable, selectedOperator, numberValue);
  };

  return (
    <div>
      <Form>
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="text"
              value="SELECT"
              readOnly
              size="sm"
              className="form-control-sm"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value="*"
              readOnly
              size="sm"
              className="form-control-sm"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value="FROM"
              readOnly
              size="sm"
              className="form-control-sm"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value="PRODUCT"
              readOnly
              size="sm"
              className="form-control-sm"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value="WHERE"
              readOnly
              size="sm"
              className="form-control-sm"
            />
          </Col>
          <Col>
            <Dropdown onSelect={(selected) => setSelectedTable(selected)}>
              <Dropdown.Toggle variant="light" id="dropdown-table" size="sm"   style={{ border:"solid 4px white" , animation: "glow 1.5s infinite alternate"}} >
                {selectedTable}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {tableOptions.map((table, index) => (
                  <Dropdown.Item key={index} eventKey={table}>
                    {table}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown onSelect={(selected) => setSelectedOperator(selected)}>
              <Dropdown.Toggle variant="light" id="dropdown-operator" size="sm"   style={{ border:"solid 4px white" , animation: "glow 1.5s infinite alternate"}}>
                {selectedOperator}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {operatorOptions.map((operator, index) => (
                  <Dropdown.Item key={index} eventKey={operator}>
                    {operator}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Enter Number"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              size="sm"
              className="form-control-sm"
              style={{ border:"solid 4px white" , animation: "glow 1.5s infinite alternate"}}
            />
          </Col>
          <Col>
            <Button variant="primary" size="sm" onClick={handleExecute}>
              Execute
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SqlQuery1;
