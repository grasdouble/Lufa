import React from 'react';
import { expect, test } from '@playwright/experimental-ct-react';

import type { StepItem } from '@grasdouble/lufa_design-system';
import { Steps } from '@grasdouble/lufa_design-system';

import { CartIcon, CheckIcon, DoneIcon, PaymentIcon, UserIcon } from './Steps.fixtures';

const basicSteps: StepItem[] = [
  { title: 'Step 1', description: 'First step description' },
  { title: 'Step 2', description: 'Second step description' },
  { title: 'Step 3', description: 'Third step description' },
];

const stepsWithIcons: StepItem[] = [
  { title: 'Account', description: 'Create account', icon: <UserIcon /> },
  { title: 'Cart', description: 'Review your cart', icon: <CartIcon /> },
  { title: 'Payment', description: 'Enter payment info', icon: <PaymentIcon /> },
  { title: 'Done', description: 'Order complete', icon: <DoneIcon /> },
];

const stepsWithCustomStatus: StepItem[] = [
  { title: 'Completed', description: 'This step is done', status: 'finish' },
  { title: 'In Progress', description: 'Currently working on this', status: 'process' },
  { title: 'Error', description: 'Something went wrong', status: 'error' },
  { title: 'Waiting', description: 'Not started yet', status: 'wait' },
];

