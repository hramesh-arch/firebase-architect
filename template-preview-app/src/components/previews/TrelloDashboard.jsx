import {
  Plus,
  MoreHorizontal,
  Paperclip,
  MessageSquare,
  CheckSquare,
  Eye,
  Settings,
  Home,
  Star,
  Trello
} from 'lucide-react';

// Trello: Pure Card Board - large cards, colored covers, labels, avatars, relaxed spacing, colorful background
export default function TrelloDashboard({ config, template }) {
  const { colors, typography } = config;
  const navStyle = config.navigationStyle || 'side';
  const showSideNav = navStyle === 'side' || navStyle === 'side-top' || navStyle === 'compact';
  const showTopNav = navStyle === 'top' || navStyle === 'side-top';
  const isCompact = navStyle === 'compact';

  const lists = [
    {
      title: 'Backlog',
      cards: [
        {
          title: 'Design new onboarding flow',
          cover: '#8b5cf6',
          labels: [{ text: 'Design', color: '#f59e0b' }, { text: 'UX', color: '#ec4899' }],
          members: ['SC', 'JD'],
          checklist: { completed: 2, total: 5 },
          attachments: 3,
          comments: 4
        },
        {
          title: 'Research competitor features',
          cover: '#3b82f6',
          labels: [{ text: 'Research', color: '#06b6d4' }],
          members: ['MJ'],
          checklist: { completed: 0, total: 3 },
          attachments: 1,
          comments: 2
        },
        {
          title: 'Update brand guidelines',
          labels: [{ text: 'Design', color: '#f59e0b' }],
          members: ['AL'],
          checklist: { completed: 1, total: 2 },
          attachments: 0,
          comments: 0
        },
      ]
    },
    {
      title: 'Todo',
      cards: [
        {
          title: 'Build authentication API',
          cover: '#10b981',
          labels: [{ text: 'Backend', color: '#8b5cf6' }, { text: 'High Priority', color: '#ef4444' }],
          members: ['RK', 'CL'],
          checklist: { completed: 3, total: 8 },
          attachments: 2,
          comments: 7
        },
        {
          title: 'Create component library',
          cover: '#f59e0b',
          labels: [{ text: 'Frontend', color: '#06b6d4' }],
          members: ['ED'],
          checklist: { completed: 5, total: 12 },
          attachments: 4,
          comments: 3
        },
      ]
    },
    {
      title: 'Doing',
      cards: [
        {
          title: 'Implement real-time notifications',
          cover: '#ef4444',
          labels: [{ text: 'Backend', color: '#8b5cf6' }, { text: 'WebSocket', color: '#10b981' }],
          members: ['RP', 'MJ', 'SC'],
          checklist: { completed: 4, total: 6 },
          attachments: 2,
          comments: 12
        },
        {
          title: 'Performance optimization',
          labels: [{ text: 'Frontend', color: '#06b6d4' }, { text: 'Critical', color: '#ef4444' }],
          members: ['JD'],
          checklist: { completed: 2, total: 4 },
          attachments: 1,
          comments: 5
        },
      ]
    },
    {
      title: 'Done',
      cards: [
        {
          title: 'Database schema migration',
          cover: '#06b6d4',
          labels: [{ text: 'Backend', color: '#8b5cf6' }],
          members: ['CL'],
          checklist: { completed: 8, total: 8 },
          attachments: 3,
          comments: 6
        },
        {
          title: 'Setup CI/CD pipeline',
          labels: [{ text: 'DevOps', color: '#10b981' }],
          members: ['RK', 'MJ'],
          checklist: { completed: 5, total: 5 },
          attachments: 2,
          comments: 4
        },
        {
          title: 'User testing round 1',
          cover: '#ec4899',
          labels: [{ text: 'Research', color: '#06b6d4' }],
          members: ['AL', 'SC'],
          checklist: { completed: 6, total: 6 },
          attachments: 5,
          comments: 8
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: typography.fontFamily }}>
      {/* Sidebar Navigation */}
      {showSideNav && (
        <nav className={`${isCompact ? 'w-16' : 'w-64'} bg-gradient-to-b from-blue-600 to-blue-700 text-white flex flex-col`}>
          <div className="px-4 py-4 border-b border-blue-500">
            {!isCompact ? (
              <div>
                <h1 className="text-base font-semibold">{template.name}</h1>
                <p className="text-xs text-blue-200 mt-0.5">{template.framework}</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-white bg-opacity-20">
                  <Trello className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-3">
            <nav className="space-y-1">
              {[
                { name: 'Boards', icon: Home, active: true },
                { name: 'Starred', icon: Star },
                { name: 'Settings', icon: Settings },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`group flex items-center w-full px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
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
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Board Background with Gradient */}
        <div
          className="flex-1 overflow-auto"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}80 0%, ${colors.primary}40 100%)`
          }}
        >
          {/* Top Navigation Bar */}
          {showTopNav && (
            <div className="bg-white bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-20">
              <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h2 className="font-semibold text-base text-white">{template.name}</h2>
                  <nav className="flex items-center gap-2">
                    {['Boards', 'Starred', 'Settings'].map((item, i) => (
                      <button
                        key={i}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          i === 0
                            ? 'bg-white bg-opacity-30 text-white'
                            : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-20'
                        }`}
                        style={{ borderRadius: `${config.borderRadius}px` }}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full" />
              </div>
            </div>
          )}

          {/* Board Header */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Product Development Board</h1>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Star className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors" style={{ borderRadius: `${config.borderRadius}px` }}>
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Board Lists */}
          <div className="flex gap-4 px-6 pb-6 overflow-x-auto" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {lists.map((list, listIndex) => (
              <div
                key={listIndex}
                className="flex-shrink-0 w-80"
              >
                {/* List Container */}
                <div className="bg-gray-100 rounded-lg" style={{ borderRadius: `${config.borderRadius}px` }}>
                  {/* List Header */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{list.title}</h3>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Cards */}
                  <div className="px-3 pb-3 space-y-3">
                    {list.cards.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        style={{
                          borderRadius: `${config.borderRadius}px`
                        }}
                      >
                        {/* Card Cover */}
                        {card.cover && (
                          <div
                            className="h-32 w-full"
                            style={{
                              backgroundColor: card.cover,
                              borderRadius: `${config.borderRadius}px ${config.borderRadius}px 0 0`
                            }}
                          />
                        )}

                        {/* Card Content */}
                        <div className="p-4">
                          {/* Labels */}
                          {card.labels && card.labels.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {card.labels.map((label, labelIndex) => (
                                <span
                                  key={labelIndex}
                                  className="px-3 py-1 text-xs font-medium text-white"
                                  style={{
                                    backgroundColor: label.color,
                                    borderRadius: `${config.borderRadius}px`
                                  }}
                                >
                                  {label.text}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Card Title */}
                          <h4 className="text-sm font-medium text-gray-900 mb-3">
                            {card.title}
                          </h4>

                          {/* Card Metadata */}
                          <div className="flex items-center gap-3 text-gray-600">
                            {/* Checklist */}
                            {card.checklist && (
                              <div className="flex items-center gap-1.5">
                                <CheckSquare className="w-4 h-4" />
                                <span className="text-xs">
                                  {card.checklist.completed}/{card.checklist.total}
                                </span>
                                {card.checklist.completed === card.checklist.total && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                )}
                              </div>
                            )}

                            {/* Attachments */}
                            {card.attachments > 0 && (
                              <div className="flex items-center gap-1.5">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-xs">{card.attachments}</span>
                              </div>
                            )}

                            {/* Comments */}
                            {card.comments > 0 && (
                              <div className="flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-xs">{card.comments}</span>
                              </div>
                            )}
                          </div>

                          {/* Progress Bar for Checklist */}
                          {card.checklist && (
                            <div className="mt-3">
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    card.checklist.completed === card.checklist.total
                                      ? 'bg-green-500'
                                      : 'bg-blue-500'
                                  }`}
                                  style={{
                                    width: `${(card.checklist.completed / card.checklist.total) * 100}%`
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Members */}
                          {card.members && card.members.length > 0 && (
                            <div className="flex items-center gap-1 mt-3">
                              {card.members.map((member, memberIndex) => (
                                <div
                                  key={memberIndex}
                                  className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-semibold text-white shadow-sm"
                                >
                                  {member}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Card Button */}
                    <button
                      className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 bg-gray-100 hover:bg-gray-200"
                      style={{ borderRadius: `${config.borderRadius}px` }}
                    >
                      <Plus className="w-4 h-4" />
                      Add a card
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add List Button */}
            <div className="flex-shrink-0 w-80">
              <button
                className="w-full px-4 py-3 text-sm font-medium text-white bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors flex items-center gap-2"
                style={{ borderRadius: `${config.borderRadius}px` }}
              >
                <Plus className="w-5 h-5" />
                Add another list
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
