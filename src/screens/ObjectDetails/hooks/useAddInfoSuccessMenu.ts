import { useBottomMenu, useOnRequestSuccess } from 'core/hooks';
import { sendAddInfoEmailRequest } from 'core/actions';

export const useAddInfoSuccessMenu = () => {
  const addInfoSuccessMenuProps = useBottomMenu();

  useOnRequestSuccess(sendAddInfoEmailRequest, (showSuccessMenu: boolean) => {
    if (showSuccessMenu) {
      addInfoSuccessMenuProps.openMenu();
    }
  });

  return addInfoSuccessMenuProps;
};
