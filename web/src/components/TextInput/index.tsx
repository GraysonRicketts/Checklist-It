import React, { ChangeEvent } from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
  type?: 'email' | 'search' | 'password' | 'text';
}

export const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  hideLabel,
  type,
}) => {
  return (
    <div>
      <label className={hideLabel ? 'hidden' : undefined}>{label}</label>
      <input
        type={type ? type : 'text'}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const cleanValue = e.target.value;
          onChange(cleanValue);
        }}
      />
    </div>
  );
};
