import {
  Plus,
  MoreHorizontal,
  Calendar,
  User,
  GripVertical,
  Settings,
  Home,
  LayoutDashboard,
  CheckCircle2,
  Target
} from 'lucide-react';

// Asana: Pure Kanban Board - vertical columns, draggable cards, white cards with shadows, NOT rows
export default function AsanaDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  const columns = [
    {
      title: 'To Do',
      count: 4,
      cards: [
        { title: 'Design new landing page', project: 'Website', projectColor: '#8b5cf6', assignee: 'SC', dueDate: 'Dec 15' },
        { title: 'Update API documentation', project: 'Backend', projectColor: '#3b82f6', assignee: 'MJ', dueDate: 'Dec 18' },
        { title: 'Database schema review', project: 'Backend', projectColor: '#3b82f6', assignee: 'RK', dueDate: 'Dec 20' },
        { title: 'User testing session prep', project: 'Research', projectColor: '#f59e0b', assignee: 'AL', dueDate: 'Dec 22' },
      ]
    },
    {
      title: 'In Progress',
      count: 3,
      cards: [
        { title: 'OAuth implementation', project: 'Website', projectColor: '#8b5cf6', assignee: 'JD', dueDate: 'Dec 12' },
        { title: 'Performance optimization', project: 'Backend', projectColor: '#3b82f6', assignee: 'SM', dueDate: 'Dec 14' },
        { title: 'Mobile responsiveness fixes', project: 'Website', projectColor: '#8b5cf6', assignee: 'ED', dueDate: 'Dec 16' },
      ]
    },
    {
      title: 'In Review',
      count: 2,
      cards: [
        { title: 'CI/CD pipeline setup', project: 'DevOps', projectColor: '#10b981', assignee: 'CL', dueDate: 'Dec 11' },
        { title: 'Component library refactor', project: 'Website', projectColor: '#8b5cf6', assignee: 'RP', dueDate: 'Dec 13' },
      ]
    },
    {
      title: 'Done',
      count: 5,
      cards: [
        { title: 'Database migration', project: 'Backend', projectColor: '#3b82f6', assignee: 'MJ', dueDate: 'Dec 8' },
        { title: 'Design system tokens', project: 'Design', projectColor: '#f59e0b', assignee: 'CM', dueDate: 'Dec 9' },
        { title: 'E2E test suite', project: 'Testing', projectColor: '#ef4444', assignee: 'RK', dueDate: 'Dec 10' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav className={`${isCompact ? 'w-16' : 'w-64'} bg-gray-50 border-r border-gray-200 flex flex-col`}>
          <div className="px-4 py-4 border-b border-gray-200">
            {!isCompact ? (
              <div>
                <h1 className="text-base font-semibold text-gray-900">{template.name}</h1>
                <p className="text-xs text-gray-500 mt-0.5">{template.framework}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center rounded" style={{
                  backgroundColor: colors.primary
                }}>
                  <Target className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-3">
            <nav className="space-y-1">
              {[
                { name: 'Home', icon: Home },
                { name: 'My Tasks', icon: CheckCircle2, active: true },
                { name: 'Reporting', icon: LayoutDashboard },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? 'text-gray-900 bg-white border border-gray-200 shadow-sm'
                      : 'text-gray-700 hover:bg-white hover:border hover:border-gray-200'
                  }`}
                  style={{ borderRadius: `${config.borderRadius}px` }}
                  title={isCompact ? item.name : undefined}
                >
                  <item.icon className={`h-4 w-4 ${isCompact ? 'mx-auto' : 'mr-3'}`} />
                  {!isCompact && item.name}
                </button>
              ))}
            </nav>
          </div>

          {!isCompact && (
            <div className="px-3 py-3 border-t border-gray-200 mt-auto">
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-white hover:border hover:border-gray-200 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button>
            </div>
          )}
          {isCompact && (
            <div className="px-3 py-3 border-t border-gray-200 mt-auto flex justify-center">
              <Settings className="w-4 h-4 text-gray-700" />
            </div>
          )}
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col bg-gray-50">
        {/* Top Navigation Bar */}
        {showTopNav && (
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-semibold text-base text-gray-900">{template.name}</h2>
                <nav className="flex items-center gap-2">
                  {['Home', 'My Tasks', 'Reporting'].map((item, i) => (
                    <button
                      key={i}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        i === 1 ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: i === 1 ? colors.primary : 'transparent',
                        borderRadius: `${config.borderRadius}px`
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

        {/* Board Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Project Board</h1>
              <p className="text-sm text-gray-600">Track tasks across all stages</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all shadow-sm hover:shadow"
              style={{
                backgroundColor: colors.primary,
                borderRadius: `${config.borderRadius}px`
              }}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 h-full" style={{ padding: `${config.spacing * 2}px`, minWidth: 'max-content' }}>
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col bg-gray-100 flex-shrink-0"
                style={{
                  width: '320px',
                  borderRadius: `${config.borderRadius}px`
                }}
              >
                {/* Column Header */}
                <div className="px-4 py-3 border-b border-gray-200 bg-white" style={{ borderRadius: `${config.borderRadius}px ${config.borderRadius}px 0 0` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{column.title}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {column.count}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Cards Container with Scroll */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {column.cards.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition-all group cursor-move"
                      style={{
                        borderRadius: `${config.borderRadius}px`,
                        padding: `${config.spacing}px`
                      }}
                    >
                      {/* Drag Handle */}
                      <div className="flex items-start gap-2 mb-3">
                        <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-0.5" />
                        <h4 className="text-sm font-medium text-gray-900 flex-1">
                          {card.title}
                        </h4>
                      </div>

                      {/* Card Metadata */}
                      <div className="space-y-2">
                        {/* Project Dot */}
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: card.projectColor }}
                          />
                          <span className="text-xs text-gray-600">{card.project}</span>
                        </div>

                        {/* Due Date & Assignee */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{card.dueDate}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                            {card.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Card Button */}
                  <button
                    className="w-full py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-white transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-gray-400"
                    style={{ borderRadius: `${config.borderRadius}px` }}
                  >
                    <Plus className="w-4 h-4" />
                    Add card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
