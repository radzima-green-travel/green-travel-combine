import React from 'react';
import { Button } from 'atoms';

interface SubmitButtonProps {
  label: string;
  submitting?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  testID: string;
}

export const SubmitButton = ({
  onPress: onSubmit,
  label,
  submitting,
  disabled,
  testID,
}: SubmitButtonProps) => {
  return (
    <Button
      onPress={onSubmit}
      theme="primary"
      testID={testID}
      text={label}
      loading={submitting}
      disabled={disabled}
    />
  );
};
