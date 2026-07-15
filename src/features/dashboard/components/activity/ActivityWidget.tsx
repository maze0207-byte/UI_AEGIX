import React, { ReactNode } from 'react';
import { Widget, type WidgetProps } from '../widgets/Widget';

export interface ActivityItemProps {
  id: string;
  title: string;
  description?: string;
  timestamp?: ReactNode;
  severity?: ReactNode;
  icon?: ReactNode;
}

export interface ActivityWidgetProps extends Omit<WidgetProps, 'children'> {
  items?: ActivityItemProps[];
  children?: ReactNode; // For custom layout or full empty states
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, timestamp, severity, icon }) => (
  <div className="flex items-start gap-3 border-b border-neutral-800/50 p-3 last:border-0 hover:bg-neutral-800/30">
    {icon && <div className="mt-0.5 text-neutral-400">{icon}</div>}
    <div className="flex flex-1 flex-col gap-1">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-neutral-200">{title}</span>
        <div className="flex items-center gap-2 text-xs">
          {severity && <span>{severity}</span>}
          {timestamp && <span className="text-neutral-500">{timestamp}</span>}
        </div>
      </div>
      {description && <p className="text-xs text-neutral-400">{description}</p>}
    </div>
  </div>
);

export const ActivityWidget: React.FC<ActivityWidgetProps> = ({
  items,
  children,
  ...widgetProps
}) => {
  return (
    <Widget
      contentClassName="flex-1 overflow-hidden flex flex-col"
      {...widgetProps}
    >
      <div className="flex-1 overflow-y-auto max-h-[300px]">
        {children ? (
          children
        ) : items && items.length > 0 ? (
          <div className="flex flex-col">
            {items.map((item) => (
              <ActivityItem key={item.id} {...item} />
            ))}
          </div>
        ) : null}
      </div>
    </Widget>
  );
};
