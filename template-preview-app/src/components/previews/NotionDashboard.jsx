import {
  Search,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Calendar,
  User,
  Tag,
  FileText,
  FolderOpen,
  Star,
  Clock,
  Settings,
  Home,
  ChevronDown,
  Hash,
  Type,
  UserCircle
} from 'lucide-react';

// Notion: Full-Page Database Table - breadcrumbs, property icons, emoji headers, editable blocks
export default function NotionDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  const rows = [
    { emoji: '🔐', name: 'Authentication System', status: 'In Progress', assignee: 'Sarah Chen', tags: ['Frontend', 'Auth'], date: 'Dec 15' },
    { emoji: '🗄️', name: 'Database Migration', status: 'In Progress', assignee: 'Mike Johnson', tags: ['Backend', 'Database'], date: 'Dec 12' },
    { emoji: '📚', name: 'API Documentation', status: 'Not Started', assignee: 'Alex Rivera', tags: ['Docs'], date: 'Dec 18' },
    { emoji: '📱', name: 'Mobile Responsiveness', status: 'Completed', assignee: 'Emma Davis', tags: ['Frontend', 'Bug'], date: 'Dec 10' },
    { emoji: '⚙️', name: 'CI/CD Pipeline', status: 'In Progress', assignee: 'Chris Lee', tags: ['DevOps'], date: 'Dec 14' },
    { emoji: '⚡', name: 'Query Optimization', status: 'Not Started', assignee: 'Rachel Park', tags: ['Backend', 'Performance'], date: 'Dec 20' },
  ];

  const statusConfig = {
    'Not Started': { color: '#9ca3af', bg: '#f3f4f6' },
    'In Progress': { color: '#3b82f6', bg: '#dbeafe' },
    'Completed': { color: '#10b981', bg: '#d1fae5' },
  };

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav className={`${isCompact ? 'w-16' : 'w-60'} bg-gray-50 border-r border-gray-200 flex flex-col`}>
          <div className="px-3 py-3 border-b border-gray-200">
            {!isCompact ? (
              <button className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-gray-100 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-sm">📋</div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-900">{template.name}</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center text-lg">📋</div>
              </div>
            )}
          </div>

          <div className="flex-1 px-2 py-3 overflow-auto">
            <nav className="space-y-0.5">
              {[
                { name: 'Home', emoji: '🏠' },
                { name: 'Projects', emoji: '📁', active: true },
                { name: 'Tasks', emoji: '✓' },
                { name: 'Calendar', emoji: '📅' },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-2 py-1 text-sm transition-colors ${
                    item.active ? 'text-gray-900 bg-gray-200' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{ borderRadius: `${config.borderRadius}px` }}
                  title={isCompact ? item.name : undefined}
                >
                  <span className={`text-base ${isCompact ? 'mx-auto' : 'mr-2'}`}>{item.emoji}</span>
                  {!isCompact && <span className="font-normal">{item.name}</span>}
                </button>
              ))}
            </nav>

            {!isCompact && (
              <>
                <div className="px-2 py-2 mt-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Favorites
                  </div>
                </div>
                <nav className="space-y-0.5">
                  {['Sprint Planning', 'Design System', 'Team Wiki'].map((page, i) => (
                    <button
                      key={i}
                      className="group flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      style={{ borderRadius: `${config.borderRadius}px` }}
                    >
                      <FileText className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-normal flex-1 text-left truncate">{page}</span>
                    </button>
                  ))}
                </nav>
              </>
            )}
          </div>

          {!isCompact && (
            <div className="px-2 py-3 border-t border-gray-200">
              <button className="flex items-center w-full px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          )}
          {isCompact && (
            <div className="px-2 py-3 border-t border-gray-200 flex justify-center">
              <Settings className="w-4 h-4 text-gray-700" />
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
                <div className="flex items-center gap-2">
                  <span className="text-lg">📋</span>
                  <h2 className="font-semibold text-base text-gray-900">{template.name}</h2>
                </div>
                <nav className="flex items-center gap-1">
                  {['Home', 'Projects', 'Tasks', 'Calendar'].map((item, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        i === 1 ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:bg-gray-50'
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

        <div className="flex-1 overflow-auto">
          {/* Full-width page container */}
          <div className="w-full" style={{ padding: `${config.spacing * 3}px ${config.spacing * 4}px` }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
              <span>📁</span>
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Projects</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Active Tasks</span>
            </div>

            {/* Cover Image */}
            <div
              className="w-full h-40 mb-8"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}50 0%, ${colors.primary}20 100%)`,
                borderRadius: `${config.borderRadius}px`
              }}
            />

            {/* Page Title with Emoji */}
            <div className="flex items-start gap-4 mb-8">
              <span className="text-6xl">🎯</span>
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-gray-900 mb-3">Active Tasks</h1>
                <p className="text-base text-gray-500">
                  Project management and task tracking database
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Calendar className="w-4 h-4" />
                  Sort
                </button>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 text-gray-700 hover:border-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                    style={{ borderRadius: `${config.borderRadius}px` }}
                  />
                </div>
              </div>
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white transition-colors"
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: `${config.borderRadius}px`
                }}
              >
                <Plus className="w-4 h-4" />
                New
              </button>
            </div>

            {/* Full-Page Database Table */}
            <div className="border border-gray-200" style={{ borderRadius: `${config.borderRadius}px` }}>
              {/* Table Header with Property Icons */}
              <div className="bg-gray-50 border-b border-gray-200 flex text-xs font-medium text-gray-600">
                <div className="w-12 px-3 py-3 border-r border-gray-200" />
                <div className="flex-1 px-4 py-3 border-r border-gray-200 flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-gray-400" />
                  <span>Name</span>
                </div>
                <div className="w-40 px-4 py-3 border-r border-gray-200 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span>Status</span>
                </div>
                <div className="w-52 px-4 py-3 border-r border-gray-200 flex items-center gap-2">
                  <UserCircle className="w-3.5 h-3.5 text-gray-400" />
                  <span>Assignee</span>
                </div>
                <div className="w-56 px-4 py-3 border-r border-gray-200 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span>Tags</span>
                </div>
                <div className="w-36 px-4 py-3 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Date</span>
                </div>
              </div>

              {/* Table Rows with Alternating Background */}
              {rows.map((row, i) => (
                <div
                  key={i}
                  className={`border-b border-gray-100 last:border-b-0 flex hover:bg-gray-50 transition-colors group ${
                    i % 2 === 1 ? 'bg-gray-25' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <div className="w-12 px-3 py-3 border-r border-gray-100 flex items-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  </div>

                  {/* Name with Emoji */}
                  <div className="flex-1 px-4 py-3 border-r border-gray-100 flex items-center gap-2">
                    <span className="text-xl">{row.emoji}</span>
                    <span className="text-sm text-gray-900 font-normal">{row.name}</span>
                  </div>

                  {/* Status Pill */}
                  <div className="w-40 px-4 py-3 border-r border-gray-100 flex items-center">
                    <span
                      className="inline-flex items-center px-3 py-1 text-xs font-medium"
                      style={{
                        color: statusConfig[row.status].color,
                        backgroundColor: statusConfig[row.status].bg,
                        borderRadius: `${config.borderRadius}px`
                      }}
                    >
                      {row.status}
                    </span>
                  </div>

                  {/* Assignee with Avatar */}
                  <div className="w-52 px-4 py-3 border-r border-gray-100 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                      {row.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-700">{row.assignee}</span>
                  </div>

                  {/* Tags - Multi Pills */}
                  <div className="w-56 px-4 py-3 border-r border-gray-100 flex items-center gap-1.5 flex-wrap">
                    {row.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200"
                        style={{ borderRadius: `${config.borderRadius}px` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="w-36 px-4 py-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">{row.date}</span>
                  </div>
                </div>
              ))}

              {/* Add Row Button */}
              <button className="w-full px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New row
              </button>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-xs text-gray-500 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>{rows.length} rows</span>
                <span>•</span>
                <span>Last edited: Today at 2:45 PM</span>
              </div>
              <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
