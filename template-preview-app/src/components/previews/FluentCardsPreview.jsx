// Fluent UI Cards Preview - Using Microsoft Fluent UI 2
// Showcasing Fluent's depth, subtle shadows, and modern Microsoft aesthetic

import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Text,
  Badge,
  Button,
  ProgressBar,
  Avatar,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  MoreHorizontal20Regular,
  ArrowTrendingUp20Regular,
  ArrowTrendingDown20Regular,
  ChevronRight20Regular,
  People20Regular,
  CheckmarkCircle20Regular,
  Clock20Regular,
  Money20Regular,
  ShoppingBag20Regular,
  ChartMultiple20Regular,
  Cart20Regular,
  Edit20Regular,
  Delete20Regular,
  Share20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground3,
    minHeight: '100vh',
    ...shorthands.padding('32px'),
    fontFamily: tokens.fontFamilyBase,
  },
  section: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '24px',
    color: tokens.colorNeutralForeground1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    ...shorthands.gap('16px'),
  },
  metricCard: {
    height: '100%',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: tokens.shadow4,
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: '4px',
  },
  metricLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    ...shorthands.gap('16px'),
  },
  projectCard: {
    height: '100%',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: '4px',
  },
  projectId: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  projectDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginTop: '12px',
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  progressSection: {
    marginBottom: '16px',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: tokens.fontSizeBase200,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap('16px'),
    paddingTop: '16px',
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  statBox: {
    textAlign: 'center',
  },
  statLabel: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    marginBottom: '4px',
  },
  statValue: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  activityCard: {
    marginBottom: '12px',
  },
  activityContent: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('16px'),
  },
  activityIcon: {
    flexShrink: 0,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: '4px',
  },
  activityTime: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export default function FluentCardsPreview({ config }) {
  const styles = useStyles();

  const metrics = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: Money20Regular,
      color: tokens.colorPaletteBlueForeground2,
    },
    {
      label: 'New Customers',
      value: '2,350',
      change: '+15.3%',
      trend: 'up',
      icon: People20Regular,
      color: tokens.colorPaletteGreenForeground2,
    },
    {
      label: 'Total Orders',
      value: '12,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag20Regular,
      color: tokens.colorPaletteTealForeground2,
    },
    {
      label: 'Conversion Rate',
      value: '87%',
      change: '-2.4%',
      trend: 'down',
      icon: ChartMultiple20Regular,
      color: tokens.colorPalettePurpleForeground2,
    },
  ];

  const projects = [
    {
      id: 'PRJ-001',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design and improved UX',
      status: 'In Progress',
      appearance: 'filled',
      progress: 67,
      team: 5,
      tasks: { completed: 23, total: 34 },
      dueDate: 'Dec 25, 2024',
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android with native features',
      status: 'In Progress',
      appearance: 'filled',
      progress: 45,
      team: 8,
      tasks: { completed: 12, total: 28 },
      dueDate: 'Jan 15, 2025',
    },
    {
      id: 'PRJ-003',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard for business metrics',
      status: 'Completed',
      appearance: 'tint',
      progress: 100,
      team: 4,
      tasks: { completed: 18, total: 18 },
      dueDate: 'Nov 30, 2024',
    },
    {
      id: 'PRJ-004',
      name: 'API Gateway Migration',
      description: 'Migrate legacy APIs to modern microservices architecture',
      status: 'Planning',
      appearance: 'outline',
      progress: 12,
      team: 6,
      tasks: { completed: 3, total: 25 },
      dueDate: 'Feb 1, 2025',
    },
  ];

  const activities = [
    { title: 'New user registered', time: '2 minutes ago', icon: People20Regular, color: tokens.colorPaletteBlueForeground2 },
    { title: 'Order #1234 completed', time: '15 minutes ago', icon: CheckmarkCircle20Regular, color: tokens.colorPaletteGreenForeground2 },
    { title: 'Payment received', time: '1 hour ago', icon: Money20Regular, color: tokens.colorPaletteTealForeground2 },
    { title: 'Monthly report generated', time: '3 hours ago', icon: ChartMultiple20Regular, color: tokens.colorPalettePurpleForeground2 },
  ];

  return (
    <div className={styles.container}>
      {/* Metric Cards - Fluent's subtle elevated cards */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Metrics</h2>
        <div className={styles.grid}>
          {metrics.map((metric, i) => (
            <Card key={i} className={styles.metricCard} appearance="subtle">
              <CardHeader
                header={
                  <div className={styles.metricHeader}>
                    <div className={styles.iconBox}>
                      <metric.icon style={{ color: metric.color, fontSize: '24px' }} />
                    </div>
                    <Badge
                      appearance={metric.trend === 'up' ? 'tint' : 'outline'}
                      color={metric.trend === 'up' ? 'success' : 'danger'}
                      icon={metric.trend === 'up' ? <ArrowTrendingUp20Regular /> : <ArrowTrendingDown20Regular />}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                }
              />
              <div style={{ padding: '0 16px 16px 16px' }}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Cards - Elevated with depth */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Active Projects</h2>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <Card key={project.id} className={styles.projectCard}>
              <CardHeader
                image={<Avatar name={project.name} color="colorful" />}
                header={
                  <div className={styles.projectHeader}>
                    <div style={{ flex: 1 }}>
                      <div className={styles.projectTitle}>{project.name}</div>
                      <div className={styles.projectId}>{project.id}</div>
                    </div>
                    <Menu>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance="subtle"
                          icon={<MoreHorizontal20Regular />}
                          size="small"
                        />
                      </MenuTrigger>
                      <MenuPopover>
                        <MenuList>
                          <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
                          <MenuItem icon={<Share20Regular />}>Share</MenuItem>
                          <MenuItem icon={<Delete20Regular />}>Delete</MenuItem>
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  </div>
                }
                description={
                  <Badge appearance={project.appearance} size="small">
                    {project.status}
                  </Badge>
                }
              />
              <div style={{ padding: '0 16px 16px 16px' }}>
                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.progressSection}>
                  <div className={styles.progressLabel}>
                    <Text size={200} weight="medium">Progress</Text>
                    <Text size={200} weight="semibold">{project.progress}%</Text>
                  </div>
                  <ProgressBar value={project.progress / 100} thickness="large" />
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statBox}>
                    <div className={styles.statLabel}>Team</div>
                    <div className={styles.statValue}>{project.team}</div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statLabel}>Tasks</div>
                    <div className={styles.statValue}>
                      {project.tasks.completed}/{project.tasks.total}
                    </div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statLabel}>Due</div>
                    <div className={styles.statValue} style={{ fontSize: tokens.fontSizeBase200 }}>
                      {project.dueDate}
                    </div>
                  </div>
                </div>
              </div>
              <CardFooter>
                <Button appearance="primary" icon={<ChevronRight20Regular />} iconPosition="after">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Cards - Fluent's subtle list pattern */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        {activities.map((activity, i) => (
          <Card key={i} className={styles.activityCard} appearance="outline">
            <div className={styles.activityContent} style={{ padding: '16px' }}>
              <div className={styles.activityIcon}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: tokens.borderRadiusMedium,
                    backgroundColor: tokens.colorNeutralBackground1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: tokens.shadow2,
                  }}
                >
                  <activity.icon style={{ color: activity.color, fontSize: '20px' }} />
                </div>
              </div>
              <div className={styles.activityText}>
                <div className={styles.activityTitle}>{activity.title}</div>
                <div className={styles.activityTime}>{activity.time}</div>
              </div>
              <Button appearance="subtle" icon={<ChevronRight20Regular />} size="small" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
