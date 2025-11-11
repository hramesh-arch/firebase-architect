// Ant Design Table Preview - Using Alibaba's Ant Design Table
// Showcasing Ant Design's advanced table with filtering, sorting, and actions

import { useState } from 'react';
import {
  Table,
  Space,
  Button,
  Tag,
  Dropdown,
  Input,
  Progress,
  Avatar,
  Typography,
  Card,
  Badge,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  PlusOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './AntDesignTablePreview.css';

const { Title, Text } = Typography;

export default function AntDesignTablePreview({ config }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');

  const dataSource = [
    {
      key: '1',
      projectId: 'PRJ-001',
      name: 'Enterprise CRM Redesign',
      team: 'Design Team',
      status: 'processing',
      statusText: 'In Progress',
      progress: 67,
      budget: 125000,
      dueDate: '2024-12-25',
      priority: 'high',
      members: ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emma Davis', 'Alex Turner'],
    },
    {
      key: '2',
      projectId: 'PRJ-002',
      name: 'Mobile App Development',
      team: 'Engineering',
      status: 'processing',
      statusText: 'In Progress',
      progress: 45,
      budget: 250000,
      dueDate: '2025-01-15',
      priority: 'high',
      members: ['Rachel Green', 'Tom Brown'],
    },
    {
      key: '3',
      projectId: 'PRJ-003',
      name: 'Customer Portal v2.0',
      team: 'Full Stack',
      status: 'warning',
      statusText: 'In Review',
      progress: 92,
      budget: 85000,
      dueDate: '2024-12-12',
      priority: 'medium',
      members: ['Lisa Wang', 'David Lee'],
    },
    {
      key: '4',
      projectId: 'PRJ-004',
      name: 'Data Analytics Dashboard',
      team: 'Analytics',
      status: 'success',
      statusText: 'Completed',
      progress: 100,
      budget: 95000,
      dueDate: '2024-11-30',
      priority: 'medium',
      members: ['Nina Patel', 'Chris Martin', 'Jessica Kim', 'Paul Anderson'],
    },
    {
      key: '5',
      projectId: 'PRJ-005',
      name: 'API Gateway Migration',
      team: 'DevOps',
      status: 'default',
      statusText: 'Planning',
      progress: 12,
      budget: 180000,
      dueDate: '2025-02-01',
      priority: 'low',
      members: ['Sophie Taylor', 'Ryan Chen'],
    },
    {
      key: '6',
      projectId: 'PRJ-006',
      name: 'Security Audit Q4',
      team: 'Security',
      status: 'processing',
      statusText: 'In Progress',
      progress: 58,
      budget: 65000,
      dueDate: '2024-12-31',
      priority: 'high',
      members: ['Kevin Zhang', 'Maria Garcia', 'Amy White'],
    },
    {
      key: '7',
      projectId: 'PRJ-007',
      name: 'Cloud Infrastructure Upgrade',
      team: 'DevOps',
      status: 'processing',
      statusText: 'In Progress',
      progress: 73,
      budget: 200000,
      dueDate: '2025-01-10',
      priority: 'high',
      members: ['Oliver Brown', 'Emma Wilson'],
    },
    {
      key: '8',
      projectId: 'PRJ-008',
      name: 'Marketing Website Refresh',
      team: 'Marketing',
      status: 'default',
      statusText: 'Planning',
      progress: 8,
      budget: 45000,
      dueDate: '2025-02-15',
      priority: 'low',
      members: ['Sophia Davis', 'Liam Miller', 'Mia Taylor'],
    },
  ];

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search project name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.projectId}</Text>
        </Space>
      ),
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      width: 200,
      filters: [
        { text: 'Design Team', value: 'Design Team' },
        { text: 'Engineering', value: 'Engineering' },
        { text: 'DevOps', value: 'DevOps' },
        { text: 'Marketing', value: 'Marketing' },
      ],
      onFilter: (value, record) => record.team === value,
      render: (text, record) => (
        <Space>
          <Avatar.Group maxCount={3} size="small">
            {record.members.map((member, i) => (
              <Tooltip key={i} title={member}>
                <Avatar style={{ backgroundColor: '#1890ff' }}>
                  {member.split(' ').map(n => n[0]).join('')}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'statusText',
      key: 'status',
      width: 140,
      filters: [
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Planning', value: 'Planning' },
        { text: 'In Review', value: 'In Review' },
      ],
      onFilter: (value, record) => record.statusText === value,
      render: (text, record) => (
        <Badge status={record.status} text={text} />
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 180,
      sorter: (a, b) => a.progress - b.progress,
      render: (progress, record) => (
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Progress
            percent={progress}
            size="small"
            status={record.status}
            strokeColor={
              record.status === 'success' ? '#52c41a' :
              record.status === 'processing' ? '#1890ff' : undefined
            }
          />
        </Space>
      ),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      sorter: (a, b) => a.budget - b.budget,
      render: budget => (
        <Text strong>${(budget / 1000).toFixed(0)}K</Text>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      render: date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      filters: [
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
      onFilter: (value, record) => record.priority === value,
      render: priority => (
        <Tag color={
          priority === 'high' ? 'red' :
          priority === 'medium' ? 'orange' : 'default'
        }>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                icon: <EyeOutlined />,
                label: 'View',
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
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div style={{
      background: '#f0f2f5',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: config.typography.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <Title level={2} style={{ marginBottom: '8px' }}>Projects Overview</Title>
        <Text type="secondary">Manage and track all active projects across your organization</Text>
      </div>

      <Card>
        {/* Toolbar */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Input
              placeholder="Search projects..."
              prefix={<SearchOutlined />}
              style={{ width: 280 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Button icon={<FilterOutlined />}>Filter</Button>
            <Button icon={<SettingOutlined />}>Settings</Button>
          </Space>
          <Space>
            {selectedRowKeys.length > 0 && (
              <Text type="secondary">{selectedRowKeys.length} selected</Text>
            )}
            <Button icon={<DownloadOutlined />}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              New Project
            </Button>
          </Space>
        </div>

        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} projects`,
            pageSizeOptions: ['5', '10', '20', '50'],
            defaultPageSize: 10,
          }}
          scroll={{ x: 1300 }}
          bordered={false}
          size="middle"
        />
      </Card>
    </div>
  );
}
