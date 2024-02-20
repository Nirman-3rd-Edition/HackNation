import React, { useState } from 'react';
import styled from 'styled-components';

// Styled component for the main container
const Container = styled.div`
  position: relative;
  display: inline-block;
`;

// Styled component for the dropdown paper
const Paper = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 200px;
`;

// Styled component for buttons
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    background-color: #0056b3;
  }
`;

const OptionsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const applySelection = () => {
    console.log('Selected options:', selectedOptions);
    setIsOpen(false);
  };

  const clearAll = () => {
    setSelectedOptions([]);
  };

  return (
    <Container>
      <Button onClick={toggleDropdown}>Select Options</Button>
      {isOpen && (
        <Paper>
          {options.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionClick(option)}
              />
              <label>{option}</label>
            </div>
          ))}
          <div>
            <Button onClick={applySelection}>Apply</Button>
            <Button onClick={clearAll}>Clear All</Button>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default OptionsContainer;
