import React, { useState } from "react";
import { Steps, Stack, Button, tokens } from "@grasdouble/lufa_design-system";

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

const basicSteps = [
  { title: "Step 1", description: "Choose your plan" },
  { title: "Step 2", description: "Enter your details" },
  { title: "Step 3", description: "Complete payment" },
  { title: "Step 4", description: "Confirmation" },
];

export const LiveDemo = () => {
  const [current, setCurrent] = useState(0);

  return (
    <Frame title="live demo">
      <Steps items={basicSteps} current={current} />
      <div style={{ marginTop: "24px", display: "flex", gap: "8px" }}>
        <Button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          Previous
        </Button>
        <Button
          variant="solid"
          color="primary"
          onClick={() =>
            setCurrent(Math.min(basicSteps.length - 1, current + 1))
          }
          disabled={current === basicSteps.length - 1}
        >
          Next
        </Button>
      </div>
    </Frame>
  );
};

export const Direction = () => (
  <Frame title="direction">
    <Stack gap="spacious">
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          horizontal (default)
        </div>
        <Steps items={basicSteps} current={1} />
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          vertical
        </div>
        <Steps direction="vertical" items={basicSteps} current={2} />
      </div>
    </Stack>
  </Frame>
);

export const Size = () => (
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
          default
        </div>
        <Steps items={basicSteps} current={1} />
      </div>
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
        <Steps size="small" items={basicSteps} current={1} />
      </div>
    </Stack>
  </Frame>
);

export const Current = () => (
  <Frame title="current">
    <Stack gap="spacious">
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          current: 0
        </div>
        <Steps items={basicSteps} current={0} />
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          current: 2
        </div>
        <Steps items={basicSteps} current={2} />
      </div>
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          current: 3
        </div>
        <Steps items={basicSteps} current={3} />
      </div>
    </Stack>
  </Frame>
);

export const OnChange = () => {
  const [clickableCurrent, setClickableCurrent] = useState(1);

  return (
    <Frame title="onChange (clickable steps)">
      <Steps
        items={basicSteps}
        current={clickableCurrent}
        onChange={setClickableCurrent}
      />
      <div style={{ marginTop: 16, color: color.text.secondary }}>
        Current: {clickableCurrent}
      </div>
    </Frame>
  );
};

export const Items = () => {
  const stepsWithStatus = [
    {
      title: "Completed",
      description: "This step is done",
      status: "finish" as const,
    },
    {
      title: "In Progress",
      description: "Currently working",
      status: "process" as const,
    },
    {
      title: "Error Occurred",
      description: "Something went wrong",
      status: "error" as const,
    },
    {
      title: "Waiting",
      description: "Not started yet",
      status: "wait" as const,
    },
  ];

  const stepsWithIcons = [
    {
      title: "Account",
      description: "Create your profile",
      icon: <span aria-hidden>👤</span>,
    },
    {
      title: "Shipping",
      description: "Delivery details",
      icon: <span aria-hidden>🚚</span>,
    },
    {
      title: "Payment",
      description: "Choose a method",
      icon: <span aria-hidden>💳</span>,
    },
    {
      title: "Review",
      description: "Confirm everything",
      icon: <span aria-hidden>✅</span>,
    },
  ];

  return (
    <Frame title="items (title / description / icon / status)">
      <Stack gap="spacious">
        <div>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            title + description
          </div>
          <Steps
            items={[
              { title: "Account", description: "Create your profile" },
              { title: "Verification", description: "Confirm your email" },
              { title: "Profile", description: "Add personal details" },
              { title: "Done", description: "You're ready" },
            ]}
            current={1}
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
            custom icons
          </div>
          <Steps items={stepsWithIcons} current={2} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            manual status
          </div>
          <Steps items={stepsWithStatus} />
        </div>
      </Stack>
    </Frame>
  );
};

export const CheckoutProgressStepsExample = () => (
  <Frame title="checkout progress">
    <Steps
      current={2}
      items={[
        { title: "Cart" },
        { title: "Shipping" },
        { title: "Payment" },
        { title: "Review" },
      ]}
    />
  </Frame>
);

export const VerticalSidebarStepsExample = () => (
  <Frame title="sidebar navigation (vertical)">
    <Steps
      direction="vertical"
      current={1}
      items={[
        { title: "Profile", description: "Personal information" },
        { title: "Security", description: "Password & 2FA" },
        { title: "Notifications", description: "Email preferences" },
      ]}
    />
  </Frame>
);

export const Variants = () => (
  <>
    <Direction />
    <Size />
    <Current />
    <OnChange />
    <Items />
  </>
);

export const Examples = () => (
  <>
    <CheckoutProgressStepsExample />
    <VerticalSidebarStepsExample />
  </>
);
