import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, ChevronRight, Filter } from 'lucide-react';

// Clean Accessible (MedRefills-inspired): Large text, high contrast, generous spacing, clear labels, WCAG AAA
export default function CleanAccessibleDashboard({ config, template }) {
  const { colors, typography } = config;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: typography.fontFamily }}>
      {/* High contrast, well-spaced header */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-3 hover:bg-gray-100 rounded-lg" aria-label="Menu">
              <Menu className="w-7 h-7" />
            </button>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
                Dashboard
              </h1>
              <p className="text-base text-gray-600 mt-1">Welcome back, here's your overview</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center border-2 border-gray-300 rounded-lg px-5 py-3 min-w-[320px]">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Search patients, prescriptions..."
                className="bg-transparent border-none outline-none text-base w-full"
                aria-label="Search"
              />
            </div>
            <button className="p-3 hover:bg-gray-100 rounded-lg relative" aria-label="Notifications">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: colors.primary }}
              aria-label="User profile"
            >
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Large, clear metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '$45,231', subtext: 'Up 20.1% from last month', icon: DollarSign, color: colors.primary },
            { label: 'Active Patients', value: '2,345', subtext: '180 new this month', icon: Users, color: colors.success },
            { label: 'Prescriptions', value: '1,234', subtext: 'Filled this month', icon: BarChart3, color: colors.info },
            { label: 'Satisfaction', value: '94%', subtext: 'Based on 856 reviews', icon: TrendingUp, color: colors.success },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">{stat.label}</h3>
              <p className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-base text-gray-600">{stat.subtext}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Monthly Activity</h2>
                <p className="text-base text-gray-600">Prescriptions filled per month</p>
              </div>
              <button
                className="px-5 py-2.5 border-2 text-base font-semibold rounded-lg hover:bg-gray-50 transition"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                View Report
              </button>
            </div>
            <div className="h-72 flex items-end justify-between gap-3">
              {[35, 55, 45, 70, 55, 75, 60, 80, 65, 75, 70, 85].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i === new Date().getMonth() ? colors.primary : '#e2e8f0'
                  }}
                  title={`${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}: ${height * 10} prescriptions`}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {[
                { label: 'New Prescription', color: colors.primary },
                { label: 'Refill Request', color: colors.success },
                { label: 'View Patients', color: colors.info },
                { label: 'Generate Report', color: colors.secondary },
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-md transition-all text-left group"
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <span className="text-base font-semibold text-gray-800">{action.label}</span>
                  <ChevronRight
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    style={{ color: action.color }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accessible Data Table */}
        <div className="mt-8 bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
          <div className="px-8 py-6 border-b-2 border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Prescriptions</h2>
              <p className="text-base text-gray-600">Last 30 days of activity</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-5 h-5" />
              <span className="text-base font-semibold">Filter</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-8 py-5 text-left font-bold text-gray-900">Patient Name</th>
                  <th className="px-8 py-5 text-left font-bold text-gray-900">Medication</th>
                  <th className="px-8 py-5 text-left font-bold text-gray-900">Date Filled</th>
                  <th className="px-8 py-5 text-left font-bold text-gray-900">Status</th>
                  <th className="px-8 py-5 text-left font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Johnson', med: 'Lisinopril 10mg', date: 'Dec 10, 2024', status: 'Completed', statusColor: colors.success },
                  { name: 'Michael Chen', med: 'Metformin 500mg', date: 'Dec 9, 2024', status: 'Ready', statusColor: colors.info },
                  { name: 'Emily Davis', med: 'Atorvastatin 20mg', date: 'Dec 8, 2024', status: 'Processing', statusColor: colors.warning },
                  { name: 'Robert Wilson', med: 'Omeprazole 40mg', date: 'Dec 7, 2024', status: 'Completed', statusColor: colors.success },
                ].map((row, i) => (
                  <tr key={i} className="border-b-2 border-gray-100 hover:bg-gray-50">
                    <td className="px-8 py-5 font-semibold text-gray-900">{row.name}</td>
                    <td className="px-8 py-5 text-gray-700">{row.med}</td>
                    <td className="px-8 py-5 text-gray-600">{row.date}</td>
                    <td className="px-8 py-5">
                      <span
                        className="px-4 py-2 rounded-lg font-bold text-sm"
                        style={{
                          backgroundColor: `${row.statusColor}20`,
                          color: row.statusColor
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button
                        className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white hover:opacity-90 transition"
                        style={{ backgroundColor: colors.primary }}
                        aria-label={`View details for ${row.name}`}
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

        {/* Accessibility Notice */}
        <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-base text-gray-700">
            <span className="font-bold">Accessibility:</span> This template is designed for WCAG AAA compliance with high contrast ratios,
            clear typography, and keyboard navigation support.
          </p>
        </div>
      </div>
    </div>
  );
}
