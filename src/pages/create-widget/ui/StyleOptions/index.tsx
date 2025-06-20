import React, { useMemo } from 'react';

import { ChartTypes, WidgetTypes } from '@entities/widgets';
import { FieldsGenerator } from '../FieldsGenerator';
import { lineStyleFields } from '@entities/widgets';

import styles from '../styles.module.scss';

interface StyleOptionsProps {
  widgetType?: WidgetTypes[keyof WidgetTypes] | ChartTypes[keyof ChartTypes];
}

export const StyleOptions: React.FC<StyleOptionsProps> = ({ widgetType }) => {
  const fields = useMemo(() => {
    switch (widgetType) {
      case ChartTypes.Line:
        return [...lineStyleFields];

      default:
        return [];
    }
  }, [widgetType]);

  return (
    <div className={styles.graph}>
      <FieldsGenerator chartFields={fields} />
    </div>
  );
};
export default StyleOptions;
