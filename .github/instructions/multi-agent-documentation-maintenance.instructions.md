---
description: 'Guidelines for maintaining multi-agent compatible documentation'
applyTo: '**/AGENTS.md, **/CLAUDE.md, **/CONVENTIONS.md, **/QUICKSTART.md, **/.github/instructions/**, **/.github/prompts/**'
---

# Multi-Agent Documentation Maintenance

This file contains instructions for maintaining and evolving the multi-agent compatible documentation structure in this project.

## Documentation Architecture Overview

This project follows a **multi-agent compatible documentation strategy** optimized for:
- GitHub Copilot
- Claude Code
- Cursor
- Aider
- Cline / Windsurf / Roo Code

### Core Principles

1. **Single Source of Truth**: [AGENTS.md](../../AGENTS.md) is the comprehensive documentation
2. **Agent-Specific Files Reference AGENTS.md**: Avoid duplication, provide quick references
3. **Cross-Linking**: All instruction files link back to AGENTS.md for comprehensive context
4. **Standard Markdown**: Simple, readable format compatible with all agents
5. **YAML Frontmatter**: Used only for GitHub Copilot path-scoping (`applyTo`, `description`, `name`)

## Quick Decision Guide

> **⚡ Start here** if you just made code changes and want to know if you should update AI documentation.

### Should I Update AI Documentation?

Use this decision tree to determine if your changes require documentation updates:

```
┌─ Changed packages/design-system/?
│  ├─ New component created ────────────────────> ✅ YES - Update AGENTS.md Pattern 1
│  ├─ New tokens added ────────────────────────> ✅ YES - Update AGENTS.md + CLAUDE.md
│  ├─ Component behavior changed ──────────────> ✅ YES - Update pattern examples
│  └─ Internal refactoring (no API change) ────> ❌ NO
│
┌─ Changed tests/?
│  ├─ New testing pattern discovered ──────────> ✅ YES - Update AGENTS.md Pattern 2
│  ├─ New testing tool/framework added ────────> ✅ YES - Create .instructions.md
│  └─ Fixed failing test ──────────────────────> ❌ NO
│
┌─ Changed build process?
│  ├─ New build command added ─────────────────> ✅ YES - All doc files
│  ├─ Build order changed ─────────────────────> ✅ YES - AGENTS.md + CLAUDE.md
│  ├─ New package added to monorepo ───────────> ✅ YES - AGENTS.md + package.json scripts
│  └─ Internal optimization (same commands) ───> ❌ NO
│
┌─ Changed project architecture?
│  ├─ Layer structure modified ────────────────> ✅ YES - Critical! All doc files
│  ├─ New architectural pattern ───────────────> ✅ YES - AGENTS.md + create .instructions.md
│  └─ File moved (same architecture) ──────────> ⚠️  MAYBE - Fix links if referenced
│
┌─ Added new technology/library?
│  ├─ Major framework (React, Vite, etc.) ─────> ✅ YES - Create .instructions.md
│  ├─ Utility library with patterns ───────────> ✅ YES - Add to relevant .instructions.md
│  └─ Dependency update (no API change) ───────> ❌ NO
│
└─ Bug fix, typo, or minor change?
   └─ No pattern or workflow impact ───────────> ❌ NO
```

### What Documentation Files to Update?

Quick reference table for different types of changes:

| Type of Change | AGENTS.md | CLAUDE.md | .instructions.md | copilot-instructions.md | QUICKSTART.md |
|----------------|-----------|-----------|------------------|-------------------------|---------------|
| **New reusable pattern** | ✅ Required<br>(Common Patterns) | ✅ Required<br>(if critical) | 📝 Optional<br>(if tech-specific) | 📝 Optional<br>(add reference) | ❌ No |
| **New technology** | 📝 Optional<br>(if widely used) | ❌ No | ✅ Required<br>(create new file) | ✅ Required<br>(reference it) | ❌ No |
| **Build process change** | ✅ Required<br>(Quick Commands) | ✅ Required<br>(Quick Reference) | ❌ No | ✅ Required<br>(Common Commands) | ✅ Required<br>(if affects setup) |
| **Architecture change** | ✅ Required<br>(multiple sections) | ✅ Required<br>(Critical section) | ✅ Required<br>(update all relevant) | ✅ Required<br>(Critical Rules) | 📝 Optional<br>(if affects setup) |
| **New component** | ✅ Required<br>(Pattern 1 example) | 📝 Optional<br>(if establishes pattern) | ❌ No | ❌ No | ❌ No |
| **Setup process change** | ✅ Required<br>(Getting Started) | ❌ No | ❌ No | 📝 Optional | ✅ Required |
| **New AI agent support** | ✅ Required<br>(Compatibility Matrix) | ❌ No | ❌ No | 📝 Optional<br>(mention it) | ❌ No |

