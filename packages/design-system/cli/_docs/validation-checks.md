# Validation Checks

Running `lufa-ds-cli theme-validate <theme-file>` performs three checks. Each can also
be run in isolation with `--format`, or `--a11y`.

## Format

Validates that every token value uses an accepted CSS format.

**Accepted formats:**

- Colors: `#RGB`, `#RRGGBB`, `#RRGGBBAA`, `rgb()`, `rgba()`, `hsl()`, `hsla()`
- Dimensions: `px`, `rem`, `em`, `%`, `vh`, `vw`
- Durations: `ms`, `s`
- References: `var(--lufa-*)`

```
✓ Format — all token values are valid
✗ --lufa-core-color-brand-primary-default (line 12): Invalid format — expected hex or var()
```

## A11y (WCAG AA)

Validates color contrast ratios across every mode defined in the theme
(`light`, `dark`, `high-contrast`). Color pairs are derived entirely from
token metadata — no hardcoded lists.

**Standards:**

- Normal text: minimum **4.5:1**
- UI components and borders: minimum **3:1**

Resolution follows the browser cascade: the DS base tokens (`tokens.css`) are
loaded first, then the theme overrides are merged on top per mode, and all
`var()` chains are resolved before the contrast ratio is calculated.

```
  A11y (WCAG AA):
  ✓ [light] 102 checks passed (3 skipped)
  ✗ [dark] 1 violation(s) (102 checks, 0 skipped)
      --lufa-semantic-ui-text-primary on --lufa-semantic-ui-background-page — 3.1:1 (needs 4.5:1 WCAG AA Text)
  ✓ [high-contrast] 102 checks passed
```

Skipped pairs are those where one of the two tokens is not defined in the theme
(the check cannot be performed without both values).
