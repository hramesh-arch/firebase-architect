import { Search, Filter, Download, Eye, Edit, Trash2, MoreVertical, ArrowUpDown } from 'lucide-react';

// TablePreview: Enterprise data table with sorting, filtering, and actions
export default function TablePreview({ config }) {
  const { colors, typography } = config;

  return (
    <div className="max-w-7xl mx-auto" style={{ fontFamily: typography.fontFamily }}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header with Controls */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Projects Overview</h2>
              <p className="mt-1 text-sm text-gray-500">Manage and track all active projects</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity text-sm font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    Project Name
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    Team
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    Status
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    Progress
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    Due Date
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 'PRJ-001',
                  name: 'Enterprise CRM Redesign',
                  team: 'Design Team',
                  status: 'In Progress',
                  statusColor: colors.primary,
                  progress: 67,
                  dueDate: 'Dec 25, 2024',
                  members: ['JS', 'AM', 'KL']
                },
                {
                  id: 'PRJ-002',
                  name: 'Mobile App Development',
                  team: 'Engineering',
                  status: 'In Progress',
                  statusColor: colors.primary,
                  progress: 45,
                  dueDate: 'Jan 15, 2025',
                  members: ['RW', 'TK', 'SD']
                },
                {
                  id: 'PRJ-003',
                  name: 'Customer Portal v2.0',
                  team: 'Full Stack',
                  status: 'In Review',
                  statusColor: colors.warning,
                  progress: 92,
                  dueDate: 'Dec 12, 2024',
                  members: ['MC', 'PL']
                },
                {
                  id: 'PRJ-004',
                  name: 'Data Analytics Dashboard',
                  team: 'Analytics',
                  status: 'Completed',
                  statusColor: colors.success,
                  progress: 100,
                  dueDate: 'Nov 30, 2024',
                  members: ['BR', 'NH', 'GF', 'DW']
                },
                {
                  id: 'PRJ-005',
                  name: 'API Gateway Migration',
                  team: 'DevOps',
                  status: 'Planning',
                  statusColor: colors.info,
                  progress: 12,
                  dueDate: 'Feb 1, 2025',
                  members: ['LM', 'CT']
                },
                {
                  id: 'PRJ-006',
                  name: 'Security Audit Q4',
                  team: 'Security',
                  status: 'In Progress',
                  statusColor: colors.primary,
                  progress: 58,
                  dueDate: 'Dec 31, 2024',
                  members: ['EB', 'VK', 'HJ']
                }
              ].map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-xs text-gray-500">{project.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        {project.members.map((member, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-700">{project.team}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                      style={{
                        backgroundColor: `${project.statusColor}20`,
                        color: project.statusColor
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${project.progress}%`,
                            backgroundColor: project.statusColor
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {project.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors" title="More">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1-6</span> of <span className="font-medium">24</span> projects
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-white transition-colors text-sm">
                Previous
              </button>
              <button
                className="px-3 py-1 rounded text-white text-sm font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-white transition-colors text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-white transition-colors text-sm">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-white transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
