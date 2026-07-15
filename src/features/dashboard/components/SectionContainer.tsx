import React, { ReactNode } from 'react';

interface SectionContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`rounded-md border border-neutral-800 bg-neutral-900 p-6 ${className}`}>
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-neutral-300 uppercase">
        {title}
      </h2>
      <div className="text-neutral-400">
        {children}
      </div>
    </section>
  );
};
