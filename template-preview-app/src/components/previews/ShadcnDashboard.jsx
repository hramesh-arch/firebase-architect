import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, Settings, ChevronDown, LayoutDashboard, FolderIcon } from 'lucide-react';

// Shadcn: Modern minimalist, subtle borders, muted colors, excellent typography, clean spacing
export default function ShadcnDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
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
                <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center">
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
                  className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-md ${
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
                <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center mr-3">
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
              <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
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
                      className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
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
              <div className="w-8 h-8 bg-gray-200 rounded-md" />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
      {/* Clean top border */}
      <div className="border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: colors.primary }}
              >
                S
              </div>
              <span className="font-semibold">Shadcn</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button className="font-medium" style={{ color: colors.primary }}>Dashboard</button>
              <button className="text-gray-600 hover:text-gray-900">Analytics</button>
              <button className="text-gray-600 hover:text-gray-900">Reports</button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center border rounded-md px-3 py-1.5 text-sm">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-40"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Bell className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md hover:bg-gray-50 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                JD
              </div>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Metric Cards - Shadcn style with subtle borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: DollarSign },
            { label: 'Subscriptions', value: '+2,350', change: '+180.1% from last month', icon: Users },
            { label: 'Sales', value: '+12,234', change: '+19% from last month', icon: BarChart3 },
            { label: 'Active Now', value: '+573', change: '+201 since last hour', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-4 border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Overview</h3>
              <p className="text-sm text-gray-600">Monthly revenue trend</p>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[30, 50, 40, 65, 45, 70, 50, 75, 60, 80, 65, 85].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i === 11 ? colors.primary : '#f1f5f9'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="lg:col-span-3 border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Recent Sales</h3>
              <p className="text-sm text-gray-600">You made 265 sales this month</p>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
              ].map((sale, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                    {sale.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{sale.name}</p>
                    <p className="text-xs text-gray-600 truncate">{sale.email}</p>
                  </div>
                  <div className="text-sm font-medium">{sale.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-6 border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Transactions</h3>
            <p className="text-sm text-gray-600 mt-1">A list of your recent transactions</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="px-6 py-3 text-left font-medium text-gray-600">Transaction ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Customer</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TXN-001', customer: 'Emma Wilson', date: 'Dec 10, 2024', amount: '$250.00', status: 'Success' },
                { id: 'TXN-002', customer: 'Liam Brown', date: 'Dec 9, 2024', amount: '$180.00', status: 'Processing' },
                { id: 'TXN-003', customer: 'Noah Davis', date: 'Dec 8, 2024', amount: '$320.00', status: 'Success' },
                { id: 'TXN-004', customer: 'Ava Miller', date: 'Dec 7, 2024', amount: '$450.00', status: 'Failed' },
              ].map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium">{row.id}</td>
                  <td className="px-6 py-4">{row.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 font-medium">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'Success' ? 'bg-green-100 text-green-800' :
                        row.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
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
      </main>
    </div>
  );
}
