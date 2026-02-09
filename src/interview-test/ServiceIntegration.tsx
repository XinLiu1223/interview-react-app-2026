'use client';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

// the user objects fetched from the API will be cached in memory
/* 
  Example user object from API:
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
*/

const cache: { users?: UserType[] } = {}; // Simple in-memory cache

const ServiceIntegration = () => {
  const [submitting, setSubmittig] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    name: '',
    data: { year: '', price: '', model: '', size: '' },
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    data: { year: '', price: '', model: '', size: '' },
  });

  const validateForm = (
    name: string,
    value: string,
    currentState: typeof data
  ) => {
    let isValid = true;
    const newErrors = {
      name: '',
      data: { year: '', price: '', model: '', size: '' },
    };

    switch (name) {
      case 'name':
        if (value.trim() === '') {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        break;
      case 'year':
        if (value.trim() === '') {
          newErrors.data.year = 'Year is required';
          isValid = false;
        }
        break;
      case 'price':
        if (value === '') {
          newErrors.data.price = 'Price is required';
          isValid = false;
        }
        if (value.toString().length < 2) {
          newErrors.data.price = 'Price should be at least 2 characters long';
          isValid = false;
        }
        // cross-field validation example for price and size
        if (
          value &&
          currentState.data.size &&
          Number(value) < Number(currentState.data.size)
        ) {
          newErrors.data.price = 'Price must be greater than or equal to size';
          isValid = false;
        }
        break;
      case 'model':
        if (value.trim() === '') {
          newErrors.data.model = 'Model is required';
          isValid = false;
        }
        break;
      case 'size':
        if (value === '') {
          newErrors.data.size = 'Size is required';
          isValid = false;
        }
        // cross-field validation example for size and price
        if (
          value &&
          currentState.data.price &&
          Number(value) > Number(currentState.data.price)
        ) {
          newErrors.data.size = 'Size must be less than or equal to price';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update data state and Cross-field validation
    setData(prev => {
      const updated = {
        ...prev,
        data: { ...prev.data, [name]: value },
      };
      // updated is current form state with the latest change applied, so we can validate against it
      validateForm(name, value, updated);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittig(true);
    if (
      validateForm('name', data.name, data) &&
      validateForm('year', data.data.year, data) &&
      validateForm('price', data.data.price, data) &&
      validateForm('model', data.data.model, data) &&
      validateForm('size', data.data.size, data)
    ) {
      try {
        const response = await fetch('https://api.restful-api.dev/objects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setSubmittig(false);
        setError(null);
        setData({
          name: '',
          data: { year: '', price: '', model: '', size: '' },
        });
        // Redirect on success
        navigate('/success');
      } catch (err) {
        setError(`Submission failed. Please try again. ${err}`);
      } finally {
        setSubmittig(false);
      }
    } else {
      setSubmittig(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.restful-api.dev/objects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    if (cache.users) return; // Use cached data if available

    setSubmittig(true);
    setError(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) throw new Error('Failed to fetch data');

      const json = await response.json();
      cache.users = json; // Store data in cache
      console.log('Fetched users:', json, cache.users);
      // setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmittig(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderForm = () => (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2"
            value={data.name}
            onChange={e => {
              const { name, value } = e.target;
              setData(prev => {
                const updated = { ...prev, [name]: value };
                validateForm(name, value, updated);
                return updated;
              });
            }}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <h4>Data - </h4>
          <div>
            <label htmlFor="year">Year:</label>
            <input
              type="date"
              id="year"
              name="year"
              className="border-2"
              value={data.data.year}
              onChange={e => handleDataChange(e)}
            />
            {errors.data.year && <span>{errors.data.year}</span>}
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              className="border-2"
              value={data.data.price}
              onChange={e => handleDataChange(e)}
            />
            {errors.data.price && <span>{errors.data.price}</span>}
            {/* this is simple latest form state corss fields validation */}
            {/* and it shows up at the same time as the input is changed */}
            {/* {Number(data.data.price) < Number(data.data.size) && (
              <span className="text-red-500">
                Price must be greater than size
              </span>
            )} */}
          </div>
          <div>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              className="border-2"
              value={data.data.model}
              onChange={e => handleDataChange(e)}
            />
            {errors.data.model && <span>{errors.data.model}</span>}
          </div>
          <div>
            <label htmlFor="size">Size:</label>
            <input
              type="number"
              id="size"
              name="size"
              className="border-2"
              value={data.data.size}
              onChange={e => handleDataChange(e)}
            />
            {errors.data.size && <span>{errors.data.size}</span>}
            {/* this is simple latest form state corss fields validation */}
            {/* and it shows up at the same time as the input is changed */}
            {/* {Number(data.data.size) > Number(data.data.price) && (
              <span className="text-red-500">Size must be less than price</span>
            )} */}
          </div>
        </div>
        <div>
          <button type="submit" className="border-2">
            {submitting ? 'Submitting...' : 'Integrate Service'}
          </button>
        </div>
      </form>
      <div>
        <span className="border-2">{error && 'Submitting error...'}</span>
      </div>
    </>
  );

  return (
    <div className="star-rating">
      {renderForm()}

      <Routes>
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
};

function Success() {
  return <h4>🎉 Form Submitted Successfully!</h4>;
}

export default ServiceIntegration;
