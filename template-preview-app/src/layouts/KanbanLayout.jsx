// KanbanLayout: Vertical columns layout with horizontal scrolling
// Similar to Trello, Linear, Jira - board-based project management

export default function KanbanLayout({
  navigation,
  header,
  columns,
  navigationStyle = 'side' // 'side', 'compact', 'none'
}) {
  const showSideNav = navigationStyle === 'side' || navigationStyle === 'compact';

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Side Navigation */}
      {showSideNav && navigation && (
        <aside className="flex-shrink-0">
          {navigation}
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {header && (
          <header className="flex-shrink-0 border-b">
            {header}
          </header>
        )}

        {/* Kanban Board - Horizontal Scrolling Columns */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="h-full flex gap-4 p-6">
            {columns}
          </div>
        </div>
      </main>
    </div>
  );
}
