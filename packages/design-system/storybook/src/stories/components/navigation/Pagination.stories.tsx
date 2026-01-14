import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '4. Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Pagination component for navigating through pages. Supports quick jumper and page size selector.',
      },
    },
  },
  tags: [],
  argTypes: {
    current: { control: 'number', description: 'Current page number (1-indexed)' },
    total: { control: 'number', description: 'Total number of items' },
    pageSize: { control: 'number', description: 'Number of items per page' },
    showQuickJumper: { control: 'boolean', description: 'Show quick jumper' },
    showSizeChanger: { control: 'boolean', description: 'Show size changer' },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Size variant' },
    onChange: { action: 'page changed' },
    onPageSizeChange: { action: 'page size changed' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
    size: 'medium',
  },
};

export const BasicPagination: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return <Pagination current={current} total={100} pageSize={10} onChange={setCurrent} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
        <Pagination current={1} total={100} pageSize={10} size="small" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
        <Pagination current={1} total={100} pageSize={10} size="medium" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
        <Pagination current={1} total={100} pageSize={10} size="large" />
      </div>
    </Stack>
  ),
};

export const WithQuickJumper: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return <Pagination current={current} total={200} pageSize={10} showQuickJumper onChange={setCurrent} />;
  },
};

export const WithSizeChanger: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        current={current}
        total={200}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
        onChange={setCurrent}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Stack gap="spacious">
        <Pagination
          current={current}
          total={500}
          pageSize={pageSize}
          showQuickJumper
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={setCurrent}
          onPageSizeChange={setPageSize}
        />
        <div style={{ fontSize: '14px', color: tokens.color.text.secondary }}>
          Showing {(current - 1) * pageSize + 1}-{Math.min(current * pageSize, 500)} of 500 items
        </div>
      </Stack>
    );
  },
};

export const CustomText: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return (
      <Pagination
        current={current}
        total={100}
        pageSize={10}
        onChange={setCurrent}
        prevText="Previous"
        nextText="Next"
      />
    );
  },
};

export const DifferentPageCounts: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Few Pages (5)</h4>
        <Pagination current={3} total={50} pageSize={10} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Many Pages (50)</h4>
        <Pagination current={25} total={500} pageSize={10} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Beginning</h4>
        <Pagination current={2} total={500} pageSize={10} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>End</h4>
        <Pagination current={49} total={500} pageSize={10} />
      </div>
    </Stack>
  ),
};

export const DataTable: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const data = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
    }));

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    return (
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
          <thead>
            <tr style={{ backgroundColor: tokens.color.background.secondary }}>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: `2px solid ${tokens.color.border.light}`,
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: `2px solid ${tokens.color.border.light}`,
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: `2px solid ${tokens.color.border.light}`,
                }}
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '12px', borderBottom: `1px solid ${tokens.color.border.light}` }}>{item.id}</td>
                <td style={{ padding: '12px', borderBottom: `1px solid ${tokens.color.border.light}` }}>{item.name}</td>
                <td style={{ padding: '12px', borderBottom: `1px solid ${tokens.color.border.light}` }}>
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current={current}
          total={data.length}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={[5, 10, 20]}
          onChange={setCurrent}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};
