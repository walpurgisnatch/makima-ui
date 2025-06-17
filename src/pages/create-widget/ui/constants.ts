import { Calculation, ChartTypes, Legend, LineInterpolation, LineStyle, ShowPoints, WidgetTypes } from "@entities/widgets";

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
      opacity: 0.5,
      stroke: 0.5,
      gridOpacity: 0.5,
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
}