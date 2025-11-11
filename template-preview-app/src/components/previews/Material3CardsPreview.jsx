// Material 3 Cards Preview - Using Official MUI Components
// Showcasing various M3 card types and elevated surfaces

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Stack,
  Grid,
  createTheme,
  ThemeProvider,
  alpha
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  FavoriteBorder as FavoriteIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

export default function Material3CardsPreview({ config }) {
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
    },
    typography: {
      fontFamily: config.typography.fontFamily || "'Roboto', 'Google Sans', sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });

  const metrics = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', up: true, icon: MoneyIcon, color: theme.palette.primary.main },
    { label: 'New Customers', value: '2,350', change: '+15.3%', up: true, icon: PeopleIcon, color: theme.palette.success.main },
    { label: 'Total Orders', value: '12,234', change: '+8.2%', up: true, icon: ShoppingCartIcon, color: theme.palette.info.main },
    { label: 'Growth Rate', value: '87%', change: '-2.4%', up: false, icon: TrendingUpIcon, color: theme.palette.warning.main }
  ];

  const projects = [
    {
      title: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'In Progress',
      statusColor: theme.palette.primary.main,
      progress: 67,
      team: ['AB', 'CD', 'EF', 'GH'],
      tasks: { completed: 23, total: 34 },
      dueDate: 'Dec 25, 2024',
      priority: 'High',
      icon: AssessmentIcon,
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`
    },
    {
      title: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android with native features',
      status: 'In Progress',
      statusColor: theme.palette.info.main,
      progress: 45,
      team: ['IJ', 'KL', 'MN'],
      tasks: { completed: 12, total: 28 },
      dueDate: 'Jan 15, 2025',
      priority: 'High',
      icon: ShoppingCartIcon,
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard for business metrics',
      status: 'Completed',
      statusColor: theme.palette.success.main,
      progress: 100,
      team: ['OP', 'QR'],
      tasks: { completed: 18, total: 18 },
      dueDate: 'Nov 30, 2024',
      priority: 'Medium',
      icon: CheckCircleIcon,
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)} 0%, ${alpha(theme.palette.info.main, 0.15)} 100%)`
    }
  ];

  const products = [
    {
      name: 'Premium Subscription',
      price: '$29.99',
      period: '/month',
      description: 'Full access to all premium features',
      features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
      popular: true,
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
    },
    {
      name: 'Enterprise Plan',
      price: '$99.99',
      period: '/month',
      description: 'Designed for large teams and organizations',
      features: ['Everything in Premium', 'Custom integrations', 'Dedicated account manager'],
      popular: false,
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
        {/* Section: Metric Cards - Elevated */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            Elevated Cards - Metrics Overview
          </Typography>
          <Grid container spacing={3}>
            {metrics.map((metric, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  elevation={i === 0 ? 0 : i % 3 === 0 ? 2 : 1}
                  sx={{
                    height: '100%',
                    border: i === 0 ? 1 : 0,
                    borderColor: 'divider',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            bgcolor: alpha(metric.color, 0.12),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <metric.icon sx={{ fontSize: 28, color: metric.color }} />
                        </Box>
                        <Chip
                          icon={metric.up ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          label={metric.change}
                          size="small"
                          sx={{
                            height: 28,
                            fontWeight: 600,
                            bgcolor: metric.up
                              ? alpha(theme.palette.success.main, 0.12)
                              : alpha(theme.palette.error.main, 0.12),
                            color: metric.up ? 'success.main' : 'error.main',
                            '& .MuiChip-icon': {
                              color: 'inherit'
                            }
                          }}
                        />
                      </Stack>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {metric.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {metric.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section: Filled Cards - Projects */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            Filled Cards - Project Management
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 160,
                      background: project.bgGradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <project.icon sx={{ fontSize: 64, color: alpha(project.statusColor, 0.3) }} />
                  </Box>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: project.statusColor }}>
                        {project.title.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={
                      <Typography variant="h6" fontWeight={600}>
                        {project.title}
                      </Typography>
                    }
                    subheader={
                      <Chip
                        label={project.status}
                        size="small"
                        sx={{
                          mt: 0.5,
                          height: 24,
                          bgcolor: alpha(project.statusColor, 0.12),
                          color: project.statusColor,
                          fontWeight: 600
                        }}
                      />
                    }
                    sx={{ pb: 1 }}
                  />
                  <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>

                    <Stack spacing={2}>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                          <Typography variant="caption" fontWeight={500}>
                            Progress
                          </Typography>
                          <Typography variant="caption" fontWeight={700} color="primary">
                            {project.progress}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{
                            height: 6,
                            borderRadius: 1,
                            bgcolor: alpha(project.statusColor, 0.12),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: project.statusColor,
                              borderRadius: 1
                            }
                          }}
                        />
                      </Box>

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <CheckCircleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {project.tasks.completed}/{project.tasks.total}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {project.dueDate}
                            </Typography>
                          </Stack>
                        </Stack>
                        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                          {project.team.map((member, idx) => (
                            <Avatar key={idx} sx={{ bgcolor: theme.palette.secondary.main }}>
                              {member}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section: Outlined Cards - Product Cards */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            Outlined Cards - Product Showcase
          </Typography>
          <Grid container spacing={3}>
            {products.map((product, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    border: 2,
                    borderColor: product.popular ? 'primary.main' : 'divider',
                    position: 'relative',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 3,
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  {product.popular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1
                      }}
                    >
                      <Chip
                        icon={<StarIcon />}
                        label="Popular"
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      height: 200,
                      background: product.bgGradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MoneyIcon sx={{ fontSize: 72, color: alpha(theme.palette.primary.main, 0.25) }} />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>

                    <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 3 }}>
                      <Typography variant="h3" fontWeight={700} color="primary">
                        {product.price}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {product.period}
                      </Typography>
                    </Stack>

                    <Stack spacing={1.5}>
                      {product.features.map((feature, idx) => (
                        <Stack key={idx} direction="row" spacing={1} alignItems="center">
                          <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                    <Button
                      fullWidth
                      variant={product.popular ? 'contained' : 'outlined'}
                      size="large"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2
                      }}
                    >
                      Get Started
                    </Button>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section: Simple Cards - Quick Stats */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            Simple Cards - Activity Feed
          </Typography>
          <Grid container spacing={2}>
            {[
              { title: 'New user registered', time: '2 minutes ago', icon: PeopleIcon, color: theme.palette.primary.main },
              { title: 'Order #1234 completed', time: '15 minutes ago', icon: CheckCircleIcon, color: theme.palette.success.main },
              { title: 'Monthly report generated', time: '1 hour ago', icon: AssessmentIcon, color: theme.palette.info.main },
              { title: 'Payment received', time: '3 hours ago', icon: MoneyIcon, color: theme.palette.warning.main },
            ].map((activity, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: alpha(activity.color, 0.12),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <activity.icon sx={{ fontSize: 24, color: activity.color }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" fontWeight={600} noWrap>
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
