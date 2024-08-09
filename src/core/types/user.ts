export type Bookmarks = {
  [objectId: string]: [boolean, number];
};

export type GetBookmarksResponse = {data: Bookmarks};

export type UpdateBookmarksBody = {
  status: boolean;
  timestamp: number;
};

export type BulkUpdateBookmarksBody = Bookmarks;
