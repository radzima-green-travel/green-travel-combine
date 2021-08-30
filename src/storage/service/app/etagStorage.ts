import {storage} from '../../Storage';
import {IBookmarksIds} from 'core/types';

export async function getEtagsFromStorage(): Promise<{
  [key: string]: string;
} | null> {
  const etags: Record<string, string> | null = await storage.get({key: 'etag'});
  return etags;
}

export async function setEtagsToStorage(
  etags: Record<string, string>,
): Promise<IBookmarksIds | null> {
  return storage.merge({key: 'etag', value: etags});
}
