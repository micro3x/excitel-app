import React, { useEffect, useMemo, useState } from 'react';
import { Country } from '../../api/countriesApi';
import {
  Filter,
  Sorter,
  filterData,
  paginateData,
  sortData,
} from '../../util/helpers';

export type TableContextType = {
  paginatedData: Country[][];
  sortOrder: Sorter;
  filters: Filter[];
  currentPage: number;
  setData: (data: Country[]) => void;
  setCurrentPage: (page: number) => void;
  setSortOrder: (sort: Sorter) => void;
  setFilters: (filters: Filter[]) => void;
};

const defaultSort: Sorter = {
  propName: 'name',
  descending: false,
};

export const TableContext = React.createContext<TableContextType>({
  paginatedData: [],
  sortOrder: defaultSort,
  filters: [],
  currentPage: 0,
  setData: () => void 0,
  setCurrentPage: () => void 0,
  setSortOrder: () => void 0,
  setFilters: () => void 0,
});

const TableProvider: React.FC<{
  children: React.ReactNode;
  initialData: Country[];
}> = ({ children, initialData }) => {
  const [data, setData] = useState<Country[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sortOrder, setSortOrder] = useState<Sorter>(defaultSort);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sortedData = useMemo<Country[]>(() => {
    return sortData(sortOrder, data);
  }, [data, sortOrder]);

  const filteredData = useMemo<Country[]>(() => {
    return filterData(filters, sortedData);
  }, [sortedData, filters]);

  const paginatedData = useMemo<Country[][]>(() => {
    return paginateData(filteredData, 10);
  }, [filteredData]);

  useEffect(() => {
    if (paginatedData?.length && currentPage >= paginatedData.length) {
      setCurrentPage(paginatedData.length - 1);
    }
    if (paginatedData?.[currentPage]?.length < 1) {
      setCurrentPage(0);
    }
  }, [paginatedData, currentPage]);

  return (
    <TableContext.Provider
      value={{
        paginatedData,
        sortOrder,
        filters,
        currentPage,
        setData,
        setCurrentPage,
        setSortOrder,
        setFilters,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
