import { Calculation } from "@entities/widgets/model";

export const calculationOptions = [
  {
    label: 'pages.widget.standard.calculation.options.last',
    value: Calculation.Last,
  },
  {
    label: 'pages.widget.standard.calculation.options.max',
    value: Calculation.Max,
  },
  {
    label: 'pages.widget.standard.calculation.options.min',
    value: Calculation.Min,
  },
  {
    label: 'pages.widget.standard.calculation.options.average',
    value: Calculation.Average,
  },
];