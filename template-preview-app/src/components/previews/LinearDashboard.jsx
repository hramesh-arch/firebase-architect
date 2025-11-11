import {
  Search,
  Command,
  Filter,
  ChevronDown,
  Circle,
  AlertCircle,
  CheckCircle2,
  User,
  Tag,
  Settings,
  Inbox,
  Target,
  Layers,
  Home
} from 'lucide-react';

// Linear: Horizontal Spreadsheet List - NO CARDS, dense rows, monospace IDs, keyboard-first
export default function LinearDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  const issues = [
    { id: 'ENG-2847', title: 'Implement OAuth authentication flow', status: 'in-progress', priority: 'High', assignee: 'JD', labels: ['frontend', 'auth'] },
    { id: 'ENG-2848', title: 'Fix memory leak in data fetching', status: 'in-progress', priority: 'Critical', assignee: 'SM', labels: ['bug', 'backend'] },
    { id: 'ENG-2849', title: 'Add database indexes', status: 'todo', priority: 'Medium', assignee: 'RK', labels: ['database'] },
    { id: 'ENG-2850', title: 'Update API documentation', status: 'todo', priority: 'Low', assignee: 'AL', labels: ['docs'] },
    { id: 'ENG-2851', title: 'Refactor component library', status: 'done', priority: 'Medium', assignee: 'JD', labels: ['frontend'] },
    { id: 'ENG-2852', title: 'Design system tokens migration', status: 'todo', priority: 'Low', assignee: 'CM', labels: ['design'] },
    { id: 'ENG-2853', title: 'Add E2E tests for checkout', status: 'in-progress', priority: 'High', assignee: 'RK', labels: ['testing'] },
    { id: 'ENG-2854', title: 'Implement dark mode', status: 'todo', priority: 'Low', assignee: 'SM', labels: ['frontend'] },
  ];

  const statusConfig = {
    'todo': { icon: Circle, color: '#94a3b8', label: 'Todo' },
    'in-progress': { icon: AlertCircle, color: '#f59e0b', label: 'In Progress' },
    'done': { icon: CheckCircle2, color: '#10b981', label: 'Done' }
  };

  const priorityColors = {
    'Critical': '#ef4444',
    'High': '#f97316',
    'Medium': '#3b82f6',
    'Low': '#6b7280'
  };

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav className={`${isCompact ? 'w-16' : 'w-56'} border-r border-gray-200 flex flex-col bg-white`}>
          <div className="px-4 py-4 border-b border-gray-200">
            {!isCompact ? (
              <div>
                <h1 className="text-base font-semibold text-gray-900">{template.name}</h1>
                <p className="text-xs text-gray-500 mt-0.5">{template.framework}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center" style={{
                  backgroundColor: colors.primary,
                  borderRadius: `${config.borderRadius}px`
                }}>
                  <Layers className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 px-3 py-4">
            <nav className="space-y-0.5">
              {[
                { name: 'Inbox', icon: Inbox, active: true },
                { name: 'My Issues', icon: Circle },
                { name: 'Active', icon: Target },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-2 py-1.5 text-sm font-normal transition-colors ${
                    item.active ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ borderRadius: `${config.borderRadius}px` }}
                  title={isCompact ? item.name : undefined}
                >
                  <item.icon className={`h-4 w-4 ${isCompact ? 'mx-auto' : 'mr-2'}`} />
                  {!isCompact && item.name}
                </button>
              ))}
            </nav>
          </div>

          {!isCompact && (
            <div className="px-3 py-3 border-t border-gray-200">
              <button className="flex items-center w-full px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          )}
          {isCompact && (
            <div className="px-3 py-3 border-t border-gray-200 flex justify-center">
              <Settings className="h-4 w-4 text-gray-600" />
            </div>
          )}
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col bg-white">
        {/* Top Navigation Bar */}
        {showTopNav && (
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-semibold text-base text-gray-900">{template.name}</h2>
                <nav className="flex items-center gap-1">
                  {['Inbox', 'My Issues', 'Active'].map((item, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1.5 text-sm font-normal transition-colors ${
                        i === 0 ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      style={{ borderRadius: `${config.borderRadius}px` }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="w-7 h-7 bg-gray-200 rounded-full" />
            </div>
          </div>
        )}

        {/* Command Bar - Prominent at top */}
        <div className="border-b border-gray-200 bg-gray-50" style={{ padding: `${config.spacing * 1.5}px ${config.spacing * 2}px` }}>
          <div className="relative max-w-3xl">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-500">
              <Command className="w-4 h-4" />
              <span className="text-sm font-mono">K</span>
            </div>
            <input
              type="text"
              placeholder="Type a command or search..."
              className="w-full pl-16 pr-4 py-2.5 border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors font-mono"
              style={{ borderRadius: `${config.borderRadius}px` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Spreadsheet-style Table */}
          <div className="min-w-max">
            {/* Column Headers */}
            <div className="sticky top-0 bg-white border-b border-gray-300 flex text-xs font-medium text-gray-600 uppercase tracking-wide">
              <div className="w-32 px-4 py-2 border-r border-gray-200">ID</div>
              <div className="flex-1 min-w-96 px-4 py-2 border-r border-gray-200">Title</div>
              <div className="w-32 px-4 py-2 border-r border-gray-200">Status</div>
              <div className="w-32 px-4 py-2 border-r border-gray-200">Priority</div>
              <div className="w-32 px-4 py-2 border-r border-gray-200">Assignee</div>
              <div className="flex-1 min-w-48 px-4 py-2">Labels</div>
            </div>

            {/* Issue Rows */}
            {issues.map((issue, i) => {
              const StatusIcon = statusConfig[issue.status].icon;
              return (
                <div
                  key={i}
                  className="flex items-center border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ height: '32px' }}
                >
                  {/* ID - Monospace */}
                  <div className="w-32 px-4 border-r border-gray-100">
                    <span className="text-xs font-mono text-gray-500">{issue.id}</span>
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-96 px-4 border-r border-gray-100">
                    <span className="text-sm text-gray-900">{issue.title}</span>
                  </div>

                  {/* Status - Circle icon inline */}
                  <div className="w-32 px-4 border-r border-gray-100 flex items-center gap-2">
                    <StatusIcon className="w-3.5 h-3.5" style={{ color: statusConfig[issue.status].color }} />
                    <span className="text-xs text-gray-600">{statusConfig[issue.status].label}</span>
                  </div>

                  {/* Priority */}
                  <div className="w-32 px-4 border-r border-gray-100">
                    <span className="text-xs font-medium" style={{ color: priorityColors[issue.priority] }}>
                      {issue.priority}
                    </span>
                  </div>

                  {/* Assignee */}
                  <div className="w-32 px-4 border-r border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
                        {issue.assignee}
                      </div>
                      <span className="text-xs text-gray-600">{issue.assignee}</span>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex-1 min-w-48 px-4 flex items-center gap-1.5">
                    {issue.labels.map((label, j) => (
                      <span
                        key={j}
                        className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 border border-gray-200"
                        style={{ borderRadius: `${config.borderRadius - 2}px` }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Keyboard Shortcuts Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 font-mono" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Command className="w-3 h-3 inline mr-1" />K
                </kbd>
                Search
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 font-mono" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Command className="w-3 h-3 inline mr-1" />N
                </kbd>
                New Issue
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 font-mono" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Command className="w-3 h-3 inline mr-1" />/
                </kbd>
                Commands
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 font-mono" style={{ borderRadius: `${config.borderRadius}px` }}>
                  J/K
                </kbd>
                Navigate
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
