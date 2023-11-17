import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropDown = ({ setRowsNumber }) => {
  const rowsOptions = [5, 10, 15, 20];

  const handleSelect = (selectedRows) => {
    setRowsNumber(selectedRows);
  };

  return (
    <Dropdown onSelect={handleSelect} style={{ marginRight: "10px", marginLeft: "10px", border: "2px solid black" }}
    >
      <Dropdown.Toggle variant="light" >
        Rows
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {rowsOptions.map((option, index) => (
          <Dropdown.Item key={index} eventKey={option}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
