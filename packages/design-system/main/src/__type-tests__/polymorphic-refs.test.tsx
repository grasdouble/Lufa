/**
 * Type Tests for Polymorphic Component Refs
 *
 * This file contains type-level tests to ensure proper type inference
 * for refs in polymorphic components.
 *
 * These tests are checked at compile-time by TypeScript.
 */

import { useRef } from 'react';

import { Box } from '../primitives/Box/Box';
import { Button } from '../components/Button/Button';
import { Divider } from '../primitives/Divider/Divider';
import { Icon } from '../primitives/Icon/Icon';
import { Stack } from '../primitives/Stack/Stack';
import { Text } from '../primitives/Text/Text';

/**
 * Test: Box component with different `as` props
 */
export function BoxRefTests() {
  // ✅ Default element (div)
  const divRef = useRef<HTMLDivElement>(null);
  <Box ref={divRef} padding="default" />;

  // ✅ As section
  const sectionRef = useRef<HTMLElement>(null);
  <Box as="section" ref={sectionRef} padding="default" />;

  // ✅ As article
  const articleRef = useRef<HTMLElement>(null);
  <Box as="article" ref={articleRef} padding="default" />;

  // ✅ Ref callback function
  <Box
    ref={(node) => {
      if (node) {
        // node should be HTMLDivElement for default 'div'
        const _test: HTMLDivElement = node;
      }
    }}
    padding="default"
  />;
}

/**
 * Test: Button component with different `as` props
 */
export function ButtonRefTests() {
  // ✅ Default element (button)
  const buttonRef = useRef<HTMLButtonElement>(null);
  <Button ref={buttonRef} type="solid" variant="primary">
    Click me
  </Button>;

  // ✅ As anchor link
  const linkRef = useRef<HTMLAnchorElement>(null);
  <Button as="a" href="/home" ref={linkRef} type="ghost">
    Home
  </Button>;

  // ✅ Ref callback for button
  <Button
    ref={(node) => {
      if (node) {
        // node should be HTMLButtonElement for default 'button'
        const _test: HTMLButtonElement = node;
      }
    }}
    type="solid"
  >
    Click
  </Button>;
}

/**
 * Test: Icon component with different `as` props
 */
export function IconRefTests() {
  // ✅ Default element (span)
  const spanRef = useRef<HTMLSpanElement>(null);
  <Icon name="user" ref={spanRef} />;

  // ✅ As div
  const divRef = useRef<HTMLDivElement>(null);
  <Icon name="check" as="div" ref={divRef} />;

  // ✅ Ref callback
  <Icon
    name="heart"
    ref={(node) => {
      if (node) {
        const _test: HTMLSpanElement = node;
      }
    }}
  />;
}

/**
 * Test: Stack component with different `as` props
 */
export function StackRefTests() {
  // ✅ Default element (div)
  const divRef = useRef<HTMLDivElement>(null);
  <Stack ref={divRef} spacing="default" />;

  // ✅ As nav
  const navRef = useRef<HTMLElement>(null);
  <Stack as="nav" ref={navRef} direction="horizontal" />;

  // ✅ As ul
  const ulRef = useRef<HTMLUListElement>(null);
  <Stack as="ul" ref={ulRef} spacing="compact" />;
}

/**
 * Test: Text component with different `as` props
 */
export function TextRefTests() {
  // ✅ Default element (p)
  const pRef = useRef<HTMLParagraphElement>(null);
  <Text ref={pRef} variant="body">
    Hello
  </Text>;

  // ✅ As h1
  const h1Ref = useRef<HTMLHeadingElement>(null);
  <Text as="h1" ref={h1Ref} variant="h1">
    Title
  </Text>;

  // ✅ As span
  const spanRef = useRef<HTMLSpanElement>(null);
  <Text as="span" ref={spanRef} variant="caption">
    Caption
  </Text>;
}

/**
 * Test: Divider component with different `as` props
 */
export function DividerRefTests() {
  // ✅ Default element (hr)
  const hrRef = useRef<HTMLHRElement>(null);
  <Divider ref={hrRef} />;

  // ✅ As div
  const divRef = useRef<HTMLDivElement>(null);
  <Divider as="div" ref={divRef} orientation="vertical" />;
}

/**
 * Type Safety Tests
 *
 * The following would cause TypeScript errors (commented out):
 */

// ❌ Wrong ref type for element
// const buttonRef = useRef<HTMLButtonElement>(null);
// <Box ref={buttonRef} />  // Error: Ref<HTMLButtonElement> not assignable to Ref<HTMLDivElement>

// ❌ Wrong ref type for 'as' prop
// const divRef = useRef<HTMLDivElement>(null);
// <Button as="a" href="/test" ref={divRef} />  // Error: Should be HTMLAnchorElement

// ❌ Missing required props
// <Icon ref={useRef(null)} />  // Error: Property 'name' is missing
