/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from 'react';

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
  Stack,
  Text,
} from '@grasdouble/lufa_design-system';

import styles from './playground.module.css';

/**
 * DemoSite - A realistic website example showcasing components in context
 */
export default function DemoSite() {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className={styles.demoSite}>
      {/* Header / Navigation */}
      <Box as="header" className={styles.header}>
        <Container maxWidth="xlarge">
          <Flex justify="between" align="center">
            <Text as="h1" variant="h3" weight="bold">
              ⚡ Lufa Platform
            </Text>
            <Cluster spacing="default">
              <Button type="ghost" variant="neutral" size="sm">
                Features
              </Button>
              <Button type="ghost" variant="neutral" size="sm">
                Pricing
              </Button>
              <Button type="ghost" variant="neutral" size="sm">
                Docs
              </Button>
              <Button type="outline" variant="primary" size="sm">
                Sign In
              </Button>
              <Button type="solid" variant="primary" size="sm">
                Get Started
              </Button>
            </Cluster>
          </Flex>
        </Container>
      </Box>

      <Divider />

      {/* Hero Section */}
      <Box as="section" className={styles.hero}>
        <Container maxWidth="large">
          <Center>
            <Stack direction="vertical" spacing="comfortable" align="center">
              <Badge variant="info">New Release v2.0</Badge>
              <Text as="h1" variant="h1" weight="bold" align="center">
                Build Beautiful Apps
                <br />
                with Lufa Design System
              </Text>
              <Text variant="body-large" align="center" className={styles.heroSubtitle}>
                A comprehensive design system for modern web applications. Create stunning interfaces with themable
                components that adapt to your brand.
              </Text>
              <Cluster spacing="default">
                <Button type="solid" variant="primary" size="lg">
                  Start Building
                </Button>
                <Button type="outline" variant="secondary" size="lg">
                  View Documentation
                </Button>
              </Cluster>
              <Cluster spacing="compact">
                <Text variant="body-small" color="secondary">
                  ✓ 50+ Components
                </Text>
                <Text variant="body-small" color="secondary">
                  ✓ 11 Themes
                </Text>
                <Text variant="body-small" color="secondary">
                  ✓ TypeScript First
                </Text>
                <Text variant="body-small" color="secondary">
                  ✓ Accessible
                </Text>
              </Cluster>
            </Stack>
          </Center>
        </Container>
      </Box>

      <Divider />

      {/* Features Section */}
      <Box as="section" className={styles.features}>
        <Container maxWidth="xlarge">
          <Stack direction="vertical" spacing="comfortable">
            <Center>
              <Stack direction="vertical" spacing="default" align="center">
                <Text as="h2" variant="h2" weight="bold">
                  Everything You Need
                </Text>
                <Text variant="body-large" color="secondary" align="center">
                  Powerful features to accelerate your development workflow
                </Text>
              </Stack>
            </Center>

            <Grid columns={3} gap="default">
              {[
                {
                  icon: '🎨',
                  title: 'Themable',
                  description:
                    'Switch between 11 pre-built themes or create your own. Dark mode and high contrast included.',
                },
                {
                  icon: '♿',
                  title: 'Accessible',
                  description:
                    'Built with WCAG AA compliance in mind. Keyboard navigation, screen reader support, and semantic HTML.',
                },
                {
                  icon: '📱',
                  title: 'Responsive',
                  description: 'Mobile-first design with responsive utilities. Works beautifully on all screen sizes.',
                },
                {
                  icon: '🔧',
                  title: 'Developer First',
                  description:
                    'TypeScript support, comprehensive documentation, and excellent developer experience out of the box.',
                },
                {
                  icon: '⚡',
                  title: 'Performant',
                  description:
                    'Optimized bundle size, lazy loading, and efficient rendering. Built for production apps.',
                },
                {
                  icon: '🔄',
                  title: 'Framework Agnostic',
                  description:
                    'Works with React, Next.js, Remix, and more. Bring your own framework, we handle the design.',
                },
              ].map((feature) => (
                <Card key={feature.title}>
                  <Box padding="comfortable">
                    <Stack direction="vertical" spacing="default">
                      <Text variant="h3" weight="bold">
                        {feature.icon} {feature.title}
                      </Text>
                      <Text color="secondary">{feature.description}</Text>
                      <Button type="ghost" variant="primary" size="sm">
                        Learn More →
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* Pricing Section */}
      <Box as="section" className={styles.pricing}>
        <Container maxWidth="large">
          <Stack direction="vertical" spacing="comfortable">
            <Center>
              <Stack direction="vertical" spacing="default" align="center">
                <Text as="h2" variant="h2" weight="bold">
                  Simple, Transparent Pricing
                </Text>
                <Text variant="body-large" color="secondary" align="center">
                  Choose the plan that fits your needs
                </Text>
              </Stack>
            </Center>

            <Grid columns={3} gap="default">
              {/* Free Plan */}
              <Card>
                <Box padding="comfortable">
                  <Stack direction="vertical" spacing="comfortable">
                    <Stack direction="vertical" spacing="compact">
                      <Text variant="h3" weight="bold">
                        Free
                      </Text>
                      <Text variant="body-large">
                        <Text as="span" variant="h2" weight="bold">
                          $0
                        </Text>
                        <Text as="span" color="secondary">
                          /month
                        </Text>
                      </Text>
                      <Text color="secondary">Perfect for personal projects</Text>
                    </Stack>

                    <Divider />

                    <Stack direction="vertical" spacing="compact">
                      <Text>✓ All components</Text>
                      <Text>✓ 3 themes</Text>
                      <Text>✓ Community support</Text>
                      <Text>✓ MIT License</Text>
                    </Stack>

                    <Button
                      type={selectedPlan === 'free' ? 'solid' : 'outline'}
                      variant="primary"
                      fullWidth
                      onClick={() => setSelectedPlan('free')}
                    >
                      {selectedPlan === 'free' ? 'Selected' : 'Get Started'}
                    </Button>
                  </Stack>
                </Box>
              </Card>

              {/* Pro Plan */}
              <Card>
                <Box padding="comfortable">
                  <Stack direction="vertical" spacing="comfortable">
                    <Stack direction="vertical" spacing="compact">
                      <Flex justify="between" align="center">
                        <Text variant="h3" weight="bold">
                          Pro
                        </Text>
                        <Badge variant="success">Popular</Badge>
                      </Flex>
                      <Text variant="body-large">
                        <Text as="span" variant="h2" weight="bold">
                          $29
                        </Text>
                        <Text as="span" color="secondary">
                          /month
                        </Text>
                      </Text>
                      <Text color="secondary">For professional developers</Text>
                    </Stack>

                    <Divider />

                    <Stack direction="vertical" spacing="compact">
                      <Text>✓ Everything in Free</Text>
                      <Text>✓ All 11 themes</Text>
                      <Text>✓ Priority support</Text>
                      <Text>✓ Custom theme generator</Text>
                      <Text>✓ Advanced templates</Text>
                    </Stack>

                    <Button type="solid" variant="primary" fullWidth onClick={() => setSelectedPlan('pro')}>
                      {selectedPlan === 'pro' ? 'Selected ✓' : 'Start Pro Trial'}
                    </Button>
                  </Stack>
                </Box>
              </Card>

              {/* Enterprise Plan */}
              <Card>
                <Box padding="comfortable">
                  <Stack direction="vertical" spacing="comfortable">
                    <Stack direction="vertical" spacing="compact">
                      <Text variant="h3" weight="bold">
                        Enterprise
                      </Text>
                      <Text variant="body-large">
                        <Text as="span" variant="h2" weight="bold">
                          Custom
                        </Text>
                      </Text>
                      <Text color="secondary">For teams and organizations</Text>
                    </Stack>

                    <Divider />

                    <Stack direction="vertical" spacing="compact">
                      <Text>✓ Everything in Pro</Text>
                      <Text>✓ Custom components</Text>
                      <Text>✓ Dedicated support</Text>
                      <Text>✓ SLA guarantee</Text>
                      <Text>✓ Training & onboarding</Text>
                    </Stack>

                    <Button
                      type={selectedPlan === 'enterprise' ? 'solid' : 'outline'}
                      variant="secondary"
                      fullWidth
                      onClick={() => setSelectedPlan('enterprise')}
                    >
                      {selectedPlan === 'enterprise' ? 'Selected' : 'Contact Sales'}
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* Newsletter / CTA Section */}
      <Box as="section" className={styles.newsletter}>
        <Container maxWidth="medium">
          <Card>
            <Box padding="comfortable">
              <Center>
                <Stack direction="vertical" spacing="comfortable" align="center">
                  <Text as="h2" variant="h2" weight="bold" align="center">
                    Stay Updated
                  </Text>
                  <Text variant="body-large" color="secondary" align="center">
                    Get the latest updates, tutorials, and best practices delivered to your inbox.
                  </Text>

                  <Box style={{ width: '100%', maxWidth: '500px' }}>
                    <Stack direction="vertical" spacing="default">
                      <Stack direction="horizontal" spacing="default">
                        <Box style={{ flex: 1 }}>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                          />
                        </Box>
                        <Button type="solid" variant="primary">
                          Subscribe
                        </Button>
                      </Stack>
                      <Text variant="body-small" color="secondary" align="center">
                        Join 10,000+ developers already using Lufa Design System
                      </Text>
                    </Stack>
                  </Box>
                </Stack>
              </Center>
            </Box>
          </Card>
        </Container>
      </Box>

      <Divider />

      {/* Footer */}
      <Box as="footer" className={styles.footer}>
        <Container maxWidth="xlarge">
          <Stack direction="vertical" spacing="comfortable">
            <Grid columns={4} gap="default">
              <Stack direction="vertical" spacing="compact">
                <Text weight="bold">Product</Text>
                <Button type="ghost" variant="neutral" size="sm">
                  Features
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Pricing
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Roadmap
                </Button>
              </Stack>

              <Stack direction="vertical" spacing="compact">
                <Text weight="bold">Resources</Text>
                <Button type="ghost" variant="neutral" size="sm">
                  Documentation
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Examples
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Blog
                </Button>
              </Stack>

              <Stack direction="vertical" spacing="compact">
                <Text weight="bold">Company</Text>
                <Button type="ghost" variant="neutral" size="sm">
                  About
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Careers
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Contact
                </Button>
              </Stack>

              <Stack direction="vertical" spacing="compact">
                <Text weight="bold">Legal</Text>
                <Button type="ghost" variant="neutral" size="sm">
                  Privacy
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Terms
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  License
                </Button>
              </Stack>
            </Grid>

            <Divider />

            <Flex justify="between" align="center">
              <Text variant="body-small" color="secondary">
                © 2026 Lufa Design System. All rights reserved.
              </Text>
              <Cluster spacing="compact">
                <Button type="ghost" variant="neutral" size="sm">
                  GitHub
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Twitter
                </Button>
                <Button type="ghost" variant="neutral" size="sm">
                  Discord
                </Button>
              </Cluster>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}
