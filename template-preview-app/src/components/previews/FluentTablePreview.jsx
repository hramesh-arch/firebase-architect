// Fluent UI Table Preview - Using Microsoft Fluent UI 2 DataGrid
// Showcasing Fluent's modern table with sorting, filtering, and selection

import { useState } from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  Input,
  Badge,
  ProgressBar,
  Avatar,
  AvatarGroup,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  makeStyles,
  shorthands,
  tokens,
  Text,
} from '@fluentui/react-components';
import {
  Filter20Regular,
  ArrowDownload20Regular,
  Add20Regular,
  MoreHorizontal20Regular,
  Edit20Regular,
  Delete20Regular,
  Eye20Regular,
  Settings20Regular,
  Search20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground3,
    minHeight: '100vh',
    ...shorthands.padding('32px'),
    fontFamily: tokens.fontFamilyBase,
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '8px',
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  tableContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    boxShadow: tokens.shadow4,
    ...shorthands.overflow('hidden'),
  },
  toolbar: {
    ...shorthands.padding('16px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    minWidth: '280px',
  },
  projectName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: '4px',
  },
  projectId: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  progressBar: {
    flex: 1,
    minWidth: '80px',
  },
  progressValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    minWidth: '45px',
    textAlign: 'right',
  },
  budgetValue: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
});

