import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable theme toggle button.
 * Renders a Sun icon in dark mode (click → switch to light)
 * and a Moon icon in light mode (click → switch to dark).
 * Props:
 *   size  — 'sm' | 'md' (default 'md')
 *   label — show "Light" / "Dark" text beside icon (default false)
 */
const ThemeToggle = ({ size = 'md', label = false }) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  const sizeClasses =
    size === 'sm'
      ? 'w-8 h-8 text-xs'
      : 'w-9 h-9 text-sm';

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        theme-toggle-btn inline-flex items-center justify-center gap-1.5 rounded-full
        border transition-all duration-200 cursor-pointer flex-shrink-0
        ${label ? 'px-3' : ''}
        ${sizeClasses}
        border-lavender/30 bg-white/60 text-text-muted
        hover:text-purple hover:border-lavender/60 hover:bg-white/90
        dark:border-white/15 dark:bg-white/8 dark:text-slate-300
        dark:hover:text-cyan-300 dark:hover:border-cyan-300/40 dark:hover:bg-white/12
        backdrop-blur-sm shadow-sm
      `}
    >
      {isDark ? <Sun className={iconSize} /> : <Moon className={iconSize} />}
      {label && (
        <span className="font-bold text-[10px] leading-none">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
