import { useState } from 'react';

export default function App() {
  const [inputs, setInputs] = useState(['']);

  // Update value of an input
  function handleChange(index: number, value: string) {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  }

  // Insert a new input after the selected index
  function insertAfter(index: number) {
    const updated = [...inputs];
    // this splice is insert a new empty string into the array at the index + 1 position
    // since the second param of the splice is 0, it will not remove any item from the array,
    // but just insert the new item at the specified position
    updated.splice(index + 1, 0, '');
    setInputs(updated);
  }

  // Remove an input
  function remove(index: number) {
    if (inputs.length === 1) return;
    // this filter is remove one item function by index,
    // and return a new array without that item
    setInputs(inputs.filter((_, i) => i !== index));
  }

  return (
    <div style={styles.container}>
      <h2>Add Entry Between Input Cells</h2>

      {inputs.map((value, index) => (
        <div key={index} style={styles.row}>
          <input
            type="text"
            value={value}
            onChange={e => handleChange(index, e.target.value)}
            placeholder={`Input ${index + 1}`}
            style={styles.input}
          />

          <button onClick={() => insertAfter(index)}>＋</button>
          <button onClick={() => remove(index)}>✕</button>
        </div>
      ))}

      <pre>{JSON.stringify(inputs, null, 2)}</pre>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '40px auto',
    fontFamily: 'sans-serif',
  },
  row: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    padding: 6,
  },
};
