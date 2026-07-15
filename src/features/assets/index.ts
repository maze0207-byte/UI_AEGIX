// Routes
export { AssetRoutes } from './routes/AssetRoutes';

// Pages
export { AssetsOverviewPage } from './pages/AssetsOverviewPage';
export { EnterpriseDevicesPage } from './pages/EnterpriseDevicesPage';
export { DeviceDetailsPage } from './pages/DeviceDetailsPage';

// Types
export type {
  Device,
  DeviceStatus,
  HealthStatus,
  RiskLevel,
  ComplianceStatus,
  DeviceType,
  OperatingSystem,
  AgentStatus,
  AssetSummary,
  AssetDistribution,
  DeviceFilters,
  DeviceSortField,
  DeviceSortOrder,
  DeviceQueryParams,
  DeviceListResponse,
  DeviceDetailTab,
  DeviceAction,
  DeviceActionDefinition,
} from './types/asset';

// Services
export { AssetService, assetService } from './services/assetService';

// Hooks
export {
  useAssetSummary,
  useAssetDistribution,
  useDevices,
  useDevice,
  useDeviceSearch,
  useExportDevices,
  useDeviceAction,
} from './hooks/useAssets';

// Components
export {
  StatusBadge,
  HealthBadge,
  RiskBadge,
  ComplianceBadge,
  AgentStatusBadge,
  TagBadge,
  DeviceTypeBadge,
} from './components/badges/AssetBadges';

export { DeviceTable } from './components/table/DeviceTable';
export { AssetFiltersPanel } from './components/filters/AssetFilters';

// Widgets
export {
  TotalAssetsWidget,
  ManagedAssetsWidget,
  UnmanagedAssetsWidget,
  OnlineAssetsWidget,
  OfflineAssetsWidget,
  CriticalAssetsWidget,
  AssetsByDepartmentWidget,
  AssetsByBuildingWidget,
  AssetsByOSWidget,
  AssetsByDeviceTypeWidget,
  AssetsByManufacturerWidget,
  AssetsWithAgentWidget,
  AssetsWithoutAgentWidget,
  RecentAssetChangesWidget,
  RecentlyAddedAssetsWidget,
  QuickAssetActionsWidget,
} from './components/widgets/AssetOverviewWidgets';
