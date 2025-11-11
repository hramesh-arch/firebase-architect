import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Download,
  Play,
  Eye,
  Trash2,
  BarChart3,
  FileText
} from 'lucide-react';

// MedRefills: Professional healthcare UI with teal brand color, clean cards, data-dense tables, enterprise focus
export default function MedRefillsDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav
          className={`${isCompact ? 'w-20' : 'w-64'} shadow-xl flex flex-col`}
          style={{
            background: `linear-gradient(to bottom, ${colors.primary}, ${colors.primary}dd, ${colors.primary}aa)`
          }}
        >
          {/* Logo */}
          <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            {!isCompact ? (
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">
                  {template.name}
                </h1>
                <p className="text-xs text-white/70 font-medium">{template.framework}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-2 py-4">
            <nav className="space-y-1">
              {[
                { name: 'Dashboard', icon: FileText, active: true },
                { name: 'Projects', icon: Users },
                { name: 'Analytics', icon: BarChart3 },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/10'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{ borderRadius: `${config.borderRadius}px` }}
                  title={isCompact ? item.name : undefined}
                >
                  <item.icon className={`h-5 w-5 ${isCompact ? 'mx-auto' : 'mr-3'} ${
                    item.active ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`} />
                  {!isCompact && item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* User Profile */}
          {!isCompact && (
            <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-white/70">Development Team</p>
                </div>
              </div>
            </div>
          )}
          {isCompact && (
            <div className="px-3 py-4 border-t flex justify-center" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Navigation Bar */}
        {showTopNav && (
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-bold text-lg" style={{ color: colors.primary }}>{template.name}</h2>
                <nav className="flex items-center gap-4">
                  {['Dashboard', 'Projects', 'Analytics', 'Settings'].map((item, i) => (
                    <button
                      key={i}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        i === 0 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      style={{
                        backgroundColor: i === 0 ? colors.primary : 'transparent',
                        borderRadius: `${config.borderRadius}px`
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full" style={{ borderRadius: `${config.borderRadius}px` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1600px] mx-auto space-y-6" style={{ padding: `${config.spacing * 1.5}px` }}>
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Process and monitor medication refill batches with AI-powered analysis
              </p>
            </div>
            <button
              className="flex items-center px-4 py-2 font-medium text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: colors.primary,
                borderRadius: `${config.borderRadius}px`,
                fontSize: `${config.typography.fontSize}px`
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New EMR Pull
            </button>
          </div>

          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Total Projects', value: '24', subtext: '3 ready • 2 active', icon: FileText, borderColor: colors.primary },
              { label: 'Completion Rate', value: '87.3%', subtext: '204 done • 29 pending', icon: CheckCircle, borderColor: colors.success },
              { label: 'Team Members', value: '156', subtext: '12 new this month', icon: Users, borderColor: colors.info },
              { label: 'Avg Velocity', value: '42.5', subtext: 'Story points per sprint', icon: TrendingUp, borderColor: colors.warning },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-200 shadow-sm border-l-4" style={{
                borderRadius: `${config.borderRadius}px`,
                borderLeftColor: stat.borderColor,
                padding: `${config.spacing}px`
              }}>
                <div style={{ padding: `${config.spacing * 0.75}px` }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                    </div>
                    <div className="flex items-center justify-center flex-shrink-0" style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: `${stat.borderColor}20`,
                      borderRadius: `${config.borderRadius}px`
                    }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.borderColor }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar Section */}
          <div className="bg-white border border-gray-200 shadow-sm" style={{ borderRadius: `${config.borderRadius}px` }}>
            <div style={{ padding: `${config.spacing}px` }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Left side - Search and Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2"
                      style={{
                        borderRadius: `${config.borderRadius}px`,
                        fontSize: `${config.typography.fontSize}px`
                      }}
                    />
                  </div>

                  {/* Status Filter */}
                  <select className="min-w-[150px] px-3 py-2 border border-gray-300 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2" style={{
                    borderRadius: `${config.borderRadius}px`,
                    fontSize: `${config.typography.fontSize}px`
                  }}>
                    <option>All Status</option>
                    <option>Ready to Process</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>

                  {/* Filter Toggle */}
                  <button className="flex items-center px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" style={{
                    borderRadius: `${config.borderRadius}px`,
                    fontSize: `${config.typography.fontSize}px`
                  }}>
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </button>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" style={{
                    borderRadius: `${config.borderRadius}px`,
                    fontSize: `${config.typography.fontSize}px`
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors" style={{
                    borderRadius: `${config.borderRadius}px`,
                    fontSize: `${config.typography.fontSize}px`
                  }}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table - Dense, Professional */}
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden" style={{ borderRadius: `${config.borderRadius}px` }}>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: `${config.typography.fontSize}px` }}>
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                      <input type="checkbox" className="rounded w-4 h-4" />
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">Batch ID</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">Created</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-700 text-xs uppercase tracking-wider">Patients</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-700 text-xs uppercase tracking-wider">Approved</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-700 text-xs uppercase tracking-wider">Denied</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700 text-xs uppercase tracking-wider">Processing (s)</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: 'PRJ-001', date: 'Dec 10, 2:34 PM', status: 'Active', items: 50, completed: 43, pending: 7, time: '38.2', statusColor: colors.primary },
                    { id: 'PRJ-002', date: 'Dec 10, 1:15 PM', status: 'In Progress', items: 45, completed: 32, pending: 4, time: '—', statusColor: colors.info },
                    { id: 'PRJ-003', date: 'Dec 9, 4:22 PM', status: 'Completed', items: 62, completed: 58, pending: 4, time: '42.7', statusColor: colors.success },
                    { id: 'PRJ-004', date: 'Dec 9, 11:03 AM', status: 'Planning', items: 38, completed: 0, pending: 0, time: '—', statusColor: colors.warning },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors" style={{ height: `${config.spacing * 3}px` }}>
                      <td className="px-3 py-2">
                        <input type="checkbox" className="rounded w-4 h-4" />
                      </td>
                      <td className="px-3 py-2">
                        <div className="font-medium text-gray-900">{row.id}</div>
                      </td>
                      <td className="px-3 py-2 text-gray-700">{row.date}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium" style={{
                          backgroundColor: `${row.statusColor}20`,
                          color: row.statusColor,
                          borderRadius: `${config.borderRadius}px`,
                          border: `1px solid ${row.statusColor}40`
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center text-gray-900 font-medium">{row.items}</td>
                      <td className="px-3 py-2 text-center font-medium" style={{ color: colors.success }}>{row.completed}</td>
                      <td className="px-3 py-2 text-center font-medium" style={{ color: colors.error }}>{row.pending}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{row.time}</td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button className="p-1.5 text-gray-600 hover:bg-gray-100 transition-colors" title="View" style={{ borderRadius: `${config.borderRadius}px` }}>
                            <Eye className="h-4 w-4" />
                          </button>
                          {row.status === 'Planning' && (
                            <button className="p-1.5 hover:bg-green-50 transition-colors" title="Start" style={{ color: colors.success, borderRadius: `${config.borderRadius}px` }}>
                              <Play className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-1.5 hover:bg-red-50 transition-colors" title="Delete" style={{ color: colors.error, borderRadius: `${config.borderRadius}px` }}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

            {/* Keyboard Shortcuts Info */}
            <div className="text-xs text-gray-500 flex items-center justify-center space-x-4">
              <span>Keyboard shortcuts:</span>
              <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">⌘K</kbd> Search
              <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">⌘N</kbd> New Batch
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
