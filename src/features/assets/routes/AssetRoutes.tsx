import { Routes, Route } from 'react-router-dom';
import { AssetsOverviewPage } from '../pages/AssetsOverviewPage';
import { EnterpriseDevicesPage } from '../pages/EnterpriseDevicesPage';
import { DeviceDetailsPage } from '../pages/DeviceDetailsPage';

export const AssetRoutes = () => {
  return (
    <Routes>
      <Route index element={<AssetsOverviewPage />} />
      <Route path="devices" element={<EnterpriseDevicesPage />} />
      <Route path="devices/:id" element={<DeviceDetailsPage />} />
    </Routes>
  );
};
