# PRD Format Classification

This document defines how to detect and classify PRD formats.

## BMAD PRD Core Sections

The following sections define a BMAD-compliant PRD:

1. Executive Summary
2. Success Criteria
3. Product Scope
4. User Journeys
5. Functional Requirements
6. Non-Functional Requirements

## Format Classification Rules

Based on the presence of core sections:

- **BMAD Standard**: 5-6 core sections present
- **BMAD Variant**: 3-4 core sections present, generally follows BMAD patterns
- **Legacy (Non-Standard)**: Fewer than 3 core sections, does not follow BMAD structure

## Detection Process

1. Extract all ## Level 2 headers from the PRD
2. Match against the core sections list
3. Count matches
4. Apply classification rules based on match count
