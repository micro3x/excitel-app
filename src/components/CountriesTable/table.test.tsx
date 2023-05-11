import { render, screen, fireEvent, act } from '@testing-library/react';
import CountriesTable from '.';
import TableProvider, { TableContext } from './tableContext';
import { Country } from '../../api/countriesApi';

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

function renderWithTableContext() {
  return render(
    <TableProvider initialData={testData}>
      <CountriesTable onItemShow={itemShow} />
    </TableProvider>
  );
}

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

const itemShow = vi.fn();

function renderWithFakeTableContext() {
  return render(
    <TableContext.Provider value={fakeContext}>
      <CountriesTable onItemShow={itemShow} />
    </TableContext.Provider>
  );
}

describe('CountriesTable', () => {
  describe('Render Tests', () => {
    it('Should render the component', () => {
      const { container } = render(<CountriesTable onItemShow={itemShow} />);
      expect(container.getElementsByClassName('tableWrap').length).toBe(1);
    });

    it('should render the table header', () => {
      render(<CountriesTable onItemShow={itemShow} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Population')).toBeInTheDocument();
      expect(screen.getByText('Region')).toBeInTheDocument();
      expect(screen.getByText('Capital')).toBeInTheDocument();
    });

    it('should render the table rows', () => {
      renderWithTableContext();
      expect(screen.getAllByRole('row').length).toBe(testData.length + 1);
    });
  });

  describe('Input Tests', () => {
    it('should render the filter inputs', () => {
      renderWithFakeTableContext();
      expect(
        screen.getByPlaceholderText('Filter by Name...')
      ).toBeInTheDocument();
    });

    it('should call filterData on input change', () => {
      renderWithFakeTableContext();
      const input = screen.getByPlaceholderText('Filter by Name...');
      fireEvent.change(input, { target: { value: '23' } });
      expect(fakeContext.setFilters).toHaveBeenCalled();
    });

    it('should call sortData on header click', () => {
      renderWithFakeTableContext();
      const input = screen.getByText('Name');
      fireEvent.click(input);
      expect(fakeContext.setSortOrder).toHaveBeenCalled();
    });
  });

  describe('Row Actions Tests', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });
    it('should show loader on row mouse down', () => {
      const { container } = renderWithFakeTableContext();
      const row = screen.getAllByRole('row')[1];
      fireEvent.mouseDown(row);
      act(() => {
        vi.advanceTimersByTime(50);
      });
      const loader = container.getElementsByClassName('loader')[0];
      expect(loader).toBeInTheDocument();
    });

    it('should not show loader on row mouse up', () => {
      const { container } = renderWithFakeTableContext();
      const row = screen.getAllByRole('row')[1];
      fireEvent.mouseDown(row);
      act(() => {
        vi.advanceTimersByTime(50);
      });
      fireEvent.mouseUp(row);
      expect(container.getElementsByClassName('loader').length).toBeLessThan(1);
    });

    it('should not call onItemShow before timeout', () => {
      renderWithFakeTableContext();
      const row = screen.getAllByRole('row')[1];
      fireEvent.mouseDown(row);
      act(() => {
        vi.advanceTimersByTimeAsync(1000);
      });
      expect(itemShow).not.toHaveBeenCalled();
    });

    it('should call onItemShow on row click', async () => {
      renderWithFakeTableContext();
      const row = screen.getAllByRole('row')[1];
      fireEvent.mouseDown(row);
      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });
      expect(itemShow).toBeCalledTimes(2);
    });
  });
});
