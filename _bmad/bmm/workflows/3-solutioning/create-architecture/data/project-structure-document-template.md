# Project Structure & Boundaries Document Template

This template provides the complete structure for documenting project organization, architectural boundaries, and requirements mapping.

## Complete Project Directory Structure

```
{{complete_project_tree_with_all_files_and_directories}}
```

### Technology-Specific Structure Examples

#### Next.js Full-Stack

```
project-name/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   └── features/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── types/
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── __mocks__/
│   ├── components/
│   └── e2e/
└── public/
    └── assets/
```

#### API Backend (NestJS)

```
project-name/
├── package.json
├── nest-cli.json
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── common/
│   ├── services/
│   ├── repositories/
│   ├── decorators/
│   ├── pipes/
│   ├── guards/
│   └── interceptors/
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── docker-compose.yml
```

## Architectural Boundaries

### API Boundaries

{{api_boundary_definitions_and_endpoints}}

**External API Endpoints:**

- Define all public-facing API endpoints
- Document authentication requirements
- Specify rate limiting rules

**Internal Service Boundaries:**

- Define service-to-service communication patterns
- Document internal API contracts
- Specify error handling approaches

### Component Boundaries

{{component_communication_patterns_and_boundaries}}

**Frontend Component Communication:**

- Define prop passing patterns
- Document state lifting approaches
- Specify event handling patterns

**State Management Boundaries:**

- Define where state lives (local vs global)
- Document state update patterns
- Specify side effect handling

### Service Boundaries

{{service_integration_patterns_and_boundaries}}

**Service Communication Patterns:**

- Define how services discover each other
- Document communication protocols (REST, GraphQL, gRPC)
- Specify retry and circuit breaker patterns

**Integration Points:**

- Define third-party service integration boundaries
- Document API gateway patterns
- Specify message queue usage

### Data Boundaries

{{data_access_patterns_and_boundaries}}

**Database Access Patterns:**

- Define ORM/query builder usage
- Document transaction boundaries
- Specify connection pooling strategies

**Caching Boundaries:**

- Define what gets cached and where
- Document cache invalidation strategies
- Specify cache key patterns

## Requirements to Structure Mapping

### Feature/Epic Mapping

{{mapping_of_epics_or_features_to_specific_directories}}

**Example Format:**

```
Epic: User Management
- Components: src/components/features/users/
- Services: src/services/users/
- API Routes: src/app/api/users/
- Database: prisma/migrations/*users*
- Tests: tests/features/users/
```

### Cross-Cutting Concerns

{{mapping_of_shared_functionality_to_locations}}

**Example Format:**

```
Authentication System
- Components: src/components/auth/
- Services: src/services/auth/
- Middleware: src/middleware/auth.ts
- Guards: src/guards/auth.guard.ts
- Tests: tests/auth/
```

## Integration Points

### Internal Communication

{{how_components_within_the_project_communicate}}

**Component to Component:**

- Document prop interfaces
- Define custom event patterns
- Specify context usage

**Service to Service:**

- Document API contracts
- Define message formats
- Specify error handling

### External Integrations

{{third_party_service_integration_points}}

**Third-Party Services:**

- List all external services
- Document integration patterns
- Specify fallback strategies

**API Clients:**

- Document client implementations
- Define retry strategies
- Specify timeout configurations

### Data Flow

{{how_data_flows_through_the_architecture}}

**User Input Flow:**

- UI components → validation → state management → API calls

**Data Retrieval Flow:**

- API call → service layer → repository → database

**Event Flow:**

- User action → event handler → state update → UI re-render

## File Organization Patterns

### Configuration Files

{{where_and_how_config_files_are_organized}}

**Root Configuration:**

- Build configuration (next.config.js, vite.config.ts)
- Package management (package.json, pnpm-workspace.yaml)
- TypeScript configuration (tsconfig.json)
- Environment configuration (.env files)

**Module Configuration:**

- Module-specific configs in respective directories
- Shared configs in src/config/
- Test configs in test directories

### Source Organization

{{how_source_code_is_structured_and_organized}}

**By Feature:**

```
src/
├── features/
│   ├── auth/
│   ├── users/
│   └── products/
```

**By Type:**

```
src/
├── components/
├── services/
├── repositories/
└── utils/
```

**Hybrid Approach:**

```
src/
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
```

### Test Organization

{{how_tests_are_structured_and_organized}}

**Co-located Tests:**

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
```

**Separate Test Directory:**

```
tests/
├── unit/
├── integration/
└── e2e/
```

### Asset Organization

{{how_static_and_dynamic_assets_are_organized}}

**Static Assets:**

```
public/
├── images/
├── fonts/
└── icons/
```

**Dynamic Assets:**

```
src/
├── assets/
│   ├── styles/
│   └── icons/
```

## Development Workflow Integration

### Development Server Structure

{{how_the_project_is_organized_for_development}}

**Hot Reloading:**

- Define watched directories
- Document rebuild triggers
- Specify excluded patterns

**Environment Setup:**

- Development environment variables
- Local database setup
- Mock service configuration

### Build Process Structure

{{how_the_build_process_uses_the_project_structure}}

**Build Inputs:**

- Source directories to compile
- Asset directories to process
- Configuration files to use

**Build Outputs:**

- Compiled JavaScript/TypeScript
- Processed CSS
- Optimized images
- Generated types

### Deployment Structure

{{how_the_project_structure_supports_deployment}}

**Deployment Artifacts:**

- Build output location
- Static asset location
- Environment-specific configs
- Docker images (if applicable)

**Environment Configuration:**

- Development environment
- Staging environment
- Production environment
- Preview environments
