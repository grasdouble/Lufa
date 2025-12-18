import React, { useState } from "react";
import { Pagination, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
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
      <Pagination
        current={current}
        total={100}
        pageSize={10}
        onChange={setCurrent}
      />
      <p style={{ marginTop: "16px" }}>Current page: {current}</p>
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
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            small
          </div>
          <Pagination
            size="small"
            current={currentSmall}
            total={100}
            pageSize={10}
            onChange={setCurrentSmall}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            medium (default)
          </div>
          <Pagination
            current={currentMedium}
            total={100}
            pageSize={10}
            onChange={setCurrentMedium}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            large
          </div>
          <Pagination
            size="large"
            current={currentLarge}
            total={100}
            pageSize={10}
            onChange={setCurrentLarge}
          />
        </div>
      </Stack>
    </Frame>
  );
};

export const ShowQuickJumper = () => {
  const [current, setCurrent] = useState(1);

  return (
    <Frame title="showQuickJumper">
      <Pagination
        current={current}
        total={100}
        pageSize={10}
        onChange={setCurrent}
        showQuickJumper
      />
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
      <p style={{ marginTop: "16px" }}>
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
        <div style={{ color: color.text.secondary }}>
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
      <Pagination
        current={current}
        total={500}
        pageSize={10}
        onChange={setCurrent}
        showQuickJumper
      />
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
