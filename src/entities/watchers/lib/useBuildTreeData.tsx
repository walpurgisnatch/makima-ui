import React, { useMemo } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { TFieldData } from '@entities/watchers';

type TCustomData = {
  title: string | React.ReactNode;
  value: string;
  selectable: boolean;
  children: Omit<TCustomData, 'children'>[];
};

export const useBuildTreeData = (data: TFieldData[]) => {
  return useMemo<TCustomData[]>(
    () =>
      Object.values(
        data.reduce((acc: Record<string, TCustomData>, element) => {
          const { type } = element;

          if (!acc[type]) {
            acc[type] = {
              title: type,
              selectable: false,
              value: type,
              children: [],
            };
          }

          acc[type].children?.push({
            title: (
              <span className='d-flex justify-content-between align-items-center gap-1'>
                {element.name.toLowerCase()}
                <Tooltip title={element.doc && element.doc} placement='right'>
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            ),
            selectable: true,
            value: element.name.toLocaleLowerCase(),
          });

          return acc;
        }, {})
      ),
    [data]
  );
};
