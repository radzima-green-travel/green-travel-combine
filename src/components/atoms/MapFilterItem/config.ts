import {MAP_PINS} from 'core/constants';
import {IconName} from 'components/atoms/Icon/types';

export const iconsConfig: {
  [key: string]: {
    name: IconName;
    width: number;
    height: number;
  };
} = {
  [MAP_PINS.BICYCLE_ROUTE]: {
    name: 'bike',
    width: 20,
    height: 20,
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
  [MAP_PINS.CASTLES]: {
    name: 'castles',
    width: 20,
    height: 20,
  },
  [MAP_PINS.MUSEUMS]: {
    name: 'museums',
    width: 20,
    height: 20,
  },
  [MAP_PINS.NATURE_MONUMENTS]: {
    name: 'natureMonuments',
    width: 20,
    height: 20,
  },
  [MAP_PINS.WAR_MONUMENTS]: {
    name: 'warMonuments',
    width: 20,
    height: 20,
  },
  [MAP_PINS.OTHER_MONUMENTS]: {
    name: 'otherMonuments',
    width: 20,
    height: 20,
  },
  [MAP_PINS.CAR_ROUTE]: {
    name: 'car',
    width: 20,
    height: 20,
  },
};
