const PageHeader = ({ title, subtitle, action, icon: Icon }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-left">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="liquid-icon flex-shrink-0">
            <Icon className="h-5 w-5 text-purple" />
          </div>
        )}
        <div>
          <h1 className="text-lg font-extrabold text-text-main sm:text-xl tracking-tight">{title}</h1>
          {subtitle && <p className="mt-0.5 text-xs text-text-muted font-medium">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0 text-xs">{action}</div>}
    </div>
  );
};

export default PageHeader;
