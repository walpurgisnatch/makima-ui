import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { Panel } from '@shared/ui';
import { resetWidget } from '@entities/widgets/store';
import { useAppDispatch, useAppSelector, usePolling } from '@shared/hooks';
import { Chart } from './Chart';
import { Actions } from './Actions';
import { ResizableHandle } from './ResizableHandle';
import { selectChartData, selectCurrentChartData, widgetsThunk } from '@entities/widgets/model';
import { ChartStyles, ChartTypes, WidgetTypes } from '../../model/types';
import { useChartDataTransform } from '@entities/widgets/lib/useChartDataTransform';

import styles from './styles.module.scss';

interface WidgetProps {
  id: string;
  chartId: string;
  className?: string;
  name?: string;
  description?: string;
  order?: number;
  length?: number;
  width?: number;
  height?: number;
  isEditing?: boolean;
  chartType?: ChartTypes[keyof ChartTypes];
  widgetType: WidgetTypes[keyof WidgetTypes];
  chartStyles: ChartStyles;
  duration?: number;
  refreshTime?: number;
  watchers?: string[];
  isEditable?: boolean;
  onOrderChange?: (isRight: boolean) => void;
  onDelete?: () => void;
}

export const Widget = (props: WidgetProps) => {
  const {
    id,
    chartId,
    className,
    name,
    description,
    order = 0,
    length = 1,
    width = 650,
    height = 450,
    isEditing = false,
    chartType,
    widgetType,
    chartStyles,
    duration = 86400000,
    refreshTime = 10000,
    watchers,
    isEditable = false,
    onOrderChange,
    onDelete,
  } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [_width, setWidth] = useState(width);
  const [_height, setHeight] = useState(height);
  const currentWidgetData = useAppSelector(selectCurrentChartData) || [];
  const widgetData = useAppSelector((state) => selectChartData(state, chartId)) || [];
  const showHeader = useMemo(() => !!(name?.trim().length || description?.trim().length), [name, description]);

  const navigateToEdit = () => {
    navigate(`./widgets/${id}/edit`);
  };

  usePolling(() => chartId && dispatch(widgetsThunk.fetchChartData(chartId)), refreshTime);

  useEffect(() => {
    if (chartId && !isEditing) {
      dispatch(widgetsThunk.fetchChartData(chartId));
    } else if (watchers && watchers.length) {
      dispatch(widgetsThunk.fetchData({ watchers, duration }));
    }

    return () => {
      dispatch(resetWidget);
    };
  }, [dispatch, watchers, chartId, duration, isEditing]);

  const { options, values } = useChartDataTransform(!chartId ? currentWidgetData : widgetData);

  const onSizeUpdate = (width: number, height: number) => {
    dispatch(widgetsThunk.updateSize({ widget: id, width, height }));
  };

  return (
    <div
      className={cn(styles.panelWrapper, className)}
      style={{
        width: isEditing ? 'auto' : _width,
        height: showHeader ? _height + 32 : _height,
      }}
      data-order={order}
    >
      <Panel className={styles.panel}>
        <div data-actions={isActionsOpen} className={styles.wrapper}>
          {!isEditing && isEditable && (
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
                {name ?? ''}
              </span>
              {description?.trim() && (
                <Tooltip title={description}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )}
            </div>
          )}
          {!isEditing && (
            <Actions
              className={styles.actions}
              title={name ?? ''}
              isEdit={isEditable}
              length={length}
              order={order}
              onActionsOpen={(isOpen) => setIsActionsOpen(isOpen)}
              onOrderChange={onOrderChange}
              onDelete={onDelete}
              onEdit={navigateToEdit}
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
            isEditing={isEditing}
            isLinksRedirectApplicable={false}
          />
        </div>
      </Panel>
    </div>
  );
};

export default Widget;
