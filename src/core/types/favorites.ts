export type Favorites = {
  [objectId: string]: [boolean, number];
};

export type GetFavoritesResponse = {data: Favorites};

export type UpdateFavoritesBody = {
  status: boolean;
  timestamp: number;
};

export type BulkUpdateFavoritesBody = Favorites;
