import React from 'react';
import { Title } from '../Title';
import './styles.scss';
import { Country } from '../../api/countriesApi';
import { columnDefinition } from '../../rulesets/table';

export type ViewCountryProfileProps = {
  countryData: Country;
  noTitle?: boolean;
};

const ignoreFields = ['flag', 'latLng'];

const ViewCountryProfile = (props: ViewCountryProfileProps) => {
  const { countryData, noTitle } = props;
  return (
    <div className="country-profile-container">
      <div className="country-profile-details">
        <div className="flag-container">
          <div className="flag-image">
            <img src={countryData.flag} alt="flag" style={{ width: '100%', border: '1px solid #ccc' }} />
          </div>
        </div>
        <div className="info-container">
          {!noTitle && <Title size="small">General Info</Title>}
          <ul>
            {Object.values(columnDefinition)
              .filter((col) => !ignoreFields.includes(col.prop))
              .map((item, index) => {
                const content = (
                  <span>
                    <b>{item.text}:</b> {countryData[item.prop]}
                  </span>
                );
                return <li key={index}>{content}</li>;
              })}
          </ul>
        </div>
        <div className="map-container">
          <iframe
            width="325"
            height="280"
            frameBorder="0"
            src={`https://www.bing.com/maps/embed?h=280&w=325&cp=${countryData.latLng[0]}~${countryData.latLng[1]}&lvl=6.68&typ=d&sty=h&src=SHELL&FORM=MBEDV8`}
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ViewCountryProfile;
