import React from 'react';

import { Avatar, Badge, Stack, tokens } from '@grasdouble/lufa_design-system';

const { color } = tokens;

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: '8px',
      marginBottom: '16px',
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: 'monospace',
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

const svgAvatar = (text: string, background: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
  <rect width="100%" height="100%" rx="16" fill="${background}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="38" fill="#fff">${text}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const UserLabel = ({ name, role }: { name: string; role: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
    <div style={{ color: color.text.primary, fontWeight: 600 }}>{name}</div>
    <div style={{ color: color.text.secondary, fontSize: 12 }}>{role}</div>
  </div>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar src={svgAvatar('SL', color.interactive.default)} alt="Profile picture" status="online" />
      <UserLabel name="Sébastien" role="Admin" />
      <Badge variant="success" rounded>
        Online
      </Badge>
    </div>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size={size} src={svgAvatar(size.toUpperCase(), color.brand.secondary)} alt={`Avatar size ${size}`} />
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              fontSize: 12,
            }}
          >
            {size}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar variant="circle" src={svgAvatar('C', color.interactive.default)} alt="Circle avatar" status="away" />
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            fontSize: 12,
          }}
        >
          circle
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar variant="square" src={svgAvatar('S', color.brand.secondary)} alt="Square avatar" status="busy" />
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            fontSize: 12,
          }}
        >
          square
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar variant="count" count="+12" />
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            fontSize: 12,
          }}
        >
          count
        </div>
      </div>
    </div>
  </Frame>
);

export const Status = () => (
  <Frame title="status">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {(['online', 'offline', 'away', 'busy', 'none'] as const).map((status) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar
            src={svgAvatar(status.slice(0, 1).toUpperCase(), color.interactive.default)}
            alt={`Status ${status}`}
            status={status}
          />
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              fontSize: 12,
            }}
          >
            {status}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const StatusPosition = () => (
  <Frame title="statusPosition">
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar
          src={svgAvatar('T', color.brand.secondary)}
          alt="Status position top"
          status="online"
          statusPosition="top"
        />
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            fontSize: 12,
          }}
        >
          top
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar
          src={svgAvatar('B', color.brand.secondary)}
          alt="Status position bottom"
          status="online"
          statusPosition="bottom"
        />
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            fontSize: 12,
          }}
        >
          bottom
        </div>
      </div>
    </div>
  </Frame>
);

export const CommentHeaderExample = () => (
  <Frame title="comment header">
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <Avatar src={svgAvatar('JD', color.interactive.default)} status="online" />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
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

export const CountAvatarExample = () => (
  <Frame title="overflow count">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <UserLabel name="Reviewers" role="5 people" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar src={svgAvatar('AL', color.interactive.default)} alt="Alice" />
        <Avatar src={svgAvatar('BO', color.brand.secondary)} alt="Bob" />
        <Avatar src={svgAvatar('CH', '#0ea5e9')} alt="Chris" />
        <Avatar variant="count" count="+2" />
      </div>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Size />
    <Variant />
    <Status />
    <StatusPosition />
  </>
);

export const Examples = () => (
  <>
    <CommentHeaderExample />
    <CountAvatarExample />
  </>
);
