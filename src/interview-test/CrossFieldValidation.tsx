import { useState, type ChangeEvent } from 'react';

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function Form() {
  const [form, setForm] = useState<FormValues>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (values: FormValues) => {
    const errs = {} as FormErrors;

    if (!values.password) {
      errs.password = 'Password is required';
    }

    if (values.confirmPassword && values.confirmPassword !== values.password) {
      errs.confirmPassword = 'Passwords do not match';
    }

    return errs;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => {
      const updated = { ...prev, [name]: value };

      // 🔑 Cross-field validation happens here
      setErrors(validate(updated));

      return updated;
    });
  };

  return (
    <form>
      <h3>Form with Cross-Field Validation</h3>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <label>Password</label>
      {errors.password && <p>{errors.password}</p>}

      <input
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <label>Confirm Password</label>
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
    </form>
  );
}
