import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {addVisitedObjectRequest} from 'core/reducers';
import {
  selectUserAuthorized,
  selectVisitedIdsFromVisited,
} from 'core/selectors';
import {useSnackbar} from 'atoms';
import {find, isEqual} from 'lodash';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';

export const useVisitedObject = ({objectId}: {objectId: string}) => {
  const dispatch = useDispatch();
  const visitedIds = useSelector(selectVisitedIdsFromVisited);
  const isAuthorized = useSelector(selectUserAuthorized);
  const {t} = useTranslation('objectDetails');

  const {show: showVisitedObjectSnackbar, ...snackBarPropsVisitedObject} =
    useSnackbar();

  const isVisited = useMemo(
    () => (objectId ? find(visitedIds, id => isEqual(id, objectId)) : false),
    [visitedIds, objectId],
  );

  const markAsVisited = useCallback(() => {
    if (isAuthorized) {
      dispatch(
        addVisitedObjectRequest({
          objectId,
          data: {timestamp: Date.now()},
        }),
      );
    }
  }, []);

  const {loading: addVisitedObjectLoading} =
    useRequestLoading(addVisitedObjectRequest);

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
