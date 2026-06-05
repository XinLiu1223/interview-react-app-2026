import React, { useState } from 'react';

const DropdownMenu = () => {
  // Initialize state to manage the selected value
  const [selected, setSelected] = useState('');

  // Handler function to update state on change
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelected(event.target.value);
    console.log(`Selected: ${event.target.value}`);
  };

  // Array of options to iterate over
  const options = [
    { label: 'Option 1', value: 'red' },
    { label: 'Option 2', value: 'blue' },
    { label: 'Option 3', value: 'green' },
  ];

  return (
    <div className="form-field">
      <label htmlFor="color-select">Choose a color:</label>
      <select
        id="color-select"
        value={selected}
        onChange={handleDropdownChange} // Handles state updates
      >
        {/* Optional default/placeholder option */}
        <option value="">-- Please select --</option>

        {/* Map over the options array to render each option */}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {`${option.label} - ${option.value}`}
          </option>
        ))}
      </select>
      {selected && <p>You selected: {selected}</p>}
    </div>
  );
};

export default DropdownMenu;
