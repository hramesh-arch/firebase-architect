// Carbon Cards Preview - Using IBM Carbon Design System
// Showcasing Carbon's tiles, structured lists, and data cards

import {
  Tile,
  ClickableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Tag,
  Button,
  ProgressBar,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';
import {
  ArrowRight,
  CheckmarkFilled,
  WarningAltFilled,
  InformationFilled,
  Currency,
  User,
  ChartLine,
  ShoppingCart,
  Document,
  UserMultiple,
  Calendar,
  TaskComplete,
} from '@carbon/icons-react';
import './CarbonCardsPreview.scss';

export default function CarbonCardsPreview({ config }) {
  const metrics = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: Currency,
      color: 'blue'
    },
    {
      label: 'New Customers',
      value: '2,350',
      change: '+15.3%',
      trend: 'up',
      icon: UserMultiple,
      color: 'green'
    },
    {
      label: 'Total Orders',
      value: '12,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'teal'
    },
    {
      label: 'Conversion Rate',
      value: '87%',
      change: '-2.4%',
      trend: 'down',
      icon: ChartLine,
      color: 'purple'
    }
  ];

  const projects = [
    {
      id: 'PRJ-001',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      status: 'In Progress',
      statusType: 'blue',
      progress: 67,
      team: 5,
      tasks: { completed: 23, total: 34 },
      dueDate: 'Dec 25, 2024',
      priority: 'High'
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      status: 'In Progress',
      statusType: 'blue',
      progress: 45,
      team: 8,
      tasks: { completed: 12, total: 28 },
      dueDate: 'Jan 15, 2025',
      priority: 'High'
    },
    {
      id: 'PRJ-003',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard',
      status: 'Completed',
      statusType: 'green',
      progress: 100,
      team: 4,
      tasks: { completed: 18, total: 18 },
      dueDate: 'Nov 30, 2024',
      priority: 'Medium'
    },
    {
      id: 'PRJ-004',
      name: 'API Gateway Migration',
      description: 'Migrate legacy APIs to modern microservices',
      status: 'Planning',
      statusType: 'gray',
      progress: 12,
      team: 6,
      tasks: { completed: 3, total: 25 },
      dueDate: 'Feb 1, 2025',
      priority: 'Low'
    }
  ];

  const activities = [
    { title: 'New user registered', time: '2 minutes ago', type: 'info', icon: User },
    { title: 'Order #1234 completed', time: '15 minutes ago', type: 'success', icon: CheckmarkFilled },
    { title: 'System maintenance scheduled', time: '1 hour ago', type: 'warning', icon: WarningAltFilled },
    { title: 'Monthly report generated', time: '3 hours ago', type: 'info', icon: Document },
  ];

  return (
    <div className="carbon-cards-preview" style={{
      fontFamily: config.typography.fontFamily || "'IBM Plex Sans', sans-serif",
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Metric Tiles - Carbon's signature tile component */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: '#161616'
        }}>
          Key Metrics
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {metrics.map((metric, i) => (
            <Tile key={i} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e0e0e0'
                }}>
                  <metric.icon size={24} style={{ color: config.colors.primary || '#0f62fe' }} />
                </div>
                <Tag type={metric.trend === 'up' ? 'green' : 'red'} size="sm">
                  {metric.change}
                </Tag>
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#525252',
                  marginBottom: '0.25rem'
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: '#161616'
                }}>
                  {metric.value}
                </div>
              </div>
            </Tile>
          ))}
        </div>
      </div>

      {/* Project Cards - Using Clickable Tiles */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: '#161616'
        }}>
          Active Projects
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1rem'
        }}>
          {projects.map((project) => (
            <ClickableTile key={project.id} style={{ padding: 0 }}>
              <div style={{ padding: '1.5rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      color: '#161616'
                    }}>
                      {project.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#8d8d8d' }}>
                      {project.id}
                    </div>
                  </div>
                  <OverflowMenu size="sm" flipped>
                    <OverflowMenuItem itemText="View details" />
                    <OverflowMenuItem itemText="Edit project" />
                    <OverflowMenuItem itemText="Share" />
                    <OverflowMenuItem isDelete itemText="Delete" />
                  </OverflowMenu>
                </div>

                <Tag type={project.statusType} size="sm" style={{ marginBottom: '1rem' }}>
                  {project.status}
                </Tag>

                <p style={{
                  fontSize: '0.875rem',
                  color: '#525252',
                  marginBottom: '1rem',
                  lineHeight: 1.5
                }}>
                  {project.description}
                </p>

                {/* Progress */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    <span style={{ color: '#525252' }}>Progress</span>
                    <span style={{ fontWeight: 600, color: '#161616' }}>{project.progress}%</span>
                  </div>
                  <ProgressBar
                    value={project.progress}
                    max={100}
                    size="sm"
                  />
                </div>

                {/* Footer Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.25rem' }}>
                      Team
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#161616' }}>
                      {project.team}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.25rem' }}>
                      Tasks
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#161616' }}>
                      {project.tasks.completed}/{project.tasks.total}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.25rem' }}>
                      Due Date
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#161616' }}>
                      {project.dueDate}
                    </div>
                  </div>
                </div>
              </div>
            </ClickableTile>
          ))}
        </div>
      </div>

      {/* Activity Feed - Using Structured List */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: '#161616'
        }}>
          Recent Activity
        </h2>
        <Tile>
          <StructuredListWrapper>
            <StructuredListBody>
              {activities.map((activity, i) => (
                <StructuredListRow key={i}>
                  <StructuredListCell style={{ width: '48px' }}>
                    <activity.icon
                      size={24}
                      style={{
                        color: activity.type === 'success' ? '#24a148' :
                               activity.type === 'warning' ? '#f1c21b' :
                               '#0f62fe'
                      }}
                    />
                  </StructuredListCell>
                  <StructuredListCell>
                    <div style={{ fontWeight: 600, color: '#161616', marginBottom: '0.25rem' }}>
                      {activity.title}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#8d8d8d' }}>
                      {activity.time}
                    </div>
                  </StructuredListCell>
                  <StructuredListCell style={{ width: '48px', textAlign: 'right' }}>
                    <Button
                      kind="ghost"
                      size="sm"
                      hasIconOnly
                      renderIcon={ArrowRight}
                      iconDescription="View details"
                    />
                  </StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        </Tile>
      </div>

      {/* Expandable Tiles - Showing Carbon's unique expandable pattern */}
      <div>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: '#161616'
        }}>
          Project Details
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {projects.slice(0, 3).map((project) => (
            <ExpandableTile key={project.id}>
              <TileAboveTheFoldContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {project.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#525252' }}>
                      {project.description}
                    </div>
                  </div>
                  <Tag type={project.statusType} size="md">
                    {project.status}
                  </Tag>
                </div>
              </TileAboveTheFoldContent>
              <TileBelowTheFoldContent>
                <div style={{ padding: '1rem 0' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', color: '#161616' }}>
                    Additional Information
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.5rem' }}>
                        Project ID
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#161616' }}>
                        {project.id}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.5rem' }}>
                        Priority Level
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#161616' }}>
                        {project.priority}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.5rem' }}>
                        Team Size
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#161616' }}>
                        {project.team} members
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#8d8d8d', marginBottom: '0.5rem' }}>
                        Completion
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#161616' }}>
                        {project.tasks.completed} of {project.tasks.total} tasks
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                    <Button kind="primary" size="sm" renderIcon={ArrowRight}>
                      View full project
                    </Button>
                  </div>
                </div>
              </TileBelowTheFoldContent>
            </ExpandableTile>
          ))}
        </div>
      </div>
    </div>
  );
}
