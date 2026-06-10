import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import ThemeBackground from './components/ThemeBackground';

function App() {
  return (
    <ThemeProvider>
      <ThemeBackground />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
