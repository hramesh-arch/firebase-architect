// SpreadsheetLayout: Dense table-focused layout with sticky headers and horizontal scrolling
// Similar to Airtable, Google Sheets - data-dense interface

export default function SpreadsheetLayout({
  navigation,
  toolbar,
  table,
  navigationStyle = 'compact' // 'compact', 'side', 'none'
}) {
  const showSideNav = navigationStyle === 'side' || navigationStyle === 'compact';

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Toolbar - sticky at top */}
      {toolbar && (
        <header className="flex-shrink-0 border-b">
          {toolbar}
        </header>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Compact Side Navigation */}
        {showSideNav && navigation && (
          <aside className="flex-shrink-0 border-r">
            {navigation}
          </aside>
        )}

        {/* Main Table Area */}
        <main className="flex-1 overflow-auto">
          {table}
        </main>
      </div>
    </div>
  );
}
