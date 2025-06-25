import { useMemo } from 'react';

import { ILegend, Legend as LegendType } from '@entities/widgets/model';

export const useLegendStyles = (legend: ILegend | undefined) => {
  const legendLayout = useMemo(() => {
    if (!legend) {
      return {};
    }

    let settings: {
      verticalAlign: string;
      align: string;
      position: string;
    } = {
      verticalAlign: '',
      align: '',
      position: '',
    };

    let styles: {
      top?: number;
      left?: number;
      width?: number | string;
      right?: number;
      bottom?: number;
      paddingLeft?: number;
      maxHeight?: string;
      minHeight?: string;
      maxWidth?: string;
      zIndex?: number;
    } = {};

    switch (legend.placement) {
      case LegendType.Top:
        settings = { ...settings, verticalAlign: 'top', align: 'center', position: 'horizontal' };
        styles = {
          ...styles,
          top: 0,
          left: 8,
          paddingLeft: 0,
          minHeight: '14px',
          maxHeight: '25%',
          width: 'calc(100% - 16px)',
          zIndex: 1,
        };
        break;
      case LegendType.Bottom:
        settings = { ...settings, verticalAlign: 'bottom', align: 'center', position: 'horizontal' };
        styles = {
          ...styles,
          bottom: 21,
          left: 8,
          paddingLeft: 0,
          minHeight: '14px',
          width: 'calc(100% - 16px)',
          maxHeight: '25%',
          zIndex: 1,
        };
        break;
      case LegendType.Left:
        settings = { ...settings, verticalAlign: 'top', align: 'left', position: 'vertical' };
        styles = {
          ...styles,
          top: 0,
          left: 20,
          bottom: 20,
          maxWidth: legend?.width ? `${legend?.width}%` : '25%',
          paddingLeft: 0,
          maxHeight: '100%',
          zIndex: 1,
        };
        break;
      case LegendType.Right:
        settings = { ...settings, verticalAlign: 'top', align: 'right', position: 'vertical' };
        styles = {
          ...styles,
          top: 0,
          right: 20,
          bottom: 20,
          maxWidth: legend?.width ? `${legend?.width}%` : '25%',
          paddingLeft: 0,
          maxHeight: '100%',
          zIndex: 1,
        };
        break;
    }

    return { styles, settings };
  }, [legend]);

  return legendLayout;
};
