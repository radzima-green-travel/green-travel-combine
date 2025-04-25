import {navigationCallback} from 'core/actions/navigation';
import {useRouter} from 'expo-router';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export const useOnSuccessSignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSuccessSignIn = useCallback(() => {
    // Dismiss up to the first screen in the stack and then dismiss it too
    router.dismissAll();
    router.dismiss();
    dispatch(navigationCallback.meta.successAction('auth'));
  }, [router, dispatch]);

  return {
    onSuccessSignIn,
  };
};
