import React from "react";
import { Badge, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <Badge variant="primary" rounded>
        New
      </Badge>
      <Badge variant="success" dot rounded>
        Synced
      </Badge>
      <Badge variant="warning" rounded>
        Pending
      </Badge>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        variant
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {(["default", "primary", "success", "warning", "danger", "info"] as const).map((variant) => (
          <Badge key={variant} variant={variant} rounded>
            {variant}
          </Badge>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        size
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Badge key={size} size={size} variant="primary" rounded>
            {size}
          </Badge>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        dot / rounded
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <Badge variant="success" dot>
          dot
        </Badge>
        <Badge variant="success" dot rounded>
          dot + rounded
        </Badge>
        <Badge variant="info" rounded>
          rounded
        </Badge>
      </div>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      status list
    </div>
    <Stack direction="vertical" gap="condensed">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: color.text.primary }}>Payments</div>
        <Badge variant="success" dot rounded>
          Healthy
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: color.text.primary }}>Webhooks</div>
        <Badge variant="warning" dot rounded>
          Delayed
        </Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: color.text.primary }}>Fraud checks</div>
        <Badge variant="danger" dot rounded>
          Action required
        </Badge>
      </div>
    </Stack>
  </Frame>
);

