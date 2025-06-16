import { ChartTypes, Legend } from "@entities/widgets/model";
import { Fields, ISelect } from "@shared/types";
import { calculationOptions } from "./shared";

const chartTypeOptions: ISelect[] = Object.values(ChartTypes).map((item) => ({
  label: `widgets.fields.chart_type.${item.toLowerCase()}`,
  value: item,
}));

const legendPlacementOptions: ISelect[] = [
  {
    label: 'widgets.fields.standard.legend.options.no',
    value: false,
  },
  {
    label: 'widgets.fields.standard.legend.options.top',
    value: Legend.Top,
  },
  {
    label: 'widgets.fields.standard.legend.options.bottom',
    value: Legend.Bottom,
  },
  {
    label: 'widgets.fields.standard.legend.options.left',
    value: Legend.Left,
  },
  {
    label: 'widgets.fields.standard.legend.options.right',
    value: Legend.Right,
  },
];

export const standardFields: Fields = {
  chartType: {
    label: 'widgets.fields.chart_type.name',
    name: 'chartType',
    options: chartTypeOptions,
    type: 'select',
  },
  calculation: {
    label: 'widgets.fields.standard.calculation.name',
    name: 'styles.calculation',
    options: calculationOptions,
    helpText: 'widgets.fields.styles.calculation.help',
    type: 'select',
  },
  min: {
    label: 'widgets.fields.standard.scale.min',
    name: 'styles.standard.scale.min',
    placeholder: 'auto',
    type: 'number',
  },
  max: {
    label: 'widgets.fields.standard.scale.max',
    name: 'styles.standard.scale.max',
    placeholder: 'auto',
    type: 'number',
  },
  legend: {
    label: 'widgets.fields.standard.legend.name',
    name: 'styles.standard.legend',
    options: legendPlacementOptions,
    type: 'select',
  }
}