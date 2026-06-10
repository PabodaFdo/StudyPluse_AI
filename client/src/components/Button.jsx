import { forwardRef } from 'react';

const variants = {
  primary: 'liquid-button',
  liquid:  'liquid-button',
  clay:    'liquid-button',
  secondary:
    'bg-white/60 border-2 border-lavender/30 text-text-main hover:bg-white/90 shadow-sm ' +
    'dark:bg-white/10 dark:border-white/16 dark:text-white dark:hover:bg-white/16',
  ghost:
    'text-text-muted hover:text-purple hover:bg-lavender/10 ' +
    'dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/8',
  danger:
    'bg-danger-500/10 text-danger-500 border-2 border-danger-500/20 hover:bg-danger-500/20 ' +
    'dark:bg-danger-500/15 dark:border-danger-500/30 dark:text-red-400',
  success:
    'bg-success-500/10 text-success-500 border-2 border-success-500/20 hover:bg-success-500/20 ' +
    'dark:bg-success-500/15 dark:border-success-500/30 dark:text-emerald-400',
};

const sizes = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef(
  ({ children, variant = 'liquid', size = 'md', className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition-all duration-250 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant] || variants.liquid} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
