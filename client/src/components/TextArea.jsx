import { forwardRef } from 'react';

const TextArea = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label className="text-xs font-bold text-text-muted dark:text-slate-400 px-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`
          w-full rounded-2xl border-2 border-lavender/30 px-4 py-3
          text-xs sm:text-sm text-text-main bg-white/70
          placeholder:text-text-muted/40 transition-all duration-200 resize-none min-h-[100px]
          focus:border-purple focus:outline-none focus:ring-4 focus:ring-purple/15
          dark:bg-slate-900/55 dark:border-white/15 dark:text-white
          dark:placeholder:text-slate-500 dark:focus:border-cyan-400/60
          dark:focus:ring-cyan-400/15
          ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-danger-500 px-2">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