**Legend**:
- ✅ **Required** - Must be updated
- 📝 **Optional** - Update if relevant/helpful
- ❌ **No** - No update needed

### Update Order (Critical!)

When you need to update multiple files, **always follow this order**:

```
1. AGENTS.md          ← Update first (single source of truth)
   ↓
2. CLAUDE.md          ← Then quick reference (if needed)
   ↓
3. .instructions.md   ← Then technology-specific files
   ↓
4. copilot-instructions.md  ← Then GitHub Copilot main file
   ↓
5. QUICKSTART.md      ← Finally onboarding guide (if needed)
   ↓
6. pnpm validate:docs ← Always run validation after changes
```

**Why this order matters**: Other files reference AGENTS.md, so it must be updated first to maintain consistency.

### Quick Validation Checklist

Before committing documentation changes, verify:

- [ ] **Ran validation**: `pnpm validate:docs` passes without errors
- [ ] **No duplication**: Linked to AGENTS.md instead of copying content
- [ ] **Links work**: All `[text](path)` references are valid
- [ ] **Examples tested**: Code snippets are runnable and correct
- [ ] **Consistent**: Same concept described the same way across files
- [ ] **YAML valid**: Only `description`, `applyTo`, `name` in frontmatter (if .instructions.md)

### Common Scenarios - Quick Actions

#### Scenario 1: "I created a new Design System component"

```bash
# 1. Update AGENTS.md Pattern 1 with your component as example
# 2. If it introduces new patterns, update CLAUDE.md checklist
# 3. Run validation
pnpm validate:docs
```

#### Scenario 2: "I added a new testing approach"

```bash
# 1. Update AGENTS.md Pattern 2 (Playwright Component Tests)
# 2. If new tool/framework, create .github/instructions/{tool}.instructions.md
# 3. Update .github/copilot-instructions.md to reference new file
# 4. Run validation
pnpm validate:docs
```

#### Scenario 3: "Build commands changed"

```bash
# 1. Update AGENTS.md (Quick Commands Cheatsheet section)
# 2. Update CLAUDE.md (Most Common Tasks section)
# 3. Update .github/copilot-instructions.md (Common Commands)
# 4. If affects setup, update QUICKSTART.md
# 5. Run validation
pnpm validate:docs
```

#### Scenario 4: "I'm not sure if I should update docs"

```bash
# Ask yourself:
# - Will other developers need to know this?
# - Does it change how AI agents should work with the code?
# - Is it a reusable pattern?

# If ANY answer is "yes" → Update documentation
# If ALL answers are "no" → Skip documentation update
```

### Time-Based Guidelines

**If you have 5 minutes**:
1. Identify affected files using the table above
2. Make minimal updates to critical sections
3. Run `pnpm validate:docs`

**If you have 30 minutes**:
1. Follow full update order
2. Add complete examples
3. Update cross-references
4. Run validation and fix warnings

**If you have 1+ hours**:
1. Complete documentation update
2. Add new patterns or sections if needed
3. Review related documentation for consistency
4. Test with multiple AI agents if possible

## File Structure and Purpose

### Root Documentation Files

