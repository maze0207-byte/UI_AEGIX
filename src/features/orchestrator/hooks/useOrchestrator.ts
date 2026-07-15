/**
 * AEGIX Orchestrator Hooks
 * React Query hooks for orchestrator - prepared for future backend integration
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orchestratorService } from '../services/orchestratorService';
import type {
  Command,
  Workflow,
  SoftwarePackage,
  SoftwareDeployment,
  ApprovalRequest,
  ExecutionDetails,
  OrchestratorFilters,
} from '../types/orchestrator';

/**
 * Hook for fetching commands
 */
export const useCommands = (filters?: OrchestratorFilters) => {
  return useQuery<Command[]>({
    queryKey: ['orchestrator', 'commands', filters],
    queryFn: () => orchestratorService.getCommands(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

/**
 * Hook for fetching workflows
 */
export const useWorkflows = (filters?: OrchestratorFilters) => {
  return useQuery<Workflow[]>({
    queryKey: ['orchestrator', 'workflows', filters],
    queryFn: () => orchestratorService.getWorkflows(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

/**
 * Hook for fetching software packages
 */
export const useSoftwarePackages = (filters?: OrchestratorFilters) => {
  return useQuery<SoftwarePackage[]>({
    queryKey: ['orchestrator', 'packages', filters],
    queryFn: () => orchestratorService.getSoftwarePackages(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
};

/**
 * Hook for fetching software deployments
 */
export const useSoftwareDeployments = (filters?: OrchestratorFilters) => {
  return useQuery<SoftwareDeployment[]>({
    queryKey: ['orchestrator', 'deployments', filters],
    queryFn: () => orchestratorService.getSoftwareDeployments(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

/**
 * Hook for fetching approval requests
 */
export const useApprovals = (filters?: OrchestratorFilters) => {
  return useQuery<ApprovalRequest[]>({
    queryKey: ['orchestrator', 'approvals', filters],
    queryFn: () => orchestratorService.getApprovals(filters),
    staleTime: 30 * 1000, // 30 seconds
    retry: 3,
  });
};

/**
 * Hook for fetching execution details
 */
export const useExecutionDetails = (commandId: string) => {
  return useQuery<ExecutionDetails>({
    queryKey: ['orchestrator', 'execution', commandId],
    queryFn: () => orchestratorService.getExecutionDetails(commandId),
    enabled: !!commandId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook for executing commands
 */
export const useExecuteCommand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: Partial<Command>) => orchestratorService.executeCommand(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orchestrator', 'commands'] });
    },
  });
};

/**
 * Hook for executing workflows
 */
export const useExecuteWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workflow: Partial<Workflow>) => orchestratorService.executeWorkflow(workflow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orchestrator', 'workflows'] });
    },
  });
};

/**
 * Hook for deploying software
 */
export const useDeploySoftware = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deployment: Partial<SoftwareDeployment>) => orchestratorService.deploySoftware(deployment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orchestrator', 'deployments'] });
    },
  });
};

// Re-export for convenience
export { orchestratorService };