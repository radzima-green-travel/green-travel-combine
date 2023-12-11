import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {addVisitedRequest} from 'core/reducers';
import {
  selectUserAuthorized,
  selectVisitedIdsFromVisited,
} from 'core/selectors';
import {useSnackbar} from 'atoms';
import {find, isEqual} from 'lodash';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';

export const useVisited = ({objectId}: {objectId: string}) => {
  const dispatch = useDispatch();
  const visitedIds = useSelector(selectVisitedIdsFromVisited);
  const isAuthorized = useSelector(selectUserAuthorized);
  const {t} = useTranslation('objectDetails');

  const {show: showVisited, ...snackBarPropsVisited} = useSnackbar();

  const isVisited = useMemo(
    () => (objectId ? find(visitedIds, id => isEqual(id, objectId)) : false),
    [visitedIds, objectId],
  );

  const markAsVisited = useCallback(() => {
    dispatch(
      addVisitedRequest({
        objectId,
        data: {timestamp: Date.now()},
      }),
    );
  }, []);

  const {loading: updateVisitedLoading} = useRequestLoading(addVisitedRequest);

  useOnRequestSuccess(addVisitedRequest, () =>
    showVisited({
      type: 'success',
      title: t('markedAsVisited'),
      timeoutMs: 1000,
    }),
  );

  return {
    isAuthorized,
    isVisited,
    markAsVisited,
    updateVisitedLoading,
    snackBarPropsVisited,
  };
};
