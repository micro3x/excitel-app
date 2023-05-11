import { filterData, sortData, paginateData } from './helpers';

const testData = [
  {
    capitalName: 'Kabul',
    code: 'AFG',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
    latLng: [33.0, 65.0],
    name: 'Afghanistan',
    population: 40218234,
    region: 'Asia',
    subregion: 'Southern Asia',
  },
  {
    capitalName: 'Canberra',
    code: 'AUS',
    flag: 'https://flagcdn.com/au.svg',
    latLng: [-27.0, 133.0],
    name: 'Australia',
    population: 25687041,
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
  },
  {
    capitalName: 'Hamilton',
    code: 'BMU',
    flag: 'https://flagcdn.com/bm.svg',
    latLng: [32.33333333, -64.75],
    name: 'Bermuda',
    population: 63903,
    region: 'Americas',
    subregion: 'Northern America',
  },
  {
    capitalName: 'Thimphu',
    code: 'BTN',
    flag: 'https://flagcdn.com/bt.svg',
    latLng: [27.5, 90.5],
    name: 'Bhutan',
    population: 771612,
    region: 'Asia',
    subregion: 'Southern Asia',
  },
];

describe('Filter Data Tests', () => {
  it('Should filter data by name case insensitive', () => {
    const filteredData = filterData(
      [{ propName: 'name', query: 'G' }],
      testData
    );
    expect(filteredData.length).toBe(1);
  });

  it('Should filter data by name case sensitive', () => {
    const filteredData = filterData(
      [{ propName: 'name', query: 'G', caseSensitive: true }],
      testData
    );
    expect(filteredData.length).toBe(0);
  });

  it('Should filter data by name and capitalName', () => {
    const filteredData = filterData(
      [
        { propName: 'name', query: 'ta' },
        { propName: 'capitalName', query: 'a' },
      ],
      testData
    );
    expect(filteredData.length).toBe(1);
  });
});

describe('Sort Data Tests', () => {
  it('Should sort data by name', () => {
    const sortedData = sortData({ propName: 'name' }, testData);
    expect(sortedData[0].name).toBe('Afghanistan');
  });

  it('Should sort data desc by population', () => {
    const sortedData = sortData(
      { propName: 'population', descending: true },
      testData
    );
    expect(sortedData[0].population).toBe(40218234);
  });

});

describe('Paginate Data Tests', () => {
  it('Should paginate data when items are more then 1 page', () => {
    const paginatedData = paginateData(testData, testData.length - 1);
    expect(paginatedData.length).toBe(2);
  });
  it('Should Not paginate data when items are less or equal to 1 page', () => {
    const paginatedDataLess = paginateData(testData, testData.length + 1);
    expect(paginatedDataLess.length).toBe(1);
    const paginatedDataEqual = paginateData(testData, testData.length);
    expect(paginatedDataEqual.length).toBe(1);
  });
});
