import {
  Plus,
  Filter,
  ChevronDown,
  Maximize2,
  Type,
  Hash,
  CheckSquare,
  Calendar as CalendarIcon,
  Tag,
  Settings,
  Database,
  Home,
  Grid3x3
} from 'lucide-react';

// Airtable: Excel-like Spreadsheet Grid - row numbers, column letters, cell editing, grid lines everywhere
export default function AirtableDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  const columns = [
    { letter: 'A', name: 'Task Name', type: 'text', icon: Type, color: '#3b82f6' },
    { letter: 'B', name: 'Status', type: 'select', icon: Tag, color: '#8b5cf6' },
    { letter: 'C', name: 'Priority', type: 'select', icon: Tag, color: '#f59e0b' },
    { letter: 'D', name: 'Assignee', type: 'text', icon: Type, color: '#10b981' },
    { letter: 'E', name: 'Due Date', type: 'date', icon: CalendarIcon, color: '#ef4444' },
    { letter: 'F', name: 'Progress', type: 'number', icon: Hash, color: '#6366f1' },
  ];

  const rows = [
    { taskName: 'Authentication Implementation', status: 'In Progress', priority: 'High', assignee: 'Sarah Chen', dueDate: '2024-12-15', progress: 75 },
    { taskName: 'Database Schema Design', status: 'In Progress', priority: 'High', assignee: 'Mike Johnson', dueDate: '2024-12-12', progress: 60 },
    { taskName: 'API Documentation', status: 'Todo', priority: 'Medium', assignee: 'Alex Rivera', dueDate: '2024-12-18', progress: 0 },
    { taskName: 'Mobile UI Fixes', status: 'Done', priority: 'Medium', assignee: 'Emma Davis', dueDate: '2024-12-10', progress: 100 },
    { taskName: 'CI/CD Setup', status: 'In Progress', priority: 'High', assignee: 'Chris Lee', dueDate: '2024-12-14', progress: 45 },
    { taskName: 'Performance Testing', status: 'Todo', priority: 'Low', assignee: 'Rachel Park', dueDate: '2024-12-20', progress: 0 },
    { taskName: 'Security Audit', status: 'Todo', priority: 'High', assignee: 'James Kim', dueDate: '2024-12-16', progress: 0 },
  ];

  const statusColors = {
    'Todo': { bg: '#f3f4f6', text: '#6b7280' },
    'In Progress': { bg: '#dbeafe', text: '#3b82f6' },
    'Done': { bg: '#d1fae5', text: '#10b981' }
  };

  const priorityColors = {
    'Low': { bg: '#f3f4f6', text: '#6b7280' },
    'Medium': { bg: '#fed7aa', text: '#f59e0b' },
    'High': { bg: '#fee2e2', text: '#ef4444' }
  };

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav className={`${isCompact ? 'w-16' : 'w-60'} bg-gray-900 text-white flex flex-col`}>
          <div className="px-4 py-4 border-b border-gray-700">
            {!isCompact ? (
              <div>
                <h1 className="text-base font-semibold">{template.name}</h1>
                <p className="text-xs text-gray-400 mt-0.5">{template.framework}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center rounded" style={{
                  backgroundColor: colors.primary
                }}>
                  <Database className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-3">
            <nav className="space-y-1">
              {[
                { name: 'Home', icon: Home },
                { name: 'All Tables', icon: Grid3x3, active: true },
                { name: 'Settings', icon: Settings },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  style={{ borderRadius: `${config.borderRadius}px` }}
                  title={isCompact ? item.name : undefined}
                >
                  <item.icon className={`h-4 w-4 ${isCompact ? 'mx-auto' : 'mr-3'}`} />
                  {!isCompact && item.name}
                </button>
              ))}
            </nav>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col bg-gray-50">
        {/* Top Navigation Bar */}
        {showTopNav && (
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-semibold text-base text-gray-900">{template.name}</h2>
                <nav className="flex items-center gap-2">
                  {['Home', 'All Tables', 'Settings'].map((item, i) => (
                    <button
                      key={i}
                      className={`px-3 py-2 text-sm transition-colors ${
                        i === 1 ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: i === 1 ? colors.primary : 'transparent',
                        borderRadius: `${config.borderRadius}px`
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white border-b border-gray-300 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">Project Tasks</h1>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                Grid view
              </button>
              <button className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                Form
              </button>
              <button className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                Calendar
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 border border-gray-300" style={{ borderRadius: `${config.borderRadius}px` }}>
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 border border-gray-300" style={{ borderRadius: `${config.borderRadius}px` }}>
              <ChevronDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        {/* Spreadsheet Grid */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="min-w-max">
            {/* Column Headers with Letters */}
            <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-400 flex">
              {/* Row number header */}
              <div className="w-12 bg-gray-100 border-r-2 border-gray-400 flex items-center justify-center">
                <div className="w-3 h-3 border border-gray-400" style={{ borderRadius: `${config.borderRadius - 2}px` }} />
              </div>

              {/* Column headers */}
              {columns.map((col, i) => {
                const Icon = col.icon;
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 bg-gray-100 border-r border-gray-300 px-3 py-2 flex flex-col gap-1"
                    style={{ width: i === 0 ? '300px' : '160px' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: col.color }}>
                          {col.letter}
                        </div>
                        <Icon className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="text-xs font-semibold text-gray-700">{col.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{col.type}</div>
                  </div>
                );
              })}
            </div>

            {/* Data Rows with Row Numbers */}
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex border-b border-gray-300 hover:bg-blue-50 transition-colors ${
                  rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {/* Row Number */}
                <div className="w-12 bg-gray-100 border-r-2 border-gray-400 flex items-center justify-center text-xs font-semibold text-gray-600">
                  {rowIndex + 1}
                </div>

                {/* Task Name Cell */}
                <div
                  className="flex-shrink-0 border-r border-gray-300 px-3 py-2 flex items-center"
                  style={{ width: '300px', height: '40px' }}
                >
                  <span className="text-sm text-gray-900">{row.taskName}</span>
                </div>

                {/* Status Cell */}
                <div
                  className="flex-shrink-0 border-r border-gray-300 px-3 py-2 flex items-center"
                  style={{ width: '160px', height: '40px' }}
                >
                  <span
                    className="px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: statusColors[row.status].bg,
                      color: statusColors[row.status].text,
                      borderRadius: `${config.borderRadius}px`
                    }}
                  >
                    {row.status}
                  </span>
                </div>

                {/* Priority Cell */}
                <div
                  className="flex-shrink-0 border-r border-gray-300 px-3 py-2 flex items-center"
                  style={{ width: '160px', height: '40px' }}
                >
                  <span
                    className="px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: priorityColors[row.priority].bg,
                      color: priorityColors[row.priority].text,
                      borderRadius: `${config.borderRadius}px`
                    }}
                  >
                    {row.priority}
                  </span>
                </div>

                {/* Assignee Cell */}
                <div
                  className="flex-shrink-0 border-r border-gray-300 px-3 py-2 flex items-center"
                  style={{ width: '160px', height: '40px' }}
                >
                  <span className="text-sm text-gray-700">{row.assignee}</span>
                </div>

                {/* Due Date Cell */}
                <div
                  className="flex-shrink-0 border-r border-gray-300 px-3 py-2 flex items-center"
                  style={{ width: '160px', height: '40px' }}
                >
                  <span className="text-sm text-gray-600">{row.dueDate}</span>
                </div>

                {/* Progress Cell */}
                <div
                  className="flex-shrink-0 border-r border-gray-300 px-3 py-2 flex items-center"
                  style={{ width: '160px', height: '40px' }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-mono">{row.progress}%</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Row */}
            <div className="flex border-b border-gray-300 bg-white hover:bg-gray-50 cursor-pointer">
              <div className="w-12 bg-gray-100 border-r-2 border-gray-400 flex items-center justify-center text-xs font-semibold text-gray-400">
                {rows.length + 1}
              </div>
              <div className="flex-1 px-3 py-3 flex items-center gap-2 text-gray-500">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add row</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
