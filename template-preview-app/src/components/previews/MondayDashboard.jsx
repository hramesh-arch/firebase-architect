import {
  Plus,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Settings,
  Home,
  Calendar,
  BarChart3,
  GripVertical
} from 'lucide-react';

// Monday: Timeline/Gantt View - task list left, horizontal timeline right, colored bars, today marker
export default function MondayDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  // Generate timeline weeks
  const weeks = ['Nov 25', 'Dec 2', 'Dec 9', 'Dec 16', 'Dec 23', 'Dec 30'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const taskGroups = [
    {
      name: 'Frontend Development',
      color: '#8b5cf6',
      collapsed: false,
      tasks: [
        { name: 'Authentication UI', assignee: 'SC', start: 1, duration: 5, color: '#8b5cf6' },
        { name: 'Dashboard Components', assignee: 'JD', start: 3, duration: 7, color: '#8b5cf6' },
        { name: 'Mobile Responsive', assignee: 'ED', start: 8, duration: 4, color: '#8b5cf6' },
      ]
    },
    {
      name: 'Backend Development',
      color: '#3b82f6',
      collapsed: false,
      tasks: [
        { name: 'Database Schema', assignee: 'MJ', start: 0, duration: 4, color: '#3b82f6' },
        { name: 'API Endpoints', assignee: 'RK', start: 2, duration: 6, color: '#3b82f6' },
        { name: 'Authentication Service', assignee: 'CL', start: 5, duration: 5, color: '#3b82f6' },
      ]
    },
    {
      name: 'QA & Testing',
      color: '#f59e0b',
      collapsed: false,
      tasks: [
        { name: 'Unit Tests', assignee: 'AL', start: 6, duration: 3, color: '#f59e0b' },
        { name: 'Integration Tests', assignee: 'RP', start: 9, duration: 4, color: '#f59e0b' },
      ]
    },
  ];

  const todayPosition = 10; // Days from start

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav className={`${isCompact ? 'w-16' : 'w-60'} bg-white border-r border-gray-200 flex flex-col`}>
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
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-3">
            <nav className="space-y-1">
              {[
                { name: 'Home', icon: Home },
                { name: 'Timeline', icon: Calendar, active: true },
                { name: 'Dashboard', icon: BarChart3 },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: item.active ? colors.primary : 'transparent',
                    borderRadius: `${config.borderRadius}px`
                  }}
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
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
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
      <main className="flex-1 overflow-auto flex flex-col bg-white">
        {/* Top Navigation Bar */}
        {showTopNav && (
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-semibold text-base text-gray-900">{template.name}</h2>
                <nav className="flex items-center gap-2">
                  {['Home', 'Timeline', 'Dashboard'].map((item, i) => (
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

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Project Timeline</h1>
              <p className="text-sm text-gray-600">Q4 2024 Development Schedule</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white"
              style={{
                backgroundColor: colors.primary,
                borderRadius: `${config.borderRadius}px`
              }}
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>

        {/* Timeline View */}
        <div className="flex-1 overflow-auto">
          <div className="flex min-w-max">
            {/* Left: Task List (Fixed Width) */}
            <div className="w-96 flex-shrink-0 bg-white border-r border-gray-200">
              {/* Header */}
              <div className="h-24 border-b border-gray-300 bg-gray-50 px-4 py-3 flex items-center font-semibold text-sm text-gray-700">
                Task Name
              </div>

              {/* Groups and Tasks */}
              {taskGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Group Header */}
                  <div
                    className="h-12 border-b border-gray-200 bg-gray-50 px-4 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: group.color }}
                    />
                    <span className="font-semibold text-sm text-gray-900">{group.name}</span>
                    <span className="text-xs text-gray-500">({group.tasks.length})</span>
                  </div>

                  {/* Tasks in Group */}
                  {!group.collapsed && group.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="h-12 border-b border-gray-200 px-4 flex items-center gap-2 hover:bg-gray-50 group"
                    >
                      <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                      <span className="text-sm text-gray-900 flex-1">{task.name}</span>
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {task.assignee}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right: Timeline Grid */}
            <div className="flex-1 bg-white relative">
              {/* Timeline Header - Weeks */}
              <div className="h-12 border-b border-gray-300 bg-gray-50 flex sticky top-0 z-10">
                {weeks.map((week, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 border-r border-gray-200 px-2 py-1 text-center"
                    style={{ width: '168px' }} // 7 days * 24px
                  >
                    <div className="text-xs font-semibold text-gray-700">{week}</div>
                  </div>
                ))}
              </div>

              {/* Timeline Header - Days */}
              <div className="h-12 border-b border-gray-300 bg-gray-50 flex sticky top-12 z-10">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-shrink-0">
                    {days.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="border-r border-gray-200 text-center flex items-center justify-center"
                        style={{ width: '24px' }}
                      >
                        <span className="text-xs text-gray-600">{day[0]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Today Marker Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                style={{ left: `${todayPosition * 24}px` }}
              >
                <div className="absolute -top-1 -left-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
              </div>

              {/* Timeline Rows */}
              {taskGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Group Row */}
                  <div className="h-12 border-b border-gray-200 bg-gray-50 relative">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="absolute flex" style={{ left: `${weekIndex * 168}px`, width: '168px' }}>
                        {days.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className="border-r border-gray-200"
                            style={{ width: '24px', height: '48px' }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Task Rows */}
                  {!group.collapsed && group.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="h-12 border-b border-gray-200 relative hover:bg-blue-50 transition-colors">
                      {/* Grid Lines */}
                      {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="absolute flex" style={{ left: `${weekIndex * 168}px`, width: '168px' }}>
                          {days.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              className="border-r border-gray-200"
                              style={{ width: '24px', height: '48px' }}
                            />
                          ))}
                        </div>
                      ))}

                      {/* Gantt Bar */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-7 flex items-center px-2 cursor-pointer hover:opacity-90 shadow-sm"
                        style={{
                          left: `${task.start * 24 + 2}px`,
                          width: `${task.duration * 24 - 4}px`,
                          backgroundColor: task.color,
                          borderRadius: `${config.borderRadius}px`
                        }}
                      >
                        <span className="text-xs font-medium text-white truncate">
                          {task.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
