import {useBottomMenu, useOnRequestSuccess} from 'core/hooks';
import {sendAddInfoEmailRequest} from 'core/reducers';

export const useAddInfoSuccessMenu = () => {
  const addInfoSuccessMenuProps = useBottomMenu();

  useOnRequestSuccess(sendAddInfoEmailRequest, (showSuccessMenu: boolean) => {
    if (showSuccessMenu) {
      addInfoSuccessMenuProps.openMenu();
    }
  });

  return addInfoSuccessMenuProps;
};
