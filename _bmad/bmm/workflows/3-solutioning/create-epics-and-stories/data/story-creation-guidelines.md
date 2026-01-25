# Story Creation Guidelines

## Purpose

This document provides comprehensive guidelines for creating user stories with proper structure, dependencies, and acceptance criteria. These guidelines ensure stories are properly scoped, independently completable, and ready for development.

---

## Story Creation Principles

### 1. Database/Entity Creation Principle

Create tables/entities ONLY when needed by the story.

**❌ WRONG APPROACH:**

- Epic 1 Story 1 creates all 50 database tables upfront
- Story creates infrastructure not used until later stories

**✅ RIGHT APPROACH:**

- Each story creates/alters ONLY the tables it needs
- Database evolves incrementally as features are built
- Tables are created just-in-time for the functionality

**Example:**

```
Epic 1: User Management

Story 1.1: User Registration
- Creates: users table (id, email, password_hash, created_at)

Story 1.2: User Profile Management
- Alters: users table (adds: first_name, last_name, avatar_url)

Story 1.3: User Preferences
- Creates: user_preferences table (user_id, theme, language, notifications)
```

### 2. Story Dependency Principle

Stories must be independently completable in sequence. Each story should work based only on previous stories, never future ones.

**❌ WRONG DEPENDENCIES (Future Dependencies):**

- Story 1.2 requires Story 1.3 to be completed first
- Story says: "Wait for Story 1.4 to be implemented before this works"
- Story says: "This requires the API from Story 2.1"

**✅ RIGHT DEPENDENCIES (Sequential Completion):**

- Each story can be completed based only on previous stories
- Story says: "This story works independently and enables future stories"
- Story says: "Builds upon the foundation from Story 1.1"

**Example:**

```
❌ BAD: Epic 1 Stories (Wrong Order)
- Story 1.1: Login UI (depends on Story 1.3 API endpoint)
- Story 1.2: User Profile Display (depends on Story 1.4)
- Story 1.3: Authentication API
- Story 1.4: User Data API

✅ GOOD: Epic 1 Stories (Correct Order)
- Story 1.1: Authentication API Endpoint
- Story 1.2: Login UI (uses Story 1.1 API)
- Story 1.3: User Data API Endpoint
- Story 1.4: User Profile Display (uses Story 1.3 API)
```

### 3. Story Sizing Principle

Each story should be completable by a single dev agent in one focused work session.

**Story Size Guidelines:**

- Small enough to be completed in one session
- Large enough to provide user value
- Focused on a single capability or feature
- Clear beginning and end

**❌ TOO LARGE:**

- "Build authentication system"
- "Create all models"
- "Implement entire user management"

**✅ RIGHT SIZE:**

- "User Registration with Email"
- "User Login with Password"
- "Password Reset via Email"

---

## Story Format Template

Every story MUST follow this exact format:

```markdown
### Story {N}.{M}: {story_title}

As a {user_type},
I want {capability},
So that {value_benefit}.

**Acceptance Criteria:**

**Given** {precondition}
**When** {action}
**Then** {expected_outcome}
**And** {additional_criteria}
```

### Format Components

**Story Number:** `{N}.{M}` where N is Epic number, M is Story number within epic

**Story Title:** Clear, action-oriented description of the capability

**User Story:**

- **As a** - Identifies the user role/persona
- **I want** - Describes the capability or action
- **So that** - Explains the value or benefit

**Acceptance Criteria:**

- Use Given/When/Then/And format (Gherkin-style)
- Each criterion should be independently testable
- Include happy path and key edge cases
- Be specific and measurable

---

## Good Story Examples

### Epic 1: User Authentication

**Story 1.1: User Registration with Email**

```markdown
As a new user,
I want to register an account with my email and password,
So that I can access the platform's features.

**Acceptance Criteria:**

**Given** I am on the registration page
**When** I enter a valid email and password
**Then** my account is created in the system
**And** I receive a confirmation email
**And** I am automatically logged in
```

**Story 1.2: User Login with Password**

```markdown
As a registered user,
I want to log in with my email and password,
So that I can access my account.

**Acceptance Criteria:**

**Given** I have a registered account
**When** I enter my correct email and password
**Then** I am authenticated successfully
**And** I am redirected to the dashboard
**And** my session is created with a 24-hour expiration

**Given** I enter an incorrect password
**When** I attempt to log in
**Then** I see an error message "Invalid credentials"
**And** my account is not locked after 3 failed attempts
```

**Story 1.3: Password Reset via Email**

