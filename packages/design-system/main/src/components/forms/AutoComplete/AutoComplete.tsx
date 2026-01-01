import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './AutoComplete.module.css';

export type AutoCompleteOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type AutoCompleteProps = {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'outlined' | 'filled';
  /** Full width */
  fullWidth?: boolean;
  /** Options for autocomplete */
  options: AutoCompleteOption[];
  /** Callback when option is selected */
  onSelect?: (option: AutoCompleteOption) => void;
  /** Left icon/element */
  startAdornment?: ReactNode;
  /** Right icon/element */
  endAdornment?: ReactNode;
  /** Custom filter function */
  filterOption?: (option: AutoCompleteOption, inputValue: string) => boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSelect'>;

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'medium',
      variant = 'outlined',
      fullWidth = false,
      options = [],
      onSelect,
      startAdornment,
      endAdornment,
      filterOption,
      className = '',
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState((value as string) || '');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const defaultFilter = (option: AutoCompleteOption, input: string) =>
      option.label.toLowerCase().includes(input.toLowerCase());

    const filteredOptions = options.filter((option) =>
      (filterOption ?? defaultFilter)(option, inputValue)
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);
      setHighlightedIndex(-1);
      onChange?.(e);
    };

    const handleOptionClick = (option: AutoCompleteOption) => {
      if (!option.disabled) {
        setInputValue(option.label);
        setIsOpen(false);
        onSelect?.(option);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const variantClass = {
      outlined: styles.variantOutlined,
      filled: styles.variantFilled,
    }[variant];

    const containerClassName = clsx(
      styles.container,
      fullWidth && styles.fullWidth
    );

    const inputClassName = clsx(
      styles.input,
      sizeClass,
      variantClass,
      error && styles.error,
      disabled && styles.disabled,
      startAdornment && styles.hasStartAdornment,
      endAdornment && styles.hasEndAdornment,
      className
    );

    return (
      <div className={containerClassName} ref={containerRef}>
        {label && (
          <label className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {startAdornment && <div className={styles.startAdornment}>{startAdornment}</div>}
          <input
            ref={ref}
            className={inputClassName}
            disabled={disabled}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {endAdornment && <div className={styles.endAdornment}>{endAdornment}</div>}
        </div>
        {isOpen && filteredOptions.length > 0 && (
          <ul className={styles.dropdown}>
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                className={clsx(
                  styles.option,
                  highlightedIndex === index && styles.highlighted,
                  option.disabled && styles.disabledOption
                )}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {(error ?? helperText) && (
          <p className={error ? styles.errorText : styles.helperText}>{error ?? helperText}</p>
        )}
      </div>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';
