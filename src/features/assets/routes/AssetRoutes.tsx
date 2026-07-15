import { Routes, Route, Navigate } from 'react-router-dom';
import { DevicesPage } from '../../devices/pages/DevicesPage';

export const AssetRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="devices" replace />} />
      <Route path="devices" element={<DevicesPage />} />
    </Routes>
  );
};