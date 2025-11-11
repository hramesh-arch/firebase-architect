import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, MoreVertical, LayoutDashboard, FolderIcon, Settings } from 'lucide-react';

// Material Design: Elevated cards, distinct shadows, FAB buttons, ripple effects (simulated)
export default function MaterialDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  return (
    <div className="min-h-screen bg-gray-100 flex" style={{ fontFamily: typography.fontFamily }}>
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
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MoreVertical className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-2 py-4">
            <nav className="space-y-1">
              {[
                { name: 'Dashboard', icon: LayoutDashboard, active: true },
                { name: 'Projects', icon: FolderIcon },
                { name: 'Analytics', icon: BarChart3 },
                { name: 'Settings', icon: Settings },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded ${
                    item.active
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/10'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
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
                      className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                        i === 0 ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      style={{
                        backgroundColor: i === 0 ? colors.primary : 'transparent'
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

        <div className="flex-1 overflow-auto">
      {/* Material AppBar with elevation */}
      <div
        className="bg-white"
        style={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05)'
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium" style={{ color: colors.primary }}>
              {template.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-gray-50 rounded px-4 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: colors.primary }}
            >
              MU
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Material Cards with elevation-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total Revenue', value: '$45,231', icon: DollarSign, color: colors.primary },
            { label: 'New Users', value: '2,345', icon: Users, color: colors.secondary },
            { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: colors.success },
            { label: 'Conversions', value: '3.24%', icon: BarChart3, color: colors.info },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded"
                  style={{
                    backgroundColor: `${stat.color}15`,
                  }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-1" style={{ fontSize: `${typography.fontSize - 2}px` }}>
                {stat.label}
              </p>
              <p className="text-3xl font-medium" style={{ color: colors.primary }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Card - Material elevation */}
          <div
            className="lg:col-span-2 bg-white p-6 rounded"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Sales Overview</h3>
              <button className="text-sm font-medium" style={{ color: colors.primary }}>
                VIEW ALL
              </button>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: colors.primary
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions - Material style */}
          <div
            className="bg-white p-6 rounded"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {['Create Invoice', 'Add Customer', 'Generate Report', 'View Analytics'].map((action, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 rounded hover:bg-gray-50 transition font-medium text-sm"
                  style={{ color: colors.primary }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Material Data Table */}
        <div
          className="mt-6 bg-white rounded overflow-hidden"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)'
          }}
        >
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#1234', name: 'John Doe', date: 'Dec 10, 2024', amount: '$250.00', status: 'Paid' },
                { id: '#1235', name: 'Jane Smith', date: 'Dec 9, 2024', amount: '$180.00', status: 'Pending' },
                { id: '#1236', name: 'Bob Johnson', date: 'Dec 8, 2024', amount: '$320.00', status: 'Paid' },
              ].map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: colors.primary }}>{row.id}</td>
                  <td className="px-6 py-4 text-sm">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 text-sm font-medium">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: row.status === 'Paid' ? `${colors.success}20` : `${colors.warning}20`,
                        color: row.status === 'Paid' ? colors.success : colors.warning
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Material FAB (Floating Action Button) */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white flex items-center justify-center transition-all hover:scale-110"
        style={{
          backgroundColor: colors.secondary,
          boxShadow: '0 4px 6px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
        }}
      >
        <span className="text-2xl">+</span>
      </button>
        </div>
      </main>
    </div>
  );
}
