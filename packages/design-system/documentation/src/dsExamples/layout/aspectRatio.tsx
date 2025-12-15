import React from "react";
import { AspectRatio, ASPECT_RATIO, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color, aspectRatio } = tokens;

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

const Media = ({ label }: { label: string }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundImage: `linear-gradient(135deg, ${color.interactive.default} 0%, ${color.brand.secondary} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontFamily: "monospace",
      fontSize: 12,
    }}
  >
    {label}
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      ratio: video → {aspectRatio.video}
    </div>
    <AspectRatio
      ratio={ASPECT_RATIO.video}
      style={{
        borderRadius: 12,
        outline: `1px solid ${color.border.light}`,
        background: "#fff",
      }}
    >
      <Media label="16 / 9" />
    </AspectRatio>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        token ratios
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        {([
          { key: ASPECT_RATIO.video, label: "video", value: aspectRatio.video },
          { key: ASPECT_RATIO.square, label: "square", value: aspectRatio.square },
          { key: ASPECT_RATIO.portrait, label: "portrait", value: aspectRatio.portrait },
        ] as const).map(({ key, label, value }) => (
          <div key={label}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              {label} → {value}
            </div>
            <AspectRatio ratio={key} style={{ borderRadius: 12, outline: `1px solid ${color.border.light}`, background: "#fff" }}>
              <Media label={label} />
            </AspectRatio>
          </div>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        custom ratios
      </div>
      <Stack direction="vertical" gap="normal">
        <div>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
            ratio: &quot;3 / 1&quot;
          </div>
          <AspectRatio ratio="3 / 1" style={{ borderRadius: 12, outline: `1px solid ${color.border.light}`, background: "#fff" }}>
            <Media label="3 / 1" />
          </AspectRatio>
        </div>
        <div>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
            ratio: 1.333 (4/3)
          </div>
          <AspectRatio ratio={1.333} style={{ borderRadius: 12, outline: `1px solid ${color.border.light}`, background: "#fff" }}>
            <Media label="4 / 3" />
          </AspectRatio>
        </div>
      </Stack>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      card thumbnails
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
      {["A", "B", "C"].map((label) => (
        <div key={label} style={{ borderRadius: 12, overflow: "hidden", outline: `1px solid ${color.border.light}`, background: "#fff" }}>
          <AspectRatio ratio={ASPECT_RATIO.video}>
            <Media label={`Thumb ${label}`} />
          </AspectRatio>
          <div style={{ padding: 12 }}>
            <div style={{ fontFamily: "monospace", color: color.text.primary, fontSize: 12 }}>Item {label}</div>
            <div style={{ color: color.text.secondary, fontSize: 12 }}>16 / 9 media</div>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

