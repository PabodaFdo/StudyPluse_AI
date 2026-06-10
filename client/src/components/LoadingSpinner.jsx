import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className={`${sizeMap[size]} animate-spin text-brand-400`} />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
