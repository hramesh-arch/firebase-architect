// Carbon Table Preview - Using IBM Carbon DataTable
// Showcasing Carbon's enterprise-grade data table with full features

import { useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow,
  Button,
  Tag,
  OverflowMenu,
  OverflowMenuItem,
  Pagination,
} from '@carbon/react';
import {
  Download,
  TrashCan,
  Edit,
  View,
  Filter,
  Settings,
  AddAlt,
} from '@carbon/icons-react';
import './CarbonTablePreview.scss';

export default function CarbonTablePreview({ config }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const headers = [
    { key: 'name', header: 'Project Name' },
    { key: 'id', header: 'ID' },
    { key: 'team', header: 'Team' },
    { key: 'status', header: 'Status' },
    { key: 'progress', header: 'Progress' },
    { key: 'budget', header: 'Budget' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'priority', header: 'Priority' },
    { key: 'actions', header: '' },
  ];

  const rows = [
    {
      id: 'row-1',
      name: 'Enterprise CRM Redesign',
      projectId: 'PRJ-001',
      team: 'Design Team',
      status: 'In Progress',
      statusType: 'blue',
      progress: 67,
      budget: '$125,000',
      dueDate: 'Dec 25, 2024',
      priority: 'High',
      priorityType: 'red',
      members: 5
    },
    {
      id: 'row-2',
      name: 'Mobile App Development',
      projectId: 'PRJ-002',
      team: 'Engineering',
      status: 'In Progress',
      statusType: 'blue',
      progress: 45,
      budget: '$250,000',
      dueDate: 'Jan 15, 2025',
      priority: 'High',
      priorityType: 'red',
      members: 8
    },
    {
      id: 'row-3',
      name: 'Customer Portal v2.0',
      projectId: 'PRJ-003',
      team: 'Full Stack',
      status: 'In Review',
      statusType: 'purple',
      progress: 92,
      budget: '$85,000',
      dueDate: 'Dec 12, 2024',
      priority: 'Medium',
      priorityType: 'warm-gray',
      members: 4
    },
    {
      id: 'row-4',
      name: 'Data Analytics Dashboard',
      projectId: 'PRJ-004',
      team: 'Analytics',
      status: 'Completed',
      statusType: 'green',
      progress: 100,
      budget: '$95,000',
      dueDate: 'Nov 30, 2024',
      priority: 'Medium',
      priorityType: 'warm-gray',
      members: 6
    },
    {
      id: 'row-5',
      name: 'API Gateway Migration',
      projectId: 'PRJ-005',
      team: 'DevOps',
      status: 'Planning',
      statusType: 'gray',
      progress: 12,
      budget: '$180,000',
      dueDate: 'Feb 1, 2025',
      priority: 'Low',
      priorityType: 'cool-gray',
      members: 6
    },
    {
      id: 'row-6',
      name: 'Security Audit Q4',
      projectId: 'PRJ-006',
      team: 'Security',
      status: 'In Progress',
      statusType: 'blue',
      progress: 58,
      budget: '$65,000',
      dueDate: 'Dec 31, 2024',
      priority: 'High',
      priorityType: 'red',
      members: 4
    },
    {
      id: 'row-7',
      name: 'Cloud Infrastructure Upgrade',
      projectId: 'PRJ-007',
      team: 'DevOps',
      status: 'In Progress',
      statusType: 'blue',
      progress: 73,
      budget: '$200,000',
      dueDate: 'Jan 10, 2025',
      priority: 'High',
      priorityType: 'red',
      members: 7
    },
    {
      id: 'row-8',
      name: 'Marketing Website Refresh',
      projectId: 'PRJ-008',
      team: 'Marketing',
      status: 'Planning',
      statusType: 'gray',
      progress: 8,
      budget: '$45,000',
      dueDate: 'Feb 15, 2025',
      priority: 'Low',
      priorityType: 'cool-gray',
      members: 3
    },
  ];

  const getRowItems = (rows) =>
    rows.map((row) => ({
      ...row,
      id: row.projectId,
      key: row.id,
    }));

  return (
    <div className="carbon-table-preview" style={{
      fontFamily: config.typography.fontFamily || "'IBM Plex Sans', sans-serif",
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: '#161616'
        }}>
          Projects Overview
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#525252' }}>
          Manage and track all active projects across your organization
        </p>
      </div>

      <DataTable
        rows={getRowItems(rows)}
        headers={headers}
        isSortable
        useZebraStyles={false}
        size="lg"
      >
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();

          return (
            <TableContainer
              {...getTableContainerProps()}
              style={{ backgroundColor: '#fff' }}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Download}
                    onClick={() => console.log('Download selected')}
                  >
                    Download
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={TrashCan}
                    onClick={() => console.log('Delete selected')}
                  >
                    Delete
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent
                  aria-hidden={batchActionProps.shouldShowBatchActions}
                >
                  <TableToolbarSearch
                    persistent
                    placeholder="Search projects..."
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    renderIcon={Filter}
                    iconDescription="Filter"
                  >
                    <TableToolbarAction onClick={() => {}}>
                      All projects
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => {}}>
                      In Progress
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => {}}>
                      Completed
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => {}}>
                      Planning
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <TableToolbarMenu
                    renderIcon={Settings}
                    iconDescription="Settings"
                  >
                    <TableToolbarAction onClick={() => {}}>
                      Export to CSV
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => {}}>
                      Export to PDF
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => {}}>
                      Column preferences
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button
                    kind="primary"
                    renderIcon={AddAlt}
                    size="sm"
                  >
                    New project
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} size="lg">
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader
                        key={i}
                        {...getHeaderProps({ header })}
                        isSortable={header.key !== 'actions'}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i} {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => {
                        if (cell.info.header === 'name') {
                          return (
                            <TableCell key={cell.id}>
                              <div>
                                <div style={{
                                  fontWeight: 600,
                                  color: '#161616',
                                  marginBottom: '0.25rem'
                                }}>
                                  {cell.value}
                                </div>
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: '#8d8d8d'
                                }}>
                                  {row.cells.find(c => c.info.header === 'id')?.value}
                                </div>
                              </div>
                            </TableCell>
                          );
                        }
                        if (cell.info.header === 'id') {
                          return null; // Already shown under name
                        }
                        if (cell.info.header === 'status') {
                          const statusRow = rows[i];
                          return (
                            <TableCell key={cell.id}>
                              <Tag type={statusRow.statusType} size="sm">
                                {cell.value}
                              </Tag>
                            </TableCell>
                          );
                        }
                        if (cell.info.header === 'progress') {
                          return (
                            <TableCell key={cell.id}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                  flex: 1,
                                  height: '4px',
                                  backgroundColor: '#e0e0e0',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    width: `${cell.value}%`,
                                    backgroundColor: config.colors.primary || '#0f62fe'
                                  }} />
                                </div>
                                <span style={{
                                  fontSize: '0.875rem',
                                  fontWeight: 600,
                                  color: '#161616',
                                  minWidth: '45px',
                                  textAlign: 'right'
                                }}>
                                  {cell.value}%
                                </span>
                              </div>
                            </TableCell>
                          );
                        }
                        if (cell.info.header === 'budget') {
                          return (
                            <TableCell key={cell.id}>
                              <span style={{ fontWeight: 600 }}>{cell.value}</span>
                            </TableCell>
                          );
                        }
                        if (cell.info.header === 'priority') {
                          const statusRow = rows[i];
                          return (
                            <TableCell key={cell.id}>
                              <Tag type={statusRow.priorityType} size="sm">
                                {cell.value}
                              </Tag>
                            </TableCell>
                          );
                        }
                        if (cell.info.header === 'actions') {
                          return (
                            <TableCell key={cell.id}>
                              <OverflowMenu size="sm" flipped>
                                <OverflowMenuItem itemText="View details" />
                                <OverflowMenuItem itemText="Edit project" />
                                <OverflowMenuItem itemText="Download report" />
                                <OverflowMenuItem hasDivider isDelete itemText="Delete" />
                              </OverflowMenu>
                            </TableCell>
                          );
                        }
                        return <TableCell key={cell.id}>{cell.value}</TableCell>;
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                backwardText="Previous page"
                forwardText="Next page"
                itemsPerPageText="Items per page:"
                page={page}
                pageSize={pageSize}
                pageSizes={[5, 10, 20, 30]}
                totalItems={rows.length}
                onChange={({ page, pageSize }) => {
                  setPage(page);
                  setPageSize(pageSize);
                }}
              />
            </TableContainer>
          );
        }}
      </DataTable>
    </div>
  );
}
