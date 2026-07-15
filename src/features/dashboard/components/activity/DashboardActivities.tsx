import React from 'react';
import { ActivityWidget, type ActivityItemProps } from './ActivityWidget';
import { Activity, Bell, Settings2, Terminal, Clock, MessageSquare } from 'lucide-react';

const generatePlaceholders = (count: number, prefix: string): ActivityItemProps[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `item-${i}`,
    title: `[${prefix} Title Placeholder]`,
    description: `[${prefix} details will appear here in the future]`,
    timestamp: '[Time]',
    severity: <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] uppercase text-neutral-400">[Sev]</span>,
  }));
};

export const RecentActivityWidget: React.FC<{ isLoading?: boolean; isEmpty?: boolean; isError?: boolean; className?: string }> = ({ className, ...props }) => (
  <ActivityWidget
    title="Recent Activity"
    icon={<Activity className="h-4 w-4" />}
    items={generatePlaceholders(4, 'Activity')}
    className={className}
    {...props}
  />
);

export const RecentAlertsWidget: React.FC<{ isLoading?: boolean; isEmpty?: boolean; isError?: boolean; className?: string }> = ({ className, ...props }) => (
  <ActivityWidget
    title="Recent Alerts"
    icon={<Bell className="h-4 w-4 text-warning-500" />}
    items={generatePlaceholders(4, 'Alert')}
    className={className}
    {...props}
  />
);

export const RecentDeviceChangesWidget: React.FC<{ isLoading?: boolean; isEmpty?: boolean; isError?: boolean; className?: string }> = ({ className, ...props }) => (
  <ActivityWidget
    title="Recent Device Changes"
    icon={<Settings2 className="h-4 w-4" />}
    items={generatePlaceholders(4, 'Device Change')}
    className={className}
    {...props}
  />
);

export const RecentCommandsWidget: React.FC<{ isLoading?: boolean; isEmpty?: boolean; isError?: boolean; className?: string }> = ({ className, ...props }) => (
  <ActivityWidget
    title="Recent Commands"
    icon={<Terminal className="h-4 w-4" />}
    items={generatePlaceholders(4, 'Command')}
    className={className}
    {...props}
  />
);

export const EventTimelineWidget: React.FC<{ isLoading?: boolean; isEmpty?: boolean; isError?: boolean; className?: string }> = ({ className, ...props }) => (
  <ActivityWidget
    title="Event Timeline"
    icon={<Clock className="h-4 w-4" />}
    items={generatePlaceholders(5, 'Event')}
    className={className}
    {...props}
  />
);

export const NotificationFeedWidget: React.FC<{ isLoading?: boolean; isEmpty?: boolean; isError?: boolean; className?: string }> = ({ className, ...props }) => (
  <ActivityWidget
    title="Notification Feed"
    icon={<MessageSquare className="h-4 w-4" />}
    items={generatePlaceholders(4, 'Notification')}
    className={className}
    {...props}
  />
);
