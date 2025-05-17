import React, { useMemo, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Panel } from '@shared/ui';
import { useAppSelector, useHover, useLocale } from '@shared/hooks';

import { Chart } from './Chart';
import { Actions } from './Actions';
import { ResizableHandle } from './ResizableHandle';
import { selectChartData, selectWidget } from '@entities/widgets/model';

import {
  ChartStyles,
  ChartTypes,
  WidgetTypes,
} from '../../model/types';

import styles from './styles.module.scss';
import { useChartDataTransform } from '@entities/widgets/lib/useChartDataTransform';

interface WidgetProps {
  id: string;
  className?: string;
  title?: string;
  description?: string;
  order?: number;
  length?: number;
  width?: number;
  height?: number;
  isWidgetEdit?: boolean;
  chartType?: ChartTypes[keyof ChartTypes];
  widgetType: WidgetTypes[keyof WidgetTypes];
  chartStyles: ChartStyles;
  duration: number;
  refreshTime: number | null;
  overrideRefreshTime?: boolean;
  overrideDuration?: boolean;
  watchers: string[];
  isEditable?: boolean;
  onEdit?: () => void;
  onWidthChange?: (value: number) => void;
  onHeightChange?: (value: number) => void;
  onOrderChange?: (isRight: boolean) => void;
  onDelete?: () => void;
  navigate?: NavigateFunction;
}

export const Widget = (props: WidgetProps) => {
  const { t } = useLocale();
  const {
    id,
    className,
    title,
    description,
    order = 0,
    length = 1,
    width = 450,
    height = 450,
    isWidgetEdit = false,
    chartType,
    widgetType,
    chartStyles,
    duration,
    isEditable = true,
    onOrderChange,
    onEdit,
    onDelete,
    navigate,
  } = props;

  const [widgetRef, isHover] = useHover<HTMLDivElement | null>();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [_width, setWidth] = useState(width);
  const [_height, setHeight] = useState(height);
  const widgetData = useAppSelector(selectChartData);
  const showHeader = useMemo(() => !!(title?.trim().length || description?.trim().length), [title, description]);

  const navigateToEdit = () => {
    navigate && navigate("/edit");
  };

  const {
    options,
    values,
    dataType,
  } = useChartDataTransform(widgetData);

  return (
    <div
      className={`${styles.panelWrapper} ${className}`}
      style={{
        width: _width,
        height: _height,
      }}
      data-order={order}
      ref={widgetRef}
    >
      <Panel className={chartStyles.standard?.transparentBackground ? styles.transparentBackground : ''}>
        <div data-actions={isActionsOpen} className={styles.wrapper}>
          {!isWidgetEdit && onEdit && (
            <ResizableHandle
              className={styles.resizer}
              width={width}
              height={height}
              onSetWidth={setWidth}
              onSetHeight={setHeight}
            />
          )}
          {showHeader && (
            <div className={styles.header}>
              <span className={styles.title} data-testid='widgetHeader'>
                {title ?? ''}
              </span>
            </div>
          )}
          {!isWidgetEdit && isEditable && (
            <Actions
              className={styles.actions}
              title={title ?? ''}
              isEdit={!!onEdit}
              length={length}
              order={order}
              onActionsOpen={(isOpen) => setIsActionsOpen(isOpen)}
              onOrderChange={onOrderChange}
              onDelete={onDelete}
              onEdit={onEdit || navigateToEdit}
              onInspect={() => setIsSideBarOpen(true)}
            />
          )}
          <Chart
            chartType={chartType}
            widgetType={widgetType}
            height={height}
            width={width}
            styles={chartStyles}
            chartOptions={options}
            dataXAxisKeyName='x'
            dataSize={0}
            data={values}
            duration={duration}
            label={{
              x: '',
              y: '',
            }}
            isWidgetEdit={isWidgetEdit}
            isLinksRedirectApplicable={false}
          />
        </div>
      </Panel>
    </div>
  );
};

export default Widget;
