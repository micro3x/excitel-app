import React, { useCallback, useContext, useState } from 'react';
import './styles.scss';
import { Country } from '../../api/countriesApi';
import { TableContext } from './tableContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useTimer } from '../../hooks/useTimer';
import StyledTable from './StyledTable';
import Header from './Header';
import Row from './Row';
import Loader from '../Loader';

export type CountriesTableProps = {
  onItemShow: (item: Country) => void;
};

const clickDelay = 1000;
const animInterval = 20;

export default function CountriesTable(props: CountriesTableProps) {
  const { paginatedData, currentPage } = useContext(TableContext);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const { onItemShow } = props;

  const [debouncedClick, abort] = useDebounce((data) => {
    onItemShow(data as Country);
  }, clickDelay);

  const [animStart, animStop] = useTimer((elapsedTime) => {
    const percent = (elapsedTime * 100) / clickDelay;
    setLoaderPercent(percent);
  }, animInterval);

  const handleRowClick = useCallback((data: Country) => {
    animStart();
    debouncedClick(data).then(() => {
      animStop();
      setLoaderPercent(0);
    });
  }, []);

  const handleAbortClick = useCallback(() => {
    abort();
    animStop();
    setLoaderPercent(0);
  }, []);

  return (
    <StyledTable>
      <div className="tableWrap">
        <table>
          <thead className="table-header">
            <Header />
          </thead>
          <tbody>
            {paginatedData[currentPage]?.map((data, rowNumber) => (
              <Row
                key={`rowNumber${rowNumber}`}
                data={data}
                rowNumber={rowNumber}
                onMouseDown={() => handleRowClick(data)}
                onMouseUp={() => handleAbortClick()}
              />
            ))}
            {paginatedData[currentPage]?.length < 1 && <div>No data</div>}
          </tbody>
        </table>
        <Loader percent={loaderPercent} show={loaderPercent > 0} />
      </div>
    </StyledTable>
  );
}
