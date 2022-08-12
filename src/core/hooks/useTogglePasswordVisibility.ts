import {useState} from 'react';
import {IconsNames} from 'atoms/Icon';

export function useTogglePasswordVisibility(rightIconName: IconsNames) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState(rightIconName);

  const handlePasswordVisibility = () => {
    rightIcon === 'eye' ? setRightIcon('eyeOff') : setRightIcon('eye');
    setPasswordVisibility(!passwordVisibility);
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
}
