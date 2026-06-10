import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ label, error, options = [], placeholder, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label className="text-xs font-bold text-text-muted dark:text-slate-400 px-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full appearance-none rounded-full border-2 border-lavender/30 px-4 py-2.5 pr-10
            text-xs sm:text-sm text-text-main bg-white/70
            transition-all duration-200 focus:bg-white
            focus:border-purple focus:outline-none focus:ring-4 focus:ring-purple/15
            dark:bg-slate-900/55 dark:border-white/15 dark:text-white
            dark:focus:border-cyan-400/60 dark:focus:ring-cyan-400/15 dark:focus:bg-slate-900/80
            ${error ? 'border-danger-500' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="dark:bg-slate-900 dark:text-white">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-text-main dark:bg-slate-900 dark:text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted dark:text-slate-400" />
      </div>
      {error && <p className="text-xs text-danger-500 px-2">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
