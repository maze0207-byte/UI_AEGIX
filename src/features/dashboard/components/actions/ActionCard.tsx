import React, { ReactNode } from 'react';

export interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        group flex w-full flex-col items-start gap-3 rounded-md border border-neutral-800 bg-neutral-900 p-5 text-left transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950
        ${disabled 
          ? 'cursor-not-allowed opacity-50' 
          : 'hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-800/80 hover:shadow-lg hover:shadow-black/20'
        }
      `}
    >
      <div className={`
        flex items-center justify-center rounded-md bg-neutral-800/50 p-3 text-neutral-400 transition-colors
        ${!disabled && 'group-hover:bg-primary-500/10 group-hover:text-primary-400'}
      `}>
        {icon}
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <h4 className="text-sm font-semibold tracking-wide text-neutral-200">{title}</h4>
        <p className="text-xs leading-relaxed text-neutral-500">{description}</p>
      </div>
    </button>
  );
};
