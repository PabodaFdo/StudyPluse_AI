import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen text-text-main dark:text-white transition-colors duration-300">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Top Nav & Drawer */}
      <MobileNav />

      {/* Main Content Area */}
      <div className="lg:pl-64 pt-14 lg:pt-0">
        {/* Subtle overlay for dark mode so ocean doesn't dominate content */}
        <div className="min-h-screen dark:bg-slate-950/25">
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