```
project-root/
├── AGENTS.md                  # ⭐ PRIMARY - Comprehensive guide (1200+ lines)
│                              # Target: All AI agents
│                              # Contains: Architecture, patterns, workflows, troubleshooting
│
├── CLAUDE.md                  # Quick reference for Claude Code (~200 lines)
│                              # Target: Claude Code (auto-loaded)
│                              # Contains: Critical architecture, commands, checklist
│
├── CONVENTIONS.md             # Aider compatibility symlink (~60 lines)
│                              # Target: Aider and tools expecting CONVENTIONS.md
│                              # Contains: Quick reference to AGENTS.md, critical rules
│
└── QUICKSTART.md              # 5-minute setup guide (~110 lines)
                               # Target: New contributors (human and AI)
                               # Contains: Prerequisites, setup, common commands
```

### GitHub-Specific Documentation

```
.github/
├── copilot-instructions.md    # GitHub Copilot main file (~257 lines)
│                              # Target: GitHub Copilot (auto-loaded)
│                              # Contains: Project overview, path-scoped rules, quick reference
│
├── instructions/              # Path-scoped instructions (12 files)
│   ├── *.instructions.md      # Technology-specific rules
│   │                          # Format: YAML frontmatter + detailed guidance + Related Documentation section
│   │
│   └── multi-agent-documentation-maintenance.instructions.md  # This file
│
└── prompts/                   # Reusable AI prompts
    └── README.md              # Prompts catalog and usage guide
```

## Maintenance Workflows

### When Adding New Technology Instructions

**File**: `.github/instructions/{technology}.instructions.md`

**Template**:
```markdown
---
description: '{Brief description of technology standards}'
applyTo: '{file patterns, e.g., **/*.tsx, **/*.ts}'
---

# {Technology} Development Instructions

[Technology-specific guidance here]

## [Sections as needed]

---

## Related Documentation

For comprehensive project documentation, see:

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
  - Project overview and architecture
  - Setup and development workflow
  - Code patterns and examples
  - Troubleshooting guides

- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot instructions
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** - Contribution workflow

**This file is automatically applied by GitHub Copilot when working in matching file paths.**
```

**Steps**:
1. Create file in `.github/instructions/`
2. Add YAML frontmatter with `description` and `applyTo`
3. Write technology-specific guidance
4. Add "Related Documentation" section at the end
5. Update `.github/copilot-instructions.md` to reference the new file

**Validation**:
- [ ] YAML frontmatter includes only `description`, `applyTo` (and optionally `name`)
- [ ] "Related Documentation" section added at the end
- [ ] File referenced in `.github/copilot-instructions.md`
- [ ] No duplicate content from AGENTS.md (link to it instead)

### When Updating AGENTS.md

**Critical Sections to Maintain**:

1. **Quick Navigation for AI Agents** (lines ~7-26)
   - First-time reading order
   - Most common tasks with anchors
   - Agent-specific notes

2. **Quick Start for AI Agents** (lines ~29-103)
   - Essential Context (4 key points)
   - Three Most Important Rules
   - Quick Commands Cheatsheet
   - Decision Trees (3 trees: file creation, layer identification, build failures)

3. **Common Patterns in This Codebase** (lines ~482-661)
   - Pattern 1: Creating a Design System Component
   - Pattern 2: Writing Playwright Component Tests
   - Pattern 3: Using Changesets for Version Management
   - Pattern 4: Working with Monorepo Packages
   - Pattern 5: CSS with Design Tokens

4. **AI Agent Compatibility** (lines ~855-908)
   - Supported Agents and Their Files (table)
   - File Organization Strategy (diagram)
   - Cross-Agent Best Practices
   - For Contributors Using Different Agents

5. **Extended Compatibility Matrix** (lines ~1194-1264)
   - Feature comparison table (7 agents)
   - Choosing the Right Agent for Your Workflow
   - Agent-Specific Setup Instructions

**Update Protocol**:
1. Read existing section completely before modifying
2. Maintain decision trees and tables formatting
3. Keep examples complete and runnable
4. Update line numbers in this file if sections move significantly
5. Test with multiple agents if possible

### When Adding New Reusable Prompt

**File**: `.github/prompts/{action}-{subject}.prompt.md`

