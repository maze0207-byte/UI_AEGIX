// Routes
export { OrchestratorRoutes } from './routes/OrchestratorRoutes';

// Pages
export { OrchestratorOverviewPage } from './pages/OrchestratorOverviewPage';
export { CommandsPage } from './pages/CommandsPage';
export { WorkflowsPage } from './pages/WorkflowsPage';
export { SoftwarePage } from './pages/SoftwarePage';
export { HistoryPage } from './pages/HistoryPage';
export { PackagesPage } from './pages/PackagesPage';

// Types
export type {
  CommandStatus,
  WorkflowStatus,
  TargetType,
  CommandType,
  DeploymentStatus,
  ApprovalStatus,
  Command,
  WorkflowStep,
  Workflow,
  SoftwarePackage,
  SoftwareDeployment,
  ApprovalRequest,
  ExecutionDetails,
  OrchestratorFilters,
} from './types/orchestrator';

// Services
export { OrchestratorService, orchestratorService } from './services/orchestratorService';

// Hooks
export {
  useCommands,
  useWorkflows,
  useSoftwarePackages,
  useSoftwareDeployments,
  useApprovals,
  useExecutionDetails,
  useExecuteCommand,
  useExecuteWorkflow,
  useDeploySoftware,
} from './hooks/useOrchestrator';

// Components
export {
  PendingCommandsWidget,
  RunningCommandsWidget,
  CompletedCommandsWidget,
  FailedCommandsWidget,
  WaitingDevicesWidget,
  ExecutionQueueWidget,
  DeploymentQueueWidget,
  WorkflowQueueWidget,
  AICommandBarWidget,
  CommandHistoryWidget,
  SoftwareLibraryWidget,
  PendingApprovalsWidget,
  ApprovedRequestsWidget,
  RejectedRequestsWidget,
  ExecutedRequestsWidget,
} from './components/widgets/OrchestratorWidgets';