# Design System Selection Framework

This framework guides UX facilitators through choosing the appropriate design system approach based on project requirements, constraints, and strategic goals. It provides education on design system types and decision-making frameworks.

---

## Design System Metaphor

**Think of design systems like LEGO blocks for UI:**

- They provide proven components and patterns
- Ensure consistency across the product
- Speed up development with reusable pieces
- Enable designers and developers to work from the same foundation

---

## Three Design System Approaches

### 1. Custom Design System

**Best for:** Established brands with unique needs, high differentiation requirements

**Characteristics:**

- Complete visual uniqueness
- Full control over every component
- Higher initial investment (time and cost)
- Requires dedicated design and development resources
- Perfect for brands with strong visual identity

**When to Choose:**

- Brand differentiation is critical
- Long-term product with dedicated team
- Existing brand guidelines require unique implementation
- Budget and timeline support custom development
- Need full control over every interaction

### 2. Established System (Material Design, Ant Design, etc.)

**Best for:** Startups, internal tools, MVPs, rapid prototyping

**Characteristics:**

- Fast development with proven patterns
- Great defaults and accessibility built-in
- Less visual differentiation ("looks like Google" or "looks like Ant")
- Extensive documentation and community support
- Ideal for speed-to-market priorities

**Popular Options:**

- **Material Design**: Google's comprehensive system
- **Ant Design**: Enterprise-focused, rich component library
- **Bootstrap**: Web's classic, widely supported
- **Foundation**: Flexible, responsive framework

**When to Choose:**

- Speed is more important than uniqueness
- Internal tools or B2B products
- Limited design resources
- Need proven accessibility patterns
- MVP or proof-of-concept phase

### 3. Themeable System (MUI, Chakra UI, Tailwind UI)

**Best for:** Balanced needs - speed with customization capability

**Characteristics:**

- Customizable with strong foundation
- Brand flexibility with proven components
- Moderate learning curve
- Good balance of speed and uniqueness
- Can evolve from themed to custom over time

**Popular Options:**

- **MUI (Material-UI)**: Material Design with theming
- **Chakra UI**: Accessible, composable components
- **Tailwind UI**: Utility-first with pre-built components
- **Radix UI**: Unstyled primitives for full control
- **Mantine**: Feature-rich with excellent defaults

**When to Choose:**

- Need both speed and brand identity
- Want to start fast but customize later
- Team has moderate design/dev expertise
- Budget supports theme customization
- Long-term product with evolving needs

---

## Decision Framework

### Decision Factors to Consider

#### 1. Speed vs. Uniqueness

**Questions:**

- What's most important: Speed, uniqueness, or balance?
- How quickly do we need to launch?
- How important is visual differentiation?

**Scoring:**

- **Speed Priority**: Established System
- **Uniqueness Priority**: Custom System
- **Balanced**: Themeable System

#### 2. Team Expertise

**Questions:**

- How much design expertise does your team have?
- Do you have dedicated design resources?
- What's the team's technical capability for customization?

**Guidance:**

- **Limited Design Resources**: Established System (great defaults)
- **Strong Design Team**: Custom or Themeable System
- **Mixed Team**: Themeable System (best of both worlds)

#### 3. Brand Requirements

**Questions:**

- Are there existing brand guidelines to follow?
- How important is brand consistency?
- Does the brand require unique visual language?

**Guidance:**

- **Strong Brand Identity**: Custom or Themeable
- **No Brand Guidelines**: Established System (provides defaults)
- **Evolving Brand**: Themeable (can grow with brand)

#### 4. Timeline and Budget

**Questions:**

- What's your timeline and budget?
- Is this a MVP or long-term product?
- Can you invest in custom components upfront?

**Guidance:**

- **Tight Timeline/Budget**: Established System
- **Moderate Timeline/Budget**: Themeable System
- **Flexible Timeline/Budget**: Custom System

#### 5. Maintenance Considerations

**Questions:**

- Long-term maintenance needs?
- Will you have ongoing design/dev resources?
- How often will the design system need updates?

**Guidance:**

- **Limited Maintenance Resources**: Established (community maintains)
- **Dedicated Team**: Custom (full control)
- **Mixed Resources**: Themeable (community + custom)

---

## Platform-Specific Recommendations

### Web Applications

**Top Choices:**

1. **MUI (Material-UI)**: React, excellent theming, mature ecosystem
2. **Chakra UI**: React, accessibility-first, great DX
3. **Tailwind UI**: Any framework, utility-first approach
4. **Ant Design**: React, enterprise-grade components
5. **Radix UI**: React, unstyled primitives for full control

