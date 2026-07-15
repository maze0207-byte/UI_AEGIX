import React, { ReactNode } from 'react';
import { Widget, type WidgetProps } from '../widgets/Widget';

export interface ChartContainerProps extends Omit<WidgetProps, 'children'> {
  toolbar?: ReactNode;
  legend?: ReactNode;
  children?: ReactNode; // This will be the Chart Area
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  icon,
  toolbar,
  legend,
  children,
  ...widgetProps
}) => {
  return (
    <Widget
      title={title}
      description={description}
      icon={icon}
      contentClassName="flex flex-col flex-1 p-0"
      {...widgetProps}
    >
      {/* Toolbar Area */}
      {toolbar && (
        <div className="flex items-center justify-end border-b border-neutral-800/50 bg-neutral-900/30 px-4 py-2 text-sm text-neutral-400">
          {toolbar}
        </div>
      )}

      {/* Chart Area */}
      <div className="relative flex-1 p-4 min-h-[200px]">
        {children}
      </div>

      {/* Legend Area */}
      {legend && (
        <div className="flex items-center justify-center border-t border-neutral-800/50 px-4 py-3 text-xs text-neutral-500">
          {legend}
        </div>
      )}
    </Widget>
  );
};
