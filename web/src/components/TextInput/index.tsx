import React from 'react';

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
      <label>{label}</label>
      <input type={type ? type : 'text'} />
    </div>
  );
};