export default function FluentTablePreview({ config }) {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState('');

  const items = [
    {
      id: '1',
      projectId: 'PRJ-001',
      name: 'Enterprise CRM Redesign',
      team: 'Design Team',
      status: 'In Progress',
      statusAppearance: 'filled',
      progress: 67,
      budget: '$125,000',
      dueDate: 'Dec 25, 2024',
      priority: 'High',
      priorityColor: 'danger',
      members: ['John Smith', 'Sarah Johnson', 'Mike Chen'],
    },
    {
      id: '2',
      projectId: 'PRJ-002',
      name: 'Mobile App Development',
      team: 'Engineering',
      status: 'In Progress',
      statusAppearance: 'filled',
      progress: 45,
      budget: '$250,000',
      dueDate: 'Jan 15, 2025',
      priority: 'High',
      priorityColor: 'danger',
      members: ['Emma Davis', 'Alex Turner'],
    },
    {
      id: '3',
      projectId: 'PRJ-003',
      name: 'Customer Portal v2.0',
      team: 'Full Stack',
      status: 'In Review',
      statusAppearance: 'outline',
      progress: 92,
      budget: '$85,000',
      dueDate: 'Dec 12, 2024',
      priority: 'Medium',
      priorityColor: 'warning',
      members: ['Lisa Wang', 'Tom Brown'],
    },
    {
      id: '4',
      projectId: 'PRJ-004',
      name: 'Data Analytics Dashboard',
      team: 'Analytics',
      status: 'Completed',
      statusAppearance: 'tint',
      progress: 100,
      budget: '$95,000',
      dueDate: 'Nov 30, 2024',
      priority: 'Medium',
      priorityColor: 'warning',
      members: ['Rachel Green', 'David Lee', 'Nina Patel'],
    },
    {
      id: '5',
      projectId: 'PRJ-005',
      name: 'API Gateway Migration',
      team: 'DevOps',
      status: 'Planning',
      statusAppearance: 'outline',
      progress: 12,
      budget: '$180,000',
      dueDate: 'Feb 1, 2025',
      priority: 'Low',
      priorityColor: 'subtle',
      members: ['Chris Martin', 'Jessica Kim'],
    },
    {
      id: '6',
      projectId: 'PRJ-006',
      name: 'Security Audit Q4',
      team: 'Security',
      status: 'In Progress',
      statusAppearance: 'filled',
      progress: 58,
      budget: '$65,000',
      dueDate: 'Dec 31, 2024',
      priority: 'High',
      priorityColor: 'danger',
      members: ['Kevin Zhang', 'Maria Garcia'],
    },
    {
      id: '7',
      projectId: 'PRJ-007',
      name: 'Cloud Infrastructure Upgrade',
      team: 'DevOps',
      status: 'In Progress',
      statusAppearance: 'filled',
      progress: 73,
      budget: '$200,000',
      dueDate: 'Jan 10, 2025',
      priority: 'High',
      priorityColor: 'danger',
      members: ['Paul Anderson', 'Sophie Taylor'],
    },
    {
      id: '8',
      projectId: 'PRJ-008',
      name: 'Marketing Website Refresh',
      team: 'Marketing',
      status: 'Planning',
      statusAppearance: 'outline',
      progress: 8,
      budget: '$45,000',
      dueDate: 'Feb 15, 2025',
      priority: 'Low',
      priorityColor: 'subtle',
      members: ['Amy White', 'Ryan Chen'],
    },
  ];

  const columns = [
    createTableColumn({
      columnId: 'name',
      compare: (a, b) => a.name.localeCompare(b.name),
      renderHeaderCell: () => 'Project Name',
      renderCell: (item) => (
        <TableCellLayout>
          <div>
            <div className={styles.projectName}>{item.name}</div>
            <div className={styles.projectId}>{item.projectId}</div>
          </div>
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: 'team',
      compare: (a, b) => a.team.localeCompare(b.team),
      renderHeaderCell: () => 'Team',
      renderCell: (item) => (
        <TableCellLayout media={<AvatarGroup size={24}>{item.members.slice(0, 3).map((m, i) => <Avatar key={i} name={m} />)}</AvatarGroup>}>
          {item.team}
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: 'status',
      compare: (a, b) => a.status.localeCompare(b.status),
      renderHeaderCell: () => 'Status',
      renderCell: (item) => (
        <TableCellLayout>
          <Badge appearance={item.statusAppearance} size="medium">
            {item.status}
          </Badge>
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: 'progress',
      compare: (a, b) => a.progress - b.progress,
      renderHeaderCell: () => 'Progress',
      renderCell: (item) => (
        <TableCellLayout>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <ProgressBar value={item.progress / 100} thickness="medium" />
            </div>
            <div className={styles.progressValue}>{item.progress}%</div>
          </div>
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: 'budget',
      compare: (a, b) => a.budget.localeCompare(b.budget),
      renderHeaderCell: () => 'Budget',
      renderCell: (item) => (
        <TableCellLayout>
          <span className={styles.budgetValue}>{item.budget}</span>
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: 'dueDate',
      compare: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      renderHeaderCell: () => 'Due Date',
      renderCell: (item) => <TableCellLayout>{item.dueDate}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: 'priority',
      compare: (a, b) => a.priority.localeCompare(b.priority),
      renderHeaderCell: () => 'Priority',
      renderCell: (item) => (
        <TableCellLayout>
          <Badge appearance="outline" color={item.priorityColor} size="small">
            {item.priority}
          </Badge>
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: 'actions',
      renderHeaderCell: () => '',
      renderCell: (item) => (
        <TableCellLayout>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem icon={<Eye20Regular />}>View</MenuItem>
                <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
                <MenuItem icon={<Delete20Regular />}>Delete</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </TableCellLayout>
      ),
    }),
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Projects Overview</h2>
        <p className={styles.subtitle}>Manage and track all active projects across your organization</p>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.toolbar}>
          <Input
            className={styles.searchBox}
            contentBefore={<Search20Regular />}
            placeholder="Search projects..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Toolbar>
            <ToolbarButton appearance="subtle" icon={<Filter20Regular />}>
              Filter
            </ToolbarButton>
            <ToolbarButton appearance="subtle" icon={<ArrowDownload20Regular />}>
              Export
            </ToolbarButton>
            <ToolbarButton appearance="subtle" icon={<Settings20Regular />}>
              Settings
            </ToolbarButton>
            <ToolbarDivider />
            <ToolbarButton appearance="primary" icon={<Add20Regular />}>
              New Project
            </ToolbarButton>
          </Toolbar>
        </div>

        <DataGrid
          items={items}
          columns={columns}
          sortable
          selectionMode="multiselect"
          getRowId={(item) => item.id}
          focusMode="composite"
          style={{ minWidth: '900px' }}
        >
          <DataGridHeader>
            <DataGridRow selectionCell={{ checkboxIndicator: { 'aria-label': 'Select all rows' } }}>
              {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody>
            {({ item, rowId }) => (
              <DataGridRow key={rowId} selectionCell={{ checkboxIndicator: { 'aria-label': 'Select row' } }}>
                {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
    </div>
  );
}
