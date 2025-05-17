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

import { formatDate } from '@shared/lib';
import { Tooltip } from '../Tooltip';
import { generateGridData } from '../../lib/utilities';
import { LineStyle, ShowPoints, IChartOptions, IChartDataValue } from '../../../../../model/types';

interface LineChartProps {
  dataKeyNames: string[];
  dataXAxisKeyName: string;
  chartData: IChartDataValue[];
  chartOptions: IChartOptions[];
  duration: number;
  graph: { [key: string]: any };
  yAxisMin: number;
  yAxisMax: number | string;
  yAxisWidth: number;
  tickFormatter: (val: any) => string;
  isWidgetEdit: boolean;
  height?: number;
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
  isWidgetEdit,
  height = 400,
}: LineChartProps) => {
  const [activeDataNames, setActiveDataNames] = useState<Array<string>>(dataKeyNames);
  const [gridData, setGridData] = useState(generateGridData(duration));
  const [firstPoint, setFirstPoint] = useState(chartData[0].x);

  useEffect(() => {
    if (firstPoint !== chartData[0].x) {
      setGridData(generateGridData(duration));
      setFirstPoint(chartData[0].x);
    }
  }, [chartData, duration]);

  useEffect(() => {
    isWidgetEdit && setActiveDataNames(dataKeyNames);
  }, [isWidgetEdit, dataKeyNames]);

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
          tickFormatter={(data) => formatDate(data, gridData.timeFormat)}
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
        {chartOptions?.map((options, inx) => {
          const color = options.color;
          return (
            <>
              <defs key={`def-line-${dataKeyNames}-${options.id}`}>
                <linearGradient id={`line-${options.id}`} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={color} />
                  <stop offset='95%' stopColor={color} />
                </linearGradient>
              </defs>
              <Line
                key={`line-${dataKeyNames}-${options.id}`}
                dataKey={`y[${inx}].converted`}
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
            </>
          );
        })}
      </ReLineChart>
    </ResponsiveContainer>
  );
};
