/**
 * AEGIX Asset Service
 * Service layer for assets - prepared for FastAPI integration
 */

import type {
  Device,
  DeviceListResponse,
  DeviceQueryParams,
  AssetSummary,
  AssetDistribution,
} from '../types/asset';

/**
 * Asset Service - handles all asset-related API operations
 * Currently prepared for future backend integration
 */
export class AssetService {
  constructor() {}

  /**
   * Get asset summary for overview
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAssetSummary(_baseUrl?: string): Promise<AssetSummary> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get asset distribution data
   */
  async getAssetDistribution(): Promise<AssetDistribution> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get devices list with filters, sorting, and pagination
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDevices(_params: DeviceQueryParams): Promise<DeviceListResponse> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get single device by ID
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDevice(_id: string): Promise<Device> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Get multiple devices by IDs
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDevicesByIds(_ids: string[]): Promise<Device[]> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Search devices
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async searchDevices(_query: string): Promise<Device[]> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Export devices data
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exportDevices(_params: DeviceQueryParams, _format: 'csv' | 'json' | 'xlsx'): Promise<Blob> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }

  /**
   * Execute device action (UI only - no backend)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async executeDeviceAction(_deviceId: string, _action: string): Promise<void> {
    // TODO: Implement API call
    throw new Error('Not implemented - awaiting backend integration');
  }
}

// Singleton instance
export const assetService = new AssetService();

// Export for dependency injection
export default AssetService;