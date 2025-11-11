// DashboardGridLayout: Pure structural layout for dashboard with grid of metrics, charts, and tables
// No styling - just structure. Accepts render props for each section.

export default function DashboardGridLayout({
  navigation,
  header,
  metrics,
  charts,
  table,
  sidebar,
  navigationStyle = 'side' // 'side', 'top', 'side-top', 'compact', 'none'
}) {
  const showSideNav = navigationStyle === 'side' || navigationStyle === 'side-top' || navigationStyle === 'compact';
  const showTopNav = navigationStyle === 'top' || navigationStyle === 'side-top';

  return (
    <div className="min-h-screen flex">
      {/* Side Navigation */}
      {showSideNav && navigation && (
        <aside className="flex-shrink-0">
          {navigation}
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top Navigation */}
        {showTopNav && header && (
          <header className="flex-shrink-0">
            {header}
          </header>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Page Header (if no nav header) */}
          {!showTopNav && header && (
            <div className="sticky top-0 z-10">
              {header}
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Metrics Row */}
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics}
              </div>
            )}

            {/* Charts and Sidebar Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts Section */}
              {charts && (
                <div className="lg:col-span-2 space-y-6">
                  {charts}
                </div>
              )}

              {/* Sidebar Widgets */}
              {sidebar && (
                <div className="space-y-6">
                  {sidebar}
                </div>
              )}
            </div>

            {/* Table Section */}
            {table && (
              <div>
                {table}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
