import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, Grid, LayoutDashboard, FolderIcon, Settings } from 'lucide-react';

// CoreUI: Bootstrap-based, cards with borders, traditional spacing, utility classes feel
export default function CoreUIDashboard({ config, template }) {
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
                <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center" style={{ borderRadius: '4px' }}>
                  <Grid className="w-6 h-6 text-white" />
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
                  className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/10'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{ borderRadius: '4px' }}
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
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center mr-3" style={{ borderRadius: '4px' }}>
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
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center" style={{ borderRadius: '4px' }}>
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
                        borderRadius: '4px'
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded" style={{ borderRadius: '4px' }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {/* Bootstrap-style Header */}
          <div className="bg-white border-b-2" style={{ borderColor: colors.primary }}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
            <div
              className="px-3 py-1 font-bold text-white"
              style={{ backgroundColor: colors.primary, borderRadius: '4px' }}
            >
              CoreUI
            </div>
            <span className="text-sm text-gray-600">Enterprise Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center border border-gray-300 rounded px-3 py-2" style={{ borderRadius: '4px' }}>
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm"
                style={{ width: '200px' }}
              />
            </div>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50" style={{ borderRadius: '4px' }}>
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50" style={{ borderRadius: '4px' }}>
              <Grid className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <a href="#" className="text-blue-600 hover:underline">Home</a>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-700">Dashboard</span>
        </div>
      </div>

      <div className="p-4">
        {/* Bootstrap-style cards with borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: 'Income', value: '$45,231', icon: DollarSign, bg: 'bg-blue-50', iconBg: 'bg-blue-500' },
            { label: 'Users', value: '2,345', icon: Users, bg: 'bg-green-50', iconBg: 'bg-green-500' },
            { label: 'Orders', value: '1,234', icon: BarChart3, bg: 'bg-yellow-50', iconBg: 'bg-yellow-500' },
            { label: 'Growth', value: '+12.5%', icon: TrendingUp, bg: 'bg-red-50', iconBg: 'bg-red-500' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} border border-gray-200 p-4`}
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs uppercase font-semibold mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">Since last month</p>
                </div>
                <div className={`${stat.iconBg} w-14 h-14 rounded flex items-center justify-center`} style={{ borderRadius: '4px' }}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white border border-gray-200 p-4" style={{ borderRadius: '4px' }}>
            <div className="border-b pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-800">Traffic & Sales</h3>
              <p className="text-sm text-gray-600">January - December 2024</p>
            </div>
            <div className="h-64 flex items-end justify-between gap-1">
              {[30, 55, 40, 70, 50, 65, 45, 75, 55, 80, 60, 85].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i % 2 === 0 ? colors.primary : colors.info,
                    borderRadius: '4px 4px 0 0'
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: colors.primary, borderRadius: '2px' }} />
                <span className="text-gray-600">New Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: colors.info, borderRadius: '2px' }} />
                <span className="text-gray-600">Recurring Clients</span>
              </div>
            </div>
          </div>

          {/* Widget List */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 p-4" style={{ borderRadius: '4px' }}>
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Server Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'CPU Usage', value: '45%', color: colors.primary },
                  { label: 'Memory', value: '78%', color: colors.warning },
                  { label: 'Disk Space', value: '32%', color: colors.success },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-gray-700">{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5" style={{ borderRadius: '4px' }}>
                      <div
                        className="h-1.5"
                        style={{
                          width: item.value,
                          backgroundColor: item.color,
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4" style={{ borderRadius: '4px' }}>
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Page Views</span>
                  <span className="font-bold">29,856</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Unique</span>
                  <span className="font-bold">24,093</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Bounce Rate</span>
                  <span className="font-bold">43.52%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap-style Table */}
        <div className="mt-4 bg-white border border-gray-200 overflow-hidden" style={{ borderRadius: '4px' }}>
          <div className="px-4 py-3 border-b bg-gray-50">
            <h3 className="text-base font-bold text-gray-800">Recent Transactions</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'INV-001', customer: 'John Doe', date: 'Dec 10', amount: '$250', status: 'Paid', statusClass: 'bg-green-100 text-green-800' },
                { id: 'INV-002', customer: 'Jane Smith', date: 'Dec 9', amount: '$180', status: 'Pending', statusClass: 'bg-yellow-100 text-yellow-800' },
                { id: 'INV-003', customer: 'Bob Wilson', date: 'Dec 8', amount: '$320', status: 'Paid', statusClass: 'bg-green-100 text-green-800' },
                { id: 'INV-004', customer: 'Alice Brown', date: 'Dec 7', amount: '$450', status: 'Overdue', statusClass: 'bg-red-100 text-red-800' },
              ].map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{row.id}</td>
                  <td className="px-4 py-3">{row.customer}</td>
                  <td className="px-4 py-3 text-gray-600">{row.date}</td>
                  <td className="px-4 py-3 font-bold">{row.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-bold ${row.statusClass}`} style={{ borderRadius: '4px' }}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-3 py-1 text-xs font-semibold text-white hover:opacity-90"
                      style={{ backgroundColor: colors.primary, borderRadius: '4px' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
