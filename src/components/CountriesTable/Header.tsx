import React, { useContext, useMemo } from 'react';
import { columnDefinition } from '../../rulesets/table';
import { TableContext } from './tableContext';
import { ReactComponent as SortAsc } from '../../assets/sort-asc.svg';
import { ReactComponent as SortDesc } from '../../assets/sort-desc.svg';

export default function Header() {
  const { sortOrder, setSortOrder, filters, setFilters } =
    useContext(TableContext);

  const handleSort = (propName: string) => {
    const definition =
      columnDefinition[propName as keyof typeof columnDefinition];
    if (!definition.sortable) return;
    const desc =
      sortOrder.propName === propName ? !sortOrder.descending : false;
    setSortOrder({ propName, descending: desc });
  };

  const handleFilter = (propName: string, value: string) => {
    const filterIndex = filters.findIndex(
      (filter) => filter.propName === propName
    );
    if (filterIndex < 0) {
      setFilters([...filters, { propName, query: value }]);
      return;
    }
    filters[filterIndex].query = value;
    setFilters([...filters]);
  };

  const headerRow = useMemo<React.ReactNode[]>(() => {
    const output: React.ReactNode[] = [];
    for (const column in columnDefinition) {
      const definition =
        columnDefinition[column as keyof typeof columnDefinition];
      const isSorted = sortOrder.propName === column;
      output.push(
        <th
          key={`column-${column}`}
          className={`table-column  ${
            isSorted ? (sortOrder.descending ? 'sort-desc' : 'sort-asc') : ''
          } ${definition.sortable ? 'sortable' : ''}
          ${
            !definition.alwaysVisible
              ? `hide-on-${definition.breakOutPoint}`
              : ''
          }
          `}
        >
          <div onClick={() => handleSort(column)}>
            {definition.text}
            <span>
              {isSorted ? (
                sortOrder.descending ? (
                  <SortDesc />
                ) : (
                  <SortAsc />
                )
              ) : (
                ''
              )}
            </span>
          </div>
          {definition.filterable && (
            <div>
              <input
                style={{ maxWidth: definition.width ?? '80%' }}
                type="text"
                onChange={(e) => handleFilter(column, e.target.value)}
                placeholder={`Filter by ${definition.text}...`}
              />
            </div>
          )}
        </th>
      );
    }

    return output;
  }, [sortOrder, filters]);

  return <tr>{headerRow}</tr>;
}
