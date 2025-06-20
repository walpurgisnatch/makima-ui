import { gridScales } from './constants';
import dayjs from 'dayjs';

const getGridScaleOption = (period: number) => {
  const entry = gridScales.find((pair) => period === pair.period);
  return entry || gridScales[9];
};

const checkDateDifferences = (duration: number, timestamps: number[]) => {
  const parsed = timestamps.map((ts) => dayjs(ts));

  if (duration < 604800000) {
    // Для всего что меньше недели
    return new Set(parsed.map((d) => d.format('YYYY-MM-DD'))).size > 1;
  } else if (duration >= 604800000 && duration < 31536000000) {
    // От недели до года
    return new Set(parsed.map((d) => d.year())).size > 1;
  }
  return false;
};

export const generateGridData = (duration: number) => {
  const scaleOption = getGridScaleOption(duration);
  const from = dayjs().subtract(duration, 'ms').valueOf();
  const to = dayjs().valueOf();
  const ticks: number[] = [];

  for (let t = from; t <= to; t += scaleOption.step) {
    ticks.push(t);
  }

  const timeFormat = checkDateDifferences(duration, ticks) ? scaleOption.timeFormatBoundary : scaleOption.timeFormat;

  return { from, to, ticks, timeFormat: timeFormat };
};
