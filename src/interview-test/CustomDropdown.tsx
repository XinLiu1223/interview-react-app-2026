import { useEffect, useRef, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{ position: 'relative', width: 200 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: '8px' }}
      >
        {selected?.label || placeholder}
      </button>

      {open && (
        <ul
          style={{
            position: 'absolute',
            width: '100%',
            background: '#fff',
            border: '1px solid #ccc',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {options.map(option => (
            <li
              key={option.value}
              style={{ padding: '8px', cursor: 'pointer' }}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
