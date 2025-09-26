'use client';

interface StatusBadgeProps {
  status: 'available' | 'busy' | 'offline' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return { label: 'Available', className: 'status-available' };
      case 'busy':
        return { label: 'Busy', className: 'status-busy' };
      case 'offline':
        return { label: 'Offline', className: 'status-offline' };
      case 'open':
        return { label: 'Open', className: 'status-open' };
      case 'in_progress':
        return { label: 'In Progress', className: 'status-in-progress' };
      case 'completed':
        return { label: 'Completed', className: 'status-completed' };
      case 'cancelled':
        return { label: 'Cancelled', className: 'bg-red-500 text-white' };
      default:
        return { label: status, className: 'bg-gray-500 text-white' };
    }
  };

  const { label, className } = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`${className} ${sizeClasses} rounded-full font-medium`}>
      {label}
    </span>
  );
}
