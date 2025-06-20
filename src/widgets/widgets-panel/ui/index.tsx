import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectDashboardStatus } from '@entities/dashboards';
import { IWidget, resetWidgets, selectWidgets, Widget, widgetsThunk } from '@entities/widgets';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Loader } from '@shared/ui';
import { isLoading } from '@shared/lib';

import styles from './styles.module.scss';

type TWidgetPanelProps = {
  dashboard?: string;
};

export const WidgetsPanel = ({ dashboard }: TWidgetPanelProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const widgets: IWidget[] = useAppSelector(selectWidgets);
  const loading = isLoading(useAppSelector(selectDashboardStatus));

  const widgetsDisplay = useMemo(() => [...widgets].sort((a: IWidget, b: IWidget) => a.order - b.order), [widgets]);

  useEffect(() => {
    if (dashboard) {
      dispatch(widgetsThunk.select(dashboard));
    }

    return () => {
      dispatch(resetWidgets);
    };
  }, [dispatch, dashboard]);

  const deleteWidget = (id: string) => {
    dispatch(widgetsThunk.delete(id));
  };

  const moveWidget = (order: number, right: boolean) => {
    const newWidgets = widgets.map((widget) => {
      let newOrder = widget.order;
      if (right) {
        if (newOrder === order) newOrder++;
        if (newOrder === order + 1) newOrder--;
      } else {
        if (newOrder === order) newOrder--;
        if (newOrder === order - 1) newOrder++;
      }
      return {
        id: widget.id,
        order: newOrder,
      };
    });
    dispatch(widgetsThunk.updateOrder(newWidgets));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.wrapper}>
      {widgetsDisplay.map((widget: IWidget) => (
        <Widget
          key={widget.id}
          id={widget.id}
          chartId={widget.chartId}
          className={styles.widgetWrapper}
          name={widget.name}
          description={widget.description}
          width={widget.width}
          height={widget.height}
          order={widget.order}
          length={widgetsDisplay.length}
          chartType={widget.chartType}
          widgetType={widget.widgetType}
          chartStyles={widget.styles}
          duration={widget.duration}
          refreshTime={widget.refresh}
          isEditable
          onDelete={() => deleteWidget(widget.id)}
          onOrderChange={(right) => moveWidget(widget.order, right)}
        />
      ))}
    </div>
  );
};
