import React, { useRef } from 'react';

import styles from './styles.module.scss';

interface ResizableHandleProps {
  className?: string;
  width: number;
  height: number;
  onSetHeight: (value: number) => void;
  onSetWidth: (value: number) => void;
  onSizeUpdate: (width: number, height: number) => void;
}

export const ResizableHandle = ({
  className,
  width,
  height,
  onSetHeight,
  onSetWidth,
  onSizeUpdate,
}: ResizableHandleProps) => {
  const resizeBgRef = useRef(null);
  const isDragging = useRef(false);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const initialWidth = useRef(0);
  const initialHeight = useRef(0);

  const xMouseDownHandler = (e: React.MouseEvent) => {
    isDragging.current = true;
    // @ts-ignore
    initialWidth.current = resizeBgRef.current.offsetWidth + 18;
    initialX.current = e.clientX;
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', xMouseMoveHandler);
    document.addEventListener('mouseup', xMouseUpHandler);
  };

  const yMouseDownHandler = (e: React.MouseEvent) => {
    isDragging.current = true;
    // @ts-ignore
    initialHeight.current = resizeBgRef.current.offsetHeight + 18;
    initialY.current = e.clientY;
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', yMouseMoveHandler);
    document.addEventListener('mouseup', yMouseUpHandler);
  };

  const xMouseMoveHandler = (e: MouseEvent) => {
    if (!isDragging.current) {
      return;
    }
    const deltaX = e.clientX - initialX.current;
    onSetWidth((width || initialWidth.current) + deltaX);
  };

  const yMouseMoveHandler = (e: MouseEvent) => {
    if (!isDragging.current) {
      return;
    }
    const deltaY = e.clientY - initialY.current;
    onSetHeight((height || initialHeight.current) + deltaY);
  };

  const xMouseUpHandler = (e: MouseEvent) => {
    isDragging.current = false;
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', xMouseMoveHandler);
    document.removeEventListener('mouseup', xMouseUpHandler);
    const deltaX = e.clientX - initialX.current;
    const newWidth = (width || initialWidth.current) + Math.round(deltaX / 25) * 25;

    onSetWidth(newWidth);
    onSizeUpdate(newWidth, height);
  };

  const yMouseUpHandler = (e: MouseEvent) => {
    isDragging.current = false;
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', yMouseMoveHandler);
    document.removeEventListener('mouseup', yMouseUpHandler);
    const deltaY = e.clientY - initialY.current;
    const newHeight = (height || initialHeight.current) + Math.round(deltaY / 25) * 25;

    onSetHeight(newHeight);
    onSizeUpdate(width, newHeight);
  };

  return (
    <div
      ref={resizeBgRef}
      className={`${className ?? ''} ${isDragging.current ? styles.resizeBackgroundShow : ''} ${
        styles.resizeBackground
      }`}
    >
      <div className={styles.resizerR} onMouseDown={xMouseDownHandler} />
      <div className={styles.resizerB} onMouseDown={yMouseDownHandler} />
    </div>
  );
};