**Template**:
```markdown
---
description: "{Brief description of what this prompt does}"
agent: "agent"  # or specific agent type
---

# {Prompt Title}

[Detailed instructions for the AI agent]

## Context
[Relevant context about the project]

## Task
[Specific task to accomplish]

## Requirements
[Requirements and constraints]

## Example
[Example of expected output]
```

**Steps**:
1. Create file in `.github/prompts/`
2. Add YAML frontmatter
3. Write clear, unambiguous instructions
4. Include examples of expected output
5. Update `.github/prompts/README.md` catalog

### When Modifying CLAUDE.md

**Purpose**: Quick reference for Claude Code (auto-loaded, token-limited)

**Keep**:
- Critical three-layer architecture warning
- Build order commands
- Component development checklist
- Links to AGENTS.md for deep dives

**Avoid**:
- Duplicating AGENTS.md content
- Long explanations (link to AGENTS.md instead)
- Technology-specific details (use .instructions.md files)

**Max Length**: ~250 lines (token considerations)

### When Updating QUICKSTART.md

**Purpose**: 5-minute setup for new contributors

**Structure**:
1. Prerequisites (Node.js, pnpm versions)
2. Setup (3 commands)
3. Verify Setup
4. For AI Agents / For Human Developers sections
5. Next Steps (4 links)
6. Common Issues (troubleshooting table)
7. Most Common Commands

**Keep it Short**: Max ~120 lines

## Implementation History

### Phase 1: Core Restructuring (Completed)

**Objective**: Establish multi-agent compatible foundation

**Changes**:
1. **AGENTS.md** - Restructured with:
   - Quick Navigation for AI Agents
   - Quick Start section with decision trees
   - Common Patterns in This Codebase (5 complete patterns)
   - AI Agent Compatibility section with support matrix
   - File organization strategy

2. **CLAUDE.md** - Simplified to:
   - Quick reference only
   - Clear reference to AGENTS.md as primary source
   - Architecture diagram
   - Troubleshooting table
   - Component development checklist

3. **copilot-instructions.md** - Created/optimized:
   - References AGENTS.md as primary documentation
   - Lists all path-scoped instructions
   - Critical design system rules
   - Common patterns
   - Troubleshooting quick reference

4. **CONVENTIONS.md** - Created for Aider:
   - References AGENTS.md
   - Quick commands and critical architecture

5. **.github/prompts/README.md** - Created:
   - Comprehensive index of 14 existing prompts
   - Usage instructions per agent
   - Guidelines for creating new prompts

**Impact**: ~1000 lines restructured, single source of truth established

### Phase 2: Improved Navigation and Specialized Content (Completed)

**Objective**: Fill documentation gaps and improve cross-referencing

**Changes**:

1. **playwright-typescript.instructions.md** - Added section:
   - Playwright Component Testing (~180 lines)
   - Setup and Configuration
   - Basic Component Test Structure with examples
   - Key Differences: Component Testing vs E2E Testing (table)
   - Component Testing Best Practices (6 items)
   - Testing Pattern for Design System Components (complete TextField example)
   - Running Component Tests (commands)
   - Integration with Storybook
   - Component Test Checklist
   - Resources

2. **All .instructions.md files** - Added "Related Documentation" section:
   - 11 files updated (a11y, reactjs, markdown, typescript-5-es2022, nodejs-javascript-vitest, tailwindcss, playwright-typescript, github-actions, ai-prompt-engineering, performance-optimization, update-docs-on-code-change)
   - Each file now links to AGENTS.md, CLAUDE.md, copilot-instructions.md, CONTRIBUTING.md
   - Consistent cross-referencing across all instruction files

3. **a11y.instructions.md** - Added WCAG 2.2 checklist:
   - Quick checklist (~75 lines)
   - 4 WCAG principles (Perceivable, Operable, Understandable, Robust)
   - WCAG 2.2 New Criteria section
   - Testing Tools section
   - Actionable checklist format

**Impact**: ~420 lines added, navigation improved, Playwright CT gap filled

### Phase 3: Enhanced Onboarding and Compatibility (Completed)

**Objective**: Improve new contributor onboarding and agent selection

**Changes**:

