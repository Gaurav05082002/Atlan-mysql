import React, { useState } from 'react';
import { Form, Row, Col, Dropdown, Button } from 'react-bootstrap';

const SqlQuery2 = ({ onExecute }) => {

  const [selectedColumn, setSelectedColumn] = useState('Choose');


  const columnOptions = ['orderId', 'productID', 'unitPrice' , 'quantity' , 'discount'];
  
  const handleExecute = () => {
    onExecute( selectedColumn);
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
              value="DISTINCT"
              readOnly
              size="sm"
              className="form-control-sm"
            />
          </Col>
          
          <Col>
            <Dropdown onSelect={(selected) => setSelectedColumn(selected)}>
              <Dropdown.Toggle variant="light" id="dropdown-column" size="sm">
                {selectedColumn}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {columnOptions.map((column, index) => (
                  <Dropdown.Item key={index} eventKey={column}>
                    {column}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
              value="PRODUCTS"
              readOnly
              size="sm"
              className="form-control-sm"
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

export default SqlQuery2;
