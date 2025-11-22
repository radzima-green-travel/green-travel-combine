import { CardItem } from './common';

export type HomeSectionBarItem = {
  title: string;
  items: CardItem[];
  isCategoryItems: boolean;
  categoryId: string;
};

export type HomePageCategory = {
  id: string;
  name: string;
  icon: string;
  analyticsMetadata: {
    name: string;
    parentName: string | null;
  };
};

export type HomePagesCategories = {
  main: HomePageCategory[];
  routes: HomePageCategory[];
};
