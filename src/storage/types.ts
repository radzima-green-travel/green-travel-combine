export type StorageOptions = {
  key?: StorageKeys;
  keys?: StorageKeys[];
  value?: any;
  cb?: (error: Error | null | undefined) => void;
};

export type StorageResponse = string | null | undefined;

export type StorageKeys = 'allAppDataVersion';
