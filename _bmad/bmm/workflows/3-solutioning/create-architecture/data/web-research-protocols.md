# Web Research Protocols for Architecture Workflow

This document provides standard web research query patterns used throughout the architecture workflow for discovering current technologies, versions, and best practices.

---

## Starter Template Research

### Initial Starter Discovery

Search for current, maintained starter templates:

```
Search the web: "{{primary_technology}} starter template CLI create command latest"
Search the web: "{{primary_technology}} boilerplate generator latest options"
Search the web: "{{primary_technology}} production-ready starter best practices"
```

### Detailed Starter Investigation

For each promising starter found, investigate details:

```
Search the web: "{{starter_name}} default setup technologies included latest"
Search the web: "{{starter_name}} project structure file organization"
Search the web: "{{starter_name}} production deployment capabilities"
Search the web: "{{starter_name}} recent updates maintenance status"
```

### CLI Command Research

Get the exact current commands for initialization:

```
Search the web: "{{starter_name}} CLI command options flags latest"
Search the web: "{{starter_name}} create new project command examples"
```

---

## Technology Version Research

### Framework/Library Versions

```
Search the web: "{{framework_name}} latest stable version release date"
Search the web: "{{framework_name}} current version best practices"
Search the web: "{{framework_name}} {{version}} breaking changes migration guide"
```

### Ecosystem Tool Versions

```
Search the web: "{{tool_name}} latest version compatibility {{primary_framework}}"
Search the web: "{{tool_name}} installation guide {{primary_framework}} latest"
```

---

## Best Practices Research

### Technology-Specific Patterns

```
Search the web: "{{technology}} best practices {{year}}"
Search the web: "{{technology}} production deployment checklist"
Search the web: "{{technology}} performance optimization guide"
```

### Integration Patterns

```
Search the web: "{{technology_a}} {{technology_b}} integration best practices"
Search the web: "{{technology_a}} {{technology_b}} starter template"
```

---

## Research Validation Principles

### Always Verify Currency

- ✅ Search for "latest" or current year
- ✅ Check "recent updates" or "maintenance status"
- ✅ Verify official documentation links
- ❌ NEVER trust hardcoded versions in step files
- ❌ NEVER assume version compatibility without checking

### Source Quality Assessment

Prioritize sources in this order:

1. **Official documentation** (primary technology website)
2. **Official GitHub repositories** (latest releases, issues)
3. **Reputable tech blogs** (Vercel, Netlify, web.dev)
4. **Community resources** (Dev.to, Medium with verification)

### Version Compatibility Checks

When combining technologies:

```
Search the web: "{{tech_a}} version {{version_a}} compatible with {{tech_b}} version {{version_b}}"
Search the web: "{{tech_a}} {{tech_b}} known issues compatibility"
```

---

## Usage Notes

- **Dynamic Research:** These are query patterns, not fixed results. Always execute searches dynamically.
- **Context Adaptation:** Replace placeholders ({{technology}}, {{version}}) with actual project values.
- **Multiple Sources:** Cross-reference multiple search results for validation.
- **Recency Bias:** Always prefer recent information (current year, "latest" qualifiers).
