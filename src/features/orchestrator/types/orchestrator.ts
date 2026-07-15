/**
 * AEGIX Orchestrator Types
 * Type definitions for the Orchestrator Workspace
 */

// Command status types
export type CommandStatus = 'pending' | 'running' | 'completed' | 'failed' | 'waiting';

// Workflow status types
export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'completed' | 'failed';

// Target selection types
export type TargetType = 'device' | 'devices' | 'department' | 'building' | 'lab' | 'os' | 'group';

// Command types
export type CommandType = 
  | 'restart'
  | 'shutdown'
  | 'lock'
  | 'wake'
  | 'collect-logs'
  | 'collect-evidence'
  | 'update-agent'
  | 'refresh-inventory'
  | 'sync-policies'
  | 'run-script'
  | 'run-powershell'
  | 'run-cmd'
  | 'run-bash'
  | 'run-python';

// Software deployment status
export type DeploymentStatus = 'queued' | 'downloading' | 'installing' | 'success' | 'failed' | 'rollback';

// Approval status
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'executed';

// Command entity
export interface Command {
  id: string;
  name: string;
  type: CommandType;
  target: string;
  targetType: TargetType;
  status: CommandStatus;
  createdBy: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  duration?: string;
  result?: string;
}

// Workflow step
export interface WorkflowStep {
  id: string;
  type: CommandType;
  name: string;
  config: Record<string, unknown>;
  order: number;
}

// Workflow entity
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  target: string;
  targetType: TargetType;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Software package
export interface SoftwarePackage {
  id: string;
  name: string;
  version: string;
  publisher: string;
  size: number;
  checksum: string;
  silentInstall: string;
  rollback: boolean;
  category: string;
  uploadDate: string;
}

// Software deployment
export interface SoftwareDeployment {
  id: string;
  packageId: string;
  packageName: string;
  target: string;
  targetType: TargetType;
  status: DeploymentStatus;
  progress: number;
  createdAt: string;
  createdBy: string;
  completedAt?: string;
}

// Approval request
export interface ApprovalRequest {
  id: string;
  type: 'command' | 'workflow' | 'deployment';
  targetId: string;
  targetName: string;
  status: ApprovalStatus;
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
}

// Execution details
export interface ExecutionDetails {
  commandId: string;
  targetDevices: string[];
  success: number;
  failed: number;
  waiting: number;
  retry: number;
  logs: string[];
}

// Orchestrator filters
export interface OrchestratorFilters {
  status: CommandStatus | 'all';
  targetType: TargetType | 'all';
  createdBy: string;
  dateRange: string;
}