test.describe('Steps Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with items', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      await expect(component).toBeVisible();
      await expect(component.getByText('Step 1')).toBeVisible();
      await expect(component.getByText('Step 2')).toBeVisible();
      await expect(component.getByText('Step 3')).toBeVisible();
    });

    test('should render step descriptions', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      await expect(component.getByText('First step description')).toBeVisible();
      await expect(component.getByText('Second step description')).toBeVisible();
      await expect(component.getByText('Third step description')).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} className="custom-steps" />);
      await expect(component).toHaveClass(/custom-steps/);
    });
  });

  test.describe('Direction Variants', () => {
    const directions = ['horizontal', 'vertical'] as const;

    for (const direction of directions) {
      test(`should render ${direction} direction`, async ({ mount }) => {
        const component = await mount(<Steps items={basicSteps} direction={direction} />);
        await expect(component).toBeVisible();
        await expect(component.getByText('Step 1')).toBeVisible();
      });
    }

    test('should apply horizontal direction class by default', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      await expect(component).toHaveClass(/directionHorizontal/);
    });

    test('should apply vertical direction class', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} direction="vertical" />);
      await expect(component).toHaveClass(/directionVertical/);
    });
  });

  test.describe('Size Variants', () => {
    const sizes = ['small', 'default'] as const;

    for (const size of sizes) {
      test(`should render ${size} size`, async ({ mount }) => {
        const component = await mount(<Steps items={basicSteps} size={size} />);
        await expect(component).toBeVisible();
        await expect(component.getByText('Step 1')).toBeVisible();
      });
    }

    test('should apply default size class', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      await expect(component).toHaveClass(/sizeDefault/);
    });

    test('should apply small size class', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} size="small" />);
      await expect(component).toHaveClass(/sizeSmall/);
    });
  });

  test.describe('Current Step', () => {
    test('should highlight current step (0-indexed)', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={1} />);
      // Step 2 (index 1) should be in process status
      const steps = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Step 2' });
      await expect(steps).toHaveCount(1);
      await expect(steps).toHaveClass(/statusProcess/);
    });

    test('should mark previous steps as finished', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={2} />);
      // Step 1 and 2 should be finished
      const finishedSteps = component.locator('[class*="step"][class*="statusFinish"]');
      await expect(finishedSteps).toHaveCount(2);
    });

    test('should mark future steps as waiting', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={0} />);
      // Step 2 and 3 should be waiting
      const waitingSteps = component.locator('[class*="step"][class*="statusWait"]');
      await expect(waitingSteps).toHaveCount(2);
    });

    test('should show checkmark for finished steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={2} />);
      // First two steps should show checkmarks
      await expect(component.getByText('✓').first()).toBeVisible();
    });

    test('should show step number for current and waiting steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={1} />);
      // Current step shows its number (index 1 = "2")
      const stepNumbers = component.locator('[class*="stepNumber"]');
      await expect(stepNumbers.filter({ hasText: '2' })).toBeVisible();
      // Waiting step shows its number  (index 2 = "3")
      await expect(stepNumbers.filter({ hasText: '3' })).toBeVisible();
    });
  });

  test.describe('Custom Status', () => {
    test('should render custom status for steps', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithCustomStatus} />);
      await expect(component.getByText('Completed')).toBeVisible();
      await expect(component.getByText('In Progress')).toBeVisible();
      await expect(component.getByText('Error')).toBeVisible();
      await expect(component.getByText('Waiting')).toBeVisible();
    });

    test('should apply custom finish status', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithCustomStatus} />);
      const finishStep = component.locator('[class*="statusFinish"]');
      await expect(finishStep).toBeVisible();
      await expect(finishStep).toContainText('Completed');
    });

    test('should apply custom process status', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithCustomStatus} />);
      const processStep = component.locator('[class*="statusProcess"]');
      await expect(processStep).toBeVisible();
      await expect(processStep).toContainText('In Progress');
    });

    test('should apply custom error status', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithCustomStatus} />);
      const errorStep = component.locator('[class*="statusError"]');
      await expect(errorStep).toBeVisible();
      await expect(errorStep).toContainText('Error');
    });

    test('should apply custom wait status', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithCustomStatus} />);
      const waitStep = component.locator('[class*="statusWait"]');
      await expect(waitStep).toBeVisible();
      await expect(waitStep).toContainText('Waiting');
    });
  });

  test.describe('Icons', () => {
    test('should render steps with custom icons', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithIcons} current={1} />);
      await expect(component.getByText('👤')).toBeVisible();
      await expect(component.getByText('🛒')).toBeVisible();
      await expect(component.getByText('💳')).toBeVisible();
      await expect(component.getByText('✔️')).toBeVisible();
    });

    test('should show custom icon instead of number', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithIcons} current={0} />);
      // Find the step with Account text - use more specific selector to avoid matching children
      const accountStep = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Account' });
      await expect(accountStep).toContainText('👤');
      // Should not show number when custom icon is provided
      await expect(accountStep.locator('[class*="stepNumber"]')).not.toBeVisible();
    });

    test('should apply custom icon class', async ({ mount }) => {
      const component = await mount(<Steps items={stepsWithIcons} />);
      const customIcon = component.locator('[class*="customIcon"]').first();
      await expect(customIcon).toBeVisible();
    });
  });

  test.describe('Click Navigation', () => {
    test('should call onChange when step is clicked', async ({ mount }) => {
      let changedStep = -1;
      const component = await mount(
        <Steps
          items={basicSteps}
          current={0}
          onChange={(index) => {
            changedStep = index;
          }}
        />
      );

      await component.getByText('Step 2').click();
      expect(changedStep).toBe(1);
    });

    test('should not call onChange when clicking current step', async ({ mount }) => {
      let changedStep = -1;
      const component = await mount(
        <Steps
          items={basicSteps}
          current={1}
          onChange={(index) => {
            changedStep = index;
          }}
        />
      );

      await component.getByText('Step 2').click();
      expect(changedStep).toBe(-1);
    });

    test('should apply clickable class when onChange is provided', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={1} onChange={() => {}} />);
      // Steps other than current should be clickable
      const steps = component.locator('[class*="clickable"]');
      await expect(steps.first()).toBeVisible();
    });

    test('should not be clickable without onChange', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={1} />);
      const clickableSteps = component.locator('[class*="clickable"]');
      await expect(clickableSteps).toHaveCount(0);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should be keyboard accessible when clickable', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={0} onChange={() => {}} />);
      const step2 = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Step 2' });

      await step2.focus();
      await expect(step2).toBeFocused();
    });

    test('should activate step with Enter key', async ({ mount, page }) => {
      let changedStep = -1;
      const component = await mount(
        <Steps
          items={basicSteps}
          current={0}
          onChange={(index) => {
            changedStep = index;
          }}
        />
      );

      const step3 = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Step 3' });
      await step3.focus();
      await page.keyboard.press('Enter');

      expect(changedStep).toBe(2);
    });

    test('should activate step with Space key', async ({ mount, page }) => {
      let changedStep = -1;
      const component = await mount(
        <Steps
          items={basicSteps}
          current={0}
          onChange={(index) => {
            changedStep = index;
          }}
        />
      );

      const step2 = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Step 2' });
      await step2.focus();
      await page.keyboard.press('Space');

      expect(changedStep).toBe(1);
    });

    test('should have tabindex 0 for clickable steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={0} onChange={() => {}} />);
      const step2 = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Step 2' });
      await expect(step2).toHaveAttribute('tabindex', '0');
    });

    test('should not have tabindex for non-clickable steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={0} />);
      const step2Container = component.getByText('Step 2').locator('..');
      const tabindex = await step2Container.getAttribute('tabindex');
      expect(tabindex).toBeNull();
    });
  });

  test.describe('Connectors', () => {
    test('should render connectors between steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      const connectors = component.locator('[class*="stepConnector"]');
      // Should have n-1 connectors for n steps
      await expect(connectors).toHaveCount(basicSteps.length - 1);
    });

    test('should not render connector after last step', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      const connectors = component.locator('[class*="stepConnector"]');
      await expect(connectors).toHaveCount(2); // 2 connectors for 3 steps
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper structure', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      await expect(component).toBeVisible();
    });

    test('should have role button for clickable steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={0} onChange={() => {}} />);
      const step2 = component.locator('[class*="step"][class*="status"]').filter({ hasText: 'Step 2' });
      await expect(step2).toHaveAttribute('role', 'button');
    });

    test('should not have role button for non-clickable steps', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} current={0} />);
      const step2Container = component.getByText('Step 2').locator('..');
      const role = await step2Container.getAttribute('role');
      expect(role).toBeNull();
    });

    test('connectors should have aria-hidden', async ({ mount }) => {
      const component = await mount(<Steps items={basicSteps} />);
      const connector = component.locator('[class*="stepConnector"]').first();
      await expect(connector).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle single step', async ({ mount }) => {
      const singleStep: StepItem[] = [{ title: 'Only Step', description: 'Single step' }];
      const component = await mount(<Steps items={singleStep} />);
      await expect(component.getByText('Only Step')).toBeVisible();
      // No connectors
      const connectors = component.locator('[class*="stepConnector"]');
      await expect(connectors).toHaveCount(0);
    });

    test('should handle many steps', async ({ mount }) => {
      const manySteps: StepItem[] = [
        { title: 'Step 1' },
        { title: 'Step 2' },
        { title: 'Step 3' },
        { title: 'Step 4' },
        { title: 'Step 5' },
        { title: 'Step 6' },
      ];
      const component = await mount(<Steps items={manySteps} current={2} />);
      await expect(component.getByText('Step 1')).toBeVisible();
      await expect(component.getByText('Step 6')).toBeVisible();
      // Should have 5 connectors
      const connectors = component.locator('[class*="stepConnector"]');
      await expect(connectors).toHaveCount(5);
    });

    test('should handle steps without descriptions', async ({ mount }) => {
      const stepsNoDesc: StepItem[] = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }];
      const component = await mount(<Steps items={stepsNoDesc} />);
      await expect(component.getByText('Step 1')).toBeVisible();
      await expect(component.getByText('Step 2')).toBeVisible();
      await expect(component.getByText('Step 3')).toBeVisible();
    });

    test('should handle long titles and descriptions', async ({ mount }) => {
      const longSteps: StepItem[] = [
        {
          title: 'This is a very long step title that might wrap',
          description: 'This is an extremely long description that provides detailed information about the step',
        },
        { title: 'Normal Step' },
      ];
      const component = await mount(<Steps items={longSteps} />);
      await expect(component.getByText('This is a very long step title that might wrap')).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const directions = ['horizontal', 'vertical'] as const;
      const sizes = ['small', 'default'] as const;

      const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 20,
        margin: '32px 0 16px 0',
        color: '#333',
        borderBottom: '2px solid #333',
        paddingBottom: 8,
      };

      const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 8,
        color: '#555',
      };

      const containerStyle: React.CSSProperties = {
        padding: 16,
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        marginBottom: 16,
      };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', width: '900px' }}>
          {/* Direction and Size Combinations */}
          <div style={sectionTitleStyle}>Steps - Direction and Size Variants</div>
          {directions.map((direction) =>
            sizes.map((size) => (
              <div key={`${direction}-${size}`} style={containerStyle}>
                <div style={labelStyle}>
                  Direction: {direction}, Size: {size}
                </div>
                <Steps items={basicSteps} current={1} direction={direction} size={size} />
              </div>
            ))
          )}

          {/* Progress States */}
          <div style={sectionTitleStyle}>Progress States</div>
          <div style={containerStyle}>
            <div style={labelStyle}>First Step (current=0)</div>
            <Steps items={basicSteps} current={0} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Middle Step (current=1)</div>
            <Steps items={basicSteps} current={1} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Last Step (current=2)</div>
            <Steps items={basicSteps} current={2} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>All Complete (current=3)</div>
            <Steps items={basicSteps} current={3} />
          </div>

          {/* Custom Status */}
          <div style={sectionTitleStyle}>Custom Status</div>
          <div style={containerStyle}>
            <div style={labelStyle}>All Status Types</div>
            <Steps items={stepsWithCustomStatus} />
          </div>

          {/* With Icons */}
          <div style={sectionTitleStyle}>With Custom Icons</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Horizontal with icons</div>
            <Steps items={stepsWithIcons} current={1} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical with icons</div>
            <Steps items={stepsWithIcons} current={2} direction="vertical" />
          </div>

          {/* Clickable Steps */}
          <div style={sectionTitleStyle}>Clickable Steps</div>
          <div style={containerStyle}>
            <div style={labelStyle}>With onChange handler (clickable)</div>
            <Steps items={basicSteps} current={1} onChange={() => {}} />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Steps are clickable with onChange prop</div>
          </div>

          {/* Vertical Layout Examples */}
          <div style={sectionTitleStyle}>Vertical Layout</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical - Default size</div>
            <Steps items={basicSteps} current={1} direction="vertical" />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical - Small size</div>
            <Steps items={basicSteps} current={1} direction="vertical" size="small" />
          </div>

          {/* Edge Cases */}
          <div style={sectionTitleStyle}>Edge Cases</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Single Step</div>
            <Steps items={[{ title: 'Only Step', description: 'Single step' }]} current={0} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Many Steps (6 steps)</div>
            <Steps
              items={[
                { title: 'Step 1' },
                { title: 'Step 2' },
                { title: 'Step 3' },
                { title: 'Step 4' },
                { title: 'Step 5' },
                { title: 'Step 6' },
              ]}
              current={2}
            />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Without Descriptions</div>
            <Steps items={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]} current={1} />
          </div>

          {/* Combined Features */}
          <div style={sectionTitleStyle}>Combined Features</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical + Icons + Custom Status + Clickable</div>
            <Steps items={stepsWithIcons} current={1} direction="vertical" onChange={() => {}} />
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('steps-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const directions = ['horizontal', 'vertical'] as const;
      const sizes = ['small', 'default'] as const;

      const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 20,
        margin: '32px 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
        borderBottom: '2px solid var(--lufa-token-color-text-primary)',
        paddingBottom: 8,
      };

      const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 8,
        color: 'var(--lufa-token-color-text-secondary)',
      };

      const containerStyle: React.CSSProperties = {
        padding: 16,
        background: 'var(--lufa-token-color-background-primary)',
        border: '1px solid #444',
        borderRadius: 4,
        marginBottom: 16,
      };

      const component = await mount(
        <div style={{ padding: 24, background: 'var(--lufa-token-color-background-primary)', width: '900px' }}>
          {/* Direction and Size Combinations */}
          <div style={sectionTitleStyle}>Steps - Direction and Size Variants</div>
          {directions.map((direction) =>
            sizes.map((size) => (
              <div key={`${direction}-${size}`} style={containerStyle}>
                <div style={labelStyle}>
                  Direction: {direction}, Size: {size}
                </div>
                <Steps items={basicSteps} current={1} direction={direction} size={size} />
              </div>
            ))
          )}

          {/* Progress States */}
          <div style={sectionTitleStyle}>Progress States</div>
          <div style={containerStyle}>
            <div style={labelStyle}>First Step (current=0)</div>
            <Steps items={basicSteps} current={0} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Middle Step (current=1)</div>
            <Steps items={basicSteps} current={1} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Last Step (current=2)</div>
            <Steps items={basicSteps} current={2} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>All Complete (current=3)</div>
            <Steps items={basicSteps} current={3} />
          </div>

          {/* Custom Status */}
          <div style={sectionTitleStyle}>Custom Status</div>
          <div style={containerStyle}>
            <div style={labelStyle}>All Status Types</div>
            <Steps items={stepsWithCustomStatus} />
          </div>

          {/* With Icons */}
          <div style={sectionTitleStyle}>With Custom Icons</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Horizontal with icons</div>
            <Steps items={stepsWithIcons} current={1} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical with icons</div>
            <Steps items={stepsWithIcons} current={2} direction="vertical" />
          </div>

          {/* Clickable Steps */}
          <div style={sectionTitleStyle}>Clickable Steps</div>
          <div style={containerStyle}>
            <div style={labelStyle}>With onChange handler (clickable)</div>
            <Steps items={basicSteps} current={1} onChange={() => {}} />
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--lufa-token-color-text-secondary)' }}>
              Steps are clickable with onChange prop
            </div>
          </div>

          {/* Vertical Layout Examples */}
          <div style={sectionTitleStyle}>Vertical Layout</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical - Default size</div>
            <Steps items={basicSteps} current={1} direction="vertical" />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical - Small size</div>
            <Steps items={basicSteps} current={1} direction="vertical" size="small" />
          </div>

          {/* Edge Cases */}
          <div style={sectionTitleStyle}>Edge Cases</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Single Step</div>
            <Steps items={[{ title: 'Only Step', description: 'Single step' }]} current={0} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Many Steps (6 steps)</div>
            <Steps
              items={[
                { title: 'Step 1' },
                { title: 'Step 2' },
                { title: 'Step 3' },
                { title: 'Step 4' },
                { title: 'Step 5' },
                { title: 'Step 6' },
              ]}
              current={2}
            />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Without Descriptions</div>
            <Steps items={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]} current={1} />
          </div>

          {/* Combined Features */}
          <div style={sectionTitleStyle}>Combined Features</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Vertical + Icons + Custom Status + Clickable</div>
            <Steps items={stepsWithIcons} current={1} direction="vertical" onChange={() => {}} />
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for stability
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('steps-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
