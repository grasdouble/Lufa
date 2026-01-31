# PRD Completeness Validation Checklist

This document defines the completeness validation checklist for BMAD PRDs.

## Template Completeness

Check for unresolved template variables:

- **Template variables found**: Count of variables like `{placeholder}`, `[TBD]`, etc.
- **List variables**: If found, list each with line number
- **Severity**: CRITICAL if any template variables remain

## Content Completeness by Section

For each core BMAD section, assess completeness:

- **Executive Summary**: Complete / Incomplete / Missing
- **Success Criteria**: Complete / Incomplete / Missing
- **Product Scope**: Complete / Incomplete / Missing
- **User Journeys**: Complete / Incomplete / Missing
- **Functional Requirements**: Complete / Incomplete / Missing
- **Non-Functional Requirements**: Complete / Incomplete / Missing
- **Other sections**: List completeness for domain/project-specific sections

### Completeness Criteria

- **Complete**: Section present with substantive content addressing all key aspects
- **Incomplete**: Section present but missing key information or details
- **Missing**: Section entirely absent from PRD

## Section-Specific Completeness

Validate quality indicators for key sections:

- **Success criteria measurable**: All / Some / None
  - Are all success criteria quantifiable and testable?
- **Journeys cover all users**: Yes / Partial / No
  - Are all user types from Success Criteria section covered?
- **FRs cover MVP scope**: Yes / Partial / No
  - Do functional requirements address all in-scope items?
- **NFRs have specific criteria**: All / Some / None
  - Are non-functional requirements measurable (not vague)?

## Frontmatter Completeness

Validate required frontmatter fields:

- **stepsCompleted**: Present / Missing
- **classification**: Present / Missing (domain, projectType, complexity)
- **inputDocuments**: Present / Missing
- **date**: Present / Missing

## Overall Completeness Assessment

Summarize findings:

- **Sections complete**: X/Y (ratio of complete sections)
- **Critical gaps**: List any missing or severely incomplete sections
- **Template status**: Clean (no variables) or Has variables
- **Ready for use**: Yes / No
