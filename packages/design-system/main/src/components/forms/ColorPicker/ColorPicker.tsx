import type { InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ColorPicker.module.css';

export type ColorPickerProps = {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Show color preview */
  showPreview?: boolean;
  /** Callback when color changes */
  onColorChange?: (color: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'medium',
      fullWidth = false,
      showPreview = true,
      onColorChange,
      className = '',
      disabled,
      value = '#000000',
      onChange,
      ...props
    },
    ref
  ) => {
    const [colorValue, setColorValue] = useState((value as string) || '#000000');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setColorValue(newColor);
      onColorChange?.(newColor);
      onChange?.(e);
    };

    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const containerClassName = clsx(
      styles.container,
      fullWidth && styles.fullWidth
    );

    const wrapperClassName = clsx(
      styles.wrapper,
      sizeClass,
      error && styles.error,
      disabled && styles.disabled
    );

    const inputClassName = clsx(
      styles.colorInput,
      className
    );

    return (
      <div className={containerClassName}>
        {label && (
          <label className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={wrapperClassName}>
          {showPreview && (
            <div
              className={styles.preview}
              style={{ backgroundColor: colorValue }}
              aria-hidden="true"
            />
          )}
          <input
            ref={ref}
            type="color"
            className={inputClassName}
            disabled={disabled}
            value={colorValue}
            onChange={handleChange}
            {...props}
          />
          <input
            type="text"
            className={styles.textInput}
            value={colorValue}
            onChange={(e) => {
              const newColor = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(newColor)) {
                setColorValue(newColor);
                onColorChange?.(newColor);
              }
            }}
            disabled={disabled}
            placeholder="#000000"
          />
        </div>
        {(error ?? helperText) && (
          <p className={error ? styles.errorText : styles.helperText}>{error ?? helperText}</p>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
