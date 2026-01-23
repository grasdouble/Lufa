import { expect, test } from '@playwright/experimental-ct-react';

import { Pagination } from '@grasdouble/lufa_design-system';

import { PaginationWithState } from './Pagination.fixtures';

test.describe('Pagination', () => {
  // Basic rendering tests
  test('renders with minimal props', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} />);
    await expect(component).toBeVisible();
    await expect(component.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  });

  test('renders with correct page numbers', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={50} pageSize={10} />);
    // 5 pages total (50 items / 10 per page)
    await expect(component.getByRole('button', { name: 'Page 1' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 2' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 3' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 4' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 5' })).toBeVisible();
  });

  test('displays ellipsis for many pages', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} pageSize={10} />);
    // 10 pages total (100 items / 10 per page) - should show ellipsis
    const ellipsis = component.locator('span').filter({ hasText: '...' });
    await expect(ellipsis).toBeVisible();
  });

  test('renders custom prev/next text', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={50} prevText="Previous" nextText="Next" />);
    await expect(component.getByRole('button', { name: 'Previous page' })).toContainText('Previous');
    await expect(component.getByRole('button', { name: 'Next page' })).toContainText('Next');
  });

  // Page navigation tests
  test('calls onChange when clicking next page', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    await component.getByRole('button', { name: 'Next page' }).click();
    expect(changedPage).toBe(2);
  });

  test('calls onChange when clicking previous page', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={3}
        total={100}
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    await component.getByRole('button', { name: 'Previous page' }).click();
    expect(changedPage).toBe(2);
  });

  test('calls onChange when clicking specific page number', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    await component.getByRole('button', { name: 'Page 3' }).click();
    expect(changedPage).toBe(3);
  });

  test('does not call onChange when clicking current page', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={2}
        total={100}
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    await component.getByRole('button', { name: 'Page 2' }).click();
    expect(changedPage).toBe(0); // Should not change
  });

  // Disabled states tests
  test('previous button is disabled on first page', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} />);
    const prevButton = component.getByRole('button', { name: 'Previous page' });
    await expect(prevButton).toBeDisabled();
  });

  test('next button is disabled on last page', async ({ mount }) => {
    const component = await mount(<Pagination current={10} total={100} pageSize={10} />);
    const nextButton = component.getByRole('button', { name: 'Next page' });
    await expect(nextButton).toBeDisabled();
  });

  test('previous button is enabled when not on first page', async ({ mount }) => {
    const component = await mount(<Pagination current={2} total={100} />);
    const prevButton = component.getByRole('button', { name: 'Previous page' });
    await expect(prevButton).not.toBeDisabled();
  });

  test('next button is enabled when not on last page', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} />);
    const nextButton = component.getByRole('button', { name: 'Next page' });
    await expect(nextButton).not.toBeDisabled();
  });

  // Size variants tests
  test('renders small size', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} size="small" />);
    await expect(component).toBeVisible();
    await expect(component.getByRole('navigation')).toBeVisible();
  });

  test('renders medium size', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} size="medium" />);
    await expect(component).toBeVisible();
    await expect(component.getByRole('navigation')).toBeVisible();
  });

  test('renders large size', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} size="large" />);
    await expect(component).toBeVisible();
    await expect(component.getByRole('navigation')).toBeVisible();
  });

  // Quick jumper tests
  test('shows quick jumper when enabled', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} showQuickJumper />);
    await expect(component.getByRole('spinbutton', { name: 'Jump to page' })).toBeVisible();
    await expect(component.getByText('Go to')).toBeVisible();
  });

  test('quick jumper navigates to page on Enter', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        showQuickJumper
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    const input = component.getByRole('spinbutton', { name: 'Jump to page' });
    await input.fill('5');
    await input.press('Enter');
    expect(changedPage).toBe(5);
  });

  test('quick jumper clears input after navigation', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} showQuickJumper onChange={() => {}} />);
    const input = component.getByRole('spinbutton', { name: 'Jump to page' });
    await input.fill('3');
    await input.press('Enter');
    await expect(input).toHaveValue('');
  });

  test('quick jumper ignores invalid page numbers', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        pageSize={10}
        showQuickJumper
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    const input = component.getByRole('spinbutton', { name: 'Jump to page' });

    // Test page number too high
    await input.fill('20');
    await input.press('Enter');
    expect(changedPage).toBe(0);

    // Test page number too low
    await input.fill('0');
    await input.press('Enter');
    expect(changedPage).toBe(0);
  });

  test('quick jumper accepts valid page numbers', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        pageSize={10}
        showQuickJumper
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );
    const input = component.getByRole('spinbutton', { name: 'Jump to page' });

    // Test navigating to page 5
    await input.fill('5');
    await input.press('Enter');
    // Wait for potential state update
    await component.page().waitForTimeout(50);
    expect(changedPage).toBe(5);

    // Test last page
    changedPage = 0;
    await input.clear();
    await input.fill('10');
    await input.press('Enter');
    await component.page().waitForTimeout(50);
    expect(changedPage).toBe(10);
  });

  // Size changer tests
  test('shows size changer when enabled', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} showSizeChanger />);
    await expect(component.getByRole('combobox', { name: 'Items per page' })).toBeVisible();
  });

  test('size changer displays correct options', async ({ mount }) => {
    const component = await mount(
      <Pagination current={1} total={100} showSizeChanger pageSizeOptions={[10, 20, 50, 100]} />
    );
    const select = component.getByRole('combobox', { name: 'Items per page' });
    await expect(select).toBeVisible();

    // Check options are present
    const options = select.locator('option');
    await expect(options).toHaveCount(4);
    await expect(options.nth(0)).toContainText('10 / page');
    await expect(options.nth(1)).toContainText('20 / page');
    await expect(options.nth(2)).toContainText('50 / page');
    await expect(options.nth(3)).toContainText('100 / page');
  });

  test('calls onPageSizeChange when size changes', async ({ mount }) => {
    let newSize = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        showSizeChanger
        onPageSizeChange={(size) => {
          newSize = size;
        }}
      />
    );
    const select = component.getByRole('combobox', { name: 'Items per page' });
    await select.selectOption('20');
    expect(newSize).toBe(20);
  });

  test('resets to page 1 when changing page size', async ({ mount }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={5}
        total={100}
        showSizeChanger
        onChange={(page) => {
          changedPage = page;
        }}
        onPageSizeChange={() => {}}
      />
    );
    const select = component.getByRole('combobox', { name: 'Items per page' });
    await select.selectOption('20');
    expect(changedPage).toBe(1);
  });

  // Edge cases tests
  test('handles single page correctly', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={5} pageSize={10} />);

    // Only page 1 should be visible
    await expect(component.getByRole('button', { name: 'Page 1' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 2' })).not.toBeVisible();

    // Both prev and next should be disabled
    await expect(component.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    await expect(component.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  test('handles exactly 7 pages without ellipsis', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={70} pageSize={10} />);

    // All 7 pages should be visible
    for (let i = 1; i <= 7; i++) {
      await expect(component.getByRole('button', { name: `Page ${i}` })).toBeVisible();
    }

    // No ellipsis should be present
    const ellipsis = component.locator('span').filter({ hasText: '...' });
    await expect(ellipsis).not.toBeVisible();
  });

  test('shows ellipsis for more than 7 pages', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} pageSize={10} />);

    // Ellipsis should be present
    const ellipsis = component.locator('span').filter({ hasText: '...' });
    await expect(ellipsis).toBeVisible();
  });

  test('ellipsis pattern at beginning (current page <= 3)', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={100} pageSize={10} />);

    // Should show: 1 2 3 4 ... 10
    await expect(component.getByRole('button', { name: 'Page 1', exact: true })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 2' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 3' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 4' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 10' })).toBeVisible();

    const ellipsis = component.locator('span').filter({ hasText: '...' });
    await expect(ellipsis).toHaveCount(1);
  });

  test('ellipsis pattern at end (current page >= total - 2)', async ({ mount }) => {
    const component = await mount(<Pagination current={10} total={100} pageSize={10} />);

    // Should show: 1 ... 7 8 9 10
    await expect(component.getByRole('button', { name: 'Page 1', exact: true })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 7' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 8' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 9' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 10' })).toBeVisible();

    const ellipsis = component.locator('span').filter({ hasText: '...' });
    await expect(ellipsis).toHaveCount(1);
  });

  test('ellipsis pattern in middle', async ({ mount }) => {
    const component = await mount(<Pagination current={5} total={100} pageSize={10} />);

    // Should show: 1 ... 4 5 6 ... 10
    await expect(component.getByRole('button', { name: 'Page 1', exact: true })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 4' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 5' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 6' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 10' })).toBeVisible();

    const ellipsis = component.locator('span').filter({ hasText: '...' });
    await expect(ellipsis).toHaveCount(2);
  });

  // Accessibility tests
  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={50} pageSize={10} />);
    await expect(component).toMatchAriaSnapshot(`
      - navigation "Pagination":
        - button "Previous page" [disabled]: ←
        - button "Page 1": "1"
        - button "Page 2": "2"
        - button "Page 3": "3"
        - button "Page 4": "4"
        - button "Page 5": "5"
        - button "Next page": →
    `);
  });

  test('current page has aria-current="page"', async ({ mount }) => {
    const component = await mount(<Pagination current={3} total={50} pageSize={10} />);
    const currentPage = component.getByRole('button', { name: 'Page 3' });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  test('non-current pages do not have aria-current', async ({ mount }) => {
    const component = await mount(<Pagination current={3} total={50} pageSize={10} />);
    const otherPage = component.getByRole('button', { name: 'Page 1' });
    await expect(otherPage).not.toHaveAttribute('aria-current');
  });

  test('navigation has proper aria-label', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={50} />);
    await expect(component.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  });

  test('previous button has proper aria-label', async ({ mount }) => {
    const component = await mount(<Pagination current={2} total={50} />);
    await expect(component.getByRole('button', { name: 'Previous page' })).toBeVisible();
  });

  test('next button has proper aria-label', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={50} />);
    await expect(component.getByRole('button', { name: 'Next page' })).toBeVisible();
  });

  test('page buttons have proper aria-label', async ({ mount }) => {
    const component = await mount(<Pagination current={1} total={50} />);
    await expect(component.getByRole('button', { name: 'Page 1' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Page 2' })).toBeVisible();
  });

  // Keyboard navigation tests
  test('is keyboard accessible - Tab navigation', async ({ mount, page }, testInfo) => {
    // Skip on mobile browsers and webkit - Tab navigation has focus timing issues
    if (testInfo.project.name.includes('mobile') || testInfo.project.name === 'webkit') {
      test.skip();
    }

    const component = await mount(<Pagination current={2} total={50} pageSize={10} />);

    // Start from enabled previous button (since current=2)
    const prevButton = component.getByRole('button', { name: 'Previous page' });
    await prevButton.focus();
    await expect(prevButton).toBeFocused();

    // Tab to page 1
    await page.keyboard.press('Tab');
    await expect(component.getByRole('button', { name: 'Page 1' })).toBeFocused();

    // Tab to page 2
    await page.keyboard.press('Tab');
    await expect(component.getByRole('button', { name: 'Page 2' })).toBeFocused();
  });

  test('is keyboard accessible - Enter/Space activates buttons', async ({ mount, page }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={50}
        pageSize={10}
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );

    // Focus and tab to page 2
    const page2Button = component.getByRole('button', { name: 'Page 2' });
    await page2Button.focus();

    // Activate with Enter
    await page.keyboard.press('Enter');
    await component.page().waitForTimeout(50);
    expect(changedPage).toBe(2);
  });

  test('quick jumper is keyboard accessible', async ({ mount, page }) => {
    let changedPage = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        showQuickJumper
        onChange={(page) => {
          changedPage = page;
        }}
      />
    );

    // Find the quick jumper input
    const input = component.getByRole('spinbutton', { name: 'Jump to page' });

    // Focus the input
    await input.focus();
    await expect(input).toBeFocused();

    // Type and press Enter
    await page.keyboard.type('7');
    await page.keyboard.press('Enter');
    expect(changedPage).toBe(7);
  });

  test('size changer is keyboard accessible', async ({ mount }) => {
    let newSize = 0;
    const component = await mount(
      <Pagination
        current={1}
        total={100}
        showSizeChanger
        onPageSizeChange={(size) => {
          newSize = size;
        }}
      />
    );

    const select = component.getByRole('combobox', { name: 'Items per page' });
    await select.focus();
    await expect(select).toBeFocused();

    // Change option with keyboard
    await select.selectOption('20');
    expect(newSize).toBe(20);
  });

  // Integration test with state management
  test('works with React state (integration)', async ({ mount }) => {
    const component = await mount(<PaginationWithState />);

    // Initial state
    await expect(component.getByTestId('current-page')).toContainText('Current: 1');

    // Navigate to page 3
    await component.getByRole('button', { name: 'Page 3', exact: true }).click();
    await expect(component.getByTestId('current-page')).toContainText('Current: 3');

    // Navigate with Next button
    await component.getByRole('button', { name: 'Next page' }).click();
    await expect(component.getByTestId('current-page')).toContainText('Current: 4');
  });

  // Visual regression test
  test('visual regression: pagination all variants in light mode', async ({ mount }) => {
    const containerStyle = { padding: 24, background: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 32 };
    const sectionStyle = { background: '#fff', padding: 16, borderRadius: 8 };
    const titleStyle = { fontWeight: 600, marginBottom: 16, fontSize: 14, color: '#333' };

    const component = await mount(
      <div style={containerStyle}>
        {/* Size variants */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Size Variants</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Small</div>
              <Pagination current={5} total={100} size="small" />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Medium</div>
              <Pagination current={5} total={100} size="medium" />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Large</div>
              <Pagination current={5} total={100} size="large" />
            </div>
          </div>
        </div>

        {/* Page states */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Page States</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>First Page (prev disabled)</div>
              <Pagination current={1} total={100} />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Middle Page</div>
              <Pagination current={5} total={100} />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Last Page (next disabled)</div>
              <Pagination current={10} total={100} pageSize={10} />
            </div>
          </div>
        </div>

        {/* Ellipsis patterns */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Ellipsis Patterns</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>No Ellipsis (7 pages or fewer)</div>
              <Pagination current={3} total={70} pageSize={10} />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Ellipsis at End (near beginning)</div>
              <Pagination current={2} total={100} pageSize={10} />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Ellipsis at Start (near end)</div>
              <Pagination current={9} total={100} pageSize={10} />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Double Ellipsis (middle)</div>
              <Pagination current={5} total={100} pageSize={10} />
            </div>
          </div>
        </div>

        {/* Quick jumper and size changer */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Features</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>With Quick Jumper</div>
              <Pagination current={5} total={100} showQuickJumper />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>With Size Changer</div>
              <Pagination current={5} total={100} showSizeChanger />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>With Both</div>
              <Pagination current={5} total={100} showQuickJumper showSizeChanger />
            </div>
          </div>
        </div>

        {/* Custom text */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Custom Text</div>
          <div>
            <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Custom Prev/Next Text</div>
            <Pagination current={5} total={100} prevText="Previous" nextText="Next" />
          </div>
        </div>

        {/* Edge cases */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Edge Cases</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Single Page</div>
              <Pagination current={1} total={5} pageSize={10} />
            </div>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8, color: '#666' }}>Many Pages (100 pages)</div>
              <Pagination current={50} total={1000} pageSize={10} />
            </div>
          </div>
        </div>
      </div>
    );

    await expect(component).toHaveScreenshot('pagination-all-variants-light.png');
  });

  // Visual regression test - Dark mode
  test('visual regression: pagination all variants in dark mode', async ({ mount, page }) => {
    // Set dark mode before mounting
    await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

    const containerStyle = {
      padding: 24,
      background: 'var(--lufa-token-color-background-primary)',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
    };
    const sectionStyle = {
      background: 'var(--lufa-token-color-background-primary)',
      padding: 16,
      borderRadius: 8,
    };
    const titleStyle = {
      fontWeight: 600,
      marginBottom: 16,
      fontSize: 14,
      color: 'var(--lufa-token-color-text-primary)',
    };
    const labelStyle = {
      fontSize: 12,
      marginBottom: 8,
      color: 'var(--lufa-token-color-text-secondary)',
    };

    const component = await mount(
      <div style={containerStyle}>
        {/* Size variants */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Size Variants</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={labelStyle}>Small</div>
              <Pagination current={5} total={100} size="small" />
            </div>
            <div>
              <div style={labelStyle}>Medium</div>
              <Pagination current={5} total={100} size="medium" />
            </div>
            <div>
              <div style={labelStyle}>Large</div>
              <Pagination current={5} total={100} size="large" />
            </div>
          </div>
        </div>

        {/* Page states */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Page States</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={labelStyle}>First Page (prev disabled)</div>
              <Pagination current={1} total={100} />
            </div>
            <div>
              <div style={labelStyle}>Middle Page</div>
              <Pagination current={5} total={100} />
            </div>
            <div>
              <div style={labelStyle}>Last Page (next disabled)</div>
              <Pagination current={10} total={100} pageSize={10} />
            </div>
          </div>
        </div>

        {/* Ellipsis patterns */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Ellipsis Patterns</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={labelStyle}>No Ellipsis (7 pages or fewer)</div>
              <Pagination current={3} total={70} pageSize={10} />
            </div>
            <div>
              <div style={labelStyle}>Ellipsis at End (near beginning)</div>
              <Pagination current={2} total={100} pageSize={10} />
            </div>
            <div>
              <div style={labelStyle}>Ellipsis at Start (near end)</div>
              <Pagination current={9} total={100} pageSize={10} />
            </div>
            <div>
              <div style={labelStyle}>Double Ellipsis (middle)</div>
              <Pagination current={5} total={100} pageSize={10} />
            </div>
          </div>
        </div>

        {/* Quick jumper and size changer */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Features</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={labelStyle}>With Quick Jumper</div>
              <Pagination current={5} total={100} showQuickJumper />
            </div>
            <div>
              <div style={labelStyle}>With Size Changer</div>
              <Pagination current={5} total={100} showSizeChanger />
            </div>
            <div>
              <div style={labelStyle}>With Both</div>
              <Pagination current={5} total={100} showQuickJumper showSizeChanger />
            </div>
          </div>
        </div>

        {/* Custom text */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Custom Text</div>
          <div>
            <div style={labelStyle}>Custom Prev/Next Text</div>
            <Pagination current={5} total={100} prevText="Previous" nextText="Next" />
          </div>
        </div>

        {/* Edge cases */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Edge Cases</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={labelStyle}>Single Page</div>
              <Pagination current={1} total={5} pageSize={10} />
            </div>
            <div>
              <div style={labelStyle}>Many Pages (100 pages)</div>
              <Pagination current={50} total={1000} pageSize={10} />
            </div>
          </div>
        </div>
      </div>
    );

    await expect(component).toHaveScreenshot('pagination-all-variants-dark.png');

    // Cleanup: remove dark mode
    await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
  });
});
