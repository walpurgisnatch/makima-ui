import React, { useMemo } from 'react';
import { Legend, LegendProps } from 'recharts';

import { LegendContent } from './LegendContent';
import {
  CalculationValues,
  IChartOptions,
  ILegend,
  Legend as LegendType,
} from '@entities/widgets';
import { useLegendStyles } from '../../lib/useLegendStyles';

interface ChartLegendProps extends LegendProps {
  hasData?: boolean;
  chartOptions?: IChartOptions[];
  legend?: ILegend;
  calculations: CalculationValues[];
}

export const ChartLegend = ({ chartOptions, legend, hasData, onClick }: ChartLegendProps) => {
  const { styles: legendStyles, settings: legendSettings } = useLegendStyles(legend);
  const width = useMemo(() => {
    if (legend?.width) {
      const limit = legend?.placement === LegendType.Left || legend?.placement === LegendType.Right ? 90 : 100;
      return `calc(${legend?.width < limit ? legend?.width : limit}% - 100px)`;
    } else {
      return '0';
    }
  }, [legend?.placement, legend?.width]);

  const wrapperStyle = useMemo(() => ({ ...legendStyles, overflowY: hasData ? 'auto' : 'hidden' }), [legendStyles, hasData]);

  if (!legend?.placement) {
    return <></>;
  }

  return (
    // @ts-ignore
    <Legend
      wrapperStyle={wrapperStyle}
      width={width}
      layout={legendSettings?.position}
      verticalAlign={legendSettings?.verticalAlign}
      align={legendSettings?.align}
      content={
        <LegendContent
          chartOptions={chartOptions ?? []}
        />
      }
      onClick={onClick}
    />
  );
};
