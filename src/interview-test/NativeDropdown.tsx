import React, { useState } from 'react';

const DropdownMenu = () => {
  // Initialize state to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // Handler function to update state on change
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(event.target.value);
    console.log(`Selected: ${event.target.value}`);
  };

  // Array of options to iterate over
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <div>
      <label htmlFor="dropdown">Choose an option: </label>
      <select
        id="dropdown"
        value={selectedValue} // Controls the selected value
        onChange={handleDropdownChange} // Handles state updates
      >
        {/* Optional default/placeholder option */}
        <option value="">-- Please select --</option>

        {/* Map over the options array to render each option */}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedValue && <p>You selected: {selectedValue}</p>}
    </div>
  );
};

export default DropdownMenu;