### Mobile Applications (React Native)

**Top Choices:**

1. **React Native Paper**: Material Design for React Native
2. **NativeBase**: Themeable, cross-platform components
3. **React Native Elements**: Flexible, widely used
4. **Tamagui**: Performance-focused, shared code with web

### Cross-Platform

**Top Choices:**

1. **Ionic**: Web components for any framework
2. **Flutter**: Google's UI toolkit (requires Dart)
3. **Tamagui**: React Native + Web shared components

---

## Evaluation Checklist

When evaluating specific design systems, consider:

### Component Library

- ✅ Component library size and quality
- ✅ Coverage of needed components
- ✅ Component composition capabilities
- ✅ Form handling and validation support

### Documentation & Support

- ✅ Documentation quality and completeness
- ✅ Community size and activity
- ✅ GitHub stars and maintenance activity
- ✅ Available tutorials and examples

### Customization

- ✅ Customization capabilities
- ✅ Theming system flexibility
- ✅ CSS-in-JS vs. CSS modules approach
- ✅ Design token support

### Accessibility

- ✅ WCAG compliance level
- ✅ Screen reader support
- ✅ Keyboard navigation
- ✅ ARIA attributes implementation

### Performance

- ✅ Bundle size impact
- ✅ Tree-shaking support
- ✅ Runtime performance
- ✅ Mobile performance

### Developer Experience

- ✅ TypeScript support
- ✅ IDE autocomplete
- ✅ Learning curve for team
- ✅ Integration with build tools

---

## Facilitation Scripts

### Opening Script

"For {{project_name}}, we need to choose a design system foundation. Think of design systems like LEGO blocks for UI - they provide proven components and patterns, ensuring consistency and speeding development.

**Design System Approaches:**

**1. Custom Design System**

- Complete visual uniqueness
- Full control over every component
- Higher initial investment
- Perfect for established brands with unique needs

**2. Established System (Material Design, Ant Design, etc.)**

- Fast development with proven patterns
- Great defaults and accessibility built-in
- Less visual differentiation
- Ideal for startups or internal tools

**3. Themeable System (MUI, Chakra UI, Tailwind UI)**

- Customizable with strong foundation
- Brand flexibility with proven components
- Moderate learning curve
- Good balance of speed and uniqueness

Which direction feels right for your project?"

### Requirements Analysis Script

"**Let's consider your specific needs:**

**Based on our previous conversations:**

- Platform: [platform from step 3]
- Timeline: [inferred from user conversation]
- Team Size: [inferred from user conversation]
- Brand Requirements: [inferred from user conversation]
- Technical Constraints: [inferred from user conversation]

**Decision Factors:**

- Need for speed vs. need for uniqueness
- Brand guidelines or existing visual identity
- Team's design expertise
- Long-term maintenance considerations
- Integration requirements with existing systems"

### Options Exploration Script

"**Recommended Options Based on Your Needs:**

**For [Your Platform Type]:**

- [Option 1] - [Key benefit] - [Best for scenario]
- [Option 2] - [Key benefit] - [Best for scenario]
- [Option 3] - [Key benefit] - [Best for scenario]

**Considerations:**

- Component library size and quality
- Documentation and community support
- Customization capabilities
- Accessibility compliance
- Performance characteristics
- Learning curve for your team"

### Decision Facilitation Script

"**Decision Framework:**

1. What's most important: Speed, uniqueness, or balance?
2. How much design expertise does your team have?
3. Are there existing brand guidelines to follow?
4. What's your timeline and budget?
5. Long-term maintenance needs?

Let's evaluate options based on your answers to these questions."

---

## Document Output Structure

When saving the design system decision to the UX design specification document, use this structure:

```markdown
## Design System Foundation

### 1.1 Design System Choice

[Design system choice based on conversation]

### Rationale for Selection

[Rationale for design system selection based on conversation]

### Implementation Approach

[Implementation approach based on chosen system]

### Customization Strategy

[Customization strategy based on project needs]
```

---

## Usage Notes for Step Files

**This framework should be referenced when:**

- Facilitating the design system selection conversation (Step 6)
- Evaluating design system options against project requirements
- Providing rationale for design system recommendations

**Step files should:**

1. Reference this framework in frontmatter under `data_files`
2. Use abbreviated versions of decision factors in step logic
3. Link to specific sections when detailed evaluation is needed
4. Keep workflow-specific logic in step file, not here

---

## Related Frameworks

- **ux-workflow-menu-handling.md**: For A/P/C menu protocols and success/failure patterns
- **defining-experience-framework.md**: For defining the core experience after design system is chosen
