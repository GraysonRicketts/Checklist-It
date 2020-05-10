import React from 'react';
import cn from 'classnames';
import { TextInput } from '../TextInput';
import { Checkbox } from '../Checkbox';

interface TaskRowProp {
  text: string;
  onChangeText: (value: string) => void;
  isChecked?: boolean;
  onChecked?: () => void;
}

export const TaskRow: React.FC<TaskRowProp> = ({
  isChecked,
  text,
  onChecked,
  onChangeText,
}) => {
  return (
    <div className={cn('flex', 'flexColumn')}>
      <div className={cn('flex', 'aiCenter')}>
        {isChecked !== undefined && onChecked ? (
          <Checkbox
            hideLabel
            label="is task completed"
            checked={isChecked}
            onChange={onChecked}
          />
        ) : undefined}
        <TextInput
          hideLabel
          label="task input"
          value={text}
          onChange={onChangeText}
        />
      </div>
    </div>
  );
};
