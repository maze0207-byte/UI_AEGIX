import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, RefreshCw, Download, Columns } from 'lucide-react';

export interface Column<T> {
  id: string;
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
}

export interface EnterpriseTableProps<T> {
  data: T[];
  columns: Column<T>[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSortChange?: (field: string, order: 'asc' | 'desc') => void;
  onRefresh: () => void;
  onExport: () => void;
  onColumnVisibilityChange?: (columns: string[]) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function EnterpriseTable<T extends { id: string }>({
  data,
  columns,
  total,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onSortChange,
  onRefresh,
  onExport,
  onColumnVisibilityChange,
  isLoading = false,
  emptyMessage = 'No data available',
}: EnterpriseTableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((c) => c.id));
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const handleColumnToggle = (columnId: string) => {
    const newColumns = visibleColumns.includes(columnId)
      ? visibleColumns.filter((c) => c !== columnId)
      : [...visibleColumns, columnId];
    setVisibleColumns(newColumns);
    onColumnVisibilityChange?.(newColumns);
  };

  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return (item[column.accessor] as React.ReactNode) ?? '-';
  };

  const SortableHeader: React.FC<{ column: Column<T> }> = ({ column }) => {
    if (!column.sortable || !onSortChange) {
      return <span className="text-xs font-medium text-neutral-400">{column.header}</span>;
    }

    return (
      <button
        onClick={() => onSortChange(column.id, 'asc')}
        className="flex items-center gap-1 text-left text-xs font-medium text-neutral-400 hover:text-neutral-200"
      >
        {column.header}
      </button>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Table Header with Actions */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-neutral-200">Results</h3>
          <span className="text-xs text-neutral-500">{total} total</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <div className="relative">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="flex items-center gap-2 rounded-sm border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
            >
              <Columns className="h-3.5 w-3.5" />
              Columns
            </button>
            {showColumnSelector && (
              <div className="absolute right-0 mt-1 w-56 rounded-sm border border-neutral-700 bg-neutral-900 p-2 shadow-lg">
                <p className="mb-2 text-xs font-medium text-neutral-400">Toggle columns</p>
                <div className="max-h-64 overflow-y-auto">
                  {columns.map((column) => (
                    <label key={column.id} className="flex items-center gap-2 py-1 text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(column.id)}
                        onChange={() => handleColumnToggle(column.id)}
                        className="rounded border-neutral-600 bg-neutral-800"
                      />
                      {column.header}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-800/50">
              <th className="w-10 px-4 py-2">
                <input type="checkbox" className="rounded border-neutral-600 bg-neutral-800" />
              </th>
              {columns
                .filter((col) => visibleColumns.includes(col.id))
                .map((column) => (
                  <th key={column.id} className={`px-4 py-2 text-left ${column.width ?? ''}`}>
                    <SortableHeader column={column} />
                  </th>
                ))}
              <th className="w-10 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={visibleColumns.length + 2} className="px-4 py-8">
                  <div className="flex flex-col gap-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-full animate-pulse rounded bg-neutral-800"></div>
                    ))}
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + 2} className="px-4 py-8 text-center">
                  <p className="text-sm text-neutral-500">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-neutral-800/30 hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-neutral-600 bg-neutral-800" />
                  </td>
                  {columns
                    .filter((col) => visibleColumns.includes(col.id))
                    .map((column) => (
                      <td key={column.id} className="px-4 py-3 text-sm text-neutral-300">
                        {renderCell(item, column)}
                      </td>
                    ))}
                  <td className="px-4 py-3">
                    <button className="rounded-sm p-1 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900/50 px-4 py-3">
        <div className="text-xs text-neutral-500">
          Showing <span className="font-medium text-neutral-200">{page}</span> to{' '}
          <span className="font-medium text-neutral-200">{pageSize}</span> of{' '}
          <span className="font-medium text-neutral-200">{total}</span> results
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-sm border border-neutral-700 bg-neutral-900 p-1.5 text-neutral-400 hover:bg-neutral-800 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`rounded-sm px-3 py-1 text-xs font-medium ${
                  page === pageNumber
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          {totalPages > 5 && <span className="px-2 text-neutral-600">...</span>}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="rounded-sm border border-neutral-700 bg-neutral-900 p-1.5 text-neutral-400 hover:bg-neutral-800 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}