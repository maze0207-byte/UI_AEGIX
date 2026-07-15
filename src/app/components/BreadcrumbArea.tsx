export const BreadcrumbArea: React.FC = () => {
  return (
    <div className="h-10 px-6 flex items-center border-b border-neutral-700 bg-neutral-900">
      <nav className="flex items-center space-x-2 text-sm">
        <span className="text-neutral-400">AEGIX</span>
        <span className="text-neutral-600">/</span>
        <span className="text-neutral-100">Overview</span>
      </nav>
    </div>
  );
};