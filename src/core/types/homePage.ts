import {CardItem} from './common';

export type HomeSectionBarItem = {
  title: string;
  items: Array<CardItem>;
  isCategoryItems: boolean;
  categoryId: string;
};
