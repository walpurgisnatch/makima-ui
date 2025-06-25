import { useCallback, useMemo } from 'react';
import _ from 'lodash';

import { Calculation, CalculationValues, IChartDataValue, IChartOptions } from '../../../../model/types';
import { findLastNonNullByKey } from './utilities';

export const useCalculation = (
  chartData: IChartDataValue[] | undefined,
  chartOptions: IChartOptions[] | undefined,
  calculations: Calculation[] | undefined
): CalculationValues[] => {
  const calculate = useCallback(
    (inx: number, data: IChartDataValue[]): CalculationValues => {
      const dataKeyName = `y[${inx}]`;
      return (
        calculations?.reduce((acc, calculation) => {
          switch (calculation) {
            case Calculation.Last:
              return { ...acc, [calculation]: _.last(data)?.y[inx] };
            case Calculation.LastNotNull:
              return { ...acc, [calculation]: findLastNonNullByKey(data, dataKeyName) };
            case Calculation.Min:
              return {
                ...acc,
                [calculation]: _.minBy(data, function (o) {
                  return _.get(o, dataKeyName);
                })?.y[inx],
              };
            case Calculation.Max:
              return {
                ...acc,
                [calculation]: _.maxBy(data, function (o) {
                  return _.get(o, dataKeyName);
                })?.y[inx],
              };
            default:
              return { ...acc, [calculation]: findLastNonNullByKey(data, dataKeyName) };
          }
        }, {}) || {}
      );
    },
    [calculations]
  );

  const res = useMemo(() => {
    if (chartOptions && chartData) {
      return chartOptions?.map((_, inx): CalculationValues => calculate(inx, chartData));
    }
    return [];
  }, [chartData, calculate, chartOptions]);

  return res;
};

export default useCalculation;
