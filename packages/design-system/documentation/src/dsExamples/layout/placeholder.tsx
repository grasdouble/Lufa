import {
  Stack,
  STACK_DIRECTION,
  STACK_GAP,
  Placeholder,
  Typography,
  tokens,
} from "@grasdouble/lufa_design-system";

export const LiveDemo = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "24px",
    }}
  >
    <Placeholder>Default Placeholder</Placeholder>
  </div>
);

export const Height = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Small (40px)
      </Typography>
      <Placeholder height="small">Small Height</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Medium (80px) - Default
      </Typography>
      <Placeholder height="medium">Medium Height</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Large (128px)
      </Typography>
      <Placeholder height="large">Large Height</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Auto
      </Typography>
      <Placeholder height="auto">
        Auto height adjusts to content
        <br />
        Multiple lines supported
        <br />
        Grows as needed
      </Placeholder>
    </div>
  </div>
);

export const Width = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Auto (min-width: 96px)
      </Typography>
      <Placeholder width="auto">Auto</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Small (128px)
      </Typography>
      <Placeholder width="small">Small Width</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Medium (240px)
      </Typography>
      <Placeholder width="medium">Medium Width</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Large (384px)
      </Typography>
      <Placeholder width="large">Large Width</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Full (100%)
      </Typography>
      <Placeholder width="full">Full Width</Placeholder>
    </div>
  </div>
);

export const CustomColors = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Default Gradient
      </Typography>
      <Placeholder>Violet Gradient</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Solid - Interactive
      </Typography>
      <Placeholder color={tokens.color.interactive.default}>
        Solid Blue
      </Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Solid - Success
      </Typography>
      <Placeholder color={tokens.color.success.default}>
        Solid Green
      </Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Solid - Error
      </Typography>
      <Placeholder color={tokens.color.error.default}>Solid Red</Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Gradient - Blue to Purple
      </Typography>
      <Placeholder
        colorFrom={tokens.color.interactive.default}
        colorTo={tokens.color.brand.secondary}
      >
        Custom Gradient
      </Placeholder>
    </div>
    <div>
      <Typography
        variant="label"
        weight="semibold"
        style={{ marginBottom: "8px" }}
      >
        Gradient - Green to Teal
      </Typography>
      <Placeholder colorFrom={tokens.color.success.default} colorTo="#14B8A6">
        Green → Teal
      </Placeholder>
    </div>
  </div>
);

export const CombinedVariants = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
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
        color={tokens.color.interactive.default}
      >
        Medium × Full Width
      </Placeholder>
    </div>
  </div>
);

export const DashboardLayout = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
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
  </div>
);

export const FormLayout = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
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
  </div>
);

export const PrototypeLayout = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
      <Placeholder height="small" width="full" color="#2563eb">
        Navigation Bar
      </Placeholder>

      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
        <Stack.Item basis="300px">
          <Placeholder height="large" color="#7c3aed">
            Sidebar Menu
          </Placeholder>
        </Stack.Item>

        <Stack.Item grow>
          <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
            <Placeholder height="large" color="#10b981">
              Hero Section
            </Placeholder>

            <Stack
              direction={STACK_DIRECTION.horizontal}
              gap={STACK_GAP.normal}
            >
              <Stack.Item grow>
                <Placeholder height="medium" color="#f59e0b">
                  Card 1
                </Placeholder>
              </Stack.Item>
              <Stack.Item grow>
                <Placeholder height="medium" color="#f59e0b">
                  Card 2
                </Placeholder>
              </Stack.Item>
              <Stack.Item grow>
                <Placeholder height="medium" color="#f59e0b">
                  Card 3
                </Placeholder>
              </Stack.Item>
            </Stack>

            <Placeholder height="medium" width="full" color="#6b7280">
              Content Area
            </Placeholder>
          </Stack>
        </Stack.Item>
      </Stack>

      <Placeholder height="small" width="full" color="#1f2937">
        Footer
      </Placeholder>
    </Stack>
  </div>
);

