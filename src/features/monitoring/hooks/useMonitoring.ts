/**
 * AEGIX Monitoring Hooks
 * React Query hooks for monitoring - prepared for future backend integration
 */

import { useQuery } from '@tanstack/react-query';
import { monitoringService } from '../services/monitoringService';
import type {
  MonitoringOverview,
  MonitoringEvent,
  MonitoringAlert,
  DeviceMonitoring,
  CPUMetrics,
  MemoryMetrics,
  DiskMetrics,
  NetworkMetrics,
  MonitoringFilters,
} from '../types/monitoring';

/**
 * Hook for fetching monitoring overview
 */
export const useMonitoringOverview = (filters?: MonitoringFilters) => {
  return useQuery<MonitoringOverview>({
    queryKey: ['monitoring', 'overview', filters],
    queryFn: () => monitoringService.getMonitoringOverview(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
};

/**
 * Hook for fetching monitoring events
 */
export const useMonitoringEvents = (filters?: MonitoringFilters) => {
  return useQuery<MonitoringEvent[]>({
    queryKey: ['monitoring', 'events', filters],
    queryFn: () => monitoringService.getMonitoringEvents(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

/**
 * Hook for fetching monitoring alerts
 */
export const useMonitoringAlerts = (filters?: MonitoringFilters) => {
  return useQuery<MonitoringAlert[]>({
    queryKey: ['monitoring', 'alerts', filters],
    queryFn: () => monitoringService.getMonitoringAlerts(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

/**
 * Hook for fetching device monitoring data
 */
export const useDeviceMonitoring = (deviceId: string) => {
  return useQuery<DeviceMonitoring>({
    queryKey: ['monitoring', 'device', deviceId],
    queryFn: () => monitoringService.getDeviceMonitoring(deviceId),
    enabled: !!deviceId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook for fetching CPU metrics
 */
export const useCPUMetrics = (deviceId: string) => {
  return useQuery<CPUMetrics>({
    queryKey: ['monitoring', 'cpu', deviceId],
    queryFn: () => monitoringService.getCPUMetrics(deviceId),
    enabled: !!deviceId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook for fetching memory metrics
 */
export const useMemoryMetrics = (deviceId: string) => {
  return useQuery<MemoryMetrics>({
    queryKey: ['monitoring', 'memory', deviceId],
    queryFn: () => monitoringService.getMemoryMetrics(deviceId),
    enabled: !!deviceId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook for fetching disk metrics
 */
export const useDiskMetrics = (deviceId: string) => {
  return useQuery<DiskMetrics>({
    queryKey: ['monitoring', 'disk', deviceId],
    queryFn: () => monitoringService.getDiskMetrics(deviceId),
    enabled: !!deviceId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook for fetching network metrics
 */
export const useNetworkMetrics = (deviceId: string) => {
  return useQuery<NetworkMetrics>({
    queryKey: ['monitoring', 'network', deviceId],
    queryFn: () => monitoringService.getNetworkMetrics(deviceId),
    enabled: !!deviceId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Re-export for convenience
export { monitoringService };