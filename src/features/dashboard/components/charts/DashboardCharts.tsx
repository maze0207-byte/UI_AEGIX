import React from 'react';
import { ChartContainer, type ChartContainerProps } from './ChartContainer';
import { LineChart, BarChart2, PieChart, TrendingUp } from 'lucide-react';

const ChartPlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded border border-dashed border-neutral-700 bg-neutral-900/50 text-xs text-neutral-500">
    [{label} Area Placeholder]
  </div>
);

const ToolbarPlaceholder: React.FC = () => (
  <div className="flex gap-2">
    <span className="rounded bg-neutral-800 px-2 py-1 text-xs">[Toolbar]</span>
  </div>
);

const LegendPlaceholder: React.FC = () => (
  <div className="flex gap-4">
    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary-500"></span>[Legend Item]</span>
    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-neutral-500"></span>[Legend Item]</span>
  </div>
);

export const LineChartWidget: React.FC<Omit<ChartContainerProps, 'title'>> = (props) => (
  <ChartContainer
    title="Line Chart Overview"
    icon={<LineChart className="h-4 w-4" />}
    toolbar={<ToolbarPlaceholder />}
    legend={<LegendPlaceholder />}
    {...props}
  >
    <ChartPlaceholder label="Line Chart" />
  </ChartContainer>
);

export const BarChartWidget: React.FC<Omit<ChartContainerProps, 'title'>> = (props) => (
  <ChartContainer
    title="Bar Chart Overview"
    icon={<BarChart2 className="h-4 w-4" />}
    toolbar={<ToolbarPlaceholder />}
    legend={<LegendPlaceholder />}
    {...props}
  >
    <ChartPlaceholder label="Bar Chart" />
  </ChartContainer>
);

export const PieChartWidget: React.FC<Omit<ChartContainerProps, 'title'>> = (props) => (
  <ChartContainer
    title="Pie Chart Overview"
    icon={<PieChart className="h-4 w-4" />}
    toolbar={<ToolbarPlaceholder />}
    legend={<LegendPlaceholder />}
    {...props}
  >
    <ChartPlaceholder label="Pie Chart" />
  </ChartContainer>
);

export const TrendWidget: React.FC<Omit<ChartContainerProps, 'title'>> = (props) => (
  <ChartContainer
    title="Trend Analysis"
    icon={<TrendingUp className="h-4 w-4" />}
    toolbar={<ToolbarPlaceholder />}
    {...props}
  >
    <ChartPlaceholder label="Trend Widget" />
  </ChartContainer>
);
