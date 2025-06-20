import {
  Calculation,
  ChartTypes,
  Legend,
  LineInterpolation,
  LineStyle,
  ShowPoints,
  WidgetTypes,
} from '@entities/widgets';

export const initialValues = {
  dashboard: '',
  name: '',
  description: '',
  widgetType: WidgetTypes.Graph,
  chartType: ChartTypes.Line,
  refresh: 10000,
  duration: 86400000,
  watchers: [],
  styles: {
    graph: {
      stroke: 1,
      gridOpacity: 0.3,
      line: LineStyle.Solid,
      points: ShowPoints.Never,
      interpolation: LineInterpolation.Monotone,
    },
    stat: {
      calculation: Calculation.Last,
      fontSize: undefined,
    },
    standard: {
      scale: {
        min: 0,
        max: 0,
      },
      legend: Legend.Bottom,
    },
  },
};
