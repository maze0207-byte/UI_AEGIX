import React from 'react';
import { Widget, type WidgetProps } from '../../../dashboard/components/widgets/Widget';
import { StatCard } from '@/app/StatCard';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Server, 
  Package, 
  GitBranch, 
  History,
  Shield,
  AlertTriangle,
} from 'lucide-react';

/**
 * Placeholder content for widgets
 */
const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-full min-h-[80px] items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label}]
  </div>
);

/**
 * Pending Commands Widget
 */
export const PendingCommandsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Pending Commands" icon={<Clock className="h-4 w-4" />} {...props}>
    <StatCard
      title="Pending"
      value="12"
      description="Awaiting execution"
    />
  </Widget>
);

/**
 * Running Commands Widget
 */
export const RunningCommandsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Running Commands" icon={<Activity className="h-4 w-4" />} {...props}>
    <StatCard
      title="Running"
      value="4"
      description="In progress"
    />
  </Widget>
);

/**
 * Completed Commands Widget
 */
export const CompletedCommandsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Completed Commands" icon={<CheckCircle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Completed"
      value="142"
      description="Successfully executed"
    />
  </Widget>
);

/**
 * Failed Commands Widget
 */
export const FailedCommandsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Failed Commands" icon={<XCircle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Failed"
      value="3"
      description="Execution failed"
    />
  </Widget>
);

/**
 * Waiting Devices Widget
 */
export const WaitingDevicesWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Waiting Devices" icon={<AlertTriangle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Waiting"
      value="23"
      description="Devices not responding"
    />
  </Widget>
);

/**
 * Execution Queue Widget
 */
export const ExecutionQueueWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Execution Queue" icon={<Server className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Execution Queue" />
  </Widget>
);

/**
 * Deployment Queue Widget
 */
export const DeploymentQueueWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Deployment Queue" icon={<Package className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Deployment Queue" />
  </Widget>
);

/**
 * Workflow Queue Widget
 */
export const WorkflowQueueWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Workflow Queue" icon={<GitBranch className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Workflow Queue" />
  </Widget>
);

/**
 * AI Command Bar Widget
 */
export const AICommandBarWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="AEGIX AI Command" icon={<Shield className="h-4 w-4" />} {...props}>
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Enter command (e.g., 'Install Visual Studio on Lab 3')"
        className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500"
      />
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-neutral-500">Examples:</span>
        <button className="rounded-sm bg-neutral-800 px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-700">
          Install VS on Lab 3
        </button>
        <button className="rounded-sm bg-neutral-800 px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-700">
          Restart Engineering PCs
        </button>
      </div>
    </div>
  </Widget>
);

/**
 * Command History Widget
 */
export const CommandHistoryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Command History" icon={<History className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Command History" />
  </Widget>
);

/**
 * Software Library Widget
 */
export const SoftwareLibraryWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Software Library" icon={<Package className="h-4 w-4" />} {...props}>
    <PlaceholderContent label="Software Library" />
  </Widget>
);

/**
 * Pending Approvals Widget
 */
export const PendingApprovalsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Pending Approvals" icon={<Clock className="h-4 w-4" />} {...props}>
    <StatCard
      title="Pending"
      value="5"
      description="Awaiting approval"
    />
  </Widget>
);

/**
 * Approved Requests Widget
 */
export const ApprovedRequestsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Approved Requests" icon={<CheckCircle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Approved"
      value="23"
      description="Ready for execution"
    />
  </Widget>
);

/**
 * Rejected Requests Widget
 */
export const RejectedRequestsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Rejected Requests" icon={<XCircle className="h-4 w-4" />} {...props}>
    <StatCard
      title="Rejected"
      value="2"
      description="Not approved"
    />
  </Widget>
);

/**
 * Executed Requests Widget
 */
export const ExecutedRequestsWidget: React.FC<Omit<WidgetProps, 'title'>> = (props) => (
  <Widget title="Executed Requests" icon={<Activity className="h-4 w-4" />} {...props}>
    <StatCard
      title="Executed"
      value="142"
      description="Completed"
    />
  </Widget>
);