import React, { useState } from 'react';

import { Pagination, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: tokens.spacing['md-lg'],
      backgroundColor: tokens.color.background.secondary,
      color: tokens.color.text.primary,
      borderRadius: tokens.radius.base,
      marginBottom: tokens.spacing.base,
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          marginBottom: tokens.spacing.md,
        }}
      >
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

export const LiveDemo = () => {
  const [current, setCurrent] = useState(1);

  return (
    <Frame title="live demo">
      <Pagination current={current} total={100} pageSize={10} onChange={setCurrent} />
      <p style={{ marginTop: tokens.spacing.base }}>Current page: {current}</p>
    </Frame>
  );
};

export const Size = () => {
  const [currentSmall, setCurrentSmall] = useState(1);
  const [currentMedium, setCurrentMedium] = useState(1);
  const [currentLarge, setCurrentLarge] = useState(1);

  return (
    <Frame title="size">
      <Stack gap="spacious">
        <div>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            small
          </div>
          <Pagination size="small" current={currentSmall} total={100} pageSize={10} onChange={setCurrentSmall} />
        </div>
        <div>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            medium (default)
          </div>
          <Pagination current={currentMedium} total={100} pageSize={10} onChange={setCurrentMedium} />
        </div>
        <div>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            large
          </div>
          <Pagination size="large" current={currentLarge} total={100} pageSize={10} onChange={setCurrentLarge} />
        </div>
      </Stack>
    </Frame>
  );
};

export const ShowQuickJumper = () => {
  const [current, setCurrent] = useState(1);

  return (
    <Frame title="showQuickJumper">
      <Pagination current={current} total={100} pageSize={10} onChange={setCurrent} showQuickJumper />
    </Frame>
  );
};

export const ShowSizeChanger = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Frame title="showSizeChanger / pageSizeOptions / onPageSizeChange">
      <Pagination
        current={current}
        total={100}
        pageSize={pageSize}
        onChange={setCurrent}
        showSizeChanger
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 20, 50, 100]}
      />
      <p style={{ marginTop: tokens.spacing.base }}>
        Page: {current} • Page size: {pageSize}
      </p>
    </Frame>
  );
};

export const PrevNextText = () => {
  const [current, setCurrent] = useState(1);

  return (
    <Frame title="prevText / nextText">
      <Pagination
        current={current}
        total={100}
        pageSize={10}
        onChange={setCurrent}
        prevText="Previous"
        nextText="Next"
      />
    </Frame>
  );
};

export const TableFooterPaginationExample = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const total = 128;
  const from = (current - 1) * pageSize + 1;
  const to = Math.min(current * pageSize, total);

  return (
    <Frame title="table footer pagination">
      <Stack gap="condensed">
        <div style={{ color: tokens.color.text.secondary }}>
          Showing {from}-{to} of {total} results
        </div>
        <Pagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={setCurrent}
          showSizeChanger
          onPageSizeChange={setPageSize}
        />
      </Stack>
    </Frame>
  );
};

export const LargeDatasetPaginationExample = () => {
  const [current, setCurrent] = useState(1);

  return (
    <Frame title="large dataset">
      <Pagination current={current} total={500} pageSize={10} onChange={setCurrent} showQuickJumper />
    </Frame>
  );
};

export const Variants = () => (
  <>
    <Size />
    <ShowQuickJumper />
    <ShowSizeChanger />
    <PrevNextText />
  </>
);

export const Examples = () => (
  <>
    <TableFooterPaginationExample />
    <LargeDatasetPaginationExample />
  </>
);
