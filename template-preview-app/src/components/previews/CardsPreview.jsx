import { Users, TrendingUp, CheckCircle, Clock, BarChart3, FileText, AlertCircle, Calendar } from 'lucide-react';

// CardsPreview: Enterprise software cards showing projects, tasks, reports, metrics
export default function CardsPreview({ config }) {
  const { colors, typography, borderRadius } = config;

  const projects = [
    {
      title: 'CRM Platform Redesign',
      description: 'Complete redesign of customer relationship management interface',
      status: 'Active',
      statusColor: colors.primary,
      progress: 67,
      team: 5,
      tasks: { completed: 23, total: 34 },
      dueDate: 'Dec 25, 2024',
      priority: 'High'
    },
    {
      title: 'Mobile App Development',
      description: 'iOS and Android native applications for customer portal',
      status: 'In Progress',
      statusColor: colors.info,
      progress: 45,
      team: 8,
      tasks: { completed: 12, total: 28 },
      dueDate: 'Jan 15, 2025',
      priority: 'High'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard for business metrics',
      status: 'Completed',
      statusColor: colors.success,
      progress: 100,
      team: 4,
      tasks: { completed: 18, total: 18 },
      dueDate: 'Nov 30, 2024',
      priority: 'Medium'
    },
    {
      title: 'API Gateway Migration',
      description: 'Migrate legacy APIs to modern microservices architecture',
      status: 'Planning',
      statusColor: colors.warning,
      progress: 12,
      team: 6,
      tasks: { completed: 3, total: 25 },
      dueDate: 'Feb 1, 2025',
      priority: 'Medium'
    }
  ];

  const metrics = [
    {
      label: 'Active Projects',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: colors.primary
    },
    {
      label: 'Team Members',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: colors.success
    },
    {
      label: 'Tasks Completed',
      value: '1,234',
      change: '+23%',
      trend: 'up',
      icon: CheckCircle,
      color: colors.info
    },
    {
      label: 'Avg. Completion Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: colors.warning
    }
  ];

  const tasks = [
    {
      title: 'Review API Documentation',
      project: 'Mobile App',
      assignee: 'John Smith',
      priority: 'High',
      priorityColor: colors.error,
      dueDate: 'Today',
      status: 'In Progress'
    },
    {
      title: 'Update Database Schema',
      project: 'CRM Platform',
      assignee: 'Sarah Johnson',
      priority: 'High',
      priorityColor: colors.error,
      dueDate: 'Tomorrow',
      status: 'Pending'
    },
    {
      title: 'Design New Dashboard Layout',
      project: 'Analytics Dashboard',
      assignee: 'Mike Chen',
      priority: 'Medium',
      priorityColor: colors.warning,
      dueDate: 'Dec 15',
      status: 'In Progress'
    },
    {
      title: 'Write Unit Tests',
      project: 'API Gateway',
      assignee: 'Emma Davis',
      priority: 'Low',
      priorityColor: colors.success,
      dueDate: 'Dec 20',
      status: 'Pending'
    }
  ];

  return (
    <div
      className="p-8 space-y-8"
      style={{ fontFamily: typography.fontFamily }}
    >
      {/* Metrics Cards */}
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-white p-6 shadow-sm transition-all hover:shadow-md"
              style={{
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: `${metric.color}20`,
                    borderRadius: `${borderRadius}px`
                  }}
                >
                  <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <span
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: metric.color }}
                >
                  {metric.change}
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-3xl font-bold" style={{ color: metric.color }}>
                  {metric.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Active Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-white shadow-sm transition-all hover:shadow-md"
              style={{
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb'
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: colors.primary }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${project.statusColor}20`,
                      color: project.statusColor,
                      borderRadius: `${borderRadius}px`
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <p
                  className="text-gray-600 text-sm"
                  style={{ fontSize: `${typography.fontSize}px` }}
                >
                  {project.description}
                </p>
              </div>

              {/* Progress */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold" style={{ color: project.statusColor }}>
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.statusColor,
                        borderRadius: `${borderRadius}px`
                      }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Team</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{project.team}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">Tasks</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {project.tasks.completed}/{project.tasks.total}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">Priority</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{project.priority}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {project.dueDate}
                  </div>
                  <button
                    className="px-4 py-2 text-white font-medium text-sm transition-all hover:opacity-90"
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: `${borderRadius}px`
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task List Cards */}
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Upcoming Tasks
        </h2>
        <div className="bg-white shadow-sm" style={{
          borderRadius: `${borderRadius}px`,
          border: '1px solid #e5e7eb'
        }}>
          {tasks.map((task, i) => (
            <div
              key={i}
              className={`p-6 transition-all hover:bg-gray-50 ${i !== tasks.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                  style={{
                    accentColor: colors.primary
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.project}</p>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-semibold whitespace-nowrap"
                      style={{
                        backgroundColor: `${task.priorityColor}20`,
                        color: task.priorityColor,
                        borderRadius: `${borderRadius}px`
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Due: {task.dueDate}
                    </div>
                    <span
                      className="px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${colors.info}15`,
                        color: colors.info,
                        borderRadius: `${borderRadius}px`
                      }}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Cards */}
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Recent Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Q4 Performance Report',
              type: 'Quarterly Review',
              date: 'Dec 10, 2024',
              size: '2.4 MB',
              icon: BarChart3,
              color: colors.primary
            },
            {
              title: 'Team Productivity Analysis',
              type: 'Analytics',
              date: 'Dec 8, 2024',
              size: '1.8 MB',
              icon: Users,
              color: colors.success
            },
            {
              title: 'Sprint Retrospective',
              type: 'Meeting Notes',
              date: 'Dec 5, 2024',
              size: '856 KB',
              icon: FileText,
              color: colors.info
            }
          ].map((report, i) => (
            <div
              key={i}
              className="bg-white p-6 shadow-sm transition-all hover:shadow-md cursor-pointer"
              style={{
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb'
              }}
            >
              <div
                className="p-4 mb-4 rounded-lg"
                style={{
                  backgroundColor: `${report.color}10`,
                  borderRadius: `${borderRadius}px`
                }}
              >
                <report.icon className="w-8 h-8" style={{ color: report.color }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{report.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{report.type}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{report.date}</span>
                <span>{report.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
