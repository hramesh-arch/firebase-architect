// Ant Design Form Preview - Using Alibaba's Ant Design Form Components
// Showcasing Ant Design's comprehensive form library with built-in validation

import { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Rate,
  Upload,
  Button,
  Space,
  Card,
  Divider,
  Typography,
  Row,
  Col,
  message,
  Cascader,
  TreeSelect,
  AutoComplete,
  Alert,
} from 'antd';
import {
  SaveOutlined,
  CloseOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  BankOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GlobalOutlined,
} from '@ant-design/icons';
import './AntDesignFormPreview.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function AntDesignFormPreview({ config }) {
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [budget, setBudget] = useState(50000);

  const categories = [
    {
      value: 'development',
      label: 'Development',
      children: [
        { value: 'web', label: 'Web Development' },
        { value: 'mobile', label: 'Mobile Development' },
        { value: 'backend', label: 'Backend Development' },
      ],
    },
    {
      value: 'design',
      label: 'Design',
      children: [
        { value: 'ui', label: 'UI Design' },
        { value: 'ux', label: 'UX Design' },
        { value: 'graphic', label: 'Graphic Design' },
      ],
    },
    {
      value: 'marketing',
      label: 'Marketing',
      children: [
        { value: 'digital', label: 'Digital Marketing' },
        { value: 'content', label: 'Content Marketing' },
        { value: 'social', label: 'Social Media' },
      ],
    },
  ];

  const teamMembers = [
    { title: 'John Smith', value: 'john-smith', key: 'john-smith' },
    { title: 'Sarah Johnson', value: 'sarah-johnson', key: 'sarah-johnson' },
    { title: 'Mike Chen', value: 'mike-chen', key: 'mike-chen' },
    { title: 'Emma Davis', value: 'emma-davis', key: 'emma-davis' },
    { title: 'Alex Turner', value: 'alex-turner', key: 'alex-turner' },
    { title: 'Lisa Wang', value: 'lisa-wang', key: 'lisa-wang' },
    { title: 'Tom Brown', value: 'tom-brown', key: 'tom-brown' },
    { title: 'Rachel Green', value: 'rachel-green', key: 'rachel-green' },
  ];

  const uploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 5,
    beforeUpload: (file) => {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
      }
      return false; // Prevent actual upload in demo
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('Project created successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields!');
  };

  return (
    <div className="ant-design-form-preview">
      <div className="form-container">
        {/* Header */}
        <div className="form-header">
          <Title level={2}>Create New Project</Title>
          <Paragraph type="secondary">
            Fill out the form below to create a new project. Fields marked with * are required.
          </Paragraph>
        </div>

        {/* Main Form */}
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              priority: 'medium',
              budget: 50000,
              rating: 0,
              emailNotifications: true,
              smsNotifications: false,
              pushNotifications: true,
              visibility: true,
              autoBackup: false,
              weeklyReports: false,
            }}
          >
            {/* Section: Basic Information */}
            <Divider orientation="left">Basic Information</Divider>

            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[
                { required: true, message: 'Please enter the project name!' },
                { min: 3, message: 'Project name must be at least 3 characters!' },
              ]}
              tooltip="This will be visible to all team members"
            >
              <Input
                placeholder="Enter project name"
                prefix={<BankOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { max: 500, message: 'Description cannot exceed 500 characters!' },
              ]}
              tooltip="Maximum 500 characters"
            >
              <TextArea
                placeholder="Provide a detailed description of your project"
                rows={4}
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Category"
                  name="category"
                  rules={[{ required: true, message: 'Please select a category!' }]}
                >
                  <Cascader
                    options={categories}
                    placeholder="Choose an option"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Priority Level"
                  name="priority"
                  rules={[{ required: true, message: 'Please select priority!' }]}
                >
                  <Radio.Group size="large">
                    <Radio.Button value="low">Low</Radio.Button>
                    <Radio.Button value="medium">Medium</Radio.Button>
                    <Radio.Button value="high">High</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Project Rating"
              name="rating"
              tooltip="How would you rate the project importance?"
            >
              <Rate allowHalf />
            </Form.Item>

            {/* Section: Team & Resources */}
            <Divider orientation="left">Team & Resources</Divider>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Manager"
                  name="projectManager"
                  rules={[{ required: true, message: 'Please enter the project manager name!' }]}
                >
                  <Input
                    placeholder="Enter name"
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Contact Email"
                  name="email"
                  rules={[
                    { type: 'email', message: 'Please enter a valid email!' },
                    { required: true, message: 'Please enter the contact email!' },
                  ]}
                >
                  <Input
                    placeholder="email@example.com"
                    prefix={<MailOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { pattern: /^[0-9-+() ]+$/, message: 'Please enter a valid phone number!' },
                  ]}
                >
                  <Input
                    placeholder="+1 (555) 123-4567"
                    prefix={<PhoneOutlined />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Department"
                  name="department"
                >
                  <Select placeholder="Select department" size="large">
                    <Option value="engineering">Engineering</Option>
                    <Option value="design">Design</Option>
                    <Option value="marketing">Marketing</Option>
                    <Option value="sales">Sales</Option>
                    <Option value="operations">Operations</Option>
                    <Option value="research">Research</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Team Members"
              name="teamMembers"
              tooltip="Select team members to collaborate on this project"
            >
              <TreeSelect
                treeData={teamMembers}
                placeholder="Select team members"
                multiple
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label={`Estimated Budget: $${budget.toLocaleString()}`}
              name="budget"
            >
              <Slider
                min={10000}
                max={500000}
                step={5000}
                value={budget}
                onChange={setBudget}
                marks={{
                  10000: '$10K',
                  250000: '$250K',
                  500000: '$500K',
                }}
                tooltip={{
                  formatter: (value) => `$${value.toLocaleString()}`,
                }}
              />
            </Form.Item>

            {/* Section: Timeline */}
            <Divider orientation="left">Timeline</Divider>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: 'Please select start date!' }]}
                >
                  <DatePicker
                    placeholder="Select start date"
                    size="large"
                    style={{ width: '100%' }}
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true, message: 'Please select end date!' }]}
                >
                  <DatePicker
                    placeholder="Select end date"
                    size="large"
                    style={{ width: '100%' }}
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Milestone Dates"
              name="milestones"
              tooltip="Select multiple milestone dates"
            >
              <RangePicker
                size="large"
                style={{ width: '100%' }}
                showTime
              />
            </Form.Item>

            {/* Section: Additional Settings */}
            <Divider orientation="left">Additional Settings</Divider>

            <Form.Item
              label="Project Documents"
              name="documents"
              tooltip="Upload relevant documents (max file size: 10MB)"
            >
              <Upload {...uploadProps} listType="text">
                <Button icon={<UploadOutlined />} size="large">
                  Click to Upload
                </Button>
              </Upload>
              <Text type="secondary" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
                PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
              </Text>
            </Form.Item>

            <Form.Item
              label="Cover Image"
              name="coverImage"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <CloudUploadOutlined style={{ fontSize: '32px' }} />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            {/* Notification Preferences */}
            <Alert
              message="Notification Preferences"
              description="Configure how you want to receive updates about this project"
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />

            <Form.Item name="emailNotifications" valuePropName="checked">
              <Switch />
              <span style={{ marginLeft: '12px' }}>Email notifications for project updates</span>
            </Form.Item>

            <Form.Item name="smsNotifications" valuePropName="checked">
              <Switch />
              <span style={{ marginLeft: '12px' }}>SMS alerts for critical milestones</span>
            </Form.Item>

            <Form.Item name="pushNotifications" valuePropName="checked">
              <Switch />
              <span style={{ marginLeft: '12px' }}>Push notifications in mobile app</span>
            </Form.Item>

            <Divider />

            {/* Checkboxes */}
            <Form.Item name="visibility" valuePropName="checked">
              <Checkbox>Make this project visible to all team members</Checkbox>
            </Form.Item>

            <Form.Item name="autoBackup" valuePropName="checked">
              <Checkbox>Enable automatic backups</Checkbox>
            </Form.Item>

            <Form.Item name="weeklyReports" valuePropName="checked">
              <Checkbox>Send weekly progress reports</Checkbox>
            </Form.Item>

            {/* Form Actions */}
            <Form.Item style={{ marginTop: '32px' }}>
              <Space size="middle">
                <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />}>
                  Create Project
                </Button>
                <Button size="large">
                  Save as Draft
                </Button>
                <Button size="large" icon={<CloseOutlined />}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* Example: Login Form */}
        <Card style={{ marginTop: '32px', maxWidth: '480px', margin: '32px auto 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={3}>Sign In</Title>
            <Paragraph type="secondary">
              Enter your credentials to access your account
            </Paragraph>
          </div>

          <Form
            form={loginForm}
            layout="vertical"
            onFinish={(values) => {
              console.log('Login values:', values);
              message.success('Login successful!');
            }}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="Email Address"
              name="loginEmail"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                placeholder="you@example.com"
                prefix={<MailOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined />}
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Button type="link" size="small">
                  Forgot password?
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Sign In
              </Button>
            </Form.Item>

            <Divider plain>OR</Divider>

            <Form.Item>
              <Button size="large" block icon={<GlobalOutlined />}>
                Continue with Microsoft
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