1. **QUICKSTART.md** - Created (~110 lines):
   - 5-minute setup guide
   - Prerequisites with version checks
   - 3-step setup process
   - Verify Setup section
   - For AI Agents / For Human Developers sections
   - Next Steps with 4 key links
   - Common Issues troubleshooting table
   - Most Common Commands

2. **Metadata Standardization** - Skipped:
   - Initial plan: Add `related_docs`, `agent_compatible`, `last_updated` to frontmatter
   - Decision: GitHub Copilot only supports `applyTo`, `description`, `name`
   - Unsupported fields generate IDE warnings
   - Conclusion: Keep frontmatter minimal and standard-compliant

3. **AGENTS.md** - Added Extended Compatibility Matrix:
   - Feature comparison table (7 agents × 10 features)
   - Legend explaining support levels
   - "Choosing the Right Agent for Your Workflow" table (7 workflows)
   - Agent-Specific Setup Instructions (5 agents)
   - Complete with code examples for Cursor and Aider setup

**Impact**: ~180 lines added (QUICKSTART + matrix), improved agent selection guidance

### Phase 4: OpenAI Codex Extension Support (Completed)

**Objective**: Add support for OpenAI Codex VSCode extension

**Changes**:

1. **config.toml** - Created (~103 lines):
   - Model configuration (gpt-4-turbo-preview)
   - Approval policy (on-request)
   - Context files array (AGENTS.md, CLAUDE.md, copilot-instructions.md)
   - Custom instructions for three-layer architecture
   - Build order documentation
   - Component development standards
   - References to custom agents and prompts locations
   - Common commands pre-configured

2. **AGENTS.md** - Added OpenAI Codex section:
   - Extended Compatibility Matrix updated (now 8 agents)
   - OpenAI Codex Extension setup instructions
   - Comparison table: GitHub Copilot vs OpenAI Codex Extension
   - Key differences (autonomous agent vs real-time suggestions)
   - Usage workflow recommendations

3. **.gitignore** - Updated:
   - Section for AI coding agents
   - Protect config.local.toml (secrets)
   - Commit config.toml (no secrets, uses env vars)

**Impact**: ~150 lines added, OpenAI Codex extension now fully supported

### Phase 5: Automatic Validation Script (Completed)

**Objective**: Prevent documentation desynchronization through automated validation

**Changes**:

1. **scripts/validate-ai-docs.sh** - Created (~350 lines):
   - Validates three-layer architecture consistency across AGENTS.md, CLAUDE.md, copilot-instructions.md
   - Checks critical rules consistency (token imports, primitives restrictions)
   - Verifies build commands consistency
   - Validates YAML frontmatter (only description, applyTo, name)
   - Checks markdown links validity
   - Warns about file size limits (CLAUDE.md token limit)
   - Verifies config.toml references
   - Checks package scope consistency (@grasdouble/)
   - Color-coded output (errors, warnings, success)
   - Exit codes: 0 (success), 1 (failure)

2. **scripts/README.md** - Created (~150 lines):
   - Documentation for validate-ai-docs.sh
   - Usage instructions
   - Common errors and fixes table
   - Guidelines for adding new scripts
   - Best practices

