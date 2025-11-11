import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, ChevronDown, LayoutDashboard, FolderIcon, Settings } from 'lucide-react';

// Ant Design: Square corners, blue theme, breadcrumbs, specific border styles, compact spacing
export default function AntDesignDashboard({ config, template }) {
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
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center" style={{ borderRadius: '2px' }}>
                  <Menu className="w-6 h-6 text-white" />
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
                  style={{ borderRadius: '2px' }}
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
                <div className="w-8 h-8 bg-white/20 flex items-center justify-center mr-3" style={{ borderRadius: '2px' }}>
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
              <div className="w-8 h-8 bg-white/20 flex items-center justify-center" style={{ borderRadius: '2px' }}>
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
                        borderRadius: '2px'
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="w-8 h-8 bg-gray-200" style={{ borderRadius: '2px' }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
      {/* Ant Design Header - white bg, bottom border */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div
              className="w-8 h-8 flex items-center justify-center font-bold text-white text-lg"
              style={{ backgroundColor: colors.primary }}
            >
              A
            </div>
            <h1 className="text-base font-semibold">{template.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center border border-gray-300 rounded px-3 py-1.5">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-40"
              />
            </div>
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                style={{ backgroundColor: colors.error, fontSize: '10px' }}
              >
                3
              </span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer rounded">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                AD
              </div>
              <span className="text-sm hidden sm:inline">Admin</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb - typical Ant Design pattern */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span style={{ color: colors.primary }}>Dashboard</span>
        </div>
      </div>

      <div className="p-6">
        {/* Ant Design Cards - square corners, subtle shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, trend: 'up' },
            { label: 'Active Users', value: '2,345', change: '+12.5%', icon: Users, trend: 'up' },
            { label: 'Orders', value: '1,234', change: '+8.2%', icon: BarChart3, trend: 'up' },
            { label: 'Growth Rate', value: '3.24%', change: '+4.3%', icon: TrendingUp, trend: 'up' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 border border-gray-200"
              style={{ borderRadius: '2px' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: stat.trend === 'up' ? colors.success : colors.error }}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart - Ant Design style */}
          <div className="lg:col-span-2 bg-white p-6 border border-gray-200" style={{ borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-base font-semibold">Sales Trend</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs border border-gray-300 hover:border-blue-500 hover:text-blue-500">Week</button>
                <button
                  className="px-3 py-1 text-xs text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Month
                </button>
                <button className="px-3 py-1 text-xs border border-gray-300 hover:border-blue-500 hover:text-blue-500">Year</button>
              </div>
            </div>
            <div className="h-56 flex items-end justify-between gap-1.5">
              {[35, 60, 40, 75, 50, 65, 45, 80, 55, 70, 60, 85].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i === 11 ? colors.primary : '#e6f7ff',
                    borderRadius: '2px 2px 0 0'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress Cards */}
          <div className="bg-white p-6 border border-gray-200" style={{ borderRadius: '2px' }}>
            <h3 className="text-base font-semibold mb-4 pb-4 border-b border-gray-200">Performance</h3>
            <div className="space-y-5">
              {[
                { label: 'Sales Target', value: 75, color: colors.primary },
                { label: 'Customer Satisfaction', value: 88, color: colors.success },
                { label: 'Task Completion', value: 62, color: colors.warning },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2" style={{ borderRadius: '2px' }}>
                    <div
                      className="h-2 transition-all"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ant Design Table - distinctive styling */}
        <div className="mt-6 bg-white border border-gray-200 overflow-hidden" style={{ borderRadius: '2px' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-semibold">Recent Orders</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Order ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-2024-001', customer: 'Alice Johnson', date: '2024-12-10', amount: '$299.00', status: 'Success' },
                { id: '#ORD-2024-002', customer: 'Bob Smith', date: '2024-12-10', amount: '$149.00', status: 'Processing' },
                { id: '#ORD-2024-003', customer: 'Carol White', date: '2024-12-09', amount: '$499.00', status: 'Success' },
                { id: '#ORD-2024-004', customer: 'David Lee', date: '2024-12-09', amount: '$199.00', status: 'Pending' },
              ].map((order, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium" style={{ color: colors.primary }}>{order.id}</td>
                  <td className="px-6 py-3">{order.customer}</td>
                  <td className="px-6 py-3 text-gray-600">{order.date}</td>
                  <td className="px-6 py-3 font-medium">{order.amount}</td>
                  <td className="px-6 py-3">
                    <span
                      className="px-2 py-1 text-xs"
                      style={{
                        backgroundColor: order.status === 'Success' ? `${colors.success}15` :
                                       order.status === 'Processing' ? `${colors.primary}15` : `${colors.warning}15`,
                        color: order.status === 'Success' ? colors.success :
                               order.status === 'Processing' ? colors.primary : colors.warning,
                        borderRadius: '2px'
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      className="text-xs hover:underline"
                      style={{ color: colors.primary }}
                    >
                      View Details
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