```markdown
As a user who forgot my password,
I want to reset my password via email,
So that I can regain access to my account.

**Acceptance Criteria:**

**Given** I am on the login page
**When** I click "Forgot Password" and enter my email
**Then** I receive a password reset email with a unique token
**And** the token expires after 1 hour

**Given** I have a valid reset token
**When** I enter a new password and confirm it
**Then** my password is updated in the system
**And** I receive a confirmation email
**And** I am redirected to the login page
```

### Epic 2: Content Creation

**Story 2.1: Create New Blog Post**

```markdown
As a content creator,
I want to create a new blog post with title and content,
So that I can share my ideas with readers.

**Acceptance Criteria:**

**Given** I am logged in as a content creator
**When** I fill in the title and content fields
**And** I click "Save Draft"
**Then** the blog post is saved as a draft
**And** I see a success message
**And** the post appears in my drafts list
```

---

## Bad Story Examples (What to Avoid)

### ❌ No User Value

**Story: "Set up database"**

- Problem: No user-facing value
- Fix: Fold database setup into the first story that needs it

**Story: "Create all models"**

- Problem: Too large, no user value
- Fix: Create models incrementally as stories need them

### ❌ Too Large/Vague

**Story: "Build authentication system"**

- Problem: Too broad, multiple stories worth of work
- Fix: Break into specific capabilities (registration, login, logout, password reset)

**Story: "Implement user management"**

- Problem: Encompasses too many features
- Fix: Split into concrete user actions

### ❌ Future Dependencies

**Story: "Login UI (depends on Story 1.3 API endpoint)"**

- Problem: Depends on a future story
- Fix: Reorder so API endpoint is built first

**Story: "Edit post (requires Story 1.4 to be implemented first)"**

- Problem: Wrong execution order
- Fix: Build Story 1.4 before this story

### ❌ Missing Acceptance Criteria

**Story: User can edit their profile**

- Problem: No specific, testable criteria
- Fix: Add Given/When/Then criteria for all edit scenarios

---

## Acceptance Criteria Writing Guidelines

### Format Rules

1. **Use Given/When/Then/And structure** (Gherkin-style)
2. **Be specific and measurable** - avoid vague language
3. **Cover happy path first** - then edge cases
4. **Include error scenarios** - how should failures be handled
5. **Reference requirements** - tie back to FRs/NFRs when applicable

### Coverage Checklist

For each story, ensure acceptance criteria cover:

- ✅ **Happy path** - primary user flow works correctly
- ✅ **Edge cases** - boundary conditions and unusual inputs
- ✅ **Error handling** - invalid inputs, failures, timeouts
- ✅ **Data persistence** - data is saved/updated correctly
- ✅ **User feedback** - success/error messages shown
- ✅ **Security** - authorization checks (if applicable)
- ✅ **Performance** - response times (if NFR-related)

### Example: Comprehensive Acceptance Criteria

```markdown
Story 2.3: Delete Blog Post

As a content creator,
I want to delete a blog post I created,
So that I can remove content I no longer want published.

**Acceptance Criteria:**

**Happy Path:**
**Given** I am logged in as a content creator
**And** I have a blog post I authored
**When** I click "Delete" on the post
**And** I confirm the deletion
**Then** the post is removed from the database
**And** I see a success message "Post deleted successfully"
**And** the post no longer appears in my posts list

**Authorization:**
**Given** I am logged in as a different user
**When** I attempt to delete someone else's post
**Then** I receive a 403 Forbidden error
**And** the post is not deleted

**Soft Delete (if required by NFR):**
**Given** a post is deleted
**When** the deletion occurs
**Then** the post is marked as deleted but not physically removed
**And** it can be restored within 30 days
**And** after 30 days it is permanently removed

**Already Deleted:**
**Given** a post has already been deleted
**When** I attempt to delete it again
**Then** I receive an error message "Post not found"
```

---

## Summary Checklist

Before finalizing a story, verify:

- [ ] Story follows the As a/I want/So that format
- [ ] Story title is clear and action-oriented
- [ ] Story is sized appropriately (single dev session)
- [ ] Story creates ONLY the database entities it needs
- [ ] Story has NO dependencies on future stories
- [ ] Acceptance criteria use Given/When/Then format
- [ ] Acceptance criteria cover happy path and edge cases
- [ ] Acceptance criteria are specific and testable
- [ ] Story provides clear user value
- [ ] Story references relevant FRs/NFRs

---

**Last Updated:** 2026-01-25  
**Version:** 1.0  
**Used By:** create-epics-and-stories workflow, step-03-create-stories.md
