// Material 3 Form Preview - Using Official MUI Form Components
// Showcasing Material 3 input fields, select, date pickers, and form layouts

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Chip,
  Autocomplete,
  Stack,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
  alpha
} from '@mui/material';
import {
  Save as SaveIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CalendarToday as CalendarIcon,
  AccountCircle as AccountIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useState } from 'react';

export default function Material3FormPreview({ config }) {
  const [showPassword, setShowPassword] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [priority, setPriority] = useState('medium');
  const [budget, setBudget] = useState(50000);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

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

  const teamMembers = [
    { name: 'John Smith', email: 'john@example.com' },
    { name: 'Sarah Johnson', email: 'sarah@example.com' },
    { name: 'Mike Chen', email: 'mike@example.com' },
    { name: 'Emma Davis', email: 'emma@example.com' },
  ];

  const categories = [
    'Development',
    'Design',
    'Marketing',
    'Sales',
    'Operations',
    'Research',
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Create New Project
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill out the form below to create a new project with your team
            </Typography>
          </Box>

          {/* Info Alert */}
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: 24
              }
            }}
          >
            Fields marked with an asterisk (*) are required
          </Alert>

          {/* Main Form */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <form>
              {/* Section: Basic Information */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                  Basic Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Project Name"
                      placeholder="Enter project name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      placeholder="Provide a detailed description of your project"
                      variant="outlined"
                      helperText="Maximum 500 characters"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Project Category</InputLabel>
                      <Select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        label="Project Category"
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Select the primary category</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                        Priority Level
                      </Typography>
                      <RadioGroup
                        row
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <FormControlLabel
                          value="low"
                          control={<Radio />}
                          label="Low"
                        />
                        <FormControlLabel
                          value="medium"
                          control={<Radio />}
                          label="Medium"
                        />
                        <FormControlLabel
                          value="high"
                          control={<Radio />}
                          label="High"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Section: Team & Resources */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                  Team & Resources
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Project Manager"
                      placeholder="Enter name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Email"
                      type="email"
                      placeholder="email@example.com"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={teamMembers}
                      getOptionLabel={(option) => option.name}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                            color="primary"
                            variant="outlined"
                            sx={{ borderRadius: 1.5 }}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Team Members"
                          placeholder="Select team members"
                          helperText="Add team members to collaborate on this project"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            }
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                      Estimated Budget: ${budget.toLocaleString()}
                    </Typography>
                    <Slider
                      value={budget}
                      onChange={(e, newValue) => setBudget(newValue)}
                      min={10000}
                      max={500000}
                      step={5000}
                      marks={[
                        { value: 10000, label: '$10K' },
                        { value: 250000, label: '$250K' },
                        { value: 500000, label: '$500K' },
                      ]}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `$${(value / 1000).toFixed(0)}K`}
                      sx={{
                        '& .MuiSlider-thumb': {
                          width: 20,
                          height: 20,
                        },
                        '& .MuiSlider-rail': {
                          opacity: 0.3,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Section: Timeline */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                  Timeline
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="date"
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="date"
                      label="End Date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Section: Additional Settings */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                  Additional Settings
                </Typography>

                {/* File Upload */}
                <Card variant="outlined" sx={{ mb: 3, borderRadius: 2, borderStyle: 'dashed', borderWidth: 2 }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                      Upload Project Documents
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Drag and drop files here, or click to browse
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AttachFileIcon />}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    >
                      Choose Files
                    </Button>
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                    </Typography>
                  </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.04), borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Notification Preferences
                  </Typography>
                  <Stack spacing={1}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.email}
                          onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                          color="primary"
                        />
                      }
                      label="Email notifications for project updates"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.sms}
                          onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                          color="primary"
                        />
                      }
                      label="SMS alerts for critical milestones"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.push}
                          onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                          color="primary"
                        />
                      }
                      label="Push notifications in mobile app"
                    />
                  </Stack>
                </Box>

                {/* Checkboxes */}
                <Box sx={{ mt: 3 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary" />}
                    label="Make this project visible to all team members"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Enable automatic backups"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Send weekly progress reports"
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Form Actions */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CloseIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    minWidth: 140,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    minWidth: 140,
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    minWidth: 140,
                  }}
                >
                  Create Project
                </Button>
              </Stack>
            </form>
          </Paper>

          {/* Additional Example: Login Form */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              mt: 4,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Enter your credentials to access your account
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
                <Button
                  variant="text"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Forgot password?
                </Button>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  py: 1.5,
                }}
              >
                Sign In
              </Button>

              <Divider>
                <Typography variant="caption" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Continue with Google
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
