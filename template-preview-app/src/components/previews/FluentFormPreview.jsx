// Fluent UI Form Preview - Using Microsoft Fluent UI 2 Form Components
// Showcasing Fluent's modern, accessible form controls

import { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Dropdown,
  Option,
  Combobox,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  DatePicker,
  TimePicker,
  InfoLabel,
  Card,
  Text,
  Badge,
  makeStyles,
  shorthands,
  tokens,
  Label,
} from '@fluentui/react-components';
import {
  Save20Regular,
  Dismiss20Regular,
  CloudArrowUp20Regular,
  Info20Regular,
  Calendar20Regular,
  People20Regular,
  Mail20Regular,
  Building20Regular,
  Eye20Regular,
  EyeOff20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground3,
    minHeight: '100vh',
    ...shorthands.padding('32px'),
    fontFamily: tokens.fontFamilyBase,
  },
  formContainer: {
    maxWidth: '896px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '8px',
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  card: {
    ...shorthands.padding('32px'),
    marginBottom: '24px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '16px',
    paddingBottom: '12px',
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    color: tokens.colorNeutralForeground1,
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    ...shorthands.gap('16px'),
  },
  fieldStack: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  uploadArea: {
    ...shorthands.padding('32px'),
    ...shorthands.border('2px', 'dashed', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  uploadIcon: {
    fontSize: '48px',
    color: tokens.colorBrandForeground1,
    marginBottom: '16px',
  },
  notificationBox: {
    ...shorthands.padding('20px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  notificationTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '12px',
    color: tokens.colorNeutralForeground1,
  },
  actionButtons: {
    display: 'flex',
    ...shorthands.gap('12px'),
    paddingTop: '24px',
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  loginCard: {
    maxWidth: '448px',
    margin: '0 auto',
    ...shorthands.padding('32px'),
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  loginTitle: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '8px',
    color: tokens.colorNeutralForeground1,
  },
  loginSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '24px 0',
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    '&::before, &::after': {
      content: '""',
      flex: 1,
      ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    },
    '&::before': {
      marginRight: '16px',
    },
    '&::after': {
      marginLeft: '16px',
    },
  },
  rememberRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function FluentFormPreview({ config }) {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [budget, setBudget] = useState(50000);

  const teamMembers = [
    'John Smith',
    'Sarah Johnson',
    'Mike Chen',
    'Emma Davis',
    'Alex Turner',
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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Create New Project</h2>
          <p className={styles.subtitle}>
            Fill out the form below to create a new project. Fields marked with * are required.
          </p>
        </div>

        {/* Main Form */}
        <Card className={styles.card}>
          {/* Section: Basic Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            <div className={styles.fieldStack}>
              <Field
                label="Project Name"
                required
                hint="This will be visible to all team members"
              >
                <Input
                  placeholder="Enter project name"
                  contentBefore={<Building20Regular />}
                />
              </Field>

              <Field label="Description" hint="Maximum 500 characters">
                <Textarea
                  placeholder="Provide a detailed description of your project"
                  rows={4}
                />
              </Field>

              <div className={styles.fieldGrid}>
                <Field label="Project Category" required>
                  <Dropdown placeholder="Choose an option">
                    {categories.map((cat) => (
                      <Option key={cat} value={cat}>
                        {cat}
                      </Option>
                    ))}
                  </Dropdown>
                </Field>

                <Field label="Priority Level">
                  <RadioGroup defaultValue="medium">
                    <Radio value="low" label="Low" />
                    <Radio value="medium" label="Medium" />
                    <Radio value="high" label="High" />
                  </RadioGroup>
                </Field>
              </div>
            </div>
          </div>

          {/* Section: Team & Resources */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Team & Resources</h3>
            <div className={styles.fieldStack}>
              <div className={styles.fieldGrid}>
                <Field label="Project Manager" required>
                  <Input
                    placeholder="Enter name"
                    contentBefore={<People20Regular />}
                  />
                </Field>

                <Field label="Contact Email">
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    contentBefore={<Mail20Regular />}
                  />
                </Field>
              </div>

              <Field
                label="Team Members"
                hint="Select team members to collaborate on this project"
              >
                <Combobox
                  multiselect
                  placeholder="Select team members"
                >
                  {teamMembers.map((member) => (
                    <Option key={member} value={member}>
                      {member}
                    </Option>
                  ))}
                </Combobox>
              </Field>

              <Field
                label={
                  <div>
                    Estimated Budget: <strong>${budget.toLocaleString()}</strong>
                  </div>
                }
              >
                <Slider
                  min={10000}
                  max={500000}
                  step={5000}
                  value={budget}
                  onChange={(e, data) => setBudget(data.value)}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: tokens.fontSizeBase200,
                    color: tokens.colorNeutralForeground3,
                    marginTop: '8px',
                  }}
                >
                  <span>$10,000</span>
                  <span>$250,000</span>
                  <span>$500,000</span>
                </div>
              </Field>
            </div>
          </div>

          {/* Section: Timeline */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Timeline</h3>
            <div className={styles.fieldGrid}>
              <Field label="Start Date" required>
                <DatePicker placeholder="Select start date" />
              </Field>

              <Field label="End Date" required>
                <DatePicker placeholder="Select end date" />
              </Field>
            </div>
          </div>

          {/* Section: Additional Settings */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Additional Settings</h3>
            <div className={styles.fieldStack}>
              {/* File Upload */}
              <Field
                label="Project Documents"
                hint="Upload relevant documents (max file size: 10MB)"
              >
                <div className={styles.uploadArea}>
                  <CloudArrowUp20Regular className={styles.uploadIcon} />
                  <Text weight="semibold" size={400}>
                    Click to upload or drag and drop
                  </Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3, marginTop: '8px' }}>
                    PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                  </Text>
                </div>
              </Field>

              {/* Notification Preferences */}
              <div className={styles.notificationBox}>
                <div className={styles.notificationTitle}>Notification Preferences</div>
                <div className={styles.fieldStack}>
                  <Switch
                    label="Email notifications for project updates"
                    defaultChecked
                  />
                  <Switch label="SMS alerts for critical milestones" />
                  <Switch
                    label="Push notifications in mobile app"
                    defaultChecked
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className={styles.fieldStack}>
                <Checkbox
                  label="Make this project visible to all team members"
                  defaultChecked
                />
                <Checkbox label="Enable automatic backups" />
                <Checkbox label="Send weekly progress reports" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.actionButtons}>
            <Button appearance="primary" size="large" icon={<Save20Regular />}>
              Create Project
            </Button>
            <Button appearance="secondary" size="large">
              Save as Draft
            </Button>
            <Button appearance="subtle" size="large" icon={<Dismiss20Regular />}>
              Cancel
            </Button>
          </div>
        </Card>

        {/* Example: Login Form */}
        <Card className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h3 className={styles.loginTitle}>Sign In</h3>
            <p className={styles.loginSubtitle}>Enter your credentials to access your account</p>
          </div>

          <div className={styles.fieldStack}>
            <Field label="Email Address" required>
              <Input
                placeholder="you@example.com"
                type="email"
                contentBefore={<Mail20Regular />}
              />
            </Field>

            <Field label="Password" required>
              <Input
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                contentAfter={
                  <Button
                    appearance="transparent"
                    icon={showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
                    onClick={() => setShowPassword(!showPassword)}
                    size="small"
                  />
                }
              />
            </Field>

            <div className={styles.rememberRow}>
              <Checkbox label="Remember me" />
              <Button appearance="subtle" size="small">
                Forgot password?
              </Button>
            </div>

            <Button appearance="primary" size="large" style={{ width: '100%' }}>
              Sign In
            </Button>

            <div className={styles.divider}>OR</div>

            <Button appearance="outline" size="large" style={{ width: '100%' }}>
              Continue with Microsoft
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
