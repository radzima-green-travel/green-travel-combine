import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {addVisitedObjectRequest} from 'core/reducers';
import {selectUserAuthorized, selectVisitedIds} from 'core/selectors';
import {useSnackbar} from 'atoms';
import {includes} from 'lodash';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';

export const useVisitedObject = ({objectId}: {objectId: string}) => {
  const dispatch = useDispatch();
  const visitedIds = useSelector(selectVisitedIds);
  const isAuthorized = useSelector(selectUserAuthorized);
  const {t} = useTranslation('objectDetails');

  const {show: showVisitedObjectSnackbar, ...snackBarPropsVisitedObject} =
    useSnackbar();

  const isVisited = useMemo(
    () => includes(visitedIds, objectId),
    [visitedIds, objectId],
  );

  const markAsVisited = useCallback(() => {
    if (!isVisited && isAuthorized) {
      dispatch(
        addVisitedObjectRequest({
          objectId,
          data: {timestamp: Date.now()},
        }),
      );
    }
  }, [isVisited, isAuthorized]);

  const {loading: addVisitedObjectLoading} = useRequestLoading(
    addVisitedObjectRequest,
  );

  useOnRequestSuccess(addVisitedObjectRequest, () =>
    showVisitedObjectSnackbar({
      type: 'success',
      title: t('markedAsVisited'),
      timeoutMs: 1000,
    }),
  );

  return {
    isAuthorized,
    isVisited,
    markAsVisited,
    addVisitedObjectLoading,
    snackBarPropsVisitedObject,
  };
};
