// Material 3 Table Preview - Using Official MUI Data Table Components
// Showcasing Material 3 data tables with sorting, filtering, and actions

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Avatar,
  AvatarGroup,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  LinearProgress,
  Stack,
  Toolbar,
  Tooltip,
  createTheme,
  ThemeProvider,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
  Add as AddIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { useState } from 'react';

export default function Material3TablePreview({ config }) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  // Official Material 3 theme
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: config.colors.primary || '#6750A4',
        light: '#EADDFF',
        dark: '#21005D',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: config.colors.secondary || '#625B71',
        light: '#E8DEF8',
        dark: '#1D192B',
        contrastText: '#FFFFFF',
      },
      success: {
        main: config.colors.success || '#2e7d32',
      },
      warning: {
        main: config.colors.warning || '#ed6c02',
      },
      error: {
        main: config.colors.error || '#BA1A1A',
      },
      info: {
        main: config.colors.info || '#0288d1',
      },
      background: {
        default: config.colors.background || '#FFFBFE',
        paper: config.colors.surface || '#FFFBFE',
      },
      text: {
        primary: config.colors.text || '#1C1B1F',
        secondary: '#49454F',
      },
      divider: '#79747E',
    },
    typography: {
      fontFamily: config.typography.fontFamily || "'Roboto', 'Google Sans', sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });

  const projects = [
    {
      id: 'PRJ-001',
      name: 'Enterprise CRM Redesign',
      team: 'Design Team',
      status: 'In Progress',
      statusColor: theme.palette.primary.main,
      progress: 67,
      dueDate: 'Dec 25, 2024',
      budget: '$125,000',
      members: ['JS', 'AM', 'KL', 'RT'],
      priority: 'High'
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App Development',
      team: 'Engineering',
      status: 'In Progress',
      statusColor: theme.palette.primary.main,
      progress: 45,
      dueDate: 'Jan 15, 2025',
      budget: '$250,000',
      members: ['RW', 'TK', 'SD'],
      priority: 'High'
    },
    {
      id: 'PRJ-003',
      name: 'Customer Portal v2.0',
      team: 'Full Stack',
      status: 'In Review',
      statusColor: theme.palette.warning.main,
      progress: 92,
      dueDate: 'Dec 12, 2024',
      budget: '$85,000',
      members: ['MC', 'PL'],
      priority: 'Medium'
    },
    {
      id: 'PRJ-004',
      name: 'Data Analytics Dashboard',
      team: 'Analytics',
      status: 'Completed',
      statusColor: theme.palette.success.main,
      progress: 100,
      dueDate: 'Nov 30, 2024',
      budget: '$95,000',
      members: ['BR', 'NH', 'GF', 'DW'],
      priority: 'Medium'
    },
    {
      id: 'PRJ-005',
      name: 'API Gateway Migration',
      team: 'DevOps',
      status: 'Planning',
      statusColor: theme.palette.info.main,
      progress: 12,
      dueDate: 'Feb 1, 2025',
      budget: '$180,000',
      members: ['LM', 'CT'],
      priority: 'Low'
    },
    {
      id: 'PRJ-006',
      name: 'Security Audit Q4',
      team: 'Security',
      status: 'In Progress',
      statusColor: theme.palette.primary.main,
      progress: 58,
      dueDate: 'Dec 31, 2024',
      budget: '$65,000',
      members: ['EB', 'VK', 'HJ'],
      priority: 'High'
    },
    {
      id: 'PRJ-007',
      name: 'Cloud Infrastructure Upgrade',
      team: 'DevOps',
      status: 'In Progress',
      statusColor: theme.palette.primary.main,
      progress: 73,
      dueDate: 'Jan 10, 2025',
      budget: '$200,000',
      members: ['ZX', 'YW'],
      priority: 'High'
    },
    {
      id: 'PRJ-008',
      name: 'Marketing Website Refresh',
      team: 'Marketing',
      status: 'Planning',
      statusColor: theme.palette.info.main,
      progress: 8,
      dueDate: 'Feb 15, 2025',
      budget: '$45,000',
      members: ['QW', 'ER', 'TY'],
      priority: 'Low'
    },
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(projects.map((n) => n.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const headCells = [
    { id: 'name', label: 'Project Name', sortable: true },
    { id: 'team', label: 'Team', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'progress', label: 'Progress', sortable: true },
    { id: 'budget', label: 'Budget', sortable: true },
    { id: 'dueDate', label: 'Due Date', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
        <Paper
          elevation={2}
          sx={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          {/* Enhanced Toolbar */}
          <Toolbar
            sx={{
              pl: { sm: 3 },
              pr: { xs: 2, sm: 3 },
              py: 2,
              bgcolor: selected.length > 0 ? alpha(theme.palette.primary.main, 0.08) : 'background.paper',
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: '1 1 100%' }}
                color="primary"
                variant="subtitle1"
                fontWeight={600}
              >
                {selected.length} selected
              </Typography>
            ) : (
              <Box sx={{ flex: '1 1 100%' }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  Projects Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage and track all active projects
                </Typography>
              </Box>
            )}

            {selected.length > 0 ? (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Delete">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More actions">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <TextField
                  placeholder="Search projects..."
                  variant="outlined"
                  size="small"
                  sx={{
                    width: 250,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                  }}
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileDownloadIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                  }}
                >
                  Export
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  New Project
                </Button>
              </Stack>
            )}
          </Toolbar>

          {/* Filter Menu */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => setFilterAnchorEl(null)}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 200
              }
            }}
          >
            <MenuItem>All Projects</MenuItem>
            <MenuItem>In Progress</MenuItem>
            <MenuItem>Completed</MenuItem>
            <MenuItem>Planning</MenuItem>
            <MenuItem>In Review</MenuItem>
          </Menu>

          {/* Table */}
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ bgcolor: 'background.paper' }}>
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < projects.length}
                      checked={projects.length > 0 && selected.length === projects.length}
                      onChange={handleSelectAllClick}
                      sx={{
                        color: 'text.secondary',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </TableCell>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sx={{
                        bgcolor: 'background.paper',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: 'text.secondary'
                      }}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => handleRequestSort(headCell.id)}
                          sx={{
                            '&.Mui-active': {
                              color: 'primary.main',
                            },
                            '& .MuiTableSortLabel-icon': {
                              opacity: 0.5,
                            }
                          }}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      ) : (
                        headCell.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project, index) => {
                  const isItemSelected = isSelected(project.id);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(project.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={project.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                        '&.Mui-selected': {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                          }
                        }
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          sx={{
                            color: 'text.secondary',
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                            {project.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {project.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AvatarGroup
                            max={3}
                            sx={{
                              '& .MuiAvatar-root': {
                                width: 28,
                                height: 28,
                                fontSize: '0.75rem',
                                bgcolor: theme.palette.secondary.main,
                                border: '2px solid white'
                              }
                            }}
                          >
                            {project.members.map((member, i) => (
                              <Avatar key={i}>{member}</Avatar>
                            ))}
                          </AvatarGroup>
                          <Typography variant="body2" color="text.secondary">
                            {project.team}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            bgcolor: alpha(project.statusColor, 0.12),
                            color: project.statusColor,
                            fontWeight: 600,
                            borderRadius: 1.5,
                            height: 28
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ width: 120 }}>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={project.progress}
                              sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 1,
                                bgcolor: alpha(project.statusColor, 0.12),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: project.statusColor,
                                  borderRadius: 1
                                }
                              }}
                            />
                            <Typography variant="caption" fontWeight={600} sx={{ minWidth: 35 }}>
                              {project.progress}%
                            </Typography>
                          </Stack>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {project.budget}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {project.dueDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="View">
                            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="More">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnchorEl(e.currentTarget);
                              }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: alpha(theme.palette.background.default, 0.5)
            }}
          />

          {/* Action Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
              }
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <VisibilityIcon fontSize="small" sx={{ mr: 1 }} /> View Details
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
