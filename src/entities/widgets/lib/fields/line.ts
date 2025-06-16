import { IField } from '@shared/types';
import { standardFields } from './standard';
import { styleFields } from './styles';

export const LineStandardFields: IField[] = [
  standardFields.chartType,
  standardFields.min,
  standardFields.max,
  standardFields.legend,
];

export const lineStyleFields: IField[] = [
  styleFields.interpolation,
  styleFields.line,
  styleFields.point,
  // styleFields.opacity,
  // styleFields.stroke,
  // styleFields.gridOpacity,
];
