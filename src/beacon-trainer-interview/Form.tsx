import React, { useState } from 'react';

export default function Form({ addUser }: { addUser: (user: any) => void }) {
  const [foraData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log('form', value, name);
    setFormData({
      ...foraData,
      [name]: value,
    });
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formData', foraData);
    addUser(foraData);
  };

  return (
    <form className="form" onSubmit={handleAdd}>
      <h1>Contact Form</h1>
      <input
        className="input"
        placeholder="Name"
        name="name"
        onChange={(e) => handleChange(e)}
      />
      <input
        className="input"
        placeholder="Email"
        name="email"
        onChange={(e) => handleChange(e)}
      />
      <input
        className="input"
        placeholder="Website"
        name="website"
        onChange={(e) => handleChange(e)}
      />
      <button className="btn" type="submit" >
        Add
      </button>
    </form>
  );
}
