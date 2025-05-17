import React from 'react';
import { TooltipProps } from 'recharts';

import { Panel } from '@shared/ui';
import { formatDate } from '@shared/lib';
import { IChartOptions } from '../../../../../model/types';

import styles from './styles.module.scss';

interface IProps extends TooltipProps<number, string> {
  gradient?: string;
  chartOptions: IChartOptions[];
}

export const Tooltip: React.FC<IProps> = ({ active, payload, label, gradient, chartOptions }) => {
  if (active && payload && payload.length) {
    return (
      <Panel className={styles.tooltip_wrapper}>
        <span className={styles.xtext}>{formatDate(label, 'DD-MM-YYYY HH:mm:ss')}</span>
        {payload?.map((item) => {
          const match = item.dataKey?.toString().match(/\[(.*?)\]/);
          const inx = match && match.length >= 2 ? Number.parseInt(match[1]) : 0;
          if (item.hide) {
            return <></>;
          }
          return (
            <div key={item.name} className={styles.row}>
              <div className={styles.example} style={{ background: gradient || item.color }}></div>
              <span> {`${item.name}: `}</span>
              {item.payload.y[inx].converted}
              {chartOptions[inx].suffix}
            </div>
          );
        })}
      </Panel>
    );
  }
  return null;
};
