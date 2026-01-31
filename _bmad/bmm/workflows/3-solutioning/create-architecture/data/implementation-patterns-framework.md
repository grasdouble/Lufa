# Implementation Patterns & Consistency Rules Framework

This framework defines all pattern categories that prevent AI agent implementation conflicts.

## Pattern Categories Overview

**Critical Conflict Points Identified:**
{{number_of_potential_conflicts}} areas where AI agents could make different choices

## Naming Patterns

### Database Naming Conventions

{{database_naming_rules_with_examples}}

**Table Naming:**

- Convention: {{chosen_convention}} (e.g., `users` vs `Users` vs `user`)
- Rationale: {{why_this_convention}}
- Examples: {{concrete_examples}}

**Column Naming:**

- Convention: {{chosen_convention}} (e.g., `user_id` vs `userId`)
- Foreign keys: {{fk_format}} (e.g., `user_id` vs `fk_user`)
- Indexes: {{index_format}} (e.g., `idx_users_email` vs `users_email_index`)

### API Naming Conventions

{{api_naming_rules_with_examples}}

**REST Endpoint Naming:**

- Resource naming: {{plural_or_singular}} (e.g., `/users` vs `/user`)
- Nested resources: {{nesting_pattern}}
- Query parameters: {{param_format}} (e.g., `user_id` vs `userId`)

**Route Parameters:**

- Format: {{parameter_format}} (e.g., `:id` vs `{id}`)
- Naming: {{naming_convention}}

**HTTP Headers:**

- Custom headers: {{header_format}} (e.g., `X-Custom-Header` vs `Custom-Header`)
- Standard conventions followed

### Code Naming Conventions

{{code_naming_rules_with_examples}}

**Component Naming:**

- Convention: {{chosen_convention}} (e.g., `UserCard` vs `user-card`)
- File naming: {{file_convention}} (e.g., `UserCard.tsx` vs `user-card.tsx`)

**Function Naming:**

- Convention: {{chosen_convention}} (e.g., `getUserData` vs `get_user_data`)
- Async functions: {{async_convention}}

**Variable Naming:**

- Convention: {{chosen_convention}} (e.g., `userId` vs `user_id`)
- Constants: {{constant_convention}}
- Private members: {{private_convention}}

## Structure Patterns

### Project Organization

{{project_structure_rules_with_examples}}

**Test Location:**

- Convention: {{test_location}} (`__tests__/` directory vs `*.test.ts` co-located)
- Test file naming: {{test_naming}}

**Component Organization:**

- Convention: {{organization_type}} (by feature vs by type)
- Directory structure: {{directory_pattern}}

**Utilities and Helpers:**

- Location: {{utilities_location}}
- Naming: {{utility_naming}}

**Services and Repositories:**

- Organization: {{service_organization}}
- File structure: {{file_structure}}

### File Structure Patterns

{{file_organization_rules_with_examples}}

**Configuration Files:**

- Locations: {{config_locations}}
- Naming: {{config_naming}}
- Organization: {{config_organization}}

**Static Assets:**

- Organization: {{asset_organization}}
- Naming conventions: {{asset_naming}}

**Documentation:**

- Placement: {{docs_placement}}
- File naming: {{docs_naming}}

## Format Patterns

### API Response Formats

{{api_response_structure_rules}}

**Success Response Structure:**

```json
{{success_response_format}}
```

**Error Response Structure:**

```json
{{error_response_format}}
```

**Pagination Format:**

```json
{{pagination_format}}
```

### Data Exchange Formats

{{data_format_rules_with_examples}}

**JSON Field Naming:**

- Convention: {{json_naming}} (snake_case vs camelCase)
- Consistency rule: {{consistency_requirement}}

**Boolean Representations:**

- Format: {{boolean_format}} (true/false vs 1/0 vs "true"/"false")

**Date/Time Formats:**

- Format: {{datetime_format}} (ISO strings vs timestamps vs custom)
- Timezone handling: {{timezone_approach}}

**Null Handling:**

- Convention: {{null_handling}} (null vs undefined vs omitted)
- Required vs optional fields: {{required_convention}}

