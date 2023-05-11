import { act, fireEvent, render, screen } from '@testing-library/react';
import Pagination from '.';
import { Country } from '../../api/countriesApi';
import { TableContext, TableContextType } from '../CountriesTable/tableContext';

const testData: Country[] = [
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

const fakeContext = {
  paginatedData: [[...testData.slice(0, 2)], [...testData.slice(2, 4)]],
  sortOrder: {
    propName: 'name',
    descending: false,
  },
  filters: [],
  currentPage: 0,
  setData: vi.fn(),
  setCurrentPage: vi.fn(),
  setSortOrder: vi.fn(),
  setFilters: vi.fn(),
};

function renderWithFakeTableContext(context: TableContextType = fakeContext) {
  return render(
    <TableContext.Provider value={context}>
      <Pagination />
    </TableContext.Provider>
  );
}

describe('Pagination', () => {
  describe('Render Tests', () => {
    it('Should render the component', () => {
      const { container } = render(<Pagination />);
      expect(container.getElementsByTagName('button').length).toBe(4);
    });
    it('Should previous page button disabled when on last page', () => {
      renderWithFakeTableContext({
        ...fakeContext,
        currentPage: 0,
      });
      const prevPageButton = screen.getByText('<');
      const firstPageButton = screen.getByText('<<');

      expect(prevPageButton).toBeDisabled();
      expect(firstPageButton).toBeDisabled();
    });
    it('Should next page button disabled when on last page', () => {
      renderWithFakeTableContext({
        ...fakeContext,
        currentPage: 1,
      });
      const nextPageButton = screen.getByText('>');
      const lastPageButton = screen.getByText('>>');
      expect(nextPageButton).toBeDisabled();
      expect(lastPageButton).toBeDisabled();
    });
  });

  describe('Input Tests', () => {
    beforeEach(() => {
      fakeContext.setCurrentPage = vi.fn();
    });
    it('Next Should change the current page', () => {
      renderWithFakeTableContext();
      const nextPageButton = screen.getByText('>');
      act(() => {
        fireEvent.click(nextPageButton);
      });
      expect(fakeContext.setCurrentPage).toHaveBeenCalledWith(1);
    });
    it('Last Should change the current page', () => {
      renderWithFakeTableContext();
      const nextPageButton = screen.getByText('>>');
      act(() => {
        fireEvent.click(nextPageButton);
      });
      expect(fakeContext.setCurrentPage).toHaveBeenCalledWith(1);
    });
    it('Previous Should change the current page', () => {
      renderWithFakeTableContext({
        ...fakeContext,
        currentPage: 1,
      });
      const prevPageButton = screen.getByText('<');
      act(() => {
        fireEvent.click(prevPageButton);
      });
      expect(fakeContext.setCurrentPage).toHaveBeenCalledWith(0);
    });
    it('Previous Should change the current page', () => {
      renderWithFakeTableContext({
        ...fakeContext,
        currentPage: 1,
      });
      const prevPageButton = screen.getByText('<<');
      act(() => {
        fireEvent.click(prevPageButton);
      });
      expect(fakeContext.setCurrentPage).toHaveBeenCalledWith(0);
    });
  });
});
