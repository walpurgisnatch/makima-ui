import { IField } from '@shared/types';
import { standardFields } from './standard';
import { styleFields } from './styles';

export const LineStandardFields: IField[] = [
  standardFields.chartType,
  styleFields.interpolation,
  standardFields.min,
  standardFields.max,
  standardFields.legend,
];

export const lineStyleFields: IField[] = [
  styleFields.line,
  styleFields.point,
  styleFields.stroke,
  styleFields.gridOpacity,
];
