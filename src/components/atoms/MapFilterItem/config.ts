import {MAP_PINS} from 'core/constants';
import {IconsNames} from 'atoms/Icon/IconsNames';

export const iconsConfig: {
  [key: string]: {
    name: IconsNames;
    width: number;
    height: number;
  };
} = {
  [MAP_PINS.BICYCLE_ROUTE]: {
    name: 'bike',
    width: 23.6,
    height: 15.3,
  },
  [MAP_PINS.HISTORICAL_PLACE]: {
    name: 'church',
    width: 20,
    height: 20,
  },
  [MAP_PINS.WALKING_ROUTES]: {
    name: 'footprints',
    width: 20,
    height: 20,
  },
  [MAP_PINS.EXCURSION_PIN]: {
    name: 'flag',
    width: 20,
    height: 20,
  },
  [MAP_PINS.OBJECT]: {
    name: 'forest',
    width: 20,
    height: 20,
  },
  [MAP_PINS.WATER_ROUTE]: {
    name: 'wave',
    width: 20,
    height: 20,
  },
};
