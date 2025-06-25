import React from 'react';
import { LegendProps } from 'recharts';

import { CalculationValues, IChartOptions } from '@entities/widgets/model';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';

import styles from './styles.module.scss';

interface LegendContentProps extends LegendProps {
  lineValues?: CalculationValues[] | null;
  chartOptions?: IChartOptions[];
  scroll?: RcTableProps<any>['scroll'];
}

export const LegendContent = (props: LegendContentProps) => {
  const { payload, onClick } = props;

  const clickHandler = ({ value }: Payload, e: any) => {
    e.stopPropagation();
    // @ts-ignore
    onClick && onClick(value);
  };

  return (
    <ul className={styles.wrapper} data-payload={payload?.length === 1}>
      {payload?.map((entry: Payload, index: number) => {
        return (
          <li
            key={`${index}-${entry.dataKey}`}
            role='button'
            style={{ color: !entry.inactive ? entry.color : 'var(--color-disabled-text)' }}
            onClick={(e) => clickHandler(entry, e)}
          >
            {entry.value}
          </li>
        );
      })}
    </ul>
  );
};
