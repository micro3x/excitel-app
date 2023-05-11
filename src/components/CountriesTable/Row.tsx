import React, { ReactNode, useCallback, useMemo } from 'react';
import { Country } from '../../api/countriesApi';
import { columnDefinition } from '../../rulesets/table';

export type RowProps = {
  data: Country;
  rowNumber: number;
  onMouseDown?: (e: any) => void;
  onMouseUp?: (e: any) => void;
};

export default function Row(props: RowProps) {
  const { data, rowNumber } = props;

  const renderFlag = useCallback((uri: string) => {
    return <img src={uri} alt="flag" width={50} height={30} />;
  }, []);

  const renderLatLng = useCallback((latLng: [number, number]) => {
    return (
      <>
        <div className="latLng">
          Latitude <b>{latLng[0]}</b>
        </div>
        <div className="latLng">
          Longitude <b>{latLng[1]}</b>
        </div>
      </>
    );
  }, []);

  const renderData = useCallback<
    (key: keyof Country, data: unknown) => ReactNode
  >((key: keyof Country, data: unknown) => {
    if (key === 'flag') {
      return renderFlag(data as string);
    }
    if (key === 'latLng') {
      return renderLatLng(data as [number, number]);
    }

    return data as string;
  }, []);

  const dataRow = useMemo<React.ReactNode[]>(() => {
    const output: React.ReactNode[] = [];
    for (const column in columnDefinition) {
      const definition =
        columnDefinition[column as keyof typeof columnDefinition];
      const width = definition.width ?? 100;
      output.push(
        <td
          key={column}
          className={`table-cell ${
            !definition.alwaysVisible
              ? `hide-on-${definition.breakOutPoint}`
              : ''
          }`}
          style={{
            minWidth: width,
            maxWidth: width * 1.5,
          }}
        >
          {renderData(definition.prop, data[definition.prop])}
        </td>
      );
    }

    return output;
  }, [data]);

  return (
    <tr
      className={`table-row ${
        rowNumber % 2 === 0 ? 'table-row-even' : 'table-row-odd'
      }`}
      onMouseDown={props?.onMouseDown}
      onMouseUp={props?.onMouseUp}
    >
      {dataRow}
    </tr>
  );
}
