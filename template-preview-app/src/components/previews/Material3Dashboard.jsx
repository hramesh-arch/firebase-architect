// Material 3 Dashboard - Using Official MUI Components
// Enhanced layout with official M3 colors and expanded navigation

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Chip,
  Avatar,
  Divider,
  Stack,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Badge,
  Fab,
  createTheme,
  ThemeProvider,
  alpha
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  MoreVert as MoreVertIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  Cloud as CloudIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useState } from 'react';

export default function Material3Dashboard({ config }) {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // Official Material 3 color palette (Material You)
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: config.colors.primary || '#6750A4',  // M3 Primary
        light: '#EADDFF',  // Primary Container
        dark: '#21005D',   // On Primary Container
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: config.colors.secondary || '#625B71',  // M3 Secondary
        light: '#E8DEF8',  // Secondary Container
        dark: '#1D192B',   // On Secondary Container
        contrastText: '#FFFFFF',
      },
      tertiary: {
        main: '#7D5260',   // M3 Tertiary
        light: '#FFD8E4',  // Tertiary Container
        dark: '#31111D',   // On Tertiary Container
      },
      success: {
        main: config.colors.success || '#2e7d32',
      },
      warning: {
        main: config.colors.warning || '#ed6c02',
      },
      error: {
        main: config.colors.error || '#BA1A1A',  // M3 Error
        light: '#FFDAD6',  // Error Container
        dark: '#410002',   // On Error Container
      },
      info: {
        main: config.colors.info || '#0288d1',
      },
      background: {
        default: config.colors.background || '#FFFBFE',  // M3 Background
        paper: config.colors.surface || '#FFFBFE',       // M3 Surface
      },
      text: {
        primary: config.colors.text || '#1C1B1F',  // M3 On Surface
        secondary: '#49454F',  // M3 On Surface Variant
      },
      divider: '#79747E',  // M3 Outline
    },
    typography: {
      fontFamily: config.typography.fontFamily || "'Roboto', 'Google Sans', sans-serif",
    },
    shape: {
      borderRadius: 12,  // M3 default shape
    },
  });

  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20%', icon: MoneyIcon, color: theme.palette.primary.main },
    { label: 'Subscriptions', value: '2,350', change: '+180%', icon: PeopleIcon, color: theme.palette.secondary.main },
    { label: 'Sales', value: '12,234', change: '+19%', icon: TrendingUpIcon, color: theme.palette.success.main },
    { label: 'Active Now', value: '573', change: '+201', icon: BarChartIcon, color: theme.palette.info.main }
  ];

  const transactions = [
    { name: 'Emma Wilson', id: 'TXN-001', date: 'Dec 10, 2024', amount: '$250.00', status: 'Success' },
    { name: 'Liam Brown', id: 'TXN-002', date: 'Dec 9, 2024', amount: '$180.00', status: 'Processing' },
    { name: 'Noah Davis', id: 'TXN-003', date: 'Dec 8, 2024', amount: '$320.00', status: 'Success' },
    { name: 'Olivia Taylor', id: 'TXN-004', date: 'Dec 7, 2024', amount: '$125.00', status: 'Success' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Enhanced Header with more options */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Toolbar sx={{ minHeight: 64 }}>
            {/* Logo/Brand */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 4 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DashboardIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Material 3
              </Typography>
            </Stack>

            {/* Navigation Tabs */}
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{
                flexGrow: 1,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: 100,
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }
              }}
            >
              <Tab icon={<DashboardIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Dashboard" />
              <Tab icon={<AssessmentIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Analytics" />
              <Tab icon={<DescriptionIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Reports" />
              <Tab icon={<CloudIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Cloud" />
            </Tabs>

            {/* Action buttons */}
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <SearchIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <SettingsIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <AccountCircleIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'text.secondary' }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Help</MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>

        {/* Content */}
        <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
          {/* Welcome Section with M3 Tonal Surface */}
          <Box
            sx={{
              mb: 3,
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
              Welcome back, Alex
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Here's what's happening with your business today
            </Typography>
          </Box>

          {/* Stats - Showcasing M3 Elevation Levels */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {stats.map((stat, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  elevation={i % 2 === 0 ? 0 : 1}
                  sx={{
                    border: i % 2 === 0 ? 1 : 0,
                    borderColor: 'divider',
                    transition: 'all 0.2s',
                    '&:hover': {
                      elevation: 3,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                      <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        bgcolor: i === 0 ? 'primary.light' : i === 1 ? 'secondary.light' : i === 2 ? alpha(theme.palette.success.main, 0.12) : alpha(theme.palette.info.main, 0.12),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <stat.icon sx={{ fontSize: 24, color: stat.color }} />
                      </Box>
                      <Chip
                        label={stat.change}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          bgcolor: alpha(theme.palette.success.main, 0.12),
                          color: 'success.main',
                          border: 'none'
                        }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '2rem', color: 'text.primary' }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Chart & Quick Actions - Enhanced M3 Layout */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Main Chart */}
            <Grid item xs={12} md={8}>
              <Card elevation={1} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>Sales Overview</Typography>
                      <Typography variant="body2" color="text.secondary">265 sales this month</Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      {['Week', 'Month', 'Year'].map((period, idx) => (
                        <Button
                          key={period}
                          size="small"
                          variant={idx === 1 ? "contained" : "outlined"}
                          sx={{
                            textTransform: 'none',
                            fontSize: '0.8rem',
                            minWidth: 70,
                            borderRadius: 2,
                            ...(idx !== 1 && {
                              borderColor: 'divider',
                              color: 'text.secondary',
                              bgcolor: 'transparent'
                            })
                          }}
                        >
                          {period}
                        </Button>
                      ))}
                    </Stack>
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 200 }}>
                    {[65, 85, 70, 95, 75, 90, 80, 110, 85, 105, 90, 115].map((h, i) => (
                      <Box
                        key={i}
                        sx={{
                          flex: 1,
                          height: `${(h / 115) * 100}%`,
                          bgcolor: i === 7 ? 'primary.main' : alpha(theme.palette.primary.main, 0.7),
                          borderRadius: '4px 4px 0 0',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            transform: 'scaleY(1.05)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Actions & Activity */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                {/* Quick Actions Card */}
                <Card elevation={1}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Quick Actions</Typography>
                    <Stack spacing={1.5}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          py: 1.25,
                          borderRadius: 2
                        }}
                      >
                        New Invoice
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<ScheduleIcon />}
                        sx={{
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          py: 1.25,
                          borderRadius: 2,
                          borderColor: 'divider'
                        }}
                      >
                        Schedule Report
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CheckCircleIcon />}
                        sx={{
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          py: 1.25,
                          borderRadius: 2,
                          borderColor: 'divider'
                        }}
                      >
                        View Tasks
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Activity Summary */}
                <Card elevation={0} sx={{ border: 1, borderColor: 'divider', flex: 1 }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Today's Activity</Typography>
                    <Stack spacing={2}>
                      {[
                        { label: 'Completed', value: 12, icon: CheckCircleIcon, color: theme.palette.success.main },
                        { label: 'In Progress', value: 5, icon: ScheduleIcon, color: theme.palette.warning.main },
                        { label: 'Pending', value: 2, icon: TrendingUpIcon, color: theme.palette.info.main }
                      ].map((item, i) => (
                        <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: alpha(item.color, 0.12),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <item.icon sx={{ fontSize: 18, color: item.color }} />
                            </Box>
                            <Typography variant="body2" fontSize="0.875rem">{item.label}</Typography>
                          </Stack>
                          <Typography variant="h6" fontSize="1.25rem" fontWeight={700}>
                            {item.value}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          {/* Recent Transactions - Enhanced */}
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>Recent Transactions</Typography>
                  <Typography variant="body2" color="text.secondary">Latest payment activities</Typography>
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    color: 'primary.main',
                    fontWeight: 500
                  }}
                >
                  View All →
                </Button>
              </Stack>
              <Stack divider={<Divider />} spacing={0}>
                {transactions.map((txn, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      py: 2,
                      transition: 'background-color 0.2s',
                      borderRadius: 2,
                      px: 1,
                      mx: -1,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.04)
                      }
                    }}
                  >
                    <Avatar sx={{
                      width: 40,
                      height: 40,
                      bgcolor: i % 3 === 0 ? 'primary.light' : i % 3 === 1 ? 'secondary.light' : alpha(theme.palette.tertiary.main, 0.12),
                      color: i % 3 === 0 ? 'primary.main' : i % 3 === 1 ? 'secondary.main' : 'tertiary.main',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}>
                      {txn.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600} fontSize="0.9rem">
                        {txn.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
                        {txn.id} · {txn.date}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" fontWeight={700} fontSize="0.9rem" sx={{ mb: 0.5 }}>
                        {txn.amount}
                      </Typography>
                      <Chip
                        label={txn.status}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          bgcolor: txn.status === 'Success'
                            ? alpha(theme.palette.success.main, 0.12)
                            : alpha(theme.palette.warning.main, 0.12),
                          color: txn.status === 'Success' ? 'success.main' : 'warning.main',
                          border: 'none',
                          borderRadius: 1.5
                        }}
                      />
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Extended FAB - M3 Style */}
        <Fab
          variant="extended"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            borderRadius: 4,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          New Transaction
        </Fab>
      </Box>
    </ThemeProvider>
  );
}
