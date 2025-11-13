import { useCallback, useState } from 'react';
import { IconsNames } from 'atoms/Icon';

export function useTogglePasswordHidden() {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const handlePasswordHidden = useCallback(() => {
    setPasswordHidden(prevPasswordHidden => !prevPasswordHidden);
  }, []);

  return {
    passwordHidden,
    rightIcon: (passwordHidden ? 'eye' : 'eyeOff') as IconsNames,
    handlePasswordHidden,
  };
}
