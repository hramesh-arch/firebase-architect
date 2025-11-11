// AdaptiveDashboard: A universal dashboard that adapts to any design system
// Uses design system foundations (spacing, borders, shadows, typography) from context

import { BarChart3, Users, DollarSign, TrendingUp, Search, Bell, Menu, MoreVertical } from 'lucide-react';
import { useDesignSystem } from '../../providers/DesignSystemProvider';

export default function AdaptiveDashboard({ config }) {
  const ds = useDesignSystem();

  // Get design system patterns
  const buttonPattern = ds.getComponentPattern('button');
  const cardPattern = ds.getComponentPattern('card');

  // Base spacing from design system
  const spacing = ds.foundations.spacing.unit;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: ds.fontFamily,
        backgroundColor: config.colors.background || '#f9fafb'
      }}
    >
      {/* Top Navigation */}
      <nav
        className="flex items-center justify-between px-6 shadow-sm"
        style={{
          backgroundColor: config.colors.primary,
          height: `${spacing * 7}px`,
          boxShadow: ds.getShadow(cardPattern.shadow || 'sm')
        }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold" style={{ color: '#ffffff' }}>
            {ds.name}
          </h1>
          <div className="flex gap-2 ml-8">
            {['Dashboard', 'Analytics', 'Reports'].map((item, i) => (
              <button
                key={i}
                className="px-4 py-2 text-sm font-medium transition-all"
                style={{
                  color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  backgroundColor: i === 0 ? 'rgba(255,255,255,0.15)' : 'transparent',
                  borderRadius: ds.getBorderRadius(buttonPattern.borderRadius || 'sm'),
                  fontWeight: ds.getFontWeight('medium')
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            className="p-2 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-1"
              style={{
                color: config.colors.text || '#111827',
                fontWeight: ds.getFontWeight('bold')
              }}
            >
              Overview
            </h2>
            <p
              className="text-sm"
              style={{ color: config.colors.text ? `${config.colors.text}99` : '#6B7280' }}
            >
              Monthly revenue trend
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, color: config.colors.primary },
              { label: 'Subscriptions', value: '2,350', change: '+180.1%', icon: Users, color: config.colors.secondary },
              { label: 'Sales', value: '12,234', change: '+19%', icon: TrendingUp, color: config.colors.success },
              { label: 'Active Now', value: '573', change: '+201', icon: BarChart3, color: config.colors.info }
            ].map((stat, i) => (
              <div
                key={i}
                className="p-5 transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: config.colors.surface || '#ffffff',
                  borderRadius: ds.getBorderRadius(cardPattern.borderRadius || 'md'),
                  boxShadow: ds.getShadow(cardPattern.shadow || 'md'),
                  border: cardPattern.border !== 'none' ? ds.getBorder('subtle') : 'none'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="p-2.5 rounded"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      borderRadius: ds.getBorderRadius('sm')
                    }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{
                      color: config.colors.success,
                      backgroundColor: `${config.colors.success}15`,
                      borderRadius: ds.getBorderRadius('sm')
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: config.colors.text ? `${config.colors.text}99` : '#6B7280' }}>
                    {stat.label}
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{
                      color: config.colors.text || '#111827',
                      fontWeight: ds.getFontWeight('bold')
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Card */}
          <div
            className="p-6 mb-6"
            style={{
              backgroundColor: config.colors.surface || '#ffffff',
              borderRadius: ds.getBorderRadius(cardPattern.borderRadius || 'md'),
              boxShadow: ds.getShadow(cardPattern.shadow || 'md'),
              border: cardPattern.border !== 'none' ? ds.getBorder('subtle') : 'none'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{
                    color: config.colors.text || '#111827',
                    fontWeight: ds.getFontWeight('semibold')
                  }}
                >
                  Sales Overview
                </h3>
                <p className="text-sm" style={{ color: config.colors.text ? `${config.colors.text}99` : '#6B7280' }}>
                  You made 265 sales this month
                </p>
              </div>
              <button
                className="text-sm font-medium px-4 py-2"
                style={{
                  color: config.colors.primary,
                  backgroundColor: 'transparent',
                  border: ds.getBorder('default'),
                  borderRadius: ds.getBorderRadius(buttonPattern.borderRadius || 'sm'),
                  fontWeight: ds.getFontWeight('medium')
                }}
              >
                VIEW ALL
              </button>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end gap-3 h-48">
              {[65, 85, 70, 95, 75, 90, 80, 110, 85, 105, 90, 115].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${height}px`,
                    backgroundColor: config.colors.primary,
                    borderRadius: `${ds.foundations.borderRadius.sm}px ${ds.foundations.borderRadius.sm}px 0 0`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div
            className="p-6"
            style={{
              backgroundColor: config.colors.surface || '#ffffff',
              borderRadius: ds.getBorderRadius(cardPattern.borderRadius || 'md'),
              boxShadow: ds.getShadow(cardPattern.shadow || 'md'),
              border: cardPattern.border !== 'none' ? ds.getBorder('subtle') : 'none'
            }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{
                color: config.colors.text || '#111827',
                fontWeight: ds.getFontWeight('semibold')
              }}
            >
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {[
                { id: 'TXN-001', customer: 'Emma Wilson', date: 'Dec 10, 2024', amount: '$250.00', status: 'Success' },
                { id: 'TXN-002', customer: 'Liam Brown', date: 'Dec 9, 2024', amount: '$180.00', status: 'Processing' },
                { id: 'TXN-003', customer: 'Noah Davis', date: 'Dec 8, 2024', amount: '$320.00', status: 'Success' }
              ].map((txn, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded"
                  style={{
                    backgroundColor: config.colors.background || '#f9fafb',
                    borderRadius: ds.getBorderRadius('sm')
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.colors.primary }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: config.colors.text || '#111827' }}>
                        {txn.id}
                      </p>
                      <p className="text-xs" style={{ color: config.colors.text ? `${config.colors.text}99` : '#6B7280' }}>
                        {txn.customer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium" style={{ color: config.colors.text || '#111827' }}>
                      {txn.amount}
                    </p>
                    <p className="text-xs" style={{ color: config.colors.text ? `${config.colors.text}99` : '#6B7280' }}>
                      {txn.date}
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded"
                    style={{
                      color: txn.status === 'Success' ? config.colors.success : config.colors.warning,
                      backgroundColor: txn.status === 'Success' ? `${config.colors.success}15` : `${config.colors.warning}15`,
                      borderRadius: ds.getBorderRadius('sm')
                    }}
                  >
                    {txn.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
