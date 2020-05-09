import React from 'react';

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
  hideLabel?: boolean;
}

export const Checkbox: React.FC<Props> = ({
  label,
  checked,
  onChange,
  hideLabel,
}) => {
  const checkboxId = Math.random().toString();

  return (
    <div>
      <label htmlFor={checkboxId} className={hideLabel ? 'hidden' : undefined}>
        {label}
      </label>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
