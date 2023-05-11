import { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { TableContext } from '../CountriesTable/tableContext';

const PaginationContainer = styled.div`
  bottom: 10px;
  display: block;
  align-items: center;
  padding: 0 0.5rem;
`;

export default function Pagination() {
  const context = useContext(TableContext);
  const { currentPage, paginatedData, setCurrentPage } = context;
  const pageCount = paginatedData.length;
  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < pageCount - 1;

  return (
    <PaginationContainer>
      <Button onClick={() => setCurrentPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </Button>{' '}
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!canPreviousPage}
      >
        {'<'}
      </Button>{' '}
      <span>
        <strong>
          {currentPage + 1} / {pageCount}
        </strong>{' '}
      </span>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!canNextPage}
      >
        {'>'}
      </Button>{' '}
      <Button
        onClick={() => setCurrentPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {'>>'}
      </Button>{' '}
    </PaginationContainer>
  );
}
