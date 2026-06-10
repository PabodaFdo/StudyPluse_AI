import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DashboardCard = ({ icon: Icon, title, description, to, color = 'purple' }) => {
  const navigate = useNavigate();

  const colorMap = {
    purple: 'bg-lavender/20 text-purple border-lavender/30 dark:bg-lavender/10 dark:text-lavender',
    blue: 'bg-blue/30 text-purple border-blue/40 dark:bg-blue/10 dark:text-blue',
    green: 'bg-mint text-text-main border-mint/70 dark:bg-mint/10 dark:text-mint',
    yellow: 'bg-yellow text-text-main border-yellow/70 dark:bg-yellow/10 dark:text-yellow',
    red: 'bg-pink/30 text-danger-500 border-pink/40 dark:bg-pink/10 dark:text-pink',
  };

  return (
    <button
      onClick={() => navigate(to)}
      className="liquid-card liquid-card-hover w-full p-5 text-left cursor-pointer text-text-main dark:text-white"
    >
      <div className="liquid-card-content flex items-start gap-4">
        <div className={`rounded-2xl border ${colorMap[color]} p-3 flex-shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="mb-1 font-bold text-text-main dark:text-white text-sm sm:text-base">{title}</h3>
          <p className="text-xs sm:text-sm text-text-muted dark:text-slate-300 line-clamp-2 leading-relaxed">{description}</p>
        </div>
        <ArrowRight className="mt-2 h-4 w-4 text-text-muted/40 dark:text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-purple flex-shrink-0" />
      </div>
    </button>
  );
};

export default DashboardCard;
