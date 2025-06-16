import React, { useMemo } from 'react';

import { ChartTypes, WidgetTypes } from '@entities/widgets';
import { FieldsGenerator } from '../FieldsGenerator';
import { LineStandardFields } from '@entities/widgets';
import { IField } from '@shared/types';

import styles from '../styles.module.scss';

interface StandardOptionsProps {
  widgetType?: WidgetTypes[keyof WidgetTypes] | ChartTypes[keyof ChartTypes];
}

export const StandardOptions: React.FC<StandardOptionsProps> = ({ widgetType }) => {
  const fields = useMemo(() => {
    let res: IField[] = [];
    switch (widgetType) {
      case ChartTypes.Line:
        res = LineStandardFields;
        break;

      default:
        res = [];
    }
    return res;
  }, [widgetType]);

  return (
    <div className={styles.graph}>
      {fields.map((field) => {
        return <FieldsGenerator chartFields={[field]} />;
      })}
    </div>
  );
};

export default StandardOptions;
