import {SpotI18n} from 'core/types';

interface DefaultI18n {
  __typename: 'ObjectI18n';
  locale: string;
}

export type i18nType<T extends string> = {
  [key in T]: string | null;
} & DefaultI18n;

export interface AccommodationPlaceItem {
  id: string;
  objectId: string;
  name: string;
  googleMapLink: string;
  messengerLink: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  i18n: Array<i18nType<'name'>>;
}

export interface DinnerPlacesItem {
  id: string;
  objectId: string;
  name: string;
  googleMapLink: string;
  messengerLink: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  i18n: Array<i18nType<'name'>>;
}

export interface UpcomingEventsItem {
  id: string;
  objectId: string;
  name: string;
  link: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  i18n: Array<i18nType<'name'>>;
}
export interface RentingItem {
  id: string;
  objectId: string;
  rentingId: string;
  renting: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    i18n: Array<i18nType<'name'>>;
  };
  createdAt: string;
  updatedAt: string;
}
export interface ChildServicesItem {
  id: string;
  objectId: string;
  childServiceId: string;
  childService: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    i18n: Array<i18nType<'name'>>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IncludeItem {
  include: {
    id: string;
    category: {
      id: string;
      cover: string;
      name: string;
      i18n: Array<i18nType<'name'>>;
    };
  };
}

export interface BelongsToItem {
  belongsTo: {
    id: string;
    i18n: Array<i18nType<'name'>>;
    cover: string;
    name: string;
    category: {
      name: string;
      i18n: Array<i18nType<'name'>>;
    };
  };
}

export type ListMobileDataQueryObject = {
  __typename: 'ObjectMobile';
  id: string;
  name: string;
  description?: string | null;
  images?: Array<string | null> | null;
  status?: ObjectStatus | null;
  governanceType?: string | null;
  location?: {
    __typename: 'Location';
    lat?: number | null;
    lon?: number | null;
  } | null;
  area?: {
    __typename: 'Area';
    type: string;
    coordinates: Array<Array<Array<Array<number | null> | null> | null> | null>;
  } | null;
  cover?: string | null;
  blurhash?: string | null;
  categoryId: string;
  owner?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: string;
  updatedAt: string;
  statusUpdatedAt: string;
  point?: {
    __typename: 'Point';
    type: string;
    coordinates: Array<number | null>;
  } | null;
  author?: string | null;
  address?: string | null;
  addresses?: {
    items: Array<{
      street: string | null;
      regionId: string | null;
      subRegionId: string | null;
      municipalityId: string | null;
      region: {i18n?: SpotI18n; value: string} | null;
      subRegion: {i18n?: SpotI18n; value: string} | null;
      municipality: {i18n?: SpotI18n; value: string} | null;
    }> | null;
  } | null;
  length?: number | null;
  duration?: number | null;
  origins?: Array<{
    __typename: 'Origin';
    name: string;
    value: string;
  } | null> | null;
  notes?: string | null;
  url?: string | null;
  phoneNumber?: string[] | null;
  workingHours?: string | null;
  attendanceTime?: number | null;
  renting: {items: RentingItem[]};
  childServices: {items: ChildServicesItem[]};
  calculatedProperties?: {
    averageRating: number;
    averageSpentTime: number;
    createdAt: string;
    id: string;
    objectId: string;
    totalRatings: number;
    totalSpentTimes: number;
    totalVisits: number;
    updatedAt: string;
  };
  googleRating: number | null;
  googleRatingsTotal: number | null;
  routes?: {
    __typename: 'Route';
    type: string;
    coordinates: Array<Array<number | null> | null>;
  } | null;
  include: {items: IncludeItem[]};
  belongsTo?: {items: BelongsToItem[]};
  i18n: Array<i18nType<'name' | 'description'>>;
  upcomingEvents: {
    items: UpcomingEventsItem[];
  };
  accommodationPlace: {
    items: AccommodationPlaceItem[];
  };
  dinnerPlaces: {
    items: DinnerPlacesItem[];
  };
  category?: {
    __typename: 'Category';
    id: string;
    name: string;
    singularName: string;
    icon?: string | null;
    createdAt: string;
    updatedAt: string;
    completenessFields: Array<string> | null;
    owner?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
    fields?: Array<string | null> | null;
    parent?: string | null;
    cover?: string | null;
    index?: number | null;
    i18n?: Array<{
      __typename: 'CategoryI18n';
      locale: string;
      name?: string | null;
      singularName?: string | null;
    } | null> | null;
  } | null;
  permissions?: {
    __typename: 'ModelPermissionLinkingConnection';
    items?: Array<{
      __typename: 'PermissionLinking';
      id: string;
      objectId: string;
      permissionId: string;
      createdAt: string;
      updatedAt: string;
      permission: {
        __typename: 'Permission';
        id: string;
        name: string;
        key?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
        createdBy?: string | null;
        updatedBy?: string | null;
      };
      object: {
        __typename: 'Object';
        id: string;
        name: string;
        description?: string | null;
        images?: Array<string | null> | null;
        status?: ObjectStatus | null;
        governanceType?: string | null;
        cover?: string | null;
        categoryId: string;
        owner?: string | null;
        createdBy?: string | null;
        updatedBy?: string | null;
        createdAt: string;
        updatedAt: string;
        statusUpdatedAt: string;
        author?: string | null;
        address?: string | null;
        length?: number | null;
        duration?: number | null;
        notes?: string | null;
        url?: string | null;
      };
      owner?: string | null;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type ListMobileDataQuery = {
  listMobileData?: {
    __typename: 'MobileData';
    categories?: Array<{
      __typename: 'Category';
      id: string;
      name: string;
      singularName: string;
      completenessFields: Array<string> | null;
      icon?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
      createdBy?: string | null;
      updatedBy?: string | null;
      fields?: Array<string | null> | null;
      parent?: string | null;
      cover?: string | null;
      blurhash?: string | null;
      index?: number | null;
      i18n?: Array<{
        __typename: 'CategoryI18n';
        locale: string;
        name?: string | null;
        singularName?: string | null;
      } | null> | null;
    } | null> | null;
    objects?: {
      __typename: 'ObjectMobileConnection';
      items?: Array<ListMobileDataQueryObject | null> | null;
      nextToken?: string | null;
      total?: number | null;
    } | null;
    metadata?: Array<{
      __typename: 'ObjectsMetadata';
      id: string;
      value?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null> | null;
    spots?: Array<{id: string; value: string} | null>;
  } | null;
};

export const enum ObjectStatus {
  draft = 'draft',
  archived = 'archived',
  pending = 'pending',
  published = 'published',
}

export interface QueryParams {
  limit: number;
  nextToken: string;
  filter: {
    parent?: {
      eq?: string;
    };
    categoryId?: {
      eq?: string;
    };
  };
  sort: {
    direction?: 'asc' | 'desc';
    field?: string;
  };
  from: number;
}

export type ObjectsListQueryParams = Pick<
  QueryParams,
  'limit' | 'filter' | 'nextToken' | 'sort'
>;

export type CategoriesListQueryParams = Partial<
  Pick<QueryParams, 'limit' | 'filter' | 'nextToken' | 'sort'>
>;

export type AppMapObjectsQueryParams = Pick<QueryParams, 'limit' | 'from'>;
