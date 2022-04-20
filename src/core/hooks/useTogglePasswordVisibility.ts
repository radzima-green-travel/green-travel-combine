import {useState} from 'react';
import {IconsNames} from 'atoms/Icon';

export function useTogglePasswordVisibility(rightIconName: IconsNames) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState(rightIconName);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eyeOff');
      setPasswordVisibility(!passwordVisibility);
    } else {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
}
