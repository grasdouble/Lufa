import React from "react";
import { Avatar, AvatarGroup, Badge, Stack, tokens } from "@grasdouble/lufa_design-system";

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

const svgAvatar = (text: string, background: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
  <rect width="100%" height="100%" rx="16" fill="${background}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="38" fill="#fff">${text}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const Team = ({ size = "md", max }: { size?: "xs" | "sm" | "md" | "lg" | "xl"; max?: number }) => (
  <AvatarGroup size={size} max={max}>
    <Avatar src={svgAvatar("AL", color.interactive.default)} alt="Alice" status="online" />
    <Avatar src={svgAvatar("BO", color.brand.secondary)} alt="Bob" status="away" />
    <Avatar src={svgAvatar("CH", "#0ea5e9")} alt="Chris" status="offline" />
    <Avatar src={svgAvatar("DE", "#f97316")} alt="Denise" status="busy" />
    <Avatar src={svgAvatar("EV", "#10b981")} alt="Eve" status="online" />
  </AvatarGroup>
);

export const LiveDemo = () => (
  <Frame>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Team max={4} />
        <div style={{ color: color.text.secondary }}>Design team</div>
      </div>
      <Badge rounded variant="primary">
        5 members
      </Badge>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        max
      </div>
      <Stack direction="vertical" gap="normal">
        {[undefined, 2, 3, 4].map((max) => (
          <div key={String(max)} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Team max={max as number | undefined} />
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>
              max: {max ?? "—"}
            </div>
          </div>
        ))}
      </Stack>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        size
      </div>
      <Stack direction="vertical" gap="normal">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <div key={size} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Team size={size} max={4} />
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>
              size: {size}
            </div>
          </div>
        ))}
      </Stack>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      project card header
    </div>
    <div
      style={{
        borderRadius: 12,
        background: "#fff",
        border: `1px solid ${color.border.light}`,
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ color: color.text.primary, fontWeight: 700 }}>Website Redesign</div>
        <div style={{ color: color.text.secondary, fontSize: 12 }}>Assigned</div>
      </div>
      <Team max={3} />
    </div>
  </Frame>
);

