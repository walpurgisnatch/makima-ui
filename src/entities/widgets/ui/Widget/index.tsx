import React, { useEffect, useMemo, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Panel } from '@shared/ui';
import { useAppDispatch, useAppSelector, useHover, usePolling } from '@shared/hooks';
import { Chart } from './Chart';
import { Actions } from './Actions';
import { ResizableHandle } from './ResizableHandle';
import { selectChartData, widgetsThunk } from '@entities/widgets/model';

import {
  ChartStyles,
  ChartTypes,
  WidgetTypes,
} from '../../model/types';
import { useChartDataTransform } from '@entities/widgets/lib/useChartDataTransform';

import styles from './styles.module.scss';

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
  duration?: number;
  refreshTime?: number;
  watchers?: string[];
  isEditable?: boolean;
  onEdit?: () => void;
  onWidthChange?: (value: number) => void;
  onHeightChange?: (value: number) => void;
  onOrderChange?: (isRight: boolean) => void;
  onDelete?: () => void;
  navigate?: NavigateFunction;
}

export const Widget = (props: WidgetProps) => {
  const {
    id,
    className,
    title,
    description,
    order = 0,
    length = 1,
    width = 650,
    height = 450,
    isWidgetEdit = false,
    chartType,
    widgetType,
    chartStyles,
    duration = 86400000,
    refreshTime = 10000,
    watchers,
    isEditable = true,
    onOrderChange,
    onEdit,
    onDelete,
    navigate,
  } = props;

  const dispatch = useAppDispatch();
  const [widgetRef, isHover] = useHover<HTMLDivElement | null>();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [_width, setWidth] = useState(width);
  const [_height, setHeight] = useState(height);
  const widgetData = useAppSelector(selectChartData) || [];
  const showHeader = useMemo(() => !!(title?.trim().length || description?.trim().length), [title, description]);

  const navigateToEdit = () => {
    navigate && navigate("/edit");
  };

  usePolling(() => id && dispatch(widgetsThunk.fetchWidgetData(id)), refreshTime);

  useEffect(() => {
    if (id) {
      dispatch(widgetsThunk.fetchWidgetData(id));
    } else if (watchers && watchers.length) {
      dispatch(widgetsThunk.fetchData(watchers));
    }
  }, [dispatch, id, watchers]);

  const {
    options,
    values,
  } = useChartDataTransform(widgetData);

  const onSizeUpdate = (width: number, height: number) => {
    dispatch(widgetsThunk.updateSize({ widget: id, width, height }))
  }

  return (
    <div
      className={`${styles.panelWrapper} ${className}`}
      style={{
        width: isWidgetEdit ? 'auto' : _width,
        height: _height,
      }}
      data-order={order}
      ref={widgetRef}
    >
      <Panel className={styles.panel}>
        <div data-actions={isActionsOpen} className={styles.wrapper}>
          {!isWidgetEdit && isEditable && (
            <ResizableHandle
              className={styles.resizer}
              width={_width}
              height={_height}
              onSetWidth={setWidth}
              onSetHeight={setHeight}
              onSizeUpdate={onSizeUpdate}
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
            height={_height}
            width={_width}
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
