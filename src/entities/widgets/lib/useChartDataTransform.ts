import { TRecord } from '@entities/watchers';
import { IChartData, IChartOptions } from '../model';
import { OrderTypes } from '../model';

type TChartData = {
  watcher: string;
  records: TRecord[];
};

export const useChartDataTransform = (widgetData: TChartData[]): IChartData => {
  const options: IChartOptions[] = makeOptions(widgetData);
  const values = makeValues(widgetData);
  const dataType = null;

  return { options, values, dataType };
};

const makeValues = (data: TChartData[]) => {
  const temp: { [key: number]: any } = {};
  const result = [];
  const dataLength = data.length;
  data.forEach((watcher, index) => {
    watcher.records.forEach((record) => {
      const x = (+record.timestamp - 2208988800) * 1000;
      const y = extractNumber(record.value);

      if (!temp[x]) {
        const newArray = Array(dataLength);
        newArray[index] = y;
        temp[x] = newArray;
      } else {
        temp[x][index] = y;
      }
    });
  });
  for (const [key, value] of Object.entries(temp)) {
    result.push({ x: +key, y: value });
  }
  return result.sort((a, b) => a.x - b.x);
};

const makeOptions = (widgetData: any) => {
  // @ts-ignore
  const options = widgetData.map((watcher, index) => {
    return {
      id: index,
      fraction: 2,
      width: 450,
      color: undefined,
      link: undefined,
      parseDateFormat: undefined,
      dateFormat: undefined,
      gradient: undefined,
      gradientMode: false,
      openNewWindow: false,
      sort: false,
      lineBreak: false,
      defaultSort: OrderTypes.Desc,
      max: 0,
      min: 0,
      title: watcher.watcher,
      suffix: '',
    };
  });

  return options;
};

const extractNumber = (str: string | number) => {
  if (typeof str === 'number') return str;
  if (!str) return null;
  const match = str.replace(' ', '').match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
};
