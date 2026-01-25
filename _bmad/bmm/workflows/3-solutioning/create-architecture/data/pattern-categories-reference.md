# Implementation Pattern Categories Reference Guide

This guide provides comprehensive examples of pattern categories where AI agents could make different choices.

## Naming Patterns

### Database Naming

- **Table naming:** users, Users, or user?
- **Column naming:** user_id or userId?
- **Foreign key format:** user_id or fk_user?
- **Index naming:** idx_users_email or users_email_index?

### API Naming

- **REST endpoint naming:** /users or /user? Plural or singular?
- **Route parameter format:** :id or {id}?
- **Query parameter naming:** user_id or userId?
- **Header naming conventions:** X-Custom-Header or Custom-Header?

### Code Naming

- **Component naming:** UserCard or user-card?
- **File naming:** UserCard.tsx or user-card.tsx?
- **Function naming:** getUserData or get_user_data?
- **Variable naming:** userId or user_id?

## Structure Patterns

### Project Organization

- **Where do tests live?** `__tests__/` directory or `*.test.ts` co-located?
- **How are components organized?** By feature or by type?
- **Where do shared utilities go?**
- **How are services and repositories organized?**

### File Structure

- **Config file locations and naming**
- **Static asset organization**
- **Documentation placement**
- **Environment file organization**

## Format Patterns

### API Formats

- **API response wrapper?** `{data: ..., error: ...}` or direct response?
- **Error format?** `{message, code}` or `{error: {type, detail}}`?
- **Date format in JSON?** ISO strings or timestamps?
- **Success response structure?**

### Data Formats

- **JSON field naming:** snake_case or camelCase?
- **Boolean representations:** true/false or 1/0?
- **Null handling patterns**
- **Array vs object for single items**

## Communication Patterns

### Event Systems

- **Event naming convention:** user.created or UserCreated?
- **Event payload structure standards**
- **Event versioning approach**
- **Async event handling patterns**

### State Management

- **State update patterns:** immutable updates or direct mutation?
- **Action naming conventions**
- **Selector patterns**
- **State organization principles**

## Process Patterns

### Error Handling

- **Global error handling approach**
- **Error boundary patterns**
- **User-facing error message format**
- **Logging vs user error distinction**

### Loading States

- **Loading state naming conventions**
- **Global vs local loading states**
- **Loading state persistence**
- **Loading UI patterns**

## Common Conflict Scenarios

### Naming Conflicts

**Database table naming:**

- One agent creates `users` table
- Another creates `Users` table
- Result: Inconsistency or conflicts

**API endpoint naming:**

- One agent uses `/users`
- Another uses `/user`
- Result: Confusing API surface

### Structural Conflicts

**Test location:**

- One agent puts tests in `__tests__/`
- Another co-locates as `*.test.ts`
- Result: Inconsistent test discovery

**Component organization:**

- One agent organizes by feature
- Another organizes by type
- Result: Mixed organizational patterns

### Format Conflicts

**API responses:**

- One agent wraps in `{data, error}`
- Another returns direct responses
- Result: Inconsistent client handling

**Date formats:**

- One agent uses ISO strings
- Another uses timestamps
- Result: Parsing errors

### Communication Conflicts

**Event naming:**

- One agent uses `user.created`
- Another uses `UserCreated`
- Result: Event handler mismatches

**State updates:**

- One agent mutates directly
- Another uses immutable patterns
- Result: State inconsistencies

### Process Conflicts

**Loading states:**

- One agent uses `isLoading`
- Another uses `loading`
- Result: Inconsistent UI states

**Error handling:**

- One agent throws exceptions
- Another returns error objects
- Result: Mixed error handling patterns
