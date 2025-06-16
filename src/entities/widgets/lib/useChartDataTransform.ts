import { useLocale } from '@shared/hooks';

import {
  IChartData,
  IChartOptions,
  TextAlign,
} from '../model';
import { FieldTypes, OrderTypes } from '../model';
import { TRecord } from '@entities/watchers';

export const useChartDataTransform = (
  widgetData: TRecord[],
): IChartData => {
  const { t } = useLocale();
  const options: IChartOptions[] = makeOptions();
  const values = makeValues(widgetData);
  const dataType = null;

  return { options, values, dataType }
}

const makeValues = (data: TRecord[]) => {
  return data.map(record => {
    return {
      x: (+record.timestamp - 2208988800) * 1000,
      y: [extractNumber(record.value)]
    }
  });
}

const makeOptions = () => {
  // @ts-ignore
  const options: IChartOptions = {};

  options.fraction = 2;
  options.fieldType = FieldTypes.Value;
  options.width = 450;
  options.align = TextAlign.Center;
  options.color = undefined;
  options.link = undefined;
  options.parseDateFormat = undefined;
  options.dateFormat = undefined;
  options.gradient = undefined;
  options.gradientMode = false;
  options.openNewWindow = false;
  options.sort = false;
  options.lineBreak = false;
  options.defaultSort = OrderTypes.Desc;
  options.max = 0;
  options.min = 0;
  options.title = 'new';
  options.suffix = '';

  return [options]
}

const extractNumber = (str: string | number) => {
  if (typeof str === 'number') return str;
  if (!str) return null;
  const match = str.replace(' ', '').match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
};