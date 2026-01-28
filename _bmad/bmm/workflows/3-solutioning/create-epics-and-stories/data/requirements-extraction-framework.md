# Requirements Extraction Framework

## Purpose

This document provides a comprehensive framework for extracting requirements from product and technical documents to support epic and story creation. It covers functional requirements (FRs), non-functional requirements (NFRs), and additional requirements from architecture and UX design documents.

---

## Functional Requirements (FRs) Extraction

### What Are Functional Requirements?

Functional requirements describe **what the system must DO** - specific behaviors, actions, and features that provide value to users.

### Extraction Method

**Where to Look:**

- PRD document (Product Requirements Document)
- Requirements sections, feature descriptions
- User stories and scenarios

**How to Identify FRs:**

- Look for numbered items like "FR1:", "Functional Requirement 1:", or similar
- Identify requirement statements describing system behaviors
- Include user actions, system responses, and business rules
- Focus on testable, specific capabilities

**What to Extract:**

- User registration and authentication flows
- Data creation, reading, updating, deletion (CRUD operations)
- Business logic and rules
- Integration with external systems
- Search and filtering capabilities
- Notification and communication features
- Reporting and analytics features

### FR Format Template

```
FR1: [Clear, testable requirement description that describes WHAT the system does]
FR2: [Clear, testable requirement description that describes WHAT the system does]
FR3: [Clear, testable requirement description that describes WHAT the system does]
...
```

### FR Extraction Examples

**Good FR Examples:**

```
FR1: The system shall allow users to register with email and password
FR2: The system shall send a verification email upon successful registration
FR3: The system shall allow users to create blog posts with title, content, and tags
FR4: The system shall allow users to search blog posts by title, content, or tags
FR5: The system shall display search results sorted by relevance or date
FR6: The system shall allow post authors to edit or delete their own posts
FR7: The system shall prevent non-authors from editing or deleting others' posts
```

**Poor FR Examples (Too Vague):**

```
❌ FR1: User management
✅ FR1: The system shall allow users to register with email and password

❌ FR2: Search functionality
✅ FR2: The system shall allow users to search blog posts by title, content, or tags

❌ FR3: Admin features
✅ FR3: The system shall allow administrators to suspend or delete user accounts
```

---

## Non-Functional Requirements (NFRs) Extraction

### What Are Non-Functional Requirements?

Non-functional requirements describe **HOW the system must perform** - quality attributes, constraints, and technical standards.

### Categories of NFRs

1. **Performance** - Speed, throughput, latency
2. **Security** - Authentication, authorization, data protection
3. **Usability** - User experience, accessibility
4. **Reliability** - Uptime, fault tolerance, error handling
5. **Scalability** - Growth capacity, concurrent users
6. **Maintainability** - Code quality, documentation
7. **Compatibility** - Browsers, devices, platforms
8. **Compliance** - Legal, regulatory, standards

### Extraction Method

**Where to Look:**

- PRD "Non-Functional Requirements" or "Quality Attributes" sections
- Technical constraints sections
- Performance benchmarks
- Security requirements
- Compliance requirements

**What to Extract:**

- Performance targets (response times, throughput)
- Security requirements (authentication methods, encryption)
- Usability requirements (accessibility standards, browser support)
- Reliability targets (uptime %, error handling)
- Scalability expectations (concurrent users, data volume)
- Technical standards (coding standards, API versioning)
- Compliance needs (GDPR, HIPAA, etc.)

### NFR Format Template

```
NFR1: [Performance/Security/Usability requirement with measurable target]
NFR2: [Performance/Security/Usability requirement with measurable target]
NFR3: [Performance/Security/Usability requirement with measurable target]
...
```

### NFR Extraction Examples

**Good NFR Examples:**

```
NFR1: The system shall respond to user requests within 200ms for 95% of requests
NFR2: The system shall support 10,000 concurrent users without degradation
NFR3: The system shall hash all passwords using bcrypt with cost factor 12
NFR4: The system shall implement HTTPS/TLS 1.3 for all communications
NFR5: The system shall meet WCAG 2.1 Level AA accessibility standards
NFR6: The system shall support Chrome, Firefox, Safari, Edge (latest 2 versions)
NFR7: The system shall achieve 99.9% uptime (excluding planned maintenance)
NFR8: The system shall log all authentication attempts for security auditing
```

**Poor NFR Examples (Not Measurable):**

