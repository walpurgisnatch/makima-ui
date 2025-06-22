import { TRecord } from '@entities/watchers';

export enum Legend {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export interface IWidget {
  id: string;
  dashboard: string;
  widgetType: WidgetTypes;
  width: number;
  height: number;
  order: number;
  chartId: string;
  chartType: ChartTypes;
  name: string;
  description?: string;
  refresh?: number;
  duration?: number;
  styles: ChartStyles;
  data?: TRecord[];
}

export type WidgetQueryData = {
  maxDataPoints: number;
  watchers: string[];
};

export interface IChartQueryProps {
  id: string;
  from: number;
  to: number;
  maxDataPoints: number;
  watchers: string[];
}

export interface IWidgetChartDataProps {
  id: string;
  data: IChartQueryProps;
}

export type DataLink = {
  title: string;
  url: string;
  openBlankTab: boolean;
};

export type ChartStyles = {
  graph: {
    opacity: number;
    stroke: number;
    gridOpacity: number;
    gradient: boolean;
    line: LineStyle;
    points: ShowPoints;
    interpolation: LineInterpolation;
  };
  standard: {
    scale: {
      min: number;
      max: number;
    };
    noValue?: string;
    legend: Legend;
    legendWidth: number;
    legendValues: Calculation[];
  };
};

export enum WidgetTypes {
  Graph = 'graph',
}

export enum ChartTypes {
  Line = 'line',
}

export enum Calculation {
  Last = 'last',
  LastNotNull = 'lastNotNull',
  Min = 'min',
  Max = 'max',
  Average = 'average',
}

export enum LineInterpolation {
  Linear = 'linear',
  Monotone = 'monotone',
  Step = 'step',
  StepAfter = 'stepAfter',
  StepBefore = 'stepBefore',
}

export enum LineStyle {
  Solid = 'solid',
  Dash = 'dash',
}

export enum ShowPoints {
  Always = 'always',
  Never = 'never',
}

export type ChartOptions = {
  dataKeyName: string[];
  dataSize: number;
  labels?: object;
  dataXAxisKeyName: string;
  dataYAxisKeyName?: string;
};

export const enum FETCH_STATUSES {
  Default = '',
  Success = 'fetchLinerSuccess',
  Error = 'fetchLinerError',
}

export enum FieldTypes {
  Value = 'value',
  Indicator = 'indicator',
}

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export interface IChartOptions {
  id: string;
  name: string;
  max?: number;
  min?: number;
  maxValue?: number;
  fraction?: number;
  suffix?: string;
  color?: string;
  title: string;
  width?: number | '';
  link?: string;
  openNewWindow?: boolean;
  parseDateFormat?: string;
  dateFormat?: string;
  defaultSort?: OrderTypes | null;
  lineBreak?: boolean;
  gradientMode?: boolean;
  gradient?: boolean;
  sort?: boolean;
  fieldType: FieldTypes;
  align: TextAlign;
}

export interface IChartValue {
  origin: number;
  converted: number;
  transformed: number | string;
}

export interface IChartDataValue {
  x: number;
  y: Array<number | null>;
}

export type CalculationValues = {
  [key in Calculation]?: number;
};

export enum OrderTypes {
  Asc = 'ascend',
  Desc = 'descend',
}

export enum WidgetDataTypes {
  NumFloat = '0',
  Character = '1',
  Log = '2',
}

export interface IChartData {
  options: IChartOptions[];
  values: IChartDataValue[];
  dataType: WidgetDataTypes | null | undefined;
}

export type TWidgetSize = {
  widget: string;
  width: number;
  height: number;
};

export interface ILegend {
  placement: Legend;
  width?: number;
  values?: Calculation[];
  units?: string;
}