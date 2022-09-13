import {storage} from '../../Storage';

export async function getEtagsFromStorage(): Promise<{
  [key: string]: string;
} | null> {
  const etags: Record<string, string> | null = await storage.get({key: 'etag'});
  return etags;
}

export async function setEtagsToStorage(
  etags: Record<string, string>,
): Promise<{
  [key: string]: string;
} | null> {
  return storage.merge({key: 'etag', value: etags});
}

export async function resetEtagsStorage(): Promise<{
  [key: string]: string;
} | null> {
  return storage.remove({key: 'etag'});
}
