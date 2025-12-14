import React from "react";
import { Avatar, Badge, Stack, tokens } from "@grasdouble/lufa_design-system";

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

const UserLabel = ({ name, role }: { name: string; role: string }) => (
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
    <div style={{ color: color.text.primary, fontWeight: 600 }}>{name}</div>
    <div style={{ color: color.text.secondary, fontSize: 12 }}>{role}</div>
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar src={svgAvatar("SL", color.interactive.default)} alt="Profile picture" status="online" />
      <UserLabel name="Sébastien" role="Admin" />
      <Badge variant="success" rounded>
        Online
      </Badge>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        size
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <div key={size} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar size={size} src={svgAvatar(size.toUpperCase(), color.brand.secondary)} />
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>{size}</div>
          </div>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        variant
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar variant="circle" src={svgAvatar("C", color.interactive.default)} status="away" />
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>circle</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar variant="square" src={svgAvatar("S", color.brand.secondary)} status="busy" />
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>square</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar variant="count" count="+12" />
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>count</div>
        </div>
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        status
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
        {(["online", "offline", "away", "busy", "none"] as const).map((status) => (
          <div key={status} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar src={svgAvatar(status.slice(0, 1).toUpperCase(), color.interactive.default)} status={status} />
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>{status}</div>
          </div>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        statusPosition
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={svgAvatar("T", color.brand.secondary)} status="online" statusPosition="top" />
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>top</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={svgAvatar("B", color.brand.secondary)} status="online" statusPosition="bottom" />
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>bottom</div>
        </div>
      </div>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      comment header
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <Avatar src={svgAvatar("JD", color.interactive.default)} status="online" />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontWeight: 600, color: color.text.primary }}>Jane Doe</div>
          <Badge variant="info" rounded>
            Moderator
          </Badge>
          <div style={{ color: color.text.tertiary, fontSize: 12 }}>2h ago</div>
        </div>
        <div style={{ color: color.text.secondary }}>
          Avatar works well as a leading element for comments, activity feeds, and list rows.
        </div>
      </div>
    </div>
  </Frame>
);

