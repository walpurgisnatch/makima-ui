import { Calculation, ChartTypes, Legend, LineInterpolation, LineStyle, ShowPoints, WidgetTypes } from "@entities/widgets";

export const initialValues = {
  dashboardName: '',
  title: '',
  description: '',
  widgetType: WidgetTypes.Graph,
  chartType: ChartTypes.Line,
  refreshTime: null,
  duration: null,
  data: {
    maxDataPoints: 100,
    queries: [
      {
        dataSourceName: '',
        json: '',
        codeQuery: '',
        disabled: false,
      },
    ],
  },

  styles: {
    graph: {
      opacity: 0.5,
      stroke: 0.5,
      gridOpacity: 0.5,
      gradient: true,
      line: LineStyle.Solid,
      points: ShowPoints.Never,
      interpolation: LineInterpolation.Monotone,
    },
    stat: {
      calculation: Calculation.Last,
      fontSize: undefined,
      unitFontSize: undefined,
      dataLinks: [],
    },
    standard: {
      scale: {
        min: 0,
        max: 0,
      },
      transparentBackground: false,
      legend: Legend.Bottom,
      legendWidth: 25,
      legendValues: [],
    },
  },
  overrides: {
    common: {
      useCustomUnits: false,
      commonUnits: 'none',
      fraction: 2,
      thresholds: [{ color: '#ffffffff', value: '' }],
      transformations: [],
    },
    items: [],
  },
}