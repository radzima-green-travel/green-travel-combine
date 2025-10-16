export type ListMobileMetadata = {
  listMobileData?: {
    metadata?:
      | ({
          __typename: 'ObjectsMetadata';
          id: string;
          value?: string | null;
          createdAt: string;
          updatedAt: string;
          owner?: string | null;
        } | null)[]
      | null;
  };
};
