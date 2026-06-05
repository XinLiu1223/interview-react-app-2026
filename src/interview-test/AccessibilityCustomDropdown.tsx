import React, { useEffect, useRef, useState } from 'react';

const options = [
  { id: 1, label: 'React' },
  { id: 2, label: 'Next.js' },
  { id: 3, label: 'TypeScript' },
  { id: 4, label: 'Node.js' },
];

export default function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus selected option when menu opens
  useEffect(() => {
    if (isOpen) {
      const optionEl = document.getElementById(
        `dropdown-option-${focusedIndex}`
      );

      optionEl?.focus();
    }
  }, [isOpen, focusedIndex]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option: (typeof options)[0], index: number) => {
    setSelected(option);
    setFocusedIndex(index);
    setIsOpen(false);

    // Return focus to button
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        setFocusedIndex(prev => (prev === options.length - 1 ? 0 : prev + 1));
        break;

      case 'ArrowUp':
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        setFocusedIndex(prev => (prev === 0 ? options.length - 1 : prev - 1));
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          handleSelect(options[focusedIndex], focusedIndex);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;

      case 'Tab':
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ width: 250, position: 'relative' }}>
      <label
        id="dropdown-label"
        style={{
          display: 'block',
          marginBottom: 8,
          fontWeight: 'bold',
        }}
      >
        Choose Technology
      </label>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          padding: '10px',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        {selected.label}
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby="dropdown-label"
          tabIndex={-1}
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            border: '1px solid #ccc',
            position: 'absolute',
            width: '100%',
            background: '#fff',
            zIndex: 1000,
          }}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              id={`dropdown-option-${index}`}
              role="option"
              aria-selected={selected.id === option.id}
              tabIndex={0}
              onClick={() => handleSelect(option, index)}
              onKeyDown={handleKeyDown}
              style={{
                padding: '10px',
                cursor: 'pointer',
                background: focusedIndex === index ? '#eee' : 'transparent',
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
