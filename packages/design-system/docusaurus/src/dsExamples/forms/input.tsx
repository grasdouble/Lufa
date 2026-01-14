import { Input } from '@grasdouble/lufa_design-system';
import { useState } from 'react';

export function LiveDemo() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="We'll never share your email"
        fullWidth
      />
    </div>
  );
}

export function SizeExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input label="Small" size="small" placeholder="Small input" />
      <Input label="Medium (default)" size="medium" placeholder="Medium input" />
      <Input label="Large" size="large" placeholder="Large input" />
    </div>
  );
}

export function VariantExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input label="Outlined (default)" variant="outlined" placeholder="Outlined variant" />
      <Input label="Filled" variant="filled" placeholder="Filled variant" />
    </div>
  );
}

export function ErrorExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input label="Email" type="email" error="Please enter a valid email address" />
      <Input
        label="Password"
        type="password"
        error="Password must be at least 8 characters"
        helperText="This helper text is hidden when error is present"
      />
    </div>
  );
}

export function HelperTextExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input label="Username" helperText="Must be 3-20 characters, letters and numbers only" />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        helperText="Format: (XXX) XXX-XXXX"
      />
    </div>
  );
}

export function FullWidthExample() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Input label="Default Width" placeholder="Auto width" />
      </div>
      <Input label="Full Width" placeholder="Expands to container width" fullWidth />
    </div>
  );
}

export function AdornmentExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input
        label="Search"
        placeholder="Search..."
        startAdornment={
          <span style={{ fontSize: '18px', color: '#666' }}>🔍</span>
        }
      />
      <Input
        label="Website"
        type="url"
        placeholder="example.com"
        startAdornment={
          <span style={{ fontSize: '14px', color: '#666' }}>https://</span>
        }
      />
      <Input
        label="Price"
        type="number"
        placeholder="0.00"
        startAdornment={
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>$</span>
        }
        endAdornment={
          <span style={{ fontSize: '12px', color: '#666' }}>USD</span>
        }
      />
      <Input
        label="Password"
        type="password"
        endAdornment={
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onClick={() => alert('Toggle visibility')}
          >
            👁️
          </button>
        }
      />
    </div>
  );
}

export function DisabledExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input label="Disabled Empty" placeholder="Disabled input" disabled />
      <Input label="Disabled with Value" value="Cannot edit this" disabled />
    </div>
  );
}

export function TypesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input label="Text (default)" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="user@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Number" type="number" placeholder="42" />
      <Input label="Tel" type="tel" placeholder="(555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Search" type="search" placeholder="Search..." />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
    </div>
  );
}

export function BasicExample() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3>Contact Form</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            required
          />
        </div>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          helperText="We'll never share your email"
          required
          fullWidth
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange('phone')}
          helperText="Format: (XXX) XXX-XXXX"
          fullWidth
        />
      </div>
    </div>
  );
}
