import React, { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  ReferenceLine,
} from 'recharts';

import useCalculation from '../../lib/useCalculation';
import { formatDate } from '@shared/lib';
import { Tooltip } from '../Tooltip';
import { generateGridData } from '../../lib/utilities';
import { LineStyle, ShowPoints, IChartOptions, IChartDataValue, ILegend } from '../../../../../model/types';
import { ChartLegend } from '../ChartLegend';

interface LineChartProps {
  dataKeyNames: string[];
  dataXAxisKeyName: string;
  chartData: IChartDataValue[];
  chartOptions: IChartOptions[];
  duration: number;
  graph: { [key: string]: any };
  yAxisMin: number | string;
  yAxisMax: number | string;
  yAxisWidth: number;
  tickFormatter: (val: any) => string;
  IsEditing: boolean;
  height?: number;
  legend?: ILegend;
}

export const LineChart = ({
  dataKeyNames,
  dataXAxisKeyName,
  chartData,
  chartOptions,
  duration,
  graph,
  yAxisMin,
  yAxisMax,
  yAxisWidth,
  tickFormatter,
  IsEditing,
  height = 400,
  legend
}: LineChartProps) => {
  const [activeDataNames, setActiveDataNames] = useState<Array<string>>(dataKeyNames);
  const [gridData, setGridData] = useState(generateGridData(duration));

  useEffect(() => {
    setGridData(generateGridData(duration));
  }, [chartData, duration]);

  useEffect(() => {
    IsEditing && setActiveDataNames(dataKeyNames);
  }, [IsEditing, dataKeyNames]);

  const handleLegendKeyNameClick = (selectedDataName: string) => {
    if (activeDataNames.length === dataKeyNames.length) {
      setActiveDataNames([selectedDataName]);
    } else if (activeDataNames.length === 1 && activeDataNames.includes(selectedDataName)) {
      setActiveDataNames(dataKeyNames);
    } else {
      setActiveDataNames((prev) =>
        prev.includes(selectedDataName) ? prev.filter((key) => key !== selectedDataName) : [...prev, selectedDataName]
      );
    }
  };

  return (
    <ResponsiveContainer width='100%' height={height}>
      <ReLineChart data={chartData} margin={{ top: 8, right: 50, left: 50, bottom: 16 }}>
        <CartesianGrid horizontal strokeDasharray='3 3' strokeOpacity={graph?.gridOpacity ?? 0.5} />
        <XAxis
          dataKey={dataXAxisKeyName}
          type='number'
          tick={{ fontSize: 12 }}
          domain={[gridData.from, gridData.to]}
          ticks={gridData.ticks}
          tickFormatter={(data) => formatDate(data, gridData.timeFormat, '-', false)}
        />
        {gridData.ticks.map((tick, inx) => (
          <ReferenceLine key={inx} x={tick} strokeDasharray='3 3' strokeOpacity={graph?.gridOpacity ?? 0.5} />
        ))}
        <YAxis
          type='number'
          domain={[yAxisMin, yAxisMax]}
          allowDataOverflow={true}
          tick={{ fontSize: 12, width: 80 }}
          tickSize={6}
          tickCount={5}
          unit={chartOptions?.[0]?.suffix || ''}
          tickFormatter={tickFormatter}
          width={yAxisWidth}
        />
        <ChartTooltip wrapperStyle={{ zIndex: 10 }} content={<Tooltip chartOptions={chartOptions} />} />
        {
          ChartLegend({
            legend,
            chartOptions,
            height,
            hasData: !!chartData?.length,
            // @ts-ignore
            onClick: handleLegendKeyNameClick,
          })
        }
        {chartOptions?.map((options, inx) => {
          const color = options.color;
          return (
            <Line
              key={`line-${dataKeyNames}-${options.id}`}
              dataKey={`y[${inx}]`}
              name={options.title}
              type={graph?.interpolation}
              strokeWidth={graph?.stroke}
              stroke={color}
              strokeDasharray={graph?.line === LineStyle.Dash ? '3 3' : ''}
              fill={graph?.gradient ? `url(#line-${options.id})` : color}
              fillOpacity={graph?.opacity}
              hide={!activeDataNames.includes(options.title)}
              dot={graph?.points === ShowPoints.Always}
              connectNulls
            />
          );
        })}
      </ReLineChart>
    </ResponsiveContainer>
  );
};
