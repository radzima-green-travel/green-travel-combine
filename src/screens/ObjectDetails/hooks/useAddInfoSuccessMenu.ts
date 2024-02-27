import {useBottomMenu, useOnRequestSuccess} from 'core/hooks';
import {sendAddInfoEmailRequest} from 'core/reducers';

export const useAddInfoSuccessMenu = () => {
  const addInfoSuccessMenuProps = useBottomMenu();

  useOnRequestSuccess(sendAddInfoEmailRequest, () => {
    addInfoSuccessMenuProps.openMenu();
  });

  return addInfoSuccessMenuProps;
};
