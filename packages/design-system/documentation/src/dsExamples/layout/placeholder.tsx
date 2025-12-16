import React from "react";
import { Placeholder, Stack, tokens } from "@grasdouble/lufa_design-system";

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

export const LiveDemo = () => (
  <Frame title="live demo">
    <Placeholder>Default Placeholder</Placeholder>
  </Frame>
);

export const Height = () => (
  <Frame title="height">
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          small (40px)
        </div>
        <Placeholder height="small">Small Height</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          medium (80px) — default
        </div>
        <Placeholder height="medium">Medium Height</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          large (128px)
        </div>
        <Placeholder height="large">Large Height</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          auto
        </div>
        <Placeholder height="auto">
          Auto height adjusts to content
          <br />
          Multiple lines supported
          <br />
          Grows as needed
        </Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Width = () => (
  <Frame title="width">
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          auto (min-width: 96px)
        </div>
        <Placeholder width="auto">Auto</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          small (128px)
        </div>
        <Placeholder width="small">Small Width</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          medium (240px)
        </div>
        <Placeholder width="medium">Medium Width</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          large (384px)
        </div>
        <Placeholder width="large">Large Width</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          full (100%)
        </div>
        <Placeholder width="full">Full Width</Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Color = () => (
  <Frame title="color">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          default gradient
        </div>
        <Placeholder>Violet Gradient</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          solid — interactive
        </div>
        <Placeholder color={color.interactive.default}>Solid Blue</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          solid — success
        </div>
        <Placeholder color={color.success.default}>Solid Green</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          solid — error
        </div>
        <Placeholder color={color.error.default}>Solid Red</Placeholder>
      </div>
    </div>
  </Frame>
);

export const Gradient = () => (
  <Frame title="colorFrom / colorTo">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          blue → purple
        </div>
        <Placeholder
          colorFrom={color.interactive.default}
          colorTo={color.brand.secondary}
        >
          Custom Gradient
        </Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          green → teal
        </div>
        <Placeholder colorFrom={color.success.default} colorTo="#14B8A6">
          Green → Teal
        </Placeholder>
      </div>
    </div>
  </Frame>
);

export const CustomColors = () => (
  <>
    <Color />
    <Gradient />
  </>
);

export const HeightWidthMatrixExample = () => (
  <Frame title="height × width">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      <Placeholder height="small" width="large" color="#8b5cf6">
        Small × Large
      </Placeholder>
      <Placeholder height="large" width="small" color="#f59e0b">
        Large × Small
      </Placeholder>
      <div style={{ gridColumn: "1 / -1" }}>
        <Placeholder
          height="medium"
          width="full"
          color={color.interactive.default}
        >
          Medium × Full Width
        </Placeholder>
      </div>
    </div>
  </Frame>
);

export const CombinedVariants = HeightWidthMatrixExample;

export const DashboardLayoutExample = () => (
  <Frame title="dashboard layout">
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header */}
      <Placeholder height="small" width="full" color={"#3b82f6"}>
        Header
      </Placeholder>

      {/* Main content with sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "16px",
        }}
      >
        <Placeholder height="full" color={"#8b5cf6"}>
          Sidebar
        </Placeholder>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Placeholder height="medium" width="full" color={"#10b981"}>
            Content Area
          </Placeholder>

          {/* Card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            <Placeholder height="small" color={"#f59e0b"}>
              Card 1
            </Placeholder>
            <Placeholder height="small" color={"#f59e0b"}>
              Card 2
            </Placeholder>
            <Placeholder height="small" color={"#f59e0b"}>
              Card 3
            </Placeholder>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Placeholder height="small" width="full" color={"#525252"}>
        Footer
      </Placeholder>
    </div>
  </Frame>
);

export const DashboardLayout = DashboardLayoutExample;

export const FormLayoutExample = () => (
  <Frame title="form layout">
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <Placeholder color={"#6366f1"}>First Name</Placeholder>
        </div>
        <div style={{ flex: 1 }}>
          <Placeholder color={"#6366f1"}>Last Name</Placeholder>
        </div>
      </div>

      <Placeholder color={"#6366f1"}>Email</Placeholder>
      <Placeholder color={"#6366f1"}>Message</Placeholder>

      <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
        <Placeholder color={"#a3a3a3"}>Cancel</Placeholder>
        <Placeholder color={"#3b82f6"}>Submit</Placeholder>
      </div>
    </div>
  </Frame>
);

export const FormLayout = FormLayoutExample;

export const PrototypeLayoutExample = () => (
  <Frame title="prototype layout">
    <Stack direction="vertical" gap="normal">
      <Placeholder height="small" width="full" color="#2563eb">
        Navigation Bar
      </Placeholder>

      <div
        style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}
      >
        <Placeholder height="large" color="#7c3aed">
          Sidebar Menu
        </Placeholder>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Placeholder height="large" color="#10b981">
            Hero Section
          </Placeholder>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            <Placeholder height="medium" color="#f59e0b">
              Card 1
            </Placeholder>
            <Placeholder height="medium" color="#f59e0b">
              Card 2
            </Placeholder>
            <Placeholder height="medium" color="#f59e0b">
              Card 3
            </Placeholder>
          </div>

          <Placeholder height="medium" width="full" color="#6b7280">
            Content Area
          </Placeholder>
        </div>
      </div>

      <Placeholder height="small" width="full" color="#1f2937">
        Footer
      </Placeholder>
    </Stack>
  </Frame>
);

export const PrototypeLayout = PrototypeLayoutExample;

export const Variants = () => (
  <>
    <Height />
    <Width />
    <Color />
    <Gradient />
  </>
);

export const Examples = () => (
  <>
    <DashboardLayoutExample />
    <FormLayoutExample />
    <PrototypeLayoutExample />
    <HeightWidthMatrixExample />
  </>
);
