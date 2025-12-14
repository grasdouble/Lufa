import React from "react";
import { Button, Card, Stack, Typography, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

export const LiveDemo = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "24px",
    }}
  >
    <Card title="Example Card" subtitle="Cards are versatile containers">
      <Typography variant="body" color="secondary">
        Group related content and actions.
      </Typography>
    </Card>
  </div>
);

export const Variants = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <Card variant="default" title="Default">
      <Typography variant="bodySmall" color="secondary">
        Standard card
      </Typography>
    </Card>
    <Card variant="elevated" title="Elevated">
      <Typography variant="bodySmall" color="secondary">
        With shadow
      </Typography>
    </Card>
    <Card variant="outlined" title="Outlined">
      <Typography variant="bodySmall" color="secondary">
        Stronger border
      </Typography>
    </Card>
    <Card variant="filled" title="Filled">
      <Typography variant="bodySmall" color="secondary">
        Filled background
      </Typography>
    </Card>
  </div>
);

export const Examples = () => (
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
    <Card
      variant="outlined"
      title="Card with actions"
      subtitle="Footer actions"
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="solid">Primary</Button>
          <Button variant="text">Cancel</Button>
        </div>
      }
    >
      <Typography variant="body" color="secondary">
        Use the footer slot for actions.
      </Typography>
    </Card>

    <Card
      variant="elevated"
      hoverable
      onClick={() => console.log("Card clicked")}
      title="Clickable"
      subtitle="hoverable + onClick"
    >
      <Stack direction="vertical" gap="normal">
        <Typography variant="body" color="secondary">
          Combine hoverable and onClick for interactive cards.
        </Typography>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>
          (Check console)
        </div>
      </Stack>
    </Card>
  </div>
);

