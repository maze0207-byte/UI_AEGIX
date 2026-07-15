import React from 'react';
import { Bell, Search, Settings, UserCircle2 } from 'lucide-react';
import { useAuth } from '../../features/auth';

interface TopHeaderProps {
  title: string;
}

export const TopHeader = ({ title }: TopHeaderProps): React.ReactElement => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">AEGIX Enterprise</p>
        <h1 className="text-lg font-semibold capitalize text-neutral-100">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 rounded-sm border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-500">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search workspace"
            className="w-48 bg-transparent outline-none placeholder:text-neutral-600"
          />
        </label>

        <button type="button" className="rounded-sm border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 transition-colors hover:text-neutral-100">
          <Bell className="h-4 w-4" />
        </button>

        <button type="button" className="rounded-sm border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 transition-colors hover:text-neutral-100">
          <Settings className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 rounded-sm border border-neutral-800 bg-neutral-950 px-3 py-2">
          <UserCircle2 className="h-5 w-5 text-primary-400" />
          <div className="text-left">
            <p className="text-sm font-medium text-neutral-100">{user?.firstName ?? 'Operator'}</p>
            <p className="text-xs text-neutral-500">{user?.email ?? 'aegix@workspace'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};