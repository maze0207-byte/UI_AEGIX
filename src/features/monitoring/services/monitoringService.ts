/**
 * AEGIX Monitoring Service
 * Service layer for monitoring - prepared for FastAPI integration
 */

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
 * Monitoring Service - handles all monitoring-related API operations
 * Currently prepared for future backend integration
 */
export class MonitoringService {
  constructor() {}

  /**
   * Get monitoring overview data
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMonitoringOverview(_filters?: MonitoringFilters): Promise<MonitoringOverview> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get monitoring events
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMonitoringEvents(_filters?: MonitoringFilters): Promise<MonitoringEvent[]> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get monitoring alerts
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMonitoringAlerts(_filters?: MonitoringFilters): Promise<MonitoringAlert[]> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get device monitoring data
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDeviceMonitoring(_deviceId: string): Promise<DeviceMonitoring> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get CPU metrics for a device
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCPUMetrics(_deviceId: string): Promise<CPUMetrics> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get memory metrics for a device
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMemoryMetrics(_deviceId: string): Promise<MemoryMetrics> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get disk metrics for a device
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDiskMetrics(_deviceId: string): Promise<DiskMetrics> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get network metrics for a device
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getNetworkMetrics(_deviceId: string): Promise<NetworkMetrics> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }
}

// Singleton instance
export const monitoringService = new MonitoringService();

// Export for dependency injection
export default MonitoringService;