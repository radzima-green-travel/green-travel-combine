import {storage} from '../../Storage';

export async function getAllAppDataVersionFromStorage(): Promise<
  string | null
> {
  const version: string | null = await storage.get({
    key: 'allAppDataVersion',
  });
  return version;
}

export async function setAllAppDataVersionToStorage(
  version: string,
): Promise<void> {
  return storage.set({key: 'allAppDataVersion', value: version});
}
