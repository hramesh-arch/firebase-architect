import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, ChevronDown, ArrowUp, LayoutDashboard, FolderIcon, Settings } from 'lucide-react';

// TailAdmin: Modern Tailwind, gradient accents, glassmorphism effects, larger border radius
export default function TailAdminDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  return (
    <div className="min-h-screen flex" style={{ fontFamily: typography.fontFamily, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
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
                  className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl ${
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
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mr-3">
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
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
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
          <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 flex-shrink-0">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-bold text-lg text-white">{template.name}</h2>
                <nav className="flex items-center gap-4">
                  {['Dashboard', 'Projects', 'Analytics', 'Settings'].map((item, i) => (
                    <button
                      key={i}
                      className={`px-3 py-2 text-sm font-medium transition-colors rounded-xl ${
                        i === 0 ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-xl" />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
        {/* Top Bar with glassmorphism */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-white">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                <Search className="w-4 h-4 text-white/60 mr-3" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-white/50 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition border border-white/20">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  JD
                </div>
                <ChevronDown className="w-4 h-4 text-white/70" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Gradient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, gradient: 'from-blue-500 to-cyan-500' },
              { label: 'Active Users', value: '2,345', change: '+12.5%', icon: Users, gradient: 'from-purple-500 to-pink-500' },
              { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: BarChart3, gradient: 'from-green-500 to-emerald-500' },
              { label: 'Growth', value: '3.24%', change: '+4.3%', icon: TrendingUp, gradient: 'from-orange-500 to-red-500' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl text-white shadow-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium bg-white/20 px-2 py-1 rounded-lg">
                    <ArrowUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Card */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Revenue Analytics</h3>
                <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 65, 90].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-xl transition-all hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      background: i === 11
                        ? 'linear-gradient(to top, #3b82f6, #8b5cf6)'
                        : 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Activity</h3>
              <div className="space-y-4">
                {[
                  { user: 'Sarah K', action: 'New order placed', time: '2m ago', avatar: 'SK' },
                  { user: 'Mike R', action: 'Payment received', time: '15m ago', avatar: 'MR' },
                  { user: 'Anna P', action: 'Profile updated', time: '1h ago', avatar: 'AP' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.user}</p>
                      <p className="text-white/60 text-xs">{activity.action}</p>
                    </div>
                    <span className="text-white/50 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modern Table */}
          <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/20">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-6 py-4 text-left font-medium text-white/80">ID</th>
                    <th className="px-6 py-4 text-left font-medium text-white/80">Customer</th>
                    <th className="px-6 py-4 text-left font-medium text-white/80">Amount</th>
                    <th className="px-6 py-4 text-left font-medium text-white/80">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#1234', customer: 'John Doe', amount: '$250.00', status: 'Completed' },
                    { id: '#1235', customer: 'Jane Smith', amount: '$180.00', status: 'Processing' },
                    { id: '#1236', customer: 'Bob Johnson', amount: '$320.00', status: 'Completed' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white">{row.id}</td>
                      <td className="px-6 py-4 text-white/80">{row.customer}</td>
                      <td className="px-6 py-4 font-semibold text-white">{row.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            row.status === 'Completed'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
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
        </div>
        </div>
      </main>
    </div>
  );
}
