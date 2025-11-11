// Ant Design Cards Preview - Using Alibaba's Ant Design
// Showcasing Ant Design's enterprise-focused card components and statistics

import {
  Card,
  Statistic,
  Row,
  Col,
  Progress,
  Tag,
  Avatar,
  Space,
  Button,
  Dropdown,
  Typography,
  Divider,
  Badge,
  Timeline,
  Tabs,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  MoreOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  FileTextOutlined,
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './AntDesignCardsPreview.css';

const { Title, Text, Paragraph } = Typography;

export default function AntDesignCardsPreview({ config }) {
  const metrics = [
    {
      title: 'Total Revenue',
      value: 45231,
      prefix: '$',
      precision: 0,
      valueStyle: { color: '#3f8600' },
      suffix: <ArrowUpOutlined />,
      change: '+20.1%',
      trend: 'up',
    },
    {
      title: 'New Customers',
      value: 2350,
      precision: 0,
      valueStyle: { color: '#3f8600' },
      suffix: <ArrowUpOutlined />,
      change: '+15.3%',
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: 12234,
      precision: 0,
      valueStyle: { color: '#3f8600' },
      suffix: <ArrowUpOutlined />,
      change: '+8.2%',
      trend: 'up',
    },
    {
      title: 'Conversion Rate',
      value: 87,
      precision: 0,
      suffix: '%',
      valueStyle: { color: '#cf1322' },
      change: '-2.4%',
      trend: 'down',
    },
  ];

  const projects = [
    {
      id: 'PRJ-001',
      title: 'Enterprise CRM Redesign',
      description: 'Complete overhaul of company website with modern design and improved UX',
      status: 'processing',
      statusText: 'In Progress',
      progress: 67,
      team: ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emma Davis'],
      tasks: { completed: 23, total: 34 },
      dueDate: 'Dec 25, 2024',
      priority: 'high',
    },
    {
      id: 'PRJ-002',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      status: 'processing',
      statusText: 'In Progress',
      progress: 45,
      team: ['Alex Turner', 'Lisa Wang'],
      tasks: { completed: 12, total: 28 },
      dueDate: 'Jan 15, 2025',
      priority: 'high',
    },
    {
      id: 'PRJ-003',
      title: 'Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard for business metrics',
      status: 'success',
      statusText: 'Completed',
      progress: 100,
      team: ['Tom Brown', 'Rachel Green'],
      tasks: { completed: 18, total: 18 },
      dueDate: 'Nov 30, 2024',
      priority: 'medium',
    },
    {
      id: 'PRJ-004',
      title: 'API Gateway Migration',
      description: 'Migrate legacy APIs to modern microservices architecture',
      status: 'default',
      statusText: 'Planning',
      progress: 12,
      team: ['David Lee', 'Nina Patel', 'Chris Martin'],
      tasks: { completed: 3, total: 25 },
      dueDate: 'Feb 1, 2025',
      priority: 'low',
    },
  ];

  const activities = [
    {
      icon: <UserOutlined style={{ color: '#1890ff' }} />,
      color: 'blue',
      title: 'New user registered',
      description: 'John Doe created an account',
      time: '2 minutes ago',
    },
    {
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      color: 'green',
      title: 'Order #1234 completed',
      description: 'Payment processed successfully',
      time: '15 minutes ago',
    },
    {
      icon: <SyncOutlined spin style={{ color: '#faad14' }} />,
      color: 'orange',
      title: 'System sync in progress',
      description: 'Database synchronization running',
      time: '1 hour ago',
    },
    {
      icon: <FileTextOutlined style={{ color: '#722ed1' }} />,
      color: 'purple',
      title: 'Monthly report generated',
      description: 'Analytics report ready for download',
      time: '3 hours ago',
    },
  ];

  const menuItems = [
    {
      key: '1',
      icon: <EyeOutlined />,
      label: 'View Details',
    },
    {
      key: '2',
      icon: <EditOutlined />,
      label: 'Edit',
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      icon: <DeleteOutlined />,
      label: 'Delete',
      danger: true,
    },
  ];

  return (
    <div className="ant-cards-preview" style={{
      background: '#f0f2f5',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: config.typography.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    }}>
      {/* Statistic Cards - Ant Design's signature component */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Key Metrics</Title>
        <Row gutter={[16, 16]}>
          {metrics.map((metric, i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <Card>
                <Statistic
                  title={metric.title}
                  value={metric.value}
                  precision={metric.precision}
                  valueStyle={metric.valueStyle}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
                <div style={{ marginTop: '8px' }}>
                  <Badge
                    status={metric.trend === 'up' ? 'success' : 'error'}
                    text={
                      <Text type={metric.trend === 'up' ? 'success' : 'danger'}>
                        {metric.change} from last month
                      </Text>
                    }
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Project Cards with Advanced Features */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Active Projects</Title>
        <Row gutter={[16, 16]}>
          {projects.map((project) => (
            <Col xs={24} lg={12} key={project.id}>
              <Card
                title={
                  <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    <Text strong style={{ fontSize: '16px' }}>{project.title}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{project.id}</Text>
                  </Space>
                }
                extra={
                  <Space>
                    <Tag color={
                      project.priority === 'high' ? 'red' :
                      project.priority === 'medium' ? 'orange' : 'default'
                    }>
                      {project.priority.toUpperCase()}
                    </Tag>
                    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  </Space>
                }
                hoverable
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Badge status={project.status} text={project.statusText} />
                  </div>

                  <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                    {project.description}
                  </Paragraph>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text type="secondary">Progress</Text>
                      <Text strong>{project.progress}%</Text>
                    </div>
                    <Progress
                      percent={project.progress}
                      status={project.status}
                      strokeColor={
                        project.status === 'success' ? '#52c41a' :
                        project.status === 'processing' ? '#1890ff' : '#d9d9d9'
                      }
                    />
                  </div>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic
                        title="Team"
                        value={project.team.length}
                        prefix={<TeamOutlined />}
                        valueStyle={{ fontSize: '16px' }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Tasks"
                        value={`${project.tasks.completed}/${project.tasks.total}`}
                        valueStyle={{ fontSize: '16px' }}
                      />
                    </Col>
                    <Col span={8}>
                      <Space direction="vertical" size={0}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>Due Date</Text>
                        <Text style={{ fontSize: '14px' }}>{project.dueDate}</Text>
                      </Space>
                    </Col>
                  </Row>

                  <Divider style={{ margin: '12px 0' }} />

                  <div>
                    <Text type="secondary" style={{ fontSize: '12px', marginBottom: '8px', display: 'block' }}>
                      Team Members
                    </Text>
                    <Avatar.Group maxCount={4} size="small">
                      {project.team.map((member, i) => (
                        <Avatar key={i} style={{ backgroundColor: '#1890ff' }}>
                          {member.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                      ))}
                    </Avatar.Group>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Activity Timeline Card */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Recent Activity</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Activity Timeline">
              <Timeline>
                {activities.map((activity, i) => (
                  <Timeline.Item key={i} dot={activity.icon} color={activity.color}>
                    <Text strong>{activity.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {activity.description}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      <ClockCircleOutlined /> {activity.time}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>

          {/* Card with Tabs */}
          <Col xs={24} lg={12}>
            <Card>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: '1',
                    label: 'Overview',
                    children: (
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Statistic
                          title="Total Projects"
                          value={24}
                          prefix={<FileTextOutlined />}
                        />
                        <Statistic
                          title="Completed This Month"
                          value={8}
                          prefix={<CheckCircleOutlined />}
                          valueStyle={{ color: '#3f8600' }}
                        />
                        <Statistic
                          title="Team Members"
                          value={156}
                          prefix={<TeamOutlined />}
                        />
                      </Space>
                    ),
                  },
                  {
                    key: '2',
                    label: 'Tasks',
                    children: (
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            <Text type="secondary">Completed</Text>
                            <Text strong style={{ float: 'right' }}>12 tasks</Text>
                          </div>
                          <Progress percent={100} status="success" showInfo={false} />
                        </div>
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            <Text type="secondary">In Progress</Text>
                            <Text strong style={{ float: 'right' }}>5 tasks</Text>
                          </div>
                          <Progress percent={60} showInfo={false} />
                        </div>
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            <Text type="secondary">Pending</Text>
                            <Text strong style={{ float: 'right' }}>2 tasks</Text>
                          </div>
                          <Progress percent={20} status="exception" showInfo={false} />
                        </div>
                      </Space>
                    ),
                  },
                  {
                    key: '3',
                    label: 'Analytics',
                    children: (
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Statistic
                          title="Avg. Completion Time"
                          value={4.2}
                          suffix="days"
                          precision={1}
                          prefix={<CalendarOutlined />}
                        />
                        <Statistic
                          title="Success Rate"
                          value={93.5}
                          suffix="%"
                          precision={1}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<RiseOutlined />}
                        />
                      </Space>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
