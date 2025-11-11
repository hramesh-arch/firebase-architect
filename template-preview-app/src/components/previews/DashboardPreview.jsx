import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Settings, Menu } from 'lucide-react';

export default function DashboardPreview({ config, template }) {
  const { colors, typography, borderRadius, spacing } = config;

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: typography.fontFamily }}
    >
      {/* Top Navigation Bar */}
      <div
        className="bg-white border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" style={{ color: colors.primary }} />
            </button>
            <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
              {template.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm"
                style={{ fontSize: `${typography.fontSize}px` }}
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.primary }}
            >
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-6"
        >
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true },
              { icon: Users, label: 'Users', active: false },
              { icon: DollarSign, label: 'Revenue', active: false },
              { icon: TrendingUp, label: 'Analytics', active: false },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: item.active ? colors.primary : 'transparent',
                  color: item.active ? 'white' : 'inherit',
                  borderRadius: `${borderRadius}px`
                }}
              >
                <item.icon className="w-5 h-5" />
                <span style={{ fontSize: `${typography.fontSize}px` }}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Total Revenue', value: '$45,231', change: '+20.1%', color: colors.success, icon: DollarSign },
              { label: 'Active Users', value: '2,345', change: '+12.5%', color: colors.info, icon: Users },
              { label: 'Conversion Rate', value: '3.24%', change: '+4.3%', color: colors.warning, icon: TrendingUp },
              { label: 'Total Orders', value: '1,234', change: '+8.2%', color: colors.primary, icon: BarChart3 },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 shadow-sm"
                style={{
                  borderRadius: `${borderRadius}px`,
                  border: '1px solid #e5e7eb'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: `${borderRadius}px`
                    }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: colors.success }}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3
                  className="text-gray-600 text-sm mb-1"
                  style={{ fontSize: `${typography.fontSize - 2}px` }}
                >
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold" style={{ color: colors.primary }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts and Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Card */}
            <div
              className="bg-white p-6 shadow-sm"
              style={{
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb'
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontSize: `${typography.fontSize + 2}px` }}
              >
                Revenue Overview
              </h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 65, 90].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: i === 11 ? colors.primary : colors.secondary,
                      borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className="bg-white p-6 shadow-sm"
              style={{
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb'
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontSize: `${typography.fontSize + 2}px` }}
              >
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { user: 'John Doe', action: 'Created new project', time: '2 min ago' },
                  { user: 'Jane Smith', action: 'Updated profile', time: '15 min ago' },
                  { user: 'Mike Johnson', action: 'Uploaded documents', time: '1 hour ago' },
                  { user: 'Sarah Wilson', action: 'Completed task', time: '2 hours ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{
                        backgroundColor: colors.primary,
                        fontSize: `${typography.fontSize - 2}px`
                      }}
                    >
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p
                        className="font-medium"
                        style={{ fontSize: `${typography.fontSize}px` }}
                      >
                        {activity.user}
                      </p>
                      <p
                        className="text-gray-600 text-sm"
                        style={{ fontSize: `${typography.fontSize - 2}px` }}
                      >
                        {activity.action}
                      </p>
                    </div>
                    <span
                      className="text-sm text-gray-500"
                      style={{ fontSize: `${typography.fontSize - 2}px` }}
                    >
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div
            className="bg-white mt-6 shadow-sm overflow-hidden"
            style={{
              borderRadius: `${borderRadius}px`,
              border: '1px solid #e5e7eb'
            }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3
                className="text-lg font-semibold"
                style={{ fontSize: `${typography.fontSize + 2}px` }}
              >
                Recent Orders
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Order ID', 'Customer', 'Date', 'Amount', 'Status'].map((header, i) => (
                      <th
                        key={i}
                        className="px-6 py-3 text-left font-semibold text-gray-700"
                        style={{ fontSize: `${typography.fontSize - 1}px` }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#ORD-001', customer: 'Alice Brown', date: 'Dec 10, 2024', amount: '$299.00', status: 'Completed', statusColor: colors.success },
                    { id: '#ORD-002', customer: 'Bob Wilson', date: 'Dec 10, 2024', amount: '$149.00', status: 'Processing', statusColor: colors.warning },
                    { id: '#ORD-003', customer: 'Carol Davis', date: 'Dec 9, 2024', amount: '$499.00', status: 'Completed', statusColor: colors.success },
                    { id: '#ORD-004', customer: 'David Lee', date: 'Dec 9, 2024', amount: '$199.00', status: 'Pending', statusColor: colors.info },
                  ].map((order, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium" style={{ fontSize: `${typography.fontSize}px` }}>
                        {order.id}
                      </td>
                      <td className="px-6 py-4" style={{ fontSize: `${typography.fontSize}px` }}>
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-gray-600" style={{ fontSize: `${typography.fontSize}px` }}>
                        {order.date}
                      </td>
                      <td className="px-6 py-4 font-semibold" style={{ fontSize: `${typography.fontSize}px` }}>
                        {order.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-white text-sm font-medium"
                          style={{
                            backgroundColor: order.statusColor,
                            fontSize: `${typography.fontSize - 2}px`,
                            borderRadius: `${borderRadius * 2}px`
                          }}
                        >
                          {order.status}
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
    </div>
  );
}
