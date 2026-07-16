import { Routes, Route } from 'react-router-dom';
import { MapOverviewPage } from '../pages/MapOverviewPage';
import { LiveMapPage } from '../pages/LiveMapPage';
import { BuildingsPage } from '../pages/BuildingsPage';
import { LabsPage } from '../pages/LabsPage';
import { GeofencesPage } from '../pages/GeofencesPage';
import { LocationHistoryPage } from '../pages/LocationHistoryPage';
import { DeviceLocationPage } from '../pages/DeviceLocationPage';

export const MapsRoutes = () => {
  return (
    <Routes>
      <Route index element={<MapOverviewPage />} />
      <Route path="live" element={<LiveMapPage />} />
      <Route path="buildings" element={<BuildingsPage />} />
      <Route path="labs" element={<LabsPage />} />
      <Route path="geofences" element={<GeofencesPage />} />
      <Route path="history" element={<LocationHistoryPage />} />
      <Route path="device/:id" element={<DeviceLocationPage />} />
    </Routes>
  );
};