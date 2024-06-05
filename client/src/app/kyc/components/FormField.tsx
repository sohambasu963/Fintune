import React, { useState, useEffect } from 'react';
import Tooltip from "@/components/tooltip";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip: string;
}

export default function FormField({
  label,
  name,
  value,
  handleChange,
  tooltip,
}: FormFieldProps) {
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    if (value) {
      setDisplayValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.-]+/g, '');
    setDisplayValue(e.target.value);
    handleChange({
      ...e,
      target: {
        ...e.target,
        name: name,
        value: rawValue,
      },
    });
  };

  const handleBlur = () => {
    const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(displayValue.replace(/[^0-9.-]+/g, '')));
    setDisplayValue(formattedValue);
  };

  const handleFocus = () => {
    setDisplayValue(displayValue.replace(/[^0-9.-]+/g, ''));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-1">
        <label htmlFor={name} className="font-semibold text-gray-700">
          {label}
        </label>
        <Tooltip content={tooltip} />
      </div>
      <input
        type="text"
        id={name}
        name={name}
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="border px-4 py-2"
        required
      />
    </div>
  );
}