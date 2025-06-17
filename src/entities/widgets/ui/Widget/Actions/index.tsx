import React, { useMemo } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { LeftOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/interface';

import { useLocale } from '@shared/hooks';

import styles from './styles.module.scss';

const enum ActionsMenuOption {
  edit = 'edit',
  inspect = 'inspect',
  delete = 'delete',
}

interface ActionsProps {
  title: string;
  order?: number;
  length: number;
  isEdit: boolean;
  className?: string;
  onActionsOpen: (isOpen: boolean) => void;
  onEdit?: () => void;
  onOrderChange?: (isRight: boolean) => void;
  onDelete?: () => void;
  onInspect?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  className,
  title,
  order = 0,
  length,
  onActionsOpen,
  isEdit,
  onOrderChange,
  onEdit,
  onInspect,
  onDelete,
}) => {
  const { t } = useLocale();

  const isLeftDisabled = order === 0;
  const isRightDisabled = order >= length - 1;
  const leftClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOrderChange && onOrderChange(false);
  };
  const rightClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOrderChange && onOrderChange(true);
  };

  const menuClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const menuSelectHandler: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case ActionsMenuOption.edit: {
        onEdit && onEdit();
        break;
      }
      case ActionsMenuOption.inspect: {
        onInspect && onInspect();
        break;
      }
      case ActionsMenuOption.delete: {
        if (onDelete && confirm(t('widgets.delete_tooltip', { name: title }))) {
          onDelete();
        }
        break;
      }
    }
  };

  const items = useMemo(() => {
    const res: ItemType[] = [
      {
        label: (
          <div className={styles.menuItem}>
            <div>{t('general.edit')}</div>
          </div>
        ),
        key: ActionsMenuOption.edit,
      },
      {
        label: (
          <div className={styles.menuItem}>
            <div>{t('widgets.inspect')}</div>
          </div>
        ),
        key: ActionsMenuOption.inspect,
      },
      {
        label: (
          <div className={styles.menuItem}>
            <div>{t('general.delete')}</div>
          </div>
        ),
        key: ActionsMenuOption.delete,
      },
    ];
    // if (!isEdit) {
    //   return res.filter(
    //     // @ts-ignore
    //     (item) => ![ActionsMenuOption.delete].includes(item.key)
    //   );
    // }
    return res;
  }, [t, isEdit]);

  return (
    <div className={className}>
      <Button
        type='link'
        icon={<LeftOutlined />}
        title={t('widgets.chart.left')}
        disabled={isLeftDisabled}
        onClick={leftClickHandler}
      />
      <Button
        type='link'
        icon={<RightOutlined />}
        title={t('widgets.chart.right')}
        disabled={isRightDisabled}
        onClick={rightClickHandler}
      />

      <Dropdown
        menu={{ items, onClick: menuSelectHandler }}
        trigger={['click']}
        placement='bottomRight'
        onOpenChange={onActionsOpen}
      >
        <Button icon={<MenuOutlined />} onClick={menuClickHandler} />
      </Dropdown>
    </div>
  );
};
