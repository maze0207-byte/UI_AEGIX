/**
 * AEGIX Assets Hooks
 * React Query hooks for assets - prepared for future backend integration
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '../services/assetService';
import type {
  Device,
  DeviceListResponse,
  DeviceQueryParams,
  AssetSummary,
  AssetDistribution,
} from '../types/asset';

/**
 * Hook for fetching asset summary
 */
export const useAssetSummary = () => {
  return useQuery<AssetSummary>({
    queryKey: ['assets', 'summary'],
    queryFn: () => assetService.getAssetSummary(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

/**
 * Hook for fetching asset distribution
 */
export const useAssetDistribution = () => {
  return useQuery<AssetDistribution>({
    queryKey: ['assets', 'distribution'],
    queryFn: () => assetService.getAssetDistribution(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

/**
 * Hook for fetching devices list
 */
export const useDevices = (params: DeviceQueryParams) => {
  return useQuery<DeviceListResponse>({
    queryKey: ['devices', params],
    queryFn: () => assetService.getDevices(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
};

/**
 * Hook for fetching single device
 */
export const useDevice = (id: string) => {
  return useQuery<Device>({
    queryKey: ['devices', id],
    queryFn: () => assetService.getDevice(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

/**
 * Hook for searching devices
 */
export const useDeviceSearch = (query: string) => {
  return useQuery<Device[]>({
    queryKey: ['devices', 'search', query],
    queryFn: () => assetService.searchDevices(query),
    enabled: query.length > 2,
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook for exporting devices
 */
export const useExportDevices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params, format }: { params: DeviceQueryParams; format: 'csv' | 'json' | 'xlsx' }) =>
      assetService.exportDevices(params, format),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

/**
 * Hook for executing device actions
 */
export const useDeviceAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deviceId, action }: { deviceId: string; action: string }) =>
      assetService.executeDeviceAction(deviceId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

// Re-export for convenience
export { assetService };