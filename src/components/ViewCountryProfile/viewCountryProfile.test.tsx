import { render, screen } from '@testing-library/react';
import { Country } from '../../api/countriesApi';
import ViewCountryProfile from '.';

const testData: Country = {
  capitalName: 'Kabul',
  code: 'AFG',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
  latLng: [33.0, 65.0],
  name: 'Afghanistan',
  population: 40218234,
  region: 'Asia',
  subregion: 'Southern Asia',
};

describe('ViewCountryProfile', () => {
  it('Should render all containers', () => {
    const { container } = render(<ViewCountryProfile countryData={testData} />);
    expect(
      container.getElementsByClassName('country-profile-container').length
    ).toBe(1);
    expect(container.getElementsByClassName('info-container').length).toBe(1);
    expect(container.getElementsByClassName('map-container').length).toBe(1);
  });

  it('Should render country info', () => {
    render(<ViewCountryProfile countryData={testData} />);
    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText(testData.capitalName)).toBeInTheDocument();
    expect(screen.getByText(testData.code)).toBeInTheDocument();
    expect(screen.getByText(testData.population)).toBeInTheDocument();
    expect(screen.getByText(testData.region)).toBeInTheDocument();
    expect(screen.getByText(testData.subregion)).toBeInTheDocument();
  });

  it('Should not render ignored data', () => {
    render(<ViewCountryProfile countryData={testData} />);
    expect(screen.queryByText(testData.flag)).not.toBeInTheDocument();
    expect(
      screen.queryByText(testData.latLng.join(''))
    ).not.toBeInTheDocument();
  });

  it('Should render title if no flag', () => {
    render(<ViewCountryProfile countryData={testData} noTitle={false} />);
    expect(screen.getByText('General Info')).toBeInTheDocument();
  });

  it('Should not render title if flag', () => {
    render(<ViewCountryProfile countryData={testData} noTitle={true} />);
    expect(screen.queryAllByAltText('General Info').length).toBe(0);
  });
});
