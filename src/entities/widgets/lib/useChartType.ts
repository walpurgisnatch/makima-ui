import { useMemo } from 'react';
import { ChartTypes, WidgetTypes } from '../model';

export const useChartType = (
  widgetType: WidgetTypes[keyof WidgetTypes],
  chartType?: ChartTypes[keyof ChartTypes]
): WidgetTypes[keyof WidgetTypes] | ChartTypes[keyof ChartTypes] => {
  return useMemo(() => {
    if (!widgetType || widgetType === WidgetTypes.Graph) {
      return chartType!;
    }
    return widgetType;
  }, [chartType, widgetType]);
};
