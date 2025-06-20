import React, { useMemo } from 'react';

import cn from 'classnames';

import { TFieldData, THandler } from '@entities/watchers';
import { Field } from '@shared/ui';

import styles from '../ui/styles.module.scss';

type TGenerateFields = {
  data: TFieldData[];
  handlerItem: THandler;
  watchField: keyof Pick<THandler, 'predicate' | 'actions'>;
  handlerIndex: number;
};

export const GenerateFields = ({ data, handlerItem, watchField, handlerIndex }: TGenerateFields) => {
  return useMemo(() => {
    if (watchField === 'predicate') {
      const { name } = handlerItem[watchField];
      const fieldElements = data
        .find((item) => item.name === name.toLocaleUpperCase())
        ?.args.map((arg, argIndex) => (
          <Field
            label={arg.toLocaleLowerCase()}
            type='text'
            key={argIndex}
            name={`handlers.${handlerIndex}.predicate.args.${argIndex}`}
            className={cn('d-flex flex-column mb-2 ')}
          />
        ));

      return <div className='d-flex gap-1'>{fieldElements}</div>;
    }

    if (watchField === 'actions') {
      const actionsNames = handlerItem.actions?.map(({ name }) => name.toLowerCase());
      const actionArgs = data.filter(({ name }) => actionsNames?.includes(name.toLowerCase())).map(({ args }) => args);
      return (
        <>
          {actionArgs?.flatMap((args, actionIndex) => {
            return [
              <div key={`title-${actionIndex}`} style={{ textTransform: 'capitalize' }}>
                {actionsNames?.[actionIndex]}
              </div>,
              <div key={`fields-${actionIndex}`} className='d-flex gap-1'>
                {args.map((arg, argIndex) => (
                  <Field
                    label={arg.toLocaleLowerCase()}
                    key={`${actionIndex}-${argIndex}`}
                    type='text'
                    name={`handlers.${handlerIndex}.actions.${actionIndex}.args.${argIndex}`}
                    className={cn('d-flex flex-column mb-2')}
                  />
                ))}
              </div>,
              actionIndex !== actionArgs.length - 1 && <hr key={actionIndex} className={styles.line} />,
            ];
          })}
        </>
      );
    }
    return null;
    // eslint-disable-next-line
  }, [handlerItem.predicate.name, handlerItem.actions]);
};