3. **.github/workflows/validate-docs.yml** - Created (~60 lines):
   - CI workflow for automatic validation
   - Triggers: Pull requests, pushes to main, manual dispatch
   - Paths filter (AGENTS.md, CLAUDE.md, config.toml, .github/instructions/*, etc.)
   - Automatic PR comment on validation failure
   - Clear error messages with links to documentation

4. **package.json** - Modified:
   - Added validate:docs script section
   - Command: `bash scripts/validate-ai-docs.sh`
   - Consistent with existing script organization

**Impact**: ~560 lines added, critical protection against documentation drift, CI/CD integration

## Version Control and Changes

### When to Update This File

Update this maintenance file when:
- Adding new documentation files or changing file structure
- Modifying the multi-agent compatibility approach
- Completing major documentation improvements (new "Phase")
- Changing core principles or architecture

### Changeset Requirements

Documentation changes typically require changesets only if they affect:
- Public API documentation
- Breaking changes in development workflow
- New features or capabilities

For documentation-only improvements:
```bash
# Usually no changeset needed for docs-only changes
git commit -m "docs: improve multi-agent compatibility"
```

For documentation accompanying code changes:
```bash
pnpm changeset
# Select affected packages
# Choose version bump type (usually patch for docs)
# Describe changes
```

## Common Maintenance Tasks

### Adding Support for a New AI Agent

1. Research agent's documentation format and conventions
2. Update AGENTS.md compatibility section:
   - Add to "Supported Agents and Their Files" table
   - Add setup instructions
3. Update Extended Compatibility Matrix
4. Create agent-specific file if needed (e.g., `.cursor/index.mdc`)
5. Test with the actual agent if possible
6. Update this file's Implementation History

### Fixing Broken Links

**Common causes**:
- File moved or renamed
- Anchor changed in target file
- Relative path incorrect

**Detection**:
```bash
# Search for markdown links
grep -r "\[.*\](.*)" .github/ AGENTS.md CLAUDE.md CONVENTIONS.md QUICKSTART.md
```

**Fix**:
1. Verify target file exists
2. Check anchor exists in target file (use `grep` or file search)
3. Use relative paths from source file location
4. Test link works in IDE and rendered markdown

### Updating for New Project Architecture

When project architecture changes:

1. **Update AGENTS.md first**:
   - Quick Start section (Essential Context)
   - Design System Three-Layer Architecture section
   - Common Patterns section
   - Troubleshooting section

2. **Update CLAUDE.md**:
   - Critical rules section
   - Quick Command Reference

3. **Update affected .instructions.md files**:
   - Technology-specific impacts
   - Pattern changes

4. **Update QUICKSTART.md**:
   - If setup process changes
   - If common commands change

5. **Test with multiple agents**:
   - Ask agents to explain the architecture
   - Verify they reference correct files

## Quality Checklist

Before committing documentation changes:

- [ ] **No duplication**: Content not duplicated across files (link instead)
- [ ] **Cross-references working**: All links tested and functional
- [ ] **Consistent formatting**: Markdown follows project style
- [ ] **Agent compatibility**: Changes work with multiple agents
- [ ] **Examples complete**: All code examples are runnable and correct
- [ ] **YAML frontmatter**: Only supported fields used in .instructions.md files
- [ ] **Line length**: Reasonable (prefer <120 chars for readability)
- [ ] **This file updated**: Implementation History section updated if significant changes

## Troubleshooting Documentation Issues

### Problem: Agent not loading instructions

**GitHub Copilot**:
- Check `.github/copilot-instructions.md` exists
- Verify YAML frontmatter in `.instructions.md` files
- Ensure `applyTo` patterns match file types

**Claude Code**:
- Check `CLAUDE.md` exists in project root
- Verify file is valid markdown
- Keep file under 250 lines (token limit)

**Aider**:
- Check `CONVENTIONS.md` exists or `.aider.conf.yml` configured
- Verify `read: AGENTS.md` in config

### Problem: Warnings about unsupported YAML fields

**Cause**: GitHub Copilot only supports `applyTo`, `description`, `name`

**Solution**: Remove unsupported fields like `related_docs`, `agent_compatible`, `last_updated`

### Problem: Documentation out of sync

**Detection**:
```bash
# Check for mentions of old patterns
grep -r "old-pattern-name" .github/ *.md

# Or use automatic validation
pnpm validate:docs
```

**Solution**:
1. Run `pnpm validate:docs` to identify inconsistencies
2. Review errors and warnings from validation script
3. Update in order: AGENTS.md → CLAUDE.md → .instructions.md → QUICKSTART.md
4. Search for all references to changed concept
5. Update consistently across all files
6. Re-run `pnpm validate:docs` to verify fixes

## Resources

- [AGENTS.md Standard](https://agents.md/)
- [GitHub Copilot Instructions Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Related Documentation

For comprehensive project documentation, see:

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
  - Project overview and architecture
  - Setup and development workflow
  - Code patterns and examples
  - Troubleshooting guides

- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot instructions
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** - Contribution workflow

**This file is automatically applied by GitHub Copilot when working in matching file paths.**
