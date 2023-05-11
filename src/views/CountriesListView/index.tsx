import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Country, getAllCountries } from '../../api/countriesApi';
import CountriesTable from '../../components/CountriesTable';
import Pagination from '../../components/PaginationControls';
import TableProvider from '../../components/CountriesTable/tableContext';
import { Title } from '../../components/Title';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal/Modal';
import ViewCountryProfile from '../../components/ViewCountryProfile';

const CountriesListView = () => {
  const [tableData, setTableData] = useState<Country[]>([]);
  const [detailsData, setDetailsData] = useState<Country | null>(null);

  useEffect(() => {
    getAllCountries().then((res) => {
      setTableData(res);
    });
  }, []);

  return (
    <div className="CountriesListView">
      <Title size="big">Countries List</Title>
      <TableProvider initialData={tableData}>
        <Spinner show={!tableData.length}>
          <>
            <CountriesTable onItemShow={setDetailsData} />
            <Pagination />
          </>
        </Spinner>
      </TableProvider>
      {detailsData && (
        <Modal
          titleText={detailsData.name}
          show={detailsData !== null}
          onClose={() => setDetailsData(null)}
        >
          <ViewCountryProfile countryData={detailsData} />
        </Modal>
      )}
    </div>
  );
};

export default CountriesListView;
