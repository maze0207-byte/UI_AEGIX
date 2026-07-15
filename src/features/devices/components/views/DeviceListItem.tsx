import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, Clock, ChevronRight } from 'lucide-react';
import { StatusBadge, HealthBadge, RiskBadge, TagBadge } from '../badges/DeviceBadges';

export const DeviceListItem: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/assets/devices/${id}`)}
      className="group flex cursor-pointer items-center justify-between border-b border-neutral-800/50 bg-neutral-900 p-4 transition-all hover:bg-neutral-800/50 last:border-0"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded bg-neutral-800 p-2 text-neutral-400 group-hover:text-primary-400">
            <Laptop className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-neutral-100">LPT-DEV-{id}</h3>
            <span className="text-xs text-neutral-500">{id}</span>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <StatusBadge status="online" />
          <HealthBadge health="good" />
          <RiskBadge risk="low" />
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <TagBadge label="Dept" value="Engineering" />
          <TagBadge label="Site" value="HQ-NYC" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-1.5 text-xs text-neutral-500 xl:flex">
          <Clock className="h-3.5 w-3.5" />
          <span>Last seen: [Last Seen]</span>
        </div>
        <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-neutral-300" />
      </div>
    </div>
  );
};
