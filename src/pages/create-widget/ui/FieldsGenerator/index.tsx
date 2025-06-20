import React from 'react';

import { Field } from '@shared/ui';
import { IField } from '@shared/types';

import styles from './styles.module.scss';

interface FieldWrapperProps {
  chartFields: IField[];
  className?: string;
}

export const FieldsGenerator = ({ chartFields }: FieldWrapperProps) => {
  return (
    <>
      {chartFields.map((field) => (
        <div key={field.name} className={styles.wrapper}>
          <Field key={field.name} {...field} className={styles.field} />
        </div>
      ))}
    </>
  );
};
