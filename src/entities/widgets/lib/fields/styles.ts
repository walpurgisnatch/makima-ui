import { LineInterpolation, LineStyle, ShowPoints, WidgetTypes } from "@entities/widgets/model";
import { Fields, ISelect, RadioItem } from "@shared/types";

const widgetTypeOptions: ISelect[] = Object.values(WidgetTypes).map((item) => ({
  label: `widgets.fields.widget_type.${item.toLowerCase()}`,
  value: item,
}));

const interpolationOptions: ISelect[] = [
  {
    label: 'widgets.fields.styles.graph.interpolation.linear',
    value: LineInterpolation.Linear,
  },
  {
    label: 'widgets.fields.styles.graph.interpolation.monotone',
    value: LineInterpolation.Monotone,
  },
  {
    label: 'widgets.fields.styles.graph.interpolation.step',
    value: LineInterpolation.Step,
  },
  {
    label: 'widgets.fields.styles.graph.interpolation.step_after',
    value: LineInterpolation.StepAfter,
  },
  {
    label: 'widgets.fields.styles.graph.interpolation.step_before',
    value: LineInterpolation.StepBefore,
  },
];

const lineStyleOptions: RadioItem[] = [
  {
    name: `lineStyleOption${LineStyle.Solid}`,
    label: 'widgets.fields.styles.graph.line.solid',
    value: LineStyle.Solid,
  },
  {
    name: `lineStyleOption${LineStyle.Dash}`,
    label: 'widgets.fields.styles.graph.line.dash',
    value: LineStyle.Dash,
  },
];

const showPointsOptions: RadioItem[] = [
  {
    name: ShowPoints.Always,
    label: 'widgets.fields.styles.graph.points.yes',
    value: 'always',
  },
  {
    name: ShowPoints.Never,
    label: 'widgets.fields.styles.graph.points.no',
    value: 'never',
  },
];

export const styleFields: Fields = {
  widgetType: {
    label: 'widgets.fields.widget_type.name',
    name: 'widgetType',
    options: widgetTypeOptions,
    type: 'select',
  },
  interpolation: {
    label: 'widgets.fields.styles.graph.interpolation.name',
    name: 'styles.graph.interpolation',
    options: interpolationOptions,
    type: 'select',
  },
  line: {
    label: 'widgets.fields.styles.graph.line.name',
    name: 'styles.graph.line',
    options: lineStyleOptions,
    type: 'select',
  },
  point: {
    label: 'widgets.fields.styles.graph.points.name',
    name: 'styles.graph.points',
    options: showPointsOptions,
    type: 'select',
  },
  // opacity: {
  //   label: 'widgets.fields.styles.graph.opacity.name',
  //   name: 'styles.graph.opacity',
  //   rules: {},
  //   props: { min: 0, max: 1, step: 0.1, vertical: false },
  //   type: 'slider',
  // },
  // gridOpacity: {
  //   label: 'widgets.fields.styles.graph.grid_opacity.name',
  //   name: 'styles.graph.gridOpacity',
  //   rules: {},
  //   props: { min: 0, max: 1, step: 0.1, vertical: false },
  //   type: 'slider',
  // },
  // stroke: {
  //   label: 'widgets.fields.styles.graph.stroke.name',
  //   name: 'styles.graph.stroke',
  //   props: { min: 0, max: 1, step: 0.1, vertical: false },
  //   type: 'slider',
  // },
  // fontSize: {
  //   label: 'widgets.fields.styles.stat.font_size.name',
  //   name: 'styles.stat.fontSize',
  //   min: 1,
  //   max: 500,
  //   type: 'number',
  // },
};