## Communication Patterns

### Event System Patterns

{{event_naming_and_structure_rules}}

**Event Naming Convention:**

- Format: {{event_naming}} (e.g., `user.created` vs `UserCreated`)
- Namespacing: {{event_namespacing}}

**Event Payload Structure:**

```json
{{event_payload_structure}}
```

**Event Versioning:**

- Approach: {{versioning_approach}}
- Migration strategy: {{migration_strategy}}

**Async Event Handling:**

- Pattern: {{async_pattern}}
- Error handling: {{error_handling}}

### State Management Patterns

{{state_update_and_organization_rules}}

**State Update Pattern:**

- Convention: {{update_pattern}} (immutable updates vs direct mutation)
- Framework-specific rules: {{framework_rules}}

**Action Naming:**

- Convention: {{action_naming}}
- Async actions: {{async_action_naming}}

**Selector Patterns:**

- Naming: {{selector_naming}}
- Memoization: {{memoization_approach}}

**State Organization:**

- Structure: {{state_structure}}
- Normalization: {{normalization_approach}}

## Process Patterns

### Error Handling Patterns

{{consistent_error_handling_approaches}}

**Global Error Handling:**

- Approach: {{global_error_approach}}
- Error boundaries: {{error_boundary_usage}}

**API Error Handling:**

- Status code usage: {{status_code_standards}}
- Retry strategy: {{retry_approach}}
- Timeout handling: {{timeout_approach}}

**User-Facing Errors:**

- Message format: {{user_message_format}}
- Error display: {{error_display_approach}}

**Logging vs User Errors:**

- Distinction: {{logging_distinction}}
- Logging format: {{logging_format}}
- Log levels: {{log_levels}}

### Loading State Patterns

{{loading_state_management_rules}}

**Loading State Naming:**

- Convention: {{loading_naming}} (e.g., `isLoading`, `loading`, `status`)
- Multiple operations: {{multiple_loading_approach}}

**Global vs Local Loading:**

- When to use global: {{global_loading_criteria}}
- When to use local: {{local_loading_criteria}}

**Loading UI Patterns:**

- Skeleton screens: {{skeleton_usage}}
- Spinners: {{spinner_usage}}
- Progress indicators: {{progress_approach}}

**Loading State Persistence:**

- During navigation: {{navigation_persistence}}
- During re-renders: {{rerender_handling}}

## Enforcement Guidelines

### All AI Agents MUST

- {{mandatory_pattern_1}}
- {{mandatory_pattern_2}}
- {{mandatory_pattern_3}}
- {{mandatory_pattern_4}}
- {{mandatory_pattern_5}}

### Pattern Enforcement

**Verification Methods:**

- Linting rules: {{linting_approach}}
- Code review checklist: {{review_checklist}}
- Automated testing: {{automated_checks}}

**Pattern Violations:**

- Documentation location: {{violation_docs}}
- Resolution process: {{resolution_process}}

**Pattern Updates:**

- Update process: {{update_process}}
- Notification method: {{notification_method}}
- Version control: {{version_control}}

## Pattern Examples

### Good Examples

{{concrete_examples_of_correct_pattern_usage}}

**Example 1: API Endpoint Implementation**

```typescript
{
  {
    good_example_1;
  }
}
```

**Example 2: Component Structure**

```typescript
{
  {
    good_example_2;
  }
}
```

**Example 3: Error Handling**

```typescript
{
  {
    good_example_3;
  }
}
```

### Anti-Patterns

{{examples_of_what_to_avoid}}

**Anti-Pattern 1: Inconsistent Naming**

```typescript
{
  {
    bad_example_1;
  }
}
// Why this is wrong: {{explanation_1}}
```

**Anti-Pattern 2: Poor Error Handling**

```typescript
{
  {
    bad_example_2;
  }
}
// Why this is wrong: {{explanation_2}}
```

**Anti-Pattern 3: Violated Structure Patterns**

```typescript
{
  {
    bad_example_3;
  }
}
// Why this is wrong: {{explanation_3}}
```
