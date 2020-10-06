import {storage} from '../../Storage';
import {IAddToBookmarksSuccess} from 'core/reducers';

export async function saveBookmarkToStorage({
  categoryId,
  objectId,
}: {
  categoryId: string;
  objectId: string;
}): Promise<IAddToBookmarksSuccess> {
  const prevValue = await storage.get({key: 'bookmarks'});
  const value =
    prevValue && prevValue[categoryId]
      ? {
          [categoryId]: [...prevValue[categoryId], objectId],
        }
      : {
          [categoryId]: [objectId],
        };
  await storage.merge({key: 'bookmarks', value: value});

  return value;
}
