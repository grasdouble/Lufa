# Starter Template Evaluation Framework

This framework provides the complete structure for evaluating starter template options and documenting the selection.

## Primary Technology Domain

{{identified_domain}} based on project requirements analysis

**Domain Classification:**

- Web application
- Mobile app
- API/Backend
- CLI tool
- Full-stack
- Desktop application

**Domain Rationale:**
{{why_this_domain_was_identified}}

## Starter Options Considered

{{analysis_of_evaluated_starters}}

### Option 1: {{starter_name_1}}

**Overview:**

- Maintenance status: {{active/archived/last_update}}
- Community support: {{community_size_and_activity}}
- Documentation quality: {{documentation_assessment}}

**Technology Stack:**

- Primary framework: {{framework_and_version}}
- Build tooling: {{build_tools}}
- Testing setup: {{testing_framework}}
- Additional tools: {{other_included_tools}}

**Pros:**

- {{advantage_1}}
- {{advantage_2}}
- {{advantage_3}}

**Cons:**

- {{disadvantage_1}}
- {{disadvantage_2}}

### Option 2: {{starter_name_2}}

**Overview:**

- Maintenance status: {{active/archived/last_update}}
- Community support: {{community_size_and_activity}}
- Documentation quality: {{documentation_assessment}}

**Technology Stack:**

- Primary framework: {{framework_and_version}}
- Build tooling: {{build_tools}}
- Testing setup: {{testing_framework}}
- Additional tools: {{other_included_tools}}

**Pros:**

- {{advantage_1}}
- {{advantage_2}}
- {{advantage_3}}

**Cons:**

- {{disadvantage_1}}
- {{disadvantage_2}}

### Option 3: {{starter_name_3}}

**Overview:**

- Maintenance status: {{active/archived/last_update}}
- Community support: {{community_size_and_activity}}
- Documentation quality: {{documentation_assessment}}

**Technology Stack:**

- Primary framework: {{framework_and_version}}
- Build tooling: {{build_tools}}
- Testing setup: {{testing_framework}}
- Additional tools: {{other_included_tools}}

**Pros:**

- {{advantage_1}}
- {{advantage_2}}
- {{advantage_3}}

**Cons:**

- {{disadvantage_1}}
- {{disadvantage_2}}

## Selected Starter: {{starter_name}}

### Rationale for Selection

{{why_this_starter_was_chosen}}

**Key Selection Factors:**

1. **Project Alignment:** {{how_it_matches_project_needs}}
2. **Technology Preferences:** {{alignment_with_technical_preferences}}
3. **Maintenance & Support:** {{maintenance_and_community_support}}
4. **Development Experience:** {{dev_experience_benefits}}
5. **Production Readiness:** {{production_capabilities}}

### Initialization Command

```bash
{{full_starter_command_with_options}}
```

**Command Options Explained:**

- {{option_1}}: {{explanation}}
- {{option_2}}: {{explanation}}
- {{option_3}}: {{explanation}}

**Post-Installation Steps:**

1. {{post_install_step_1}}
2. {{post_install_step_2}}
3. {{post_install_step_3}}

## Architectural Decisions Provided by Starter

### Language & Runtime

{{language_typescript_setup}}

**Language Configuration:**

- Language: {{language_and_version}}
- Type system: {{typescript_or_other}}
- Compiler options: {{key_compiler_settings}}
- Target environment: {{target_env}}

**Runtime:**

- Runtime: {{runtime_and_version}}
- Package manager: {{package_manager}}
- Module system: {{module_system}}

### Styling Solution

{{styling_solution_configuration}}

**Styling Approach:**

- Solution: {{css_tailwind_styled_components_etc}}
- Configuration: {{styling_config}}
- Theme support: {{theming_approach}}
- Responsive utilities: {{responsive_utilities}}

**Design System Integration:**

- Component library: {{if_any}}
- Design tokens: {{if_supported}}
- Customization approach: {{how_to_customize}}

### Build Tooling

{{build_tools_and_optimization}}

**Build Tool:**

- Tool: {{vite_webpack_etc}}
- Configuration: {{build_config}}
- Optimization: {{optimization_features}}
- Bundle splitting: {{code_splitting_approach}}

**Development Server:**

- Hot reloading: {{hmr_support}}
- Fast refresh: {{fast_refresh_support}}
- Environment variables: {{env_var_handling}}

**Production Build:**

- Minification: {{minification_approach}}
- Asset optimization: {{asset_optimization}}
- Source maps: {{source_map_config}}

### Testing Framework

{{testing_setup_and_configuration}}

**Unit Testing:**

- Framework: {{jest_vitest_etc}}
- Configuration: {{test_config}}
- Coverage: {{coverage_setup}}
- Watch mode: {{watch_mode}}

**Integration Testing:**

- Approach: {{integration_test_setup}}
- Tools: {{integration_test_tools}}

**E2E Testing:**

- Framework: {{playwright_cypress_etc}}
- Configuration: {{e2e_config}}
- CI Integration: {{ci_integration}}

### Code Organization

{{project_structure_and_patterns}}

**Directory Structure:**

```
{{default_directory_structure}}
```

**Organization Patterns:**

- Feature organization: {{by_feature_or_by_type}}
- Component structure: {{component_patterns}}
- Utility organization: {{utility_patterns}}
- Test organization: {{test_patterns}}

**File Naming Conventions:**

- Components: {{component_naming}}
- Utilities: {{utility_naming}}
- Tests: {{test_naming}}
- Configuration: {{config_naming}}

### Development Experience

{{development_tools_and_workflow}}

**Developer Tools:**

- Linting: {{eslint_or_other}}
- Formatting: {{prettier_or_other}}
- Git hooks: {{husky_or_other}}
- Pre-commit checks: {{pre_commit_setup}}

**IDE Support:**

- TypeScript intellisense: {{ts_support}}
- Path aliases: {{path_alias_config}}
- Debugging: {{debugging_setup}}

**Documentation:**

- README: {{readme_quality}}
- API docs: {{api_doc_approach}}
- Contributing guide: {{contributing_docs}}

## Integration with Project Requirements

### UX Requirements Support

**If UX spec was loaded:**

- Animation support: {{animation_capabilities}}
- Form handling: {{form_library_support}}
- Real-time features: {{realtime_support}}
- Design system: {{design_system_support}}
- Offline capability: {{pwa_service_worker_support}}

### Technical Preferences Alignment

**Alignment with User Preferences:**

- Languages: {{language_preference_match}}
- Frameworks: {{framework_preference_match}}
- Databases: {{database_compatibility}}
- Platform: {{deployment_platform_compatibility}}
- Development tools: {{tooling_preference_match}}

### Deployment Considerations

**Production Deployment:**

- Deployment target: {{vercel_netlify_aws_etc}}
- Build output: {{build_artifacts}}
- Environment configuration: {{env_config}}
- Scaling approach: {{scaling_capabilities}}

## Remaining Architectural Decisions

**Decisions Not Made by Starter:**

These must be decided in the next steps:

1. {{remaining_decision_1}}
   - Why not decided: {{reason}}
   - Must decide: {{what_needs_deciding}}

2. {{remaining_decision_2}}
   - Why not decided: {{reason}}
   - Must decide: {{what_needs_deciding}}

3. {{remaining_decision_3}}
   - Why not decided: {{reason}}
   - Must decide: {{what_needs_deciding}}

## Notes

**Project initialization using this command should be the first implementation story.**

**Important Considerations:**

- Verify all version numbers are current before initialization
- Review default configuration and customize as needed
- Understand what architectural decisions are pre-made
- Identify what still needs to be decided