```
❌ NFR1: The system should be fast
✅ NFR1: The system shall respond to user requests within 200ms for 95% of requests

❌ NFR2: The system should be secure
✅ NFR2: The system shall hash all passwords using bcrypt with cost factor 12

❌ NFR3: The system should be accessible
✅ NFR3: The system shall meet WCAG 2.1 Level AA accessibility standards
```

---

## Additional Requirements from Architecture

### What to Extract from Architecture Document

Architecture documents often contain technical requirements that impact epic and story creation beyond standard FRs/NFRs.

### Key Areas to Review

#### 1. Starter Template / Greenfield Setup

**CRITICAL:** If Architecture specifies a starter template or greenfield project setup, this impacts **Epic 1, Story 1**.

**What to Look For:**

- Boilerplate or starter template specifications
- Framework choices (Next.js, Vite, Create React App, etc.)
- Project scaffolding requirements

**Example:**

```
Additional Requirement: Architecture specifies Next.js 14 App Router starter template with TypeScript
→ This affects Epic 1 Story 1: "Set up Next.js project with App Router and TypeScript configuration"
```

#### 2. Infrastructure and Deployment Requirements

**What to Extract:**

- Hosting platform (AWS, Vercel, Netlify, etc.)
- Container orchestration (Docker, Kubernetes)
- CI/CD pipeline requirements
- Environment configuration needs

**Example:**

```
- Deploy application to Vercel with preview environments for each PR
- Configure environment variables for API keys and database URLs
- Implement GitHub Actions workflow for automated testing and deployment
```

#### 3. Integration Requirements

**What to Extract:**

- External APIs to integrate (authentication, payment, analytics)
- Third-party services (email, storage, monitoring)
- Webhook implementations
- API versioning strategies

**Example:**

```
- Integrate Stripe API for payment processing
- Implement SendGrid for transactional emails
- Configure Sentry for error tracking and monitoring
- Use Auth0 for authentication and user management
```

#### 4. Data Migration and Setup Requirements

**What to Extract:**

- Database migration strategies
- Seed data requirements
- Data import/export needs

**Example:**

```
- Implement database migrations using Prisma Migrate
- Create seed data for development and testing environments
- Support CSV import for bulk user creation
```

#### 5. Monitoring, Logging, and Observability

**What to Extract:**

- Logging requirements (structured logging, log levels)
- Monitoring and alerting needs
- Analytics and tracking requirements

**Example:**

```
- Implement structured logging with Winston
- Set up application performance monitoring with New Relic
- Track user events with Google Analytics 4
- Configure alerts for error rates > 1%
```

#### 6. Security Implementation Requirements

**What to Extract:**

- Authentication mechanisms (JWT, sessions, OAuth)
- Authorization patterns (RBAC, ABAC)
- Data encryption requirements
- Rate limiting and DDoS protection

**Example:**

```
- Implement JWT-based authentication with 15-minute access tokens
- Use refresh tokens with 7-day expiration
- Apply rate limiting: 100 requests per minute per IP
- Encrypt sensitive data at rest using AES-256
```

#### 7. API Versioning and Compatibility

**What to Extract:**

- API versioning strategy
- Backward compatibility requirements
- Deprecation policies

**Example:**

```
- Use URL-based API versioning (/api/v1/, /api/v2/)
- Maintain backward compatibility for 2 major versions
- Deprecate endpoints with 6-month notice period
```

### Additional Requirements Format

```markdown
**Additional Requirements (from Architecture):**

- [Technical requirement from Architecture that affects implementation]
- [Infrastructure setup requirement]
- [Integration requirement with external systems]
- [Security implementation detail]
- [Monitoring/logging requirement]
  ...
```

---

## Additional Requirements from UX Design

### What to Extract from UX Document

UX design documents contain requirements that affect how epics and stories are implemented from a user experience perspective.

### Key Areas to Review

#### 1. Responsive Design Requirements

**What to Extract:**

- Breakpoints and responsive behavior
- Mobile-first vs desktop-first approach
- Touch target sizes
- Responsive image handling

**Example:**

```
- Implement responsive design with breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Use mobile-first CSS approach
- Ensure touch targets are minimum 44x44px on mobile
- Serve responsive images using <picture> element with appropriate srcset
```

#### 2. Accessibility Requirements

**What to Extract:**

- WCAG compliance level (A, AA, AAA)
- Keyboard navigation requirements
- Screen reader support
- ARIA label requirements
- Color contrast requirements

**Example:**

```
- Meet WCAG 2.1 Level AA standards
- Implement full keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Provide ARIA labels for all interactive elements
- Ensure color contrast ratio of at least 4.5:1 for text
- Support screen readers (NVDA, JAWS, VoiceOver)
```

