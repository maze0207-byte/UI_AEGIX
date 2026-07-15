import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, Clock } from 'lucide-react';
import { StatusBadge, HealthBadge, RiskBadge, TagBadge } from '../badges/DeviceBadges';

export const DeviceCard: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/assets/devices/${id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 transition-all hover:border-neutral-700 hover:shadow-lg"
    >
      <div className="flex items-start justify-between border-b border-neutral-800/50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded bg-neutral-800 p-2 text-neutral-400 group-hover:text-primary-400">
            <Laptop className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-neutral-100">LPT-DEV-{id}</h3>
            <span className="text-xs text-neutral-500">Asset ID: {id}</span>
          </div>
        </div>
        <StatusBadge status="online" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <HealthBadge health="good" />
          <RiskBadge risk="low" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <TagBadge label="Dept" value="Engineering" />
          <TagBadge label="Site" value="HQ-NYC" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2">
          <Clock className="h-3.5 w-3.5" />
          <span>Last seen: [Last Seen Placeholder]</span>
        </div>
      </div>
    </div>
  );
};
