import React, { ReactNode } from 'react';
import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';

export interface WidgetProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  className?: string;
  contentClassName?: string;
}

export const Widget: React.FC<WidgetProps> = ({
  title,
  description,
  icon,
  children,
  footer,
  isLoading,
  isEmpty,
  isError,
  onRetry,
  className = '',
  contentClassName = 'p-4',
}) => {
  return (
    <div className={`flex flex-col rounded-md border border-neutral-800 bg-neutral-900 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between border-b border-neutral-800/50 p-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {icon && <div className="text-neutral-400">{icon}</div>}
            <h3 className="text-sm font-semibold tracking-wide text-neutral-200">
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-neutral-500">{description}</p>
          )}
        </div>
      </div>

      {/* Body / Content */}
      <div className={`flex-1 ${contentClassName}`}>
        {isLoading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-4 w-1/3 rounded bg-neutral-800"></div>
            <div className="h-4 w-2/3 rounded bg-neutral-800"></div>
            <div className="h-4 w-1/2 rounded bg-neutral-800"></div>
          </div>
        ) : isError ? (
          <div className="flex h-full flex-col items-center justify-center py-6 text-center text-danger-500">
            <AlertCircle className="mb-2 h-8 w-8 opacity-80" />
            <p className="text-sm font-medium">Failed to load data</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <RefreshCw className="h-3 w-3" /> Retry
              </button>
            )}
          </div>
        ) : isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center py-6 text-center text-neutral-500">
            <Inbox className="mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">No data available</p>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Footer */}
      {footer && !isLoading && !isError && (
        <div className="border-t border-neutral-800/50 bg-neutral-950/30 p-3 text-xs text-neutral-500">
          {footer}
        </div>
      )}
    </div>
  );
};
