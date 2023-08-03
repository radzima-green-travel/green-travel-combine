import {useCallback} from 'react';
import {updateService} from 'services/UpdateService';

export const useForceUpdate = () => {
  const onUpdate = useCallback(async () => {
    updateService.openApplicationMarketplace();
  }, []);

  return {
    onUpdate,
  };
};
