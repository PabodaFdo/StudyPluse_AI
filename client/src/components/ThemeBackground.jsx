import { useTheme } from '../context/ThemeContext';

const ThemeBackground = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`theme-bg ${
        theme === 'dark' ? 'theme-bg-dark-static' : 'theme-bg-light-static'
      }`}
      aria-hidden="true"
    />
  );
};

export default ThemeBackground;
