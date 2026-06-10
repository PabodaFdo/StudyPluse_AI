const StatCard = ({ icon: Icon, label, value, change, changeType = 'positive' }) => {
  return (
    <div className="liquid-card liquid-card-hover p-6">
      <div className="liquid-card-content space-y-4">
        <div className="flex items-start justify-between">
          <div className="liquid-icon">
            <Icon className="h-5 w-5 text-purple dark:text-cyan-400" />
          </div>
          {change !== undefined && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                changeType === 'positive'
                  ? 'bg-mint text-text-main border border-mint/50 dark:bg-mint/15 dark:text-mint dark:border-mint/30'
                  : 'bg-pink/40 text-danger-500 border border-pink/50 dark:bg-pink/15 dark:text-pink dark:border-pink/30'
              }`}
            >
              {changeType === 'positive' ? '+' : ''}{change}%
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-main dark:text-white tracking-tight">{value}</p>
          <p className="mt-1 text-xs sm:text-sm font-bold text-text-muted dark:text-slate-300">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
