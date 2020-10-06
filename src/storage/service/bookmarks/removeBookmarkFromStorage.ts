import {storage} from '../../Storage';
import {IBookmarksIds} from 'core/types';
import {IAddToBookmarksSuccess} from 'core/reducers';

export async function removeBookmarkFromStorage({
  categoryId,
  objectId,
}: {
  categoryId: string;
  objectId: string;
}): Promise<IAddToBookmarksSuccess | null> {
  const prevValue: IBookmarksIds | null = await storage.get({key: 'bookmarks'});
  if (!prevValue || !prevValue[categoryId]) {
    return null;
  }

  const value = {
    [categoryId]: prevValue[categoryId].filter((id) => id !== objectId),
  };

  await storage.merge({key: 'bookmarks', value: value});

  return value;
}
