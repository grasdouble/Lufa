import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert, Button, tokens } from '@grasdouble/lufa_design-system';

const { color } = tokens;

const meta = {
  title: '5. Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Display important messages to users with different severity levels. Supports titles, icons, and dismissal.',
      },
    },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert severity level',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    children: {
      control: 'text',
      description: 'Alert message content',
    },
    closable: {
      control: 'boolean',
      description: 'Shows close button',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'info',
    title: 'Alert Title',
    children: 'This is an informational alert message.',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info">This is an informational message</Alert>
      <Alert variant="success">Operation completed successfully!</Alert>
      <Alert variant="warning">Please review this important information</Alert>
      <Alert variant="error">An error occurred. Please try again.</Alert>
    </div>
  ),
};

export const Ttitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info" title="Information">
        Here is some additional context about this informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        This action cannot be undone. Please proceed with caution.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to save changes. Please check your internet connection.
      </Alert>
    </div>
  ),
};

export const Closable: Story = {
  render: () => {
    const DismissibleAlerts = () => {
      const [alerts, setAlerts] = useState({
        info: true,
        success: true,
        warning: true,
        error: true,
      });

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {alerts.info && (
            <Alert variant="info" title="Information" closable onClose={() => setAlerts({ ...alerts, info: false })}>
              Click the × to dismiss this alert
            </Alert>
          )}
          {alerts.success && (
            <Alert variant="success" title="Success" closable onClose={() => setAlerts({ ...alerts, success: false })}>
              Close this notification
            </Alert>
          )}
          {alerts.warning && (
            <Alert variant="warning" title="Warning" closable onClose={() => setAlerts({ ...alerts, warning: false })}>
              Dismissible warning message
            </Alert>
          )}
          {alerts.error && (
            <Alert variant="error" title="Error" closable onClose={() => setAlerts({ ...alerts, error: false })}>
              This error can be dismissed
            </Alert>
          )}
          {!alerts.info && !alerts.success && !alerts.warning && !alerts.error && (
            <Button onClick={() => setAlerts({ info: true, success: true, warning: true, error: true })}>
              Reset All Alerts
            </Button>
          )}
        </div>
      );
    };

    return <DismissibleAlerts />;
  },
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="info" title="Detailed Information">
      This is a longer alert message that demonstrates how the Alert component handles more extensive content. It
      includes multiple sentences and provides detailed information to the user. The component will naturally expand to
      accommodate the content while maintaining proper spacing and readability.
    </Alert>
  ),
};

export const CustomIcon: Story = {
  args: {
    variant: 'success',
    title: 'Custom Icon',
    children: 'This alert uses a custom icon instead of the default.',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '8px' }}>Form Validation</h3>
        <Alert variant="error" title="Validation Failed" closable>
          Please fix the following errors:
          <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
            <li>Email address is required</li>
            <li>Password must be at least 8 characters</li>
          </ul>
        </Alert>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px' }}>Success Notification</h3>
        <Alert variant="success" title="Profile Updated" closable>
          Your profile information has been successfully updated and is now visible to other users.
        </Alert>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px' }}>Important Notice</h3>
        <Alert variant="warning" title="Scheduled Maintenance">
          Our system will undergo maintenance on Sunday, December 10th from 2:00 AM to 6:00 AM EST. Some features may be
          temporarily unavailable.
        </Alert>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px' }}>Helpful Tip</h3>
        <Alert variant="info" title="Pro Tip">
          Use keyboard shortcuts to navigate faster. Press{' '}
          <code
            style={{
              background: color.background.secondary,
              border: `1px solid ${color.border.light}`,
              padding: '2px 6px',
              borderRadius: '6px',
            }}
          >
            Ctrl+K
          </code>{' '}
          to open the command palette.
        </Alert>
      </div>
    </div>
  ),
};
