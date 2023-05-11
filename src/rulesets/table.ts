import { Country } from '../api/countriesApi';

export type BreakOutPoints = 1150 | 1000 | 850 | 750 | 600 | 450;

export type ColDefinition = {
  text: string;
  prop: keyof Country;
  sortable?: boolean;
  filterable?: boolean;
  alwaysVisible?: boolean;
  width?: number;
  breakOutPoint?: BreakOutPoints;
};

export const columnDefinition: {
  [key in keyof Country]: ColDefinition;
} = {
  name: {
    text: 'Name',
    prop: 'name',
    width: 150,
    alwaysVisible: true,
    sortable: true,
    filterable: true,
  },
  capitalName: {
    text: 'Capital',
    prop: 'capitalName',
    width: 150,
    sortable: true,
    filterable: true,
    breakOutPoint: 450,
  },
  code: {
    text: 'Code',
    prop: 'code',
    width: 100,
    sortable: true,
    filterable: true,
    breakOutPoint: 1000,
  },
  flag: {
    text: 'Flag',
    prop: 'flag',
    width: 100,
    breakOutPoint: 750,
  },
  latLng: {
    text: 'Lat/Lng',
    prop: 'latLng',
    width: 100,
    breakOutPoint: 1150,
  },
  population: {
    text: 'Population',
    prop: 'population',
    width: 100,
    sortable: true,
    breakOutPoint: 850,
  },
  region: {
    text: 'Region',
    prop: 'region',
    width: 100,
    alwaysVisible: true,
    sortable: true,
    filterable: true,
  },

  subregion: {
    text: 'Sub-region',
    prop: 'subregion',
    width: 100,
    sortable: true,
    filterable: true,
    breakOutPoint: 600,
  },
};
