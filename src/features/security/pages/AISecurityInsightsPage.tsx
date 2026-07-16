import React from 'react';
import { DashboardContainer } from '../../dashboard/components/DashboardContainer';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { SectionContainer } from '../../dashboard/components/SectionContainer';
import { StatCard } from '@/app/StatCard';
import { RiskIndicator } from '../components/RiskIndicator';
import { SectionHeader } from '../components/SectionHeader';
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3, Activity } from 'lucide-react';

export const AISecurityInsightsPage: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <div className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <SectionHeader
            title="AI Security Insights"
            description="Intelligent security analysis and recommendations"
          />

          {/* AI Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Risk Forecast"
              value="72"
              description="Predicted risk score"
              icon={<TrendingUp className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Anomalies Detected"
              value={24}
              description="Behavior anomalies"
              icon={<AlertTriangle className="h-4 w-4 text-warning-500" />}
            />
            <StatCard
              title="Recommendations"
              value={12}
              description="Action items"
              icon={<Lightbulb className="h-4 w-4 text-primary-400" />}
            />
            <StatCard
              title="Threat Score"
              value={<RiskIndicator level="high" score={78} />}
              description="AI threat assessment"
            />
          </div>

          {/* Highest Risk Devices */}
          <SectionContainer title="Highest Risk Devices (AI Ranked)">
            <div className="space-y-3">
              {[
                { hostname: 'WS-ENG-001', risk: 95, reason: 'Unusual process behavior' },
                { hostname: 'SRV-DC-001', risk: 88, reason: 'Network anomalies detected' },
                { hostname: 'LAP-MKT-003', risk: 76, reason: 'Failed login patterns' },
              ].map((device) => (
                <div key={device.hostname} className="flex items-center justify-between rounded-sm border border-neutral-800 bg-neutral-950 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-danger-500/10">
                      <AlertTriangle className="h-5 w-5 text-danger-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-200">{device.hostname}</p>
                      <p className="text-xs text-neutral-500">{device.reason}</p>
                    </div>
                  </div>
                  <RiskIndicator level={device.risk > 90 ? 'critical' : 'high'} score={device.risk} />
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Behavior Anomalies */}
          <SectionContainer title="Behavior Anomalies">
            <div className="space-y-3">
              {[
                { id: '1', device: 'WS-ENG-001', behavior: 'Unusual file encryption activity', confidence: 92 },
                { id: '2', device: 'SRV-DC-001', behavior: 'Abnormal network traffic patterns', confidence: 87 },
                { id: '3', device: 'LAP-MKT-003', behavior: 'Multiple failed authentication attempts', confidence: 78 },
              ].map((anomaly) => (
                <div key={anomaly.id} className="flex items-center justify-between rounded-sm border border-neutral-800 bg-neutral-950 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-warning-500/10">
                      <Activity className="h-5 w-5 text-warning-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-200">{anomaly.behavior}</p>
                      <p className="text-xs text-neutral-500">{anomaly.device}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-200">{anomaly.confidence}%</p>
                    <p className="text-xs text-neutral-500">Confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* AI Recommendations */}
          <SectionContainer title="AI Recommendations">
            <div className="space-y-3">
              {[
                { id: '1', priority: 'critical', action: 'Isolate WS-ENG-001 immediately', reason: 'High risk of ransomware activity' },
                { id: '2', priority: 'high', action: 'Review firewall rules on SRV-DC-001', reason: 'Unusual outbound connections detected' },
                { id: '3', priority: 'medium', action: 'Enable BitLocker on LAP-MKT-003', reason: 'Device encryption not enabled' },
              ].map((rec) => (
                <div key={rec.id} className="rounded-sm border border-neutral-800 bg-neutral-950 p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${rec.priority === 'critical' ? 'bg-danger-500/10' : rec.priority === 'high' ? 'bg-warning-500/10' : 'bg-primary-500/10'}`}>
                      <Lightbulb className={`h-4 w-4 ${rec.priority === 'critical' ? 'text-danger-500' : rec.priority === 'high' ? 'text-warning-500' : 'text-primary-500'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-200">{rec.action}</p>
                      <p className="text-xs text-neutral-500 mt-1">{rec.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>

          {/* Security Trends (AI Predicted) */}
          <SectionContainer title="Security Trends (AI Predicted)">
            <div className="h-48 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-600 mx-auto mb-2" />
                <p className="text-sm text-neutral-400">AI-powered trend analysis chart</p>
                <p className="text-xs text-neutral-500 mt-1">Predicted 15% increase in threats next week</p>
              </div>
            </div>
          </SectionContainer>
        </div>
      </DashboardLayout>
    </DashboardContainer>
  );
};