import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label className="text-xs font-bold text-text-muted dark:text-slate-400 px-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted/60 dark:text-slate-500" />
        )}
        <input
          ref={ref}
          className={`
            w-full liquid-input text-xs sm:text-sm transition-all duration-200
            text-text-main placeholder:text-text-muted/40
            dark:bg-slate-900/55 dark:border-white/15 dark:text-white
            dark:placeholder:text-slate-500 dark:focus:border-cyan-400/60
            dark:focus:ring-cyan-400/15
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger-500 px-2">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
