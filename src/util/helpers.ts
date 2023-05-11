export type Filter = {
  propName: string;
  query: string;
  caseSensitive?: boolean;
};

export type Sorter = {
  propName: string;
  descending?: boolean;
  caseSensitive?: boolean;
};

// This function can only filter Strings
export function filterData(filters: Filter[], data: any[]) {
  return data.filter((item) => {
    let include = true;
    for (const filter of filters) {
      if (!include) break;
      const { propName, query, caseSensitive } = filter;
      const pattern = `.*${caseSensitive ? query : query.toLowerCase()}.*`;
      if (caseSensitive) {
        include = item[propName].match(pattern);
        continue;
      }
      include = item[propName].toLowerCase().match(pattern);
    }
    return include;
  });
}

// This function can only sort numbers and strings
export function sortData(params: Sorter, data: any[]) {
  const { propName, descending, caseSensitive } = params;
  const output = data.slice(0);
  return output.sort((a, b) => {
    if (typeof a[propName] === 'number' && typeof b[propName] === 'number')
      return descending ? b[propName] - a[propName] : a[propName] - b[propName];

    const aStr = caseSensitive
      ? a[propName].toString()
      : a[propName].toString().toLowerCase();
    const bStr = caseSensitive
      ? b[propName].toString()
      : b[propName].toString().toLowerCase();

    return descending ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
  });
}

export function paginateData(data: any[], pageSize: number) {
  const pages = Math.ceil(data.length / pageSize);
  const paginatedData = [];
  for (let i = 0; i < pages; i++) {
    const start = i * pageSize;
    const end = start + pageSize;
    paginatedData.push(data.slice(start, end));
  }
  return paginatedData;
}
