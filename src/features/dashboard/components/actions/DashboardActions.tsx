import React from 'react';
import { ActionCard } from './ActionCard';
import { PlusCircle, Search, Bell, Target, ShieldCheck, FileText, RefreshCw, Settings } from 'lucide-react';

export const DashboardActions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <ActionCard
        title="Add Device"
        description="Enroll a new device to the fleet"
        icon={<PlusCircle className="h-5 w-5" />}
      />
      <ActionCard
        title="Search Devices"
        description="Quickly find devices by ID or tag"
        icon={<Search className="h-5 w-5" />}
      />
      <ActionCard
        title="Alerts"
        description="Review active system and security alerts"
        icon={<Bell className="h-5 w-5" />}
      />
      <ActionCard
        title="Threat Hunting"
        description="Launch a new threat hunting query"
        icon={<Target className="h-5 w-5" />}
      />
      <ActionCard
        title="Compliance"
        description="Run compliance checks across the fleet"
        icon={<ShieldCheck className="h-5 w-5" />}
      />
      <ActionCard
        title="Reports"
        description="Generate new security reports"
        icon={<FileText className="h-5 w-5" />}
      />
      <ActionCard
        title="Refresh Dashboard"
        description="Force reload all dashboard statistics"
        icon={<RefreshCw className="h-5 w-5" />}
      />
      <ActionCard
        title="Settings"
        description="Configure dashboard preferences"
        icon={<Settings className="h-5 w-5" />}
      />
    </div>
  );
};