#### 3. Browser and Device Compatibility

**What to Extract:**

- Supported browsers and versions
- Device compatibility (desktop, mobile, tablet)
- Progressive enhancement approach

**Example:**

```
- Support latest 2 versions of Chrome, Firefox, Safari, Edge
- Support iOS Safari 15+ and Android Chrome 100+
- Implement progressive enhancement for older browsers
- Ensure core functionality works without JavaScript
```

#### 4. User Interaction Patterns

**What to Extract:**

- Navigation patterns (sidebar, top nav, tabs)
- Form validation approaches (inline, on submit)
- Loading states and skeletons
- Drag-and-drop interactions
- Modal and overlay patterns

**Example:**

```
- Use inline form validation with debounced API calls
- Display skeleton loaders during data fetching
- Implement toast notifications for success/error feedback
- Support drag-and-drop file uploads with progress indicators
- Use modal dialogs for destructive actions with confirmation
```

#### 5. Animation and Transition Requirements

**What to Extract:**

- Animation durations and easing functions
- Page transition effects
- Micro-interactions
- Motion sensitivity (prefers-reduced-motion)

**Example:**

```
- Use 200ms transitions for hover effects with ease-out easing
- Implement page transitions with 300ms fade effect
- Respect prefers-reduced-motion user preference
- Add micro-interactions for button clicks and form submissions
```

#### 6. Error Handling UX Requirements

**What to Extract:**

- Error message display patterns
- Validation error presentation
- Network error handling
- Empty state designs

**Example:**

```
- Display validation errors inline below form fields
- Show network errors with retry button in toast notification
- Present empty states with helpful guidance and call-to-action
- Use friendly, non-technical error messages for end users
```

#### 7. Performance and Loading UX

**What to Extract:**

- Loading indicators and progress bars
- Lazy loading strategies
- Skeleton screens
- Optimistic UI updates

**Example:**

```
- Show skeleton screens during initial page load
- Lazy load images below the fold
- Display linear progress bar for multi-step forms
- Use optimistic UI updates for like/favorite actions
```

### Additional Requirements Format (UX)

```markdown
**Additional Requirements (from UX Design):**

- [Responsive design requirement]
- [Accessibility requirement]
- [Browser compatibility requirement]
- [Interaction pattern requirement]
- [Animation/transition requirement]
- [Error handling UX requirement]
  ...
```

---

## Complete Extraction Workflow

### Step-by-Step Process

1. **Load all input documents**
   - PRD (Product Requirements Document)
   - Architecture document
   - UX Design document (if exists)

2. **Extract Functional Requirements (FRs)**
   - Read entire PRD document
   - Identify all "what the system does" statements
   - Format as FR1, FR2, FR3...
   - Ensure each FR is clear, testable, and specific

3. **Extract Non-Functional Requirements (NFRs)**
   - Review PRD for performance, security, reliability sections
   - Identify quality attributes and constraints
   - Format as NFR1, NFR2, NFR3...
   - Ensure each NFR is measurable with specific targets

4. **Extract Additional Requirements from Architecture**
   - Review Architecture document for technical requirements
   - Identify starter template (CRITICAL for Epic 1 Story 1)
   - Extract infrastructure, integration, security details
   - Add to "Additional Requirements" section

5. **Extract Additional Requirements from UX**
   - Review UX document for implementation requirements
   - Extract responsive design, accessibility, browser support
   - Identify interaction patterns and animations
   - Add to "Additional Requirements" section

6. **Organize and present to user**
   - Show count of FRs, NFRs, and additional requirements
   - Display examples of each category
   - Ask user for confirmation or corrections

7. **Save to output document**
   - Populate template with extracted requirements
   - Format according to template structure
   - Ensure all placeholders are replaced

---

## Validation Checklist

Before finalizing requirements extraction, verify:

- [ ] All FRs are clear, testable, and describe system behavior
- [ ] All NFRs are measurable with specific targets or standards
- [ ] Starter template requirement identified (if exists in Architecture)
- [ ] Infrastructure and deployment requirements extracted
- [ ] Integration requirements with external systems documented
- [ ] Responsive design and accessibility requirements captured
- [ ] Browser/device compatibility requirements specified
- [ ] User confirmed requirements are complete and accurate

---

**Last Updated:** 2026-01-25  
**Version:** 1.0  
**Used By:** create-epics-and-stories workflow, step-01-validate-prerequisites.md
