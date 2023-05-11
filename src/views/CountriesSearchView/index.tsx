import React, { useCallback, useState } from 'react';
import './styles.scss';
import { Title } from '../../components/Title';
import DropDown, { DropDownItem } from '../../components/DropDown';
import { Country, searchCountries } from '../../api/countriesApi';
import { useDebounce } from '../../hooks/useDebounce';
import ViewCountryProfile from '../../components/ViewCountryProfile';

const CountriesSearchView = () => {
  const [data, setData] = useState<DropDownItem[]>([]);
  const [detailsData, setDetailsData] = useState<Country>();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const fetchCountries = useCallback((value?: string) => {
    if (!value) {
      setData([]);
      setLoading(false);
      return;
    }
    searchCountries(value.toLowerCase()).then((countries) => {
      setData(
        countries.slice(0, 10).map((country: Country) => ({
          name: country.name,
          value: country.code,
          data: country,
        }))
      );
      setLoading(false);
    });
  }, []);

  const [handleInput] = useDebounce(fetchCountries, 700);

  return (
    <div className="countries-search-view">
      <Title size="big">Countries Search</Title>
      <DropDown
        kind="standard"
        selectedItem={null}
        items={data}
        placeholder="Search for a country"
        loading={loading}
        inputValue={value}
        onInput={(value) => {
          setData([]);
          setValue(value);
          setDetailsData(undefined);
          if (value) {
            setLoading(true);
          } else {
            setLoading(false);
          }
          handleInput(value);
        }}
        width="80%"
        onChange={(item: DropDownItem) => {
          setValue(item.name);
          setDetailsData(item.data);
        }}
      ></DropDown>
      {detailsData && (
        <div className="details-container">
          <ViewCountryProfile countryData={detailsData}></ViewCountryProfile>
        </div>
      )}
    </div>
  );
};

export default CountriesSearchView;
