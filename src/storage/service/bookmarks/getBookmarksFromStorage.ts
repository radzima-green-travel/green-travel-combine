import {storage} from '../../Storage';
import {IBookmarksIds} from 'core/types';

export function getBookmarksFromStorage(): Promise<IBookmarksIds | null> {
  return storage.get({key: 'bookmarks'});
}
