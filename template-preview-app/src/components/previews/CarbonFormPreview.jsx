// Carbon Form Preview - Using IBM Carbon Form Components
// Showcasing Carbon's enterprise-grade form components with validation

import { useState } from 'react';
import {
  Form,
  Stack,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Dropdown,
  MultiSelect,
  DatePicker,
  DatePickerInput,
  TimePicker,
  TimePickerSelect,
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  Toggle,
  Slider,
  Button,
  FileUploader,
  FormLabel,
  FormGroup,
  NumberInput,
  Tag,
  ComboBox,
} from '@carbon/react';
import {
  Save,
  Close,
  Information,
  CheckmarkFilled,
} from '@carbon/icons-react';
import './CarbonFormPreview.scss';

export default function CarbonFormPreview({ config }) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    category: '',
    priority: 'medium',
    budget: 50000,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const teamMembers = [
    { id: '1', label: 'John Smith', value: 'john@example.com' },
    { id: '2', label: 'Sarah Johnson', value: 'sarah@example.com' },
    { id: '3', label: 'Mike Chen', value: 'mike@example.com' },
    { id: '4', label: 'Emma Davis', value: 'emma@example.com' },
  ];

  const categories = [
    'Development',
    'Design',
    'Marketing',
    'Sales',
    'Operations',
    'Research'
  ];

  return (
    <div className="carbon-form-preview" style={{
      fontFamily: config.typography.fontFamily || "'IBM Plex Sans', sans-serif",
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            color: '#161616'
          }}>
            Create New Project
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#525252' }}>
            Fill out the form below to create a new project. Fields marked with * are required.
          </p>
        </div>

        {/* Main Form */}
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <Form>
            {/* Section: Basic Information */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#161616',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #e0e0e0'
              }}>
                Basic Information
              </h3>

              <Stack gap={6}>
                <TextInput
                  id="project-name"
                  labelText="Project Name"
                  placeholder="Enter project name"
                  required
                  invalid={false}
                  invalidText="Project name is required"
                  helperText="This will be visible to all team members"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                />

                <TextArea
                  id="description"
                  labelText="Description"
                  placeholder="Provide a detailed description of your project"
                  rows={4}
                  helperText="Maximum 500 characters"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <Select
                    id="category"
                    labelText="Project Category"
                    required
                    helperText="Select the primary category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <SelectItem value="" text="Choose an option" />
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} text={cat} />
                    ))}
                  </Select>

                  <div>
                    <FormLabel>Priority Level</FormLabel>
                    <RadioButtonGroup
                      name="priority"
                      defaultSelected={formData.priority}
                      onChange={(value) => setFormData({ ...formData, priority: value })}
                      style={{ marginTop: '0.5rem' }}
                    >
                      <RadioButton labelText="Low" value="low" id="priority-low" />
                      <RadioButton labelText="Medium" value="medium" id="priority-medium" />
                      <RadioButton labelText="High" value="high" id="priority-high" />
                    </RadioButtonGroup>
                  </div>
                </div>
              </Stack>
            </div>

            {/* Section: Team & Resources */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#161616',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #e0e0e0'
              }}>
                Team & Resources
              </h3>

              <Stack gap={6}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <TextInput
                    id="project-manager"
                    labelText="Project Manager"
                    placeholder="Enter name"
                    required
                  />

                  <TextInput
                    id="contact-email"
                    labelText="Contact Email"
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>

                <MultiSelect
                  id="team-members"
                  label="Team Members"
                  titleText="Team Members"
                  helperText="Select team members to collaborate on this project"
                  items={teamMembers}
                  itemToString={(item) => (item ? item.label : '')}
                  selectionFeedback="top-after-reopen"
                />

                <div>
                  <FormLabel>Estimated Budget: ${formData.budget.toLocaleString()}</FormLabel>
                  <Slider
                    id="budget-slider"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={formData.budget}
                    onChange={({ value }) => setFormData({ ...formData, budget: value })}
                    labelText=""
                    hideTextInput
                    style={{ marginTop: '1rem' }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#8d8d8d',
                    marginTop: '0.5rem'
                  }}>
                    <span>$10,000</span>
                    <span>$250,000</span>
                    <span>$500,000</span>
                  </div>
                </div>
              </Stack>
            </div>

            {/* Section: Timeline */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#161616',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #e0e0e0'
              }}>
                Timeline
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <DatePicker datePickerType="single">
                  <DatePickerInput
                    id="start-date"
                    placeholder="mm/dd/yyyy"
                    labelText="Start Date"
                    required
                  />
                </DatePicker>

                <DatePicker datePickerType="single">
                  <DatePickerInput
                    id="end-date"
                    placeholder="mm/dd/yyyy"
                    labelText="End Date"
                    required
                  />
                </DatePicker>
              </div>
            </div>

            {/* Section: Additional Settings */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#161616',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #e0e0e0'
              }}>
                Additional Settings
              </h3>

              <Stack gap={6}>
                {/* File Upload */}
                <FileUploader
                  labelTitle="Project Documents"
                  labelDescription="Upload relevant documents (max file size: 10MB)"
                  buttonLabel="Add files"
                  buttonKind="primary"
                  size="md"
                  filenameStatus="edit"
                  accept={['.pdf', '.doc', '.docx', '.xls', '.xlsx']}
                  multiple
                />

                {/* Notification Preferences */}
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f4f4f4',
                  border: '1px solid #e0e0e0'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: '#161616'
                  }}>
                    Notification Preferences
                  </h4>
                  <Stack gap={4}>
                    <Toggle
                      id="notify-email"
                      labelText="Email notifications for project updates"
                      defaultToggled={formData.notifications.email}
                      labelA="Off"
                      labelB="On"
                      onToggle={(checked) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, email: checked }
                      })}
                    />
                    <Toggle
                      id="notify-sms"
                      labelText="SMS alerts for critical milestones"
                      defaultToggled={formData.notifications.sms}
                      labelA="Off"
                      labelB="On"
                      onToggle={(checked) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, sms: checked }
                      })}
                    />
                    <Toggle
                      id="notify-push"
                      labelText="Push notifications in mobile app"
                      defaultToggled={formData.notifications.push}
                      labelA="Off"
                      labelB="On"
                      onToggle={(checked) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, push: checked }
                      })}
                    />
                  </Stack>
                </div>

                {/* Checkboxes */}
                <FormGroup legendText="">
                  <Checkbox
                    id="visibility"
                    labelText="Make this project visible to all team members"
                    defaultChecked
                  />
                  <Checkbox
                    id="backups"
                    labelText="Enable automatic backups"
                  />
                  <Checkbox
                    id="reports"
                    labelText="Send weekly progress reports"
                  />
                </FormGroup>
              </Stack>
            </div>

            {/* Form Actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e0e0e0'
            }}>
              <Button
                kind="primary"
                size="md"
                renderIcon={Save}
                type="submit"
              >
                Create Project
              </Button>
              <Button
                kind="secondary"
                size="md"
              >
                Save as Draft
              </Button>
              <Button
                kind="ghost"
                size="md"
                renderIcon={Close}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>

        {/* Example: Login Form */}
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          maxWidth: '448px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#161616'
            }}>
              Sign In
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#525252' }}>
              Enter your credentials to access your account
            </p>
          </div>

          <Form>
            <Stack gap={5}>
              <TextInput
                id="login-email"
                labelText="Email Address"
                placeholder="you@example.com"
                type="email"
                required
              />

              <TextInput.PasswordInput
                id="login-password"
                labelText="Password"
                placeholder="Enter your password"
                required
              />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Checkbox
                  id="remember-me"
                  labelText="Remember me"
                />
                <Button kind="ghost" size="sm">
                  Forgot password?
                </Button>
              </div>

              <Button
                kind="primary"
                size="md"
                type="submit"
                style={{ width: '100%' }}
              >
                Sign In
              </Button>

              <div style={{
                textAlign: 'center',
                padding: '1rem 0',
                borderTop: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.75rem',
                color: '#8d8d8d'
              }}>
                OR
              </div>

              <Button
                kind="tertiary"
                size="md"
                style={{ width: '100%' }}
              >
                Continue with Google
              </Button>
            </Stack>
          </Form>
        </div>
      </div>
    </div>
  );
}
