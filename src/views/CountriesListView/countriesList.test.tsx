import { act, fireEvent, render, screen } from '@testing-library/react';
import CountriesListView from '.';
import { getAllCountries } from '../../api/countriesApi';
import { Mock } from 'vitest';

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
];

type MockedFn = Mock<[], Promise<any>>;

vi.mock('../../api/countriesApi', () => ({
  getAllCountries: vi.fn(),
}));

describe('CountriesListView', () => {
  describe('Render Tests', () => {
    it('Should render the component', async () => {
      (getAllCountries as MockedFn).mockResolvedValueOnce([] as any);
      await act(() => {
        render(<CountriesListView />);
      });
      expect(screen.getByText('Countries List')).toBeInTheDocument();
    });
    it('Should render loading if no data', async () => {
      (getAllCountries as MockedFn).mockResolvedValueOnce([] as any);
      let wrapper: any;
      await act(() => {
        const { container } = render(<CountriesListView />);
        wrapper = container;
      });
      expect(wrapper.getElementsByClassName('spinner-container').length).toBe(
        1
      );
    });
    it('Should render Modal if item is clicked', async () => {
      vi.useFakeTimers();
      (getAllCountries as MockedFn).mockResolvedValueOnce(testData);
      let wrapper: any;
      await act(() => {
        const { container } = render(<CountriesListView />);
        wrapper = container;
      });
      const item = screen.getByText('Afghanistan');
      await act(async () => {
        fireEvent.mouseDown(item);
        await vi.advanceTimersByTime(4000);
      });
      expect(wrapper.getElementsByClassName('modal').length).toBe(1);
      vi.useRealTimers();
    });
  });
});
