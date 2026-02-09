import { useState, type CSSProperties } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  numberOne?: string;
  numberTwo?: string;
  [key: string]: string | undefined;
}

interface FormErrors {
  [key: string]: string;
}

export default function App() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    numberOne: '',
    numberTwo: '',
  });
  console.log('FormAnyInputChangeValidate', form);
  const [errors, setErrors] = useState<FormErrors>({});

  function validateField(
    name: string,
    value: string,
    currentFormState: FormData
  ): string {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        return '';

      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Minimum 6 characters';
        return '';

      case 'numberOne':
        if (value === '' || isNaN(Number(value))) {
          return 'Number is required';
        }
        if (
          currentFormState.numberTwo &&
          !isNaN(Number(currentFormState.numberTwo)) &&
          Number(value) < Number(currentFormState.numberTwo)
        ) {
          return 'Number one must be greater than or equal to number two';
        }
        return '';

      case 'numberTwo':
        if (value === '' || isNaN(Number(value))) {
          return 'Number is required';
        }
        if (
          currentFormState.numberOne &&
          !isNaN(Number(currentFormState.numberOne)) &&
          Number(value) > Number(currentFormState.numberOne)
        ) {
          return 'Number two must be less than or equal to number one';
        }
        return '';

      default:
        return '';
    }
  }

  function handleChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    // Update form state and Cross-field validation
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // updated is current form state with the latest change applied, so we can validate against it
      // Real-time validation and Cross-field validation
      const error = validateField(name, value, updated);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
      return updated;
    });
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const newErrors: FormErrors = {};

    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key] || '', form);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
      console.log(form);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Real-Time Form Validation</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.field}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>

        <div style={styles.field}>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.field}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span style={styles.error}>{errors.password}</span>
          )}
        </div>

        <div style={styles.field}>
          <label>Number One</label>
          <input
            type="number"
            name="numberOne"
            value={form.numberOne}
            onChange={handleChange}
          />
          {errors.numberOne && (
            <span style={styles.error}>{errors.numberOne}</span>
          )}
        </div>

        <div style={styles.field}>
          <label>Number Two</label>
          <input
            type="number"
            name="numberTwo"
            value={form.numberTwo}
            onChange={handleChange}
          />
          {errors.numberTwo && (
            <span style={styles.error}>{errors.numberTwo}</span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: '40px auto',
    fontFamily: 'sans-serif',
  } as CSSProperties,
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  } as CSSProperties,
  error: {
    color: 'red',
    fontSize: 12,
  } as CSSProperties,
};
