import React, { useCallback, useMemo, useState } from 'react';

import { useChartType } from '@entities/widgets/lib';
import { Empty } from '@shared/ui';
import { LineChart } from './LineChart';
import { ChartStyles, ChartTypes, WidgetTypes, IChartOptions, IChartDataValue } from '../../../../model/types';

interface ChartProps {
  chartType?: ChartTypes[keyof ChartTypes];
  widgetType: WidgetTypes[keyof WidgetTypes];
  styles: ChartStyles;
  height?: number;
  width?: number;
  data: IChartDataValue[];
  duration: number;
  chartOptions: IChartOptions[];
  dataSize: number;
  dataXAxisKeyName: string;
  label: { x: string; y: string | string[] };
  isLinksRedirectApplicable: boolean;
  IsEditing: boolean;
}

export const Chart = ({
  chartType,
  widgetType,
  styles,
  height,
  data,
  duration,
  dataSize,
  dataXAxisKeyName,
  label,
  chartOptions,
  IsEditing,
}: ChartProps) => {
  let content = <div></div>;

  const [longestTickValue, setLongestTickValue] = useState('');

  const hasData = useMemo(() => data?.length, [data?.length]);

  const tickFormatter = (val: string) => {
    const formattedTick = String(val);
    if (longestTickValue.length < formattedTick.length) {
      setLongestTickValue(formattedTick);
    }
    return formattedTick;
  };
  const dataKeyNames = useMemo(() => chartOptions?.map((item) => item.title) || [], [chartOptions]);

  const type = useChartType(widgetType, chartType);

  const getYAxisTickLen = useCallback(() => {
    const extender = 10;
    const len = longestTickValue.length * extender;

    if (label.y && dataSize === 1) {
      return 65;
    } else if (label.y && dataSize > 1) {
      return len + 35;
    } else {
      return len;
    }
  }, [longestTickValue, label.y, dataSize]);

  if (type) {
    switch (type) {
      case ChartTypes.Line:
        content = (
          <LineChart
            dataKeyNames={dataKeyNames}
            chartOptions={chartOptions}
            dataXAxisKeyName={dataXAxisKeyName}
            chartData={data}
            duration={duration}
            graph={styles?.graph}
            height={height}
            yAxisMin={styles?.standard.scale.min || 'auto'}
            yAxisMax={styles?.standard.scale.max || 'auto'}
            yAxisWidth={getYAxisTickLen()}
            tickFormatter={tickFormatter}
            IsEditing={IsEditing}
          />
        );
        break;
      default:
        return <div></div>;
    }
  }

  return hasData ? content : <Empty />;
};

export default Chart;
