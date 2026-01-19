# Tailwind to Vanilla CSS Mapping Table

> **Date**: 2026-01-17  
> **Status**: Phase 0.2 - Complete Mapping Reference  
> **Purpose**: Comprehensive lookup table for migrating Tailwind utilities to vanilla CSS

## Table of Contents

1. [Layout & Display](#1-layout--display)
2. [Flexbox & Grid](#2-flexbox--grid)
3. [Spacing (Padding & Margin)](#3-spacing-padding--margin)
4. [Sizing (Width & Height)](#4-sizing-width--height)
5. [Typography](#5-typography)
6. [Colors](#6-colors)
7. [Borders](#7-borders)
8. [Effects (Shadows, Opacity, Blur)](#8-effects-shadows-opacity-blur)
9. [Transitions & Animations](#9-transitions--animations)
10. [Transforms](#10-transforms)
11. [Positioning](#11-positioning)
12. [Interactivity (Cursor, Pointer Events)](#12-interactivity-cursor-pointer-events)
13. [Pseudo-classes & States](#13-pseudo-classes--states)
14. [Responsive Breakpoints](#14-responsive-breakpoints)
15. [Special Patterns](#15-special-patterns)

---

## 1. Layout & Display

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply inline-flex` | `display: inline-flex;` | - | Standard CSS |
| `@apply flex` | `display: flex;` | - | Standard CSS |
| `@apply inline` | `display: inline;` | - | Standard CSS |
| `@apply block` | `display: block;` | - | Standard CSS |
| `@apply hidden` | `display: none;` | - | Standard CSS |
| `@apply relative` | `position: relative;` | - | Standard CSS |
| `@apply absolute` | `position: absolute;` | - | Standard CSS |
| `@apply fixed` | `position: fixed;` | - | Standard CSS |
| `@apply isolate` | `isolation: isolate;` | - | For z-index stacking contexts |
| `@apply overflow-hidden` | `overflow: hidden;` | - | Standard CSS |
| `@apply shrink-0` | `flex-shrink: 0;` | - | Flexbox property |
| `@apply flex-1` | `flex: 1 1 0%;` | - | Flexbox shorthand |
| `@apply flex-none` | `flex: none;` | - | Flexbox shorthand |
| `@apply flex-auto` | `flex: auto;` | - | Flexbox shorthand |

---

## 2. Flexbox & Grid

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply items-center` | `align-items: center;` | - | Flexbox alignment |
| `@apply items-start` | `align-items: flex-start;` | - | Flexbox alignment |
| `@apply items-end` | `align-items: flex-end;` | - | Flexbox alignment |
| `@apply items-stretch` | `align-items: stretch;` | - | Flexbox alignment |
| `@apply justify-center` | `justify-content: center;` | - | Flexbox justification |
| `@apply justify-start` | `justify-content: flex-start;` | - | Flexbox justification |
| `@apply justify-end` | `justify-content: flex-end;` | - | Flexbox justification |
| `@apply justify-between` | `justify-content: space-between;` | - | Flexbox justification |
| `@apply flex-col` | `flex-direction: column;` | - | Flexbox direction |
| `@apply flex-row` | `flex-direction: row;` | - | Flexbox direction |
| `@apply flex-wrap` | `flex-wrap: wrap;` | - | Flexbox wrapping |
| `@apply gap-1` | `gap: var(--lufa-token-spacing-xxs);` | `spacing.xxs` (0.25rem) | Use token |
| `@apply gap-2` | `gap: var(--lufa-token-spacing-xs);` | `spacing.xs` (0.5rem) | Use token |
| `@apply gap-4` | `gap: var(--lufa-token-spacing-base);` | `spacing.base` (1rem) | Use token |
| `@apply gap-x-8` | `column-gap: var(--lufa-token-spacing-xl);` | `spacing.xl` (2rem) | Use token |
| `@apply gap-y-10` | `row-gap: var(--lufa-token-spacing-2xl);` | `spacing.2xl` (2.5rem) | Use token |
| `@apply grid` | `display: grid;` | - | Standard CSS |
| `@apply grid-cols-1` | `grid-template-columns: repeat(1, minmax(0, 1fr));` | - | Grid layout |

---

## 3. Spacing (Padding & Margin)

### 3.1 Padding

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply p-0` | `padding: 0;` | - | No padding |
| `@apply p-xxs` | `padding: var(--lufa-token-spacing-xxs);` | `spacing.xxs` (0.25rem) | Custom token |
| `@apply p-xs` | `padding: var(--lufa-token-spacing-xs);` | `spacing.xs` (0.5rem) | Custom token |
| `@apply p-sm` | `padding: var(--lufa-token-spacing-sm);` | `spacing.sm` (0.75rem) | Custom token |
| `@apply p-base` | `padding: var(--lufa-token-spacing-base);` | `spacing.base` (1rem) | Custom token |
| `@apply p-md` | `padding: var(--lufa-token-spacing-md);` | `spacing.md` (1.25rem) | Custom token |
| `@apply p-lg` | `padding: var(--lufa-token-spacing-lg);` | `spacing.lg` (1.5rem) | Custom token |
| `@apply p-xl` | `padding: var(--lufa-token-spacing-xl);` | `spacing.xl` (2rem) | Custom token |
| `@apply p-2xl` | `padding: var(--lufa-token-spacing-2xl);` | `spacing.2xl` (2.5rem) | Custom token |
| `@apply p-3xl` | `padding: var(--lufa-token-spacing-3xl);` | `spacing.3xl` (3rem) | Custom token |
| `@apply px-sm` | `padding-inline: var(--lufa-token-spacing-sm);` | `spacing.sm` | Horizontal padding |
| `@apply py-xs` | `padding-block: var(--lufa-token-spacing-xs);` | `spacing.xs` | Vertical padding |
| `@apply px-md py-sm` | `padding-inline: var(--lufa-token-spacing-md);`<br>`padding-block: var(--lufa-token-spacing-sm);` | `spacing.md`, `spacing.sm` | Combined |
| `@apply px-6` | `padding-inline: 1.5rem;` | - | Hardcoded (consider token) |
| `@apply py-24` | `padding-block: 6rem;` | - | Hardcoded (consider token) |
| `@apply pl-10` | `padding-left: 2.5rem;` | - | Hardcoded |
| `@apply pr-10` | `padding-right: 2.5rem;` | - | Hardcoded |
| `@apply pt-6` | `padding-top: 1.5rem;` | - | Hardcoded |
| `@apply pb-16` | `padding-bottom: 4rem;` | - | Hardcoded |
| `@apply p-1` | `padding: 0.25rem;` | - | Hardcoded |
| `@apply p-2` | `padding: 0.5rem;` | - | Hardcoded |

### 3.2 Margin

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply m-0` | `margin: 0;` | - | No margin |
| `@apply mb-1` | `margin-bottom: 0.25rem;` | - | Hardcoded |
| `@apply mb-base` | `margin-bottom: var(--lufa-token-spacing-base);` | `spacing.base` | Use token |
| `@apply mb-xxs` | `margin-bottom: var(--lufa-token-spacing-xxs);` | `spacing.xxs` | Use token |
| `@apply mt-1` | `margin-top: 0.25rem;` | - | Hardcoded |
| `@apply mt-8` | `margin-top: 2rem;` | - | Hardcoded |
| `@apply mt-base` | `margin-top: var(--lufa-token-spacing-base);` | `spacing.base` | Use token |
| `@apply ml-1` | `margin-left: 0.25rem;` | - | Hardcoded |
| `@apply ml-auto` | `margin-left: auto;` | - | Auto margin |
| `@apply mx-auto` | `margin-inline: auto;` | - | Horizontal centering |
| `@apply -mt-8` | `margin-top: -2rem;` | - | Negative margin |
| `@apply -mb-8` | `margin-bottom: -2rem;` | - | Negative margin |

---

## 4. Sizing (Width & Height)

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply w-full` | `width: 100%;` | - | Full width |
| `@apply h-full` | `height: 100%;` | - | Full height |
| `@apply w-5` | `width: 1.25rem;` | - | Hardcoded |
| `@apply h-5` | `height: 1.25rem;` | - | Hardcoded |
| `@apply w-16` | `width: 4rem;` | - | Hardcoded |
| `@apply h-32` | `height: 8rem;` | - | Hardcoded |
| `@apply min-w-8` | `min-width: 2rem;` | - | Hardcoded |
| `@apply max-w-2xl` | `max-width: var(--lufa-primitive-max-width-672);` | `max-width.2xl` | Use primitive |
| `@apply max-w-7xl` | `max-width: var(--lufa-primitive-max-width-1280);` | `max-width.7xl` | Use primitive |
| `@apply h-auto` | `height: auto;` | - | Auto height |
| `width: fit-content` | `width: fit-content;` | - | Fit to content |
| `height: var(--lufa-token-height-button)` | `height: var(--lufa-token-dimensions-button-height-default);` | `dimensions.button.height.default` | Use token |
| `height: var(--lufa-token-height-button-sm)` | `height: var(--lufa-token-dimensions-button-height-small);` | `dimensions.button.height.small` | Use token |
| `height: var(--lufa-token-height-input)` | `height: var(--lufa-token-dimensions-input-height-default);` | `dimensions.input.height.default` | Use token |
| `@apply aspect-[2/1]` | `aspect-ratio: 2 / 1;` | - | Custom aspect ratio |
| `@apply aspect-auto` | `aspect-ratio: auto;` | - | Natural aspect ratio |

---

## 5. Typography

### 5.1 Font Sizes

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply text-xs` | `font-size: var(--lufa-primitive-font-size-12);` | `font-size.xs` (0.75rem) | Use primitive |
| `@apply text-sm` | `font-size: var(--lufa-primitive-font-size-14);` | `font-size.sm` (0.875rem) | Use primitive |
| `@apply text-base` | `font-size: var(--lufa-primitive-font-size-16);` | `font-size.base` (1rem) | Use primitive |
| `@apply text-lg` | `font-size: var(--lufa-primitive-font-size-18);` | `font-size.lg` (1.125rem) | Use primitive |
| `@apply text-xl` | `font-size: var(--lufa-primitive-font-size-20);` | `font-size.xl` (1.25rem) | Use primitive |
| `@apply text-2xl` | `font-size: var(--lufa-primitive-font-size-24);` | `font-size.2xl` (1.5rem) | Use primitive |

### 5.2 Font Weights

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply font-normal` | `font-weight: var(--lufa-primitive-font-weight-400);` | `font-weight.normal` | Use primitive |
| `@apply font-medium` | `font-weight: var(--lufa-primitive-font-weight-500);` | `font-weight.medium` | Use primitive |
| `@apply font-semibold` | `font-weight: var(--lufa-primitive-font-weight-600);` | `font-weight.semibold` | Use primitive |
| `@apply font-bold` | `font-weight: var(--lufa-primitive-font-weight-700);` | `font-weight.bold` | Use primitive |

### 5.3 Line Height

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply leading-8` | `line-height: 2rem;` | - | Hardcoded |
| `@apply leading-9` | `line-height: 2.25rem;` | - | Hardcoded |
| `@apply leading-relaxed` | `line-height: var(--lufa-primitive-line-height-reading);` | `line-height.relaxed` | Use primitive |

### 5.4 Text Decoration

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply no-underline` | `text-decoration: none;` | - | Standard CSS |
| `@apply underline` | `text-decoration: underline;` | - | Standard CSS |
| `@apply underline-offset-4` | `text-underline-offset: 0.25rem;` | - | Hardcoded |
| `@apply decoration-border-default` | `text-decoration-color: var(--lufa-token-color-border-default);` | `color.border.default` | Use token |

### 5.5 Text Alignment

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply text-center` | `text-align: center;` | - | Standard CSS |
| `@apply text-left` | `text-align: left;` | - | Standard CSS |
| `@apply text-right` | `text-align: right;` | - | Standard CSS |

---

## 6. Colors

### 6.1 Text Colors

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply text-text-primary` | `color: var(--lufa-token-color-text-primary);` | `color.text.primary` | Use token |
| `@apply text-text-secondary` | `color: var(--lufa-token-color-text-secondary);` | `color.text.secondary` | Use token |
| `@apply text-text-tertiary` | `color: var(--lufa-token-color-text-tertiary);` | `color.text.tertiary` | Use token |
| `@apply text-text-disabled` | `color: var(--lufa-token-color-text-disabled);` | `color.text.disabled` | Use token |
| `@apply text-text-inverse` | `color: var(--lufa-token-color-text-inverse);` | `color.text.inverse` | Use token |
| `@apply text-text-link` | `color: var(--lufa-token-color-text-link);` | `color.text.link` | Use token |
| `@apply text-text-link-hover` | `color: var(--lufa-token-color-text-link-hover);` | `color.text.link-hover` | Use token |
| `@apply text-interactive-default` | `color: var(--lufa-token-color-interactive-default);` | `color.interactive.default` | Use token |
| `@apply text-interactive-hover` | `color: var(--lufa-token-color-interactive-hover);` | `color.interactive.hover` | Use token |
| `@apply text-error-default` | `color: var(--lufa-token-color-error-default);` | `color.error.default` | Use token |
| `@apply text-error-text` | `color: var(--lufa-token-color-error-text);` | `color.error.text` | Use token |
| `@apply text-success-default` | `color: var(--lufa-token-color-success-default);` | `color.success.default` | Use token |
| `@apply text-success-text` | `color: var(--lufa-token-color-success-text);` | `color.success.text` | Use token |
| `@apply text-success-hover` | `color: var(--lufa-token-color-success-hover);` | `color.success.hover` | Use token |
| `@apply text-warning-default` | `color: var(--lufa-token-color-warning-default);` | `color.warning.default` | Use token |
| `@apply text-warning-text` | `color: var(--lufa-token-color-warning-text);` | `color.warning.text` | Use token |
| `@apply text-warning-hover` | `color: var(--lufa-token-color-warning-hover);` | `color.warning.hover` | Use token |
| `@apply text-info-default` | `color: var(--lufa-token-color-info-default);` | `color.info.default` | Use token |
| `@apply text-info-text` | `color: var(--lufa-token-color-info-text);` | `color.info.text` | Use token |
| `@apply text-gray-900` | `color: var(--lufa-primitive-color-neutral-gray-900);` | `neutral.gray.900` | ⚠️ Use primitive (non-token) |
| `@apply text-gray-600` | `color: var(--lufa-primitive-color-neutral-gray-600);` | `neutral.gray.600` | ⚠️ Use primitive (non-token) |

### 6.2 Background Colors

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply bg-background-primary` | `background-color: var(--lufa-token-color-background-primary);` | `color.background.primary` | Use token |
| `@apply bg-background-secondary` | `background-color: var(--lufa-token-color-background-secondary);` | `color.background.secondary` | Use token |
| `@apply bg-background-tertiary` | `background-color: var(--lufa-token-color-background-tertiary);` | `color.background.tertiary` | Use token |
| `@apply bg-background-inverse` | `background-color: var(--lufa-token-color-background-inverse);` | `color.background.inverse` | Use token |
| `@apply bg-interactive-default` | `background-color: var(--lufa-token-color-interactive-default);` | `color.interactive.default` | Use token |
| `@apply bg-interactive-hover` | `background-color: var(--lufa-token-color-interactive-hover);` | `color.interactive.hover` | Use token |
| `@apply bg-error-lighter` | `background-color: var(--lufa-token-color-error-lighter);` | `color.error.lighter` | Use token |
| `@apply bg-success-lighter` | `background-color: var(--lufa-token-color-success-lighter);` | `color.success.lighter` | Use token |
| `@apply bg-warning-lighter` | `background-color: var(--lufa-token-color-warning-lighter);` | `color.warning.lighter` | Use token |
| `@apply bg-info-lighter` | `background-color: var(--lufa-token-color-info-lighter);` | `color.info.lighter` | Use token |
| `@apply bg-current` | `background-color: currentColor;` | - | Special value |
| `@apply bg-white` | `background-color: #fff;` | - | ⚠️ Consider using token |
| `@apply bg-background-primary/80` | `background-color: color-mix(in srgb, var(--lufa-token-color-background-primary) 80%, transparent);` | `color.background.primary` | Use color-mix for opacity |

### 6.3 Border Colors

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply border-border-default` | `border-color: var(--lufa-token-color-border-default);` | `color.border.default` | Use token |
| `@apply border-border-light` | `border-color: var(--lufa-token-color-border-light);` | `color.border.light` | Use token |
| `@apply border-border-medium` | `border-color: var(--lufa-token-color-border-medium);` | `color.border.medium` | Use token |
| `@apply border-interactive-default` | `border-color: var(--lufa-token-color-interactive-default);` | `color.interactive.default` | Use token |
| `@apply border-interactive-hover` | `border-color: var(--lufa-token-color-interactive-hover);` | `color.interactive.hover` | Use token |
| `@apply border-error-border` | `border-color: var(--lufa-token-color-error-border);` | `color.error.border` | Use token |
| `@apply border-success-border` | `border-color: var(--lufa-token-color-success-border);` | `color.success.border` | Use token |
| `@apply border-warning-border` | `border-color: var(--lufa-token-color-warning-border);` | `color.warning.border` | Use token |
| `@apply border-info-border` | `border-color: var(--lufa-token-color-info-border);` | `color.info.border` | Use token |
| `@apply border-transparent` | `border-color: transparent;` | - | Special value |

### 6.4 Placeholder Colors

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply placeholder:text-text-tertiary` | `::placeholder { color: var(--lufa-token-color-text-tertiary); }` | `color.text.tertiary` | Use token |

### 6.5 Stroke Colors (SVG)

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply stroke-text-inverse` | `stroke: var(--lufa-token-color-text-inverse);` | `color.text.inverse` | Use token |
| `@apply fill-gray-900` | `fill: var(--lufa-primitive-color-neutral-gray-900);` | `neutral.gray.900` | Use primitive |

---

## 7. Borders

### 7.1 Border Width

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply border` | `border-width: 1px;` | - | Default border |
| `@apply border-0` | `border-width: 0;` | - | No border |
| `@apply border-2` | `border-width: 2px;` | - | Hardcoded |
| `@apply border-t` | `border-top-width: 1px;` | - | Top border only |
| `border-width: theme(borderWidth.thin)` | `border-width: var(--lufa-token-border-width-thin);` | `border-width.thin` | Use token |

### 7.2 Border Radius

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply rounded-sm` | `border-radius: var(--lufa-primitive-radius-4);` | `radius.sm` (0.25rem) | Use primitive |
| `@apply rounded-md` | `border-radius: var(--lufa-primitive-radius-6);` | `radius.md` (0.375rem) | Use primitive |
| `@apply rounded-lg` | `border-radius: var(--lufa-primitive-radius-8);` | `radius.lg` (0.5rem) | Use primitive |
| `@apply rounded-xl` | `border-radius: var(--lufa-primitive-radius-12);` | `radius.xl` (0.75rem) | Use primitive |
| `@apply rounded-2xl` | `border-radius: var(--lufa-primitive-radius-16);` | `radius.2xl` (1rem) | Use primitive |
| `@apply rounded-full` | `border-radius: var(--lufa-primitive-radius-full);` | `radius.full` (9999px) | Use primitive |
| `@apply rounded-none` | `border-radius: 0;` | - | No radius |

---

## 8. Effects (Shadows, Opacity, Blur)

### 8.1 Box Shadows

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply shadow-xs` | `box-shadow: var(--lufa-primitive-shadow-xs);` | `shadow.xs` | Use primitive |
| `@apply shadow-sm` | `box-shadow: var(--lufa-primitive-shadow-sm);` | `shadow.sm` | Use primitive |
| `@apply shadow-md` | `box-shadow: var(--lufa-primitive-shadow-md);` | `shadow.md` | Use primitive |
| `@apply shadow-lg` | `box-shadow: var(--lufa-primitive-shadow-lg);` | `shadow.lg` | Use primitive |
| `@apply shadow-xl` | `box-shadow: var(--lufa-primitive-shadow-xl);` | `shadow.xl` | Use primitive |
| `@apply shadow-2xl` | `box-shadow: var(--lufa-primitive-shadow-2xl);` | `shadow.2xl` | Use primitive |
| `@apply shadow-none` | `box-shadow: none;` | - | No shadow |
| `box-shadow: theme(boxShadow.md)` | `box-shadow: var(--lufa-primitive-shadow-md);` | `shadow.md` | Replace theme() |
| `box-shadow: theme(boxShadow.lg)` | `box-shadow: var(--lufa-primitive-shadow-lg);` | `shadow.lg` | Replace theme() |

### 8.2 Opacity

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply opacity-0` | `opacity: 0;` | - | Invisible |
| `@apply opacity-25` | `opacity: 0.25;` | - | Hardcoded |
| `@apply opacity-50` | `opacity: 0.5;` | - | Hardcoded |
| `@apply opacity-70` | `opacity: 0.7;` | - | Hardcoded |
| `@apply opacity-75` | `opacity: 0.75;` | - | Hardcoded |
| `@apply opacity-20` | `opacity: 0.2;` | - | Hardcoded |
| `opacity: theme(opacity.disabled)` | `opacity: var(--lufa-token-opacity-disabled);` | `opacity.disabled` | Use token |

### 8.3 Backdrop Blur

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply backdrop-blur-sm` | `backdrop-filter: blur(var(--lufa-primitive-blur-8));` | `blur.sm` | Use primitive |

---

## 9. Transitions & Animations

### 9.1 Transitions

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply transition-all` | `transition-property: all;` | - | Standard CSS |
| `@apply transition-colors` | `transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;` | - | Standard CSS |
| `@apply duration-200` | `transition-duration: 200ms;` | - | Hardcoded |
| `@apply duration-300` | `transition-duration: 300ms;` | - | Hardcoded |
| `@apply duration-fast` | `transition-duration: var(--lufa-token-timing-fast);` | `timing.fast` (150ms) | Use token |
| `@apply duration-base` | `transition-duration: var(--lufa-token-timing-base);` | `timing.base` (250ms) | Use token |
| `@apply ease-out` | `transition-timing-function: cubic-bezier(0, 0, 0.2, 1);` | - | Standard CSS |

### 9.2 Animations

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `animation: var(--animate-spin)` | `animation: spin 1s linear infinite;` | `animate.spin` | Use token |

---

## 10. Transforms

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `transform: translateY(0)` | `transform: translateY(0);` | - | Standard CSS |
| `transform: translateY(-2px)` | `transform: translateY(-2px);` | - | Hardcoded |
| `transform: translateY(-1px)` | `transform: translateY(-1px);` | - | Hardcoded |
| `transform: scale(1.02)` | `transform: scale(1.02);` | - | Hardcoded |
| `transform: var(--transform-pressed)` | `transform: var(--lufa-token-transform-pressed-down);` | `transform.pressed-down` | Use token |
| `transform: var(--lufa-token-transform-hover-lift)` | `transform: var(--lufa-token-transform-hover-lift);` | `transform.hover-lift` | Use token |
| `@apply scale-110` | `transform: scale(1.1);` | - | Hardcoded |
| `@apply -translate-x-2/4` | `transform: translateX(-50%);` | - | Centering trick |
| `@apply origin-bottom-left` | `transform-origin: bottom left;` | - | Standard CSS |
| `@apply skew-x-[-30deg]` | `transform: skewX(-30deg);` | - | Hardcoded |

---

## 11. Positioning

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply inset-0` | `inset: 0;` | - | All sides 0 |
| `@apply inset-y-0` | `top: 0; bottom: 0;` | - | Vertical 0 |
| `@apply top-0` | `top: 0;` | - | Standard CSS |
| `@apply bottom-0` | `bottom: 0;` | - | Standard CSS |
| `@apply left-0` | `left: 0;` | - | Standard CSS |
| `@apply left-3` | `left: 0.75rem;` | - | Hardcoded |
| `@apply right-3` | `right: 0.75rem;` | - | Hardcoded |
| `@apply right-1/2` | `right: 50%;` | - | Standard CSS |
| `@apply left-1/2` | `left: 50%;` | - | Standard CSS |
| `@apply -z-10` | `z-index: -10;` | - | Behind |

---

## 12. Interactivity (Cursor, Pointer Events)

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `cursor: var(--lufa-token-cursor-pointer)` | `cursor: pointer;` | `cursor.pointer` | Use token |
| `cursor: var(--lufa-token-cursor-not-allowed)` | `cursor: not-allowed;` | `cursor.not-allowed` | Use token |
| `@apply cursor-wait` | `cursor: wait;` | - | Or use token |
| `@apply cursor-pointer` | `cursor: pointer;` | - | Or use token |

---

## 13. Pseudo-classes & States

### 13.1 Hover

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply hover:bg-background-tertiary` | `:hover { background-color: var(--lufa-token-color-background-tertiary); }` | `color.background.tertiary` | Use token |
| `@apply hover:border-border-medium` | `:hover { border-color: var(--lufa-token-color-border-medium); }` | `color.border.medium` | Use token |
| `@apply hover:text-text-primary` | `:hover { color: var(--lufa-token-color-text-primary); }` | `color.text.primary` | Use token |

### 13.2 Focus

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply focus:ring-interactive-focus` | `:focus { --tw-ring-color: var(--lufa-token-color-interactive-focus); }` | `color.interactive.focus` | Replace with box-shadow |
| `@apply focus:ring-2` | `:focus { --tw-ring-offset-width: 2px; }` | - | Replace with box-shadow |
| `@apply focus:ring-offset-0` | `:focus { --tw-ring-offset-width: 0; }` | - | Not needed in vanilla |
| `@apply focus:outline-none` | `:focus { outline: none; }` | - | ⚠️ Ensure visible focus state |
| `@apply focus-visible:outline-2` | `:focus-visible { outline-width: 2px; }` | - | Better for a11y |
| `@apply outline-border-focus` | `outline-color: var(--lufa-token-color-border-focus);` | `color.border.focus` | Use token |
| `outline-width: var(--border-width-focus)` | `outline-width: var(--lufa-token-border-width-focus);` | `border-width.focus` | Use token |
| `outline-offset: var(--spacing-xxs)` | `outline-offset: var(--lufa-token-spacing-xxs);` | `spacing.xxs` | Use token |

### 13.3 Active

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply active:bg-border-light` | `:active { background-color: var(--lufa-token-color-border-light); }` | `color.border.light` | Use token |

### 13.4 Disabled

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `:disabled` selector | `:disabled { ... }` | - | Standard CSS |
| `.disabled` class | `.disabled { ... }` | - | Class-based alternative |

---

## 14. Responsive Breakpoints

### 14.1 Tailwind Breakpoints

| Tailwind Prefix | Media Query Equivalent | Token Used | Notes |
|-----------------|------------------------|------------|-------|
| `sm:` | `@media (min-width: 768px)` | `breakpoint.sm` | Use media query |
| `md:` | `@media (min-width: 1024px)` | `breakpoint.md` | Use media query |
| `lg:` | `@media (min-width: 1280px)` | `breakpoint.lg` | Use media query |
| `xl:` | `@media (min-width: 1440px)` | `breakpoint.xl` | Use media query |
| `2xl:` | `@media (min-width: 1920px)` | `breakpoint.2xl` | Use media query |

### 14.2 Container Queries (Recommended)

| Tailwind Pattern | Container Query Equivalent | Token Used | Notes |
|------------------|----------------------------|------------|-------|
| `sm:pt-32` | `@container (min-width: 768px) { padding-top: 8rem; }` | `breakpoint.sm` | Modern approach |
| `lg:px-8` | `@container (min-width: 1280px) { padding-inline: 2rem; }` | `breakpoint.lg` | Modern approach |
| `xl:flex-row` | `@container (min-width: 1440px) { flex-direction: row; }` | `breakpoint.xl` | Modern approach |

**Example full migration**:
```tsx
// Before (Tailwind inline)
<section className="pt-24 sm:pt-32 xl:pb-32">

// After (CSS Module)
.section {
  padding-top: 6rem; /* 24 × 0.25rem */
}

@container (min-width: 768px) {
  .section {
    padding-top: 8rem; /* 32 × 0.25rem */
  }
}

@container (min-width: 1440px) {
  .section {
    padding-bottom: 8rem;
  }
}
```

---

## 15. Special Patterns

### 15.1 Reset Utilities (Custom)

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply reset-button` | See `.reset-button` in component-resets.css | - | Custom utility |
| `@apply reset-input` | See `.reset-input` in component-resets.css | - | Custom utility |
| `@apply reset-heading` | See `.reset-heading` in component-resets.css | - | Custom utility |

**Note**: These are custom Lufa utilities defined in `component-resets.css`. Replace with equivalent vanilla CSS.

### 15.2 Ring Utilities (Focus Rings)

| Tailwind Pattern | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply focus:ring-interactive-focus focus:ring-2` | `:focus { box-shadow: 0 0 0 2px var(--lufa-token-color-interactive-focus); }` | `color.interactive.focus` | Replace ring with box-shadow |
| `@apply focus:ring-error-default` | `:focus { box-shadow: 0 0 0 2px var(--lufa-token-color-error-default); }` | `color.error.default` | Replace ring with box-shadow |

### 15.3 Space Utilities

| Tailwind Utility | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply space-x-3` | `> * + * { margin-left: 0.75rem; }` | - | Use gap instead |

### 15.4 Color with Opacity (rgb(from theme()))

| Tailwind Pattern | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `rgb(from theme(colors.interactive.focus) r g b / 0.2)` | `color-mix(in srgb, var(--lufa-token-color-interactive-focus) 20%, transparent)` | `color.interactive.focus` | Use color-mix |
| `rgb(from theme(colors.success.default) r g b / 0.2)` | `color-mix(in srgb, var(--lufa-token-color-success-default) 20%, transparent)` | `color.success.default` | Use color-mix |
| `rgb(from theme(colors.error.default) r g b / 0.2)` | `color-mix(in srgb, var(--lufa-token-color-error-default) 20%, transparent)` | `color.error.default` | Use color-mix |

**Alternative**: Create dedicated tokens for opacity variants
```css
/* Add to design-system-tokens */
--lufa-token-color-interactive-focus-subtle: rgba(..., 0.2);
```

### 15.5 Arbitrary Values

| Tailwind Pattern | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `@apply aspect-[2/1]` | `aspect-ratio: 2 / 1;` | - | Use standard CSS |
| `@apply w-[200%]` | `width: 200%;` | - | Use standard CSS |
| `className="bg-[radial-gradient(...)]"` | Move to CSS module | - | Extract to CSS class |

### 15.6 Gradient Backgrounds

| Tailwind Pattern | Vanilla CSS Equivalent | Token Used | Notes |
|------------------|------------------------|------------|-------|
| `bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]` | `background: radial-gradient(45rem 50rem at top, var(--lufa-primitive-color-chromatic-indigo-100), white);` | `chromatic.indigo.100` | Use primitive |

---

## Migration Recipe Examples

### Example 1: Button Base Styles

**Before (Tailwind @apply)**:
```css
.button {
  @apply reset-button;
  @apply inline-flex items-center justify-center gap-2;
  @apply relative overflow-hidden;
  @apply font-semibold;
  @apply rounded-xl;
  @apply border-transparent;
  @apply shadow-sm;
  @apply transition-all duration-200 ease-out;
}
```

**After (Vanilla CSS)**:
```css
.button {
  /* Reset */
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--lufa-token-spacing-xs); /* 0.5rem / gap-2 */
  position: relative;
  overflow: hidden;
  
  /* Typography */
  font-weight: var(--lufa-primitive-font-weight-600);
  
  /* Visual */
  border-radius: var(--lufa-primitive-radius-12); /* rounded-xl */
  border-color: transparent;
  box-shadow: var(--lufa-primitive-shadow-sm);
  
  /* Animation */
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}
```

### Example 2: Input with States

**Before (Tailwind @apply)**:
```css
.input {
  @apply reset-input;
  @apply w-full;
  @apply duration-base transition-all;
  @apply rounded-md;
  @apply text-text-primary placeholder:text-text-tertiary;
  @apply focus:ring-interactive-focus focus:ring-2 focus:outline-none;
}
```

**After (Vanilla CSS)**:
```css
.input {
  /* Reset */
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  
  /* Layout */
  width: 100%;
  
  /* Visual */
  border-radius: var(--lufa-primitive-radius-6); /* rounded-md */
  color: var(--lufa-token-color-text-primary);
  
  /* Animation */
  transition: all var(--lufa-token-timing-base);
}

.input::placeholder {
  color: var(--lufa-token-color-text-tertiary);
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--lufa-token-color-interactive-focus);
}
```

### Example 3: Responsive Testimonial

**Before (Tailwind inline)**:
```tsx
<section className="bg-background-primary pt-24 pb-16 sm:pt-32 sm:pb-24 xl:pb-32">
  <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8 xl:flex-row">
    {/* ... */}
  </div>
</section>
```

**After (CSS Module + vanilla CSS)**:
```tsx
<section className={styles.testimonialSection}>
  <div className={styles.container}>
    {/* ... */}
  </div>
</section>
```

```css
/* TestimonialOne.module.css */
.testimonialSection {
  background-color: var(--lufa-token-color-background-primary);
  padding-top: 6rem; /* 24 × 0.25rem */
  padding-bottom: 4rem; /* 16 × 0.25rem */
}

@container (min-width: 768px) {
  .testimonialSection {
    padding-top: 8rem; /* 32 × 0.25rem */
    padding-bottom: 6rem; /* 24 × 0.25rem */
  }
}

@container (min-width: 1440px) {
  .testimonialSection {
    padding-bottom: 8rem; /* 32 × 0.25rem */
  }
}

.container {
  margin-inline: auto;
  display: flex;
  max-width: var(--lufa-primitive-max-width-1280); /* max-w-7xl */
  flex-direction: column;
  align-items: center;
  padding-inline: 1.5rem; /* 6 × 0.25rem */
}

@container (min-width: 1280px) {
  .container {
    padding-inline: 2rem; /* 8 × 0.25rem */
  }
}

@container (min-width: 1440px) {
  .container {
    flex-direction: row;
  }
}
```

---

## Quick Reference Cheat Sheet

### Most Common Conversions

```css
/* Flexbox */
@apply flex items-center justify-center gap-2
→ display: flex; align-items: center; justify-content: center; gap: var(--lufa-token-spacing-xs);

/* Typography */
@apply text-base font-semibold text-text-primary
→ font-size: var(--lufa-primitive-font-size-16); font-weight: var(--lufa-primitive-font-weight-600); color: var(--lufa-token-color-text-primary);

/* Spacing */
@apply p-base px-xl
→ padding: var(--lufa-token-spacing-base); padding-inline: var(--lufa-token-spacing-xl);

/* Borders */
@apply rounded-lg border border-border-default
→ border-radius: var(--lufa-primitive-radius-8); border-width: 1px; border-color: var(--lufa-token-color-border-default);

/* Shadows */
@apply shadow-md
→ box-shadow: var(--lufa-primitive-shadow-md);

/* Transitions */
@apply transition-all duration-base
→ transition: all var(--lufa-token-timing-base);

/* Hover */
@apply hover:bg-background-tertiary
→ :hover { background-color: var(--lufa-token-color-background-tertiary); }

/* Focus */
@apply focus:ring-interactive-focus focus:ring-2
→ :focus { box-shadow: 0 0 0 2px var(--lufa-token-color-interactive-focus); }
```

---

## Token Priority Hierarchy

When multiple options exist, follow this priority:

1. **Semantic tokens** (e.g., `var(--lufa-token-color-text-primary)`) ✅ Best
2. **Primitive tokens** (e.g., `var(--lufa-primitive-font-size-16)`) 🟡 Good
3. **Hardcoded values** (e.g., `16px`, `#FF0000`) ❌ Avoid

**Exception**: Standard CSS values that don't need tokens:
- `display: flex`, `position: relative`, etc.
- `width: 100%`, `height: auto`, etc.
- `border-color: transparent`, etc.

---

## Browser Compatibility Notes

### Modern CSS Features

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Custom Properties | ✅ All modern browsers | Safe to use |
| `color-mix()` | ⚠️ Safari 16.2+, Chrome 111+ | Fallback needed for older browsers |
| Container Queries | ⚠️ Safari 16+, Chrome 105+ | Use media queries as fallback |
| `aspect-ratio` | ✅ Safari 15+, Chrome 88+ | Safe to use |

### Fallback Strategy

```css
/* Provide fallback for color-mix */
--btn-ring: 0 0 0 4px rgba(59, 130, 246, 0.2); /* Fallback */
--btn-ring: 0 0 0 4px color-mix(in srgb, var(--lufa-token-color-interactive-focus) 20%, transparent); /* Modern */
```

---

**Document Status**: ✅ Complete - Ready for Migration Implementation

**Next Steps**:
1. Use this table during component migration
2. Update mappings if new patterns are discovered
3. Add new tokens to design-system-tokens as needed

