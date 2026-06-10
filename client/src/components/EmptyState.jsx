import { FolderOpen } from 'lucide-react';

const EmptyState = ({ icon: Icon = FolderOpen, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 px-6 text-center">
      <div className="mb-4 rounded-2xl bg-white/5 p-4">
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-300">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && action}
    </div>
  );
};

export default EmptyState;
