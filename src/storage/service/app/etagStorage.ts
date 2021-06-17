import {storage} from '../../Storage';
import {IBookmarksIds} from 'core/types';

export async function getEtagFromStorage(key: string): Promise<string | null> {
  const etags: {[key: string]: string} =
    (await storage.get({key: 'etag'})) || {};
  return etags[key] || null;
}

export async function setEtagToStorage({
  key,
  value,
}: {
  key: string;
  value: string;
}): Promise<IBookmarksIds | null> {
  const etags: {[key: string]: string} =
    (await storage.get({key: 'etag'})) || {};
  etags[key] = value;
  return storage.set({key: 'etag', value: etags});
}
