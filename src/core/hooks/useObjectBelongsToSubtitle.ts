import {head} from 'lodash';
import {useTransformedData} from './useTransformedData';

export function useObjectBelongsToSubtitle(
  objectsBelongsTo: string[] | undefined,
) {
  const {getObject} = useTransformedData();

  const belongsToObjectId = head(objectsBelongsTo);

  if (belongsToObjectId) {
    return getObject(belongsToObjectId)?.name || null;
  }
  return null;
}
