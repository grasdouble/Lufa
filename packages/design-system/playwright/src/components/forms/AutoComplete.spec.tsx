import { expect, test } from '@playwright/experimental-ct-react';

import { AutoComplete } from '@grasdouble/lufa_design-system';
import type { AutoCompleteOption } from '@grasdouble/lufa_design-system';

const testOptions: AutoCompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

test.describe('AutoComplete', () => {
  test('renders with placeholder', async ({ mount }) => {
    const component = await mount(
      <AutoComplete placeholder="Type to search..." options={testOptions} />
    );
    await expect(component.getByPlaceholder('Type to search...')).toBeVisible();
  });

  test('renders with label', async ({ mount }) => {
    const component = await mount(
      <AutoComplete label="Select Country" placeholder="Type here" options={testOptions} />
    );
    await expect(component.getByText('Select Country')).toBeVisible();
  });

  test('shows options on focus and input', async ({ mount }) => {
    const component = await mount(
      <AutoComplete label="Country" placeholder="Type here" options={testOptions} />
    );
    const input = component.getByRole('textbox');
    await input.click();
    await input.fill('United');
    await expect(component.getByText('United States')).toBeVisible();
    await expect(component.getByText('United Kingdom')).toBeVisible();
  });

  test('filters options based on input', async ({ mount }) => {
    const component = await mount(
      <AutoComplete label="Country" placeholder="Type here" options={testOptions} />
    );
    const input = component.getByRole('textbox');
    await input.click();
    await input.fill('Canada');
    await expect(component.getByText('Canada')).toBeVisible();
    await expect(component.getByText('United States')).not.toBeVisible();
  });

  test('selects option on click', async ({ mount }) => {
    const component = await mount(
      <AutoComplete label="Country" placeholder="Type here" options={testOptions} />
    );
    const input = component.getByRole('textbox');
    await input.click();
    await input.fill('Canada');
    await component.getByText('Canada').click();
    await expect(input).toHaveValue('Canada');
  });

  test('supports keyboard navigation', async ({ mount, page }) => {
    const component = await mount(
      <AutoComplete label="Country" placeholder="Type here" options={testOptions} />
    );
    const input = component.getByRole('textbox');
    await input.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('United Kingdom');
  });

  test('closes dropdown on Escape', async ({ mount, page }) => {
    const component = await mount(
      <AutoComplete label="Country" placeholder="Type here" options={testOptions} />
    );
    const input = component.getByRole('textbox');
    await input.click();
    await expect(component.getByText('United States')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(component.getByText('United States')).not.toBeVisible();
  });

  test('handles disabled state', async ({ mount }) => {
    const component = await mount(
      <AutoComplete label="Country" placeholder="Type here" options={testOptions} disabled />
    );
    const input = component.getByRole('textbox');
    await expect(input).toBeDisabled();
  });

  test('displays error message', async ({ mount }) => {
    const component = await mount(
      <AutoComplete
        label="Country"
        placeholder="Type here"
        options={testOptions}
        error="Please select a valid country"
      />
    );
    await expect(component.getByText('Please select a valid country')).toBeVisible();
  });

  test('displays helper text', async ({ mount }) => {
    const component = await mount(
      <AutoComplete
        label="Country"
        placeholder="Type here"
        options={testOptions}
        helperText="Start typing to see suggestions"
      />
    );
    await expect(component.getByText('Start typing to see suggestions')).toBeVisible();
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(
      <AutoComplete label="Select Country" placeholder="Type here" options={testOptions} />
    );
    await expect(component).toMatchAriaSnapshot(`
      - text "Select Country"
      - textbox: Type here
    `);
  });

  test('visual regression: sizes and variants', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <AutoComplete label="Small" size="small" placeholder="Small size" options={testOptions} />
        <AutoComplete label="Medium" size="medium" placeholder="Medium size" options={testOptions} />
        <AutoComplete label="Large" size="large" placeholder="Large size" options={testOptions} />
        <AutoComplete label="Outlined" variant="outlined" placeholder="Outlined" options={testOptions} />
        <AutoComplete label="Filled" variant="filled" placeholder="Filled" options={testOptions} />
      </div>
    );
    await expect(component).toHaveScreenshot('autocomplete-variants.png');
  });

  test('visual regression: states', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <AutoComplete label="Default" placeholder="Default" options={testOptions} />
        <AutoComplete label="Disabled" placeholder="Disabled" options={testOptions} disabled />
        <AutoComplete label="Error" placeholder="Error" options={testOptions} error="Error message" />
        <AutoComplete label="Helper" placeholder="Helper" options={testOptions} helperText="Helper text" />
      </div>
    );
    await expect(component).toHaveScreenshot('autocomplete-states.png');
  });
});
