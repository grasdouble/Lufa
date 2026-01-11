# Claude Skills

This directory contains 13 specialized skills that extend Claude's capabilities with domain-specific knowledge, workflows, and tool integrations. Skills are modular packages that transform Claude into a specialized agent for specific tasks.

> 💡 **Skills source**: All skills are sourced from [Anthropic's official skills repository](https://github.com/anthropics/skills). See individual `source.md` files for attribution.

---

## 📚 What Are Skills?

Skills are self-contained packages that provide:
1. **Specialized workflows** - Multi-step procedures for specific domains
2. **Tool integrations** - Instructions for working with specific formats or APIs
3. **Domain expertise** - Specialized knowledge and business logic
4. **Bundled resources** - Scripts, references, and assets for complex tasks

Each skill consists of:
- `SKILL.md` (required) - Instructions and metadata
- `scripts/` (optional) - Executable code for deterministic tasks
- `references/` (optional) - Documentation loaded as needed
- `templates/` or `assets/` (optional) - Files used in output
- `source.md` - Attribution to original source

---

## 📚 Available Skills

### Development & Engineering

#### 💻 MCP Builder
**Directory**: [mcp-builder/](mcp-builder/)
**Purpose**: Create high-quality MCP (Model Context Protocol) servers

**Use when**:
- Building MCP servers to integrate external APIs or services
- Working with Python (FastMCP) or Node/TypeScript (MCP SDK)
- Creating tools that enable LLMs to interact with external services

**Key capabilities**:
- Deep research and planning for MCP architecture
- API coverage vs. workflow tools balance
- Tool naming and discoverability patterns
- Context management for agents
- Actionable error message design

**Bundled resources**:
- References and documentation
- Scripts for MCP development

---

#### 🎯 Skill Creator
**Directory**: [skill-creator/](skill-creator/)
**Purpose**: Guide for creating effective skills

**Use when**:
- Creating a new skill for Claude
- Updating existing skills
- Extending Claude's capabilities with specialized knowledge

**Key capabilities**:
- Skill anatomy and structure
- Best practices for concise instructions
- Appropriate degrees of freedom (high/medium/low)
- Bundled resource guidelines
- Testing and validation strategies

**Bundled resources**:
- References for skill creation patterns
- Scripts for skill scaffolding

---

#### 🧪 Webapp Testing
**Directory**: [webapp-testing/](webapp-testing/)
**Purpose**: Comprehensive web application testing strategies

**Use when**:
- Creating test strategies for web applications
- Writing E2E or integration tests
- Debugging test failures
- Setting up testing infrastructure

**Key capabilities**:
- Test planning and organization
- Framework selection guidance
- Best practices for reliable tests
- Debugging strategies

**Bundled resources**:
- Testing scripts and utilities
- Reference documentation

---

### Design & Creative

#### 🎨 Frontend Design
**Directory**: [frontend-design/](frontend-design/)
**Purpose**: Create distinctive, production-grade frontend interfaces

**Use when**:
- Building web components, pages, or applications
- Creating landing pages, dashboards, or React components
- Styling or beautifying web UI
- Avoiding generic AI aesthetics

**Key capabilities**:
- Bold aesthetic direction and design thinking
- Typography and font selection
- Color theory and theming
- Motion and animations (CSS, Motion library)
- Spatial composition and layouts
- Background effects and visual details

**Bundled resources**:
- Templates for common patterns
- Reference designs

---

#### 🎭 Canvas Design
**Directory**: [canvas-design/](canvas-design/)
**Purpose**: Create visual designs using HTML Canvas API

**Use when**:
- Creating interactive graphics
- Building data visualizations
- Generating dynamic visual content
- Working with Canvas API

**Key capabilities**:
- Canvas API workflows
- Interactive graphics patterns
- Performance optimization
- Animation techniques

**Bundled resources**:
- Canvas templates
- Example scripts

---

#### 🌈 Theme Factory
**Directory**: [theme-factory/](theme-factory/)
**Purpose**: Design and generate cohesive design themes

**Use when**:
- Creating design systems
- Generating color palettes
- Building theming infrastructure
- Establishing visual identity

**Key capabilities**:
- Theme generation workflows
- Color palette creation
- Design token systems
- Visual consistency patterns

**Bundled resources**:
- Theme templates
- Color generation scripts

---

#### 🎨 Algorithmic Art
**Directory**: [algorithmic-art/](algorithmic-art/)
**Purpose**: Generate creative algorithmic art and generative designs

**Use when**:
- Creating generative art
- Procedural design generation
- Artistic visualizations
- Creative coding projects

**Key capabilities**:
- Algorithmic art patterns
- Generative design workflows
- Creative coding techniques
- Visual algorithm implementation

**Bundled resources**:
- Algorithm examples
- Art generation templates
- Reference implementations

---

### Communication & Documentation

#### 📝 Doc Coauthoring
**Directory**: [doc-coauthoring/](doc-coauthoring/)
**Purpose**: Collaborative documentation writing and editing

**Use when**:
- Writing technical documentation
- Collaborating on documentation
- Structuring knowledge bases
- Creating user guides

**Key capabilities**:
- Documentation structure patterns
- Collaborative editing workflows
- Content organization
- Style consistency

**Bundled resources**:
- Documentation templates
- Style guides

---

#### 💬 Internal Communications
**Directory**: [internal-comms/](internal-comms/)
**Purpose**: Create effective internal communications

**Use when**:
- Writing team announcements
- Creating internal newsletters
- Drafting company communications
- Structuring team updates

**Key capabilities**:
- Communication tone and style
- Message structuring
- Audience targeting
- Clarity and conciseness

**Bundled resources**:
- Communication templates
- Examples and references

---

#### 🎯 Slack GIF Creator
**Directory**: [slack-gif-creator/](slack-gif-creator/)
**Purpose**: Generate engaging GIFs for Slack communications

**Use when**:
- Creating visual content for Slack
- Generating reaction GIFs
- Building team engagement content
- Visual communication in chat

**Key capabilities**:
- GIF generation workflows
- Animation techniques
- Slack-optimized formats
- Creative visual communication

**Bundled resources**:
- GIF generation scripts
- Template animations

---

### Specialized Tools

#### 📄 Web Artifacts Builder
**Directory**: [web-artifacts-builder/](web-artifacts-builder/)
**Purpose**: Build and package web artifacts

**Use when**:
- Creating distributable web components
- Packaging web applications
- Building reusable artifacts
- Component library development

**Key capabilities**:
- Artifact packaging workflows
- Build optimization
- Distribution patterns
- Versioning strategies

**Bundled resources**:
- Build scripts
- Packaging templates

---

#### 🎨 Brand Guidelines
**Directory**: [brand-guidelines/](brand-guidelines/)
**Purpose**: Develop and maintain brand identity guidelines

**Use when**:
- Creating brand guidelines
- Documenting visual identity
- Establishing brand consistency
- Design system documentation

**Key capabilities**:
- Brand guideline structure
- Visual identity documentation
- Consistency enforcement
- Usage examples

**Bundled resources**:
- Brand guideline templates
- Example guidelines

---

## 🎯 How to Use Skills

### With Claude Code (CLI)

Skills are automatically discovered and loaded based on their descriptions:

```bash
# Skills load automatically when relevant
claude code

# Then ask Claude for skill-related tasks:
"Create a new MCP server for GitHub API"
"Build a distinctive landing page"
"Generate a color palette for my design system"
```

Claude will automatically use the appropriate skill when the task matches the skill's description.

### Explicit Skill Invocation

You can explicitly reference a skill:

```
Use the frontend-design skill to create a landing page
Apply the mcp-builder skill to create a GitHub MCP server
Follow the skill-creator skill to build a new custom skill
```

### Understanding Skill Structure

Each skill contains:

```
skill-name/
├── SKILL.md          # Main instructions (required)
├── source.md         # Attribution to Anthropic repository
├── LICENSE.txt       # License information
├── scripts/          # Executable code (optional)
├── references/       # Documentation (optional)
├── templates/        # Output templates (optional)
├── assets/           # Files used in output (optional)
└── examples/         # Usage examples (optional)
```

---

## 📊 Skill Categories

| Category | Skills | Purpose |
|----------|--------|---------|
| **Development & Engineering** | 3 | MCP servers, skills, testing |
| **Design & Creative** | 4 | Frontend design, canvas, themes, generative art |
| **Communication & Docs** | 3 | Documentation, internal comms, Slack GIFs |
| **Specialized Tools** | 2 | Web artifacts, brand guidelines |
| **Total** | **13** | - |

---

## 🎓 Core Principles

### Concise is Key

Skills share Claude's context window with everything else. Only add context Claude doesn't already have. Challenge each piece of information: "Does Claude really need this?" and "Does this justify its token cost?"

**Prefer concise examples over verbose explanations.**

### Degrees of Freedom

Skills match specificity to task fragility:

- **High freedom** (text instructions): Multiple valid approaches, decisions depend on context
- **Medium freedom** (pseudocode/scripts with parameters): Preferred pattern exists, some variation OK
- **Low freedom** (specific scripts, few parameters): Fragile operations, consistency critical

### When to Create a Skill

Create a skill when:
- The same task is repeatedly requested with similar patterns
- Specialized domain knowledge is needed that Claude lacks
- Deterministic code execution improves reliability
- Bundled resources (scripts, templates) add value
- The workflow benefits from structured guidance

---

## 💡 Best Practices

### For Developers

1. **Explore skills**: Review SKILL.md files to understand capabilities
2. **Trust automation**: Skills load automatically when relevant
3. **Explicit when needed**: Reference skills explicitly for clarity
4. **Contribute improvements**: Skills can be updated and enhanced

### For Skill Creation

1. **Start with skill-creator**: Use the skill-creator skill to guide development
2. **Keep it concise**: Every token counts in the context window
3. **Test thoroughly**: Validate skills with real use cases
4. **Document clearly**: Write clear, actionable instructions
5. **Bundle wisely**: Only include resources that add value

---

## 🔗 Related Documentation

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/agents/README.md](../agents/README.md)** - Custom AI agents
- **[.github/prompts/README.md](../prompts/README.md)** - Reusable prompts
- **[.github/instructions/README.md](../instructions/README.md)** - Path-scoped instructions
- **[Anthropic Skills Repository](https://github.com/anthropics/skills)** - Official skills source

---

## 📝 Creating New Skills

To create a new skill:

1. **Use the skill-creator skill**: Let it guide you through the process
2. **Follow the structure**:
   - Create `skill-name/` directory
   - Add required `SKILL.md` with YAML frontmatter
   - Include optional bundled resources
3. **YAML frontmatter format**:
```yaml
---
name: skill-name
description: Clear description of when to use this skill. Include keywords and use cases.
license: Complete terms in LICENSE.txt (if from Anthropic repository)
---
```
4. **Write concise instructions**: Focus on what Claude doesn't already know
5. **Add bundled resources**: Scripts, templates, references as needed
6. **Add to this README**: Document the new skill
7. **Test with real scenarios**: Validate effectiveness

---

## 🌐 Attribution

All skills in this directory are sourced from [Anthropic's official skills repository](https://github.com/anthropics/skills) (commit: `69c0b1a0674149f27b61b2635f935524b6add202`).

Each skill includes:
- `source.md` - Link to original source
- `LICENSE.txt` - Original license terms

**License**: Skills retain their original licenses from the Anthropic repository. See individual `LICENSE.txt` files.

---

## 📜 Removed Skills History

Skills removed from active use. Available in Git history if needed.

| Skill | Category | Removed | Reason |
|-------|----------|---------|--------|
| *(None yet)* | - | - | - |

**Restoration**: Recover from Git with:
```bash
git log --all --full-history -- ".github/skills/<skill-name>/"
git checkout <commit-hash> -- ".github/skills/<skill-name>/"
```

---

## 🎯 Quick Reference by Use Case

### Web Development
**Use**: [frontend-design](frontend-design/), [web-artifacts-builder](web-artifacts-builder/), [webapp-testing](webapp-testing/)

### API Integration
**Use**: [mcp-builder](mcp-builder/)

### Design Work
**Use**: [frontend-design](frontend-design/), [canvas-design](canvas-design/), [theme-factory](theme-factory/), [algorithmic-art](algorithmic-art/)

### Documentation
**Use**: [doc-coauthoring](doc-coauthoring/), [brand-guidelines](brand-guidelines/)

### Team Communication
**Use**: [internal-comms](internal-comms/), [slack-gif-creator](slack-gif-creator/)

### Extending Claude
**Use**: [skill-creator](skill-creator/)

---

**Need help?** See [AGENTS.md](../../AGENTS.md) for complete project documentation.
