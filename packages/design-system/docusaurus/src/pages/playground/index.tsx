/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Layout from '@theme/Layout';

import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Cluster,
  Container,
  Divider,
  Flex,
  Grid,
  Input,
  Label,
  Stack,
  Text,
} from '@grasdouble/lufa_design-system';

import DemoSite from './DemoSite';
import styles from './playground.module.css';
import PlaygroundThemeSwitcher from './PlaygroundThemeSwitcher';

/**
 * ComponentShowcase - Displays all themable components
 */
function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);

  return (
    <div className={styles.showcase}>
      {/* Typography Section */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Typography
        </Text>
        <Stack direction="vertical" spacing="default">
          <Text as="h1" variant="h1">
            Heading 1
          </Text>
          <Text as="h2" variant="h2">
            Heading 2
          </Text>
          <Text as="h3" variant="h3">
            Heading 3
          </Text>
          <Text variant="body-large">Large body text - adapts to theme</Text>
          <Text>Regular body text - fully themable</Text>
          <Text variant="body-small">Small body text</Text>
        </Stack>
      </section>

      <Divider />

      {/* Buttons Section */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Buttons
        </Text>
        <Stack direction="vertical" spacing="comfortable">
          <Cluster spacing="default">
            <Button type="solid" variant="primary">
              Primary Solid
            </Button>
            <Button type="outline" variant="primary">
              Primary Outlined
            </Button>
            <Button type="ghost" variant="primary">
              Primary Ghost
            </Button>
          </Cluster>
          <Cluster spacing="default">
            <Button type="solid" variant="secondary">
              Secondary Solid
            </Button>
            <Button type="outline" variant="secondary">
              Secondary Outlined
            </Button>
            <Button type="ghost" variant="secondary">
              Secondary Ghost
            </Button>
          </Cluster>
          <Cluster spacing="default">
            <Button type="solid" variant="success">
              Success
            </Button>
            <Button type="solid" variant="danger">
              Danger
            </Button>
            <Button type="solid" variant="warning">
              Warning
            </Button>
            <Button type="solid" variant="info">
              Info
            </Button>
          </Cluster>
        </Stack>
      </section>

      <Divider />

      {/* Badges Section */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Badges
        </Text>
        <Cluster spacing="default">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </Cluster>
        <Cluster spacing="default" style={{ marginTop: '1rem' }}>
          <Badge variant="default" dot>
            Default with dot
          </Badge>
          <Badge variant="success" dot>
            Success with dot
          </Badge>
          <Badge variant="error" dot>
            Error with dot
          </Badge>
          <Badge variant="warning" dot>
            Warning with dot
          </Badge>
          <Badge variant="info" dot>
            Info with dot
          </Badge>
        </Cluster>
      </section>

      <Divider />

      {/* Form Elements Section */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Form Elements
        </Text>
        <Stack direction="vertical" spacing="comfortable">
          <Box>
            <Label htmlFor="text-input">Text Input</Label>
            <Input
              id="text-input"
              type="text"
              placeholder="Enter some text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Box>
          <Box>
            <Label htmlFor="email-input">Email Input</Label>
            <Input id="email-input" type="email" placeholder="email@example.com" />
          </Box>
          <Box>
            <Label htmlFor="disabled-input">Disabled Input</Label>
            <Input id="disabled-input" type="text" placeholder="Disabled" disabled />
          </Box>
        </Stack>
      </section>

      <Divider />

      {/* Layout Components Section */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Layout Components
        </Text>

        <Stack direction="vertical" spacing="comfortable">
          <Box>
            <Text variant="body-small" style={{ marginBottom: '0.5rem' }}>
              Box with background:
            </Text>
            <Box padding="comfortable" background="surface" borderRadius="default">
              <Text>This is a Box component with surface background</Text>
            </Box>
          </Box>

          <Box>
            <Text variant="body-small" style={{ marginBottom: '0.5rem' }}>
              Stack (vertical):
            </Text>
            <Stack direction="vertical" spacing="compact">
              <Box padding="default" background="surface" borderRadius="small">
                Item 1
              </Box>
              <Box padding="default" background="surface" borderRadius="small">
                Item 2
              </Box>
              <Box padding="default" background="surface" borderRadius="small">
                Item 3
              </Box>
            </Stack>
          </Box>

          <Box>
            <Text variant="body-small" style={{ marginBottom: '0.5rem' }}>
              Flex (horizontal):
            </Text>
            <Flex gap="default" align="center">
              <Box padding="default" background="surface" borderRadius="small" style={{ flex: 1 }}>
                Flex Item 1
              </Box>
              <Box padding="default" background="surface" borderRadius="small" style={{ flex: 1 }}>
                Flex Item 2
              </Box>
              <Box padding="default" background="surface" borderRadius="small" style={{ flex: 1 }}>
                Flex Item 3
              </Box>
            </Flex>
          </Box>

          <Box>
            <Text variant="body-small" style={{ marginBottom: '0.5rem' }}>
              Grid (3 columns):
            </Text>
            <Grid columns={3} gap="default">
              <Box padding="default" background="surface" borderRadius="small">
                Grid 1
              </Box>
              <Box padding="default" background="surface" borderRadius="small">
                Grid 2
              </Box>
              <Box padding="default" background="surface" borderRadius="small">
                Grid 3
              </Box>
            </Grid>
          </Box>
        </Stack>
      </section>

      <Divider />

      {/* Card Section */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Card Component
        </Text>
        <Grid columns={2} gap="comfortable">
          <Card>
            <Stack direction="vertical" spacing="compact">
              <Text as="h3" variant="h3">
                Card Title
              </Text>
              <Text variant="body-small">
                This is a card component that automatically adapts to the selected theme mode.
              </Text>
              <Button type="solid" variant="primary" size="sm">
                Action
              </Button>
            </Stack>
          </Card>
          <Card>
            <Stack direction="vertical" spacing="compact">
              <Text as="h3" variant="h3">
                Interactive Card
              </Text>
              <Text variant="body-small">Count: {count}</Text>
              <Cluster spacing="compact">
                <Button type="solid" variant="primary" size="sm" onClick={() => setCount(count + 1)}>
                  Increment
                </Button>
                <Button type="outline" variant="primary" size="sm" onClick={() => setCount(0)}>
                  Reset
                </Button>
              </Cluster>
            </Stack>
          </Card>
        </Grid>
      </section>

      <Divider />

      {/* Center Component */}
      <section className={styles.section}>
        <Text as="h2" variant="h2" className={styles.sectionTitle}>
          Center Component
        </Text>
        <Box padding="comfortable" background="surface" borderRadius="default">
          <Center>
            <Badge variant="info">Centered Content</Badge>
          </Center>
        </Box>
      </section>
    </div>
  );
}

/**
 * Main Playground Page
 */
export default function Playground(): ReactNode {
  const playgroundContainerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'demo' | 'components'>('demo');

  return (
    <Layout
      title="Interactive Playground"
      description="Test and explore Lufa Design System components with different theme modes"
    >
      <div ref={playgroundContainerRef} className={styles.playgroundWrapper}>
        <Container maxWidth="xlarge">
          <Stack direction="vertical" spacing="comfortable">
            {/* Header */}
            <Box className={styles.header}>
              <Text as="h1" variant="h1">
                🎨 Interactive Playground
              </Text>
              <Text variant="body-large">
                Explore all themable components from the Lufa Design System. Switch between themes and modes to see how
                components adapt automatically.
              </Text>
            </Box>

            {/* Theme Switcher & View Toggle */}
            <Box className={styles.controls}>
              <Stack direction="vertical" spacing="default" style={{ width: '100%' }}>
                <PlaygroundThemeSwitcher containerRef={playgroundContainerRef} />

                <Divider />

                {/* View Toggle */}
                <Center>
                  <Cluster spacing="compact" className={styles.viewToggle}>
                    <Button
                      type={view === 'demo' ? 'solid' : 'ghost'}
                      variant="primary"
                      size="sm"
                      onClick={() => setView('demo')}
                    >
                      Demo Site
                    </Button>
                    <Button
                      type={view === 'components' ? 'solid' : 'ghost'}
                      variant="primary"
                      size="sm"
                      onClick={() => setView('components')}
                    >
                      Component Library
                    </Button>
                  </Cluster>
                </Center>
              </Stack>
            </Box>

            <Divider />

            {/* Content based on selected view */}
            {view === 'demo' ? <DemoSite /> : <ComponentShowcase />}
          </Stack>
        </Container>
      </div>
    </Layout>
  );
}
