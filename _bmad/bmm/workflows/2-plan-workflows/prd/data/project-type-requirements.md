# Project-Type Specific Requirements Reference

This document defines required and excluded sections for different project types used in validation.

## api_backend

**Required:**

- Endpoint Specs
- Auth Model
- Data Schemas
- API Versioning

**Excluded:**

- UX/UI sections
- Mobile-specific sections

## web_app

**Required:**

- User Journeys
- UX/UI Requirements
- Responsive Design

**Excluded:**

- None typically

## mobile_app

**Required:**

- Mobile UX
- Platform specifics (iOS/Android)
- Offline mode

**Excluded:**

- Desktop-specific sections

## desktop_app

**Required:**

- Desktop UX
- Platform specifics (Windows/Mac/Linux)

**Excluded:**

- Mobile-specific sections

## data_pipeline

**Required:**

- Data Sources
- Data Transformation
- Data Sinks
- Error Handling

**Excluded:**

- UX/UI sections

## ml_system

**Required:**

- Model Requirements
- Training Data
- Inference Requirements
- Model Performance

**Excluded:**

- UX/UI sections (unless ML UI)

## library_sdk

**Required:**

- API Surface
- Usage Examples
- Integration Guide

**Excluded:**

- UX/UI sections
- Deployment sections

## infrastructure

**Required:**

- Infrastructure Components
- Deployment
- Monitoring
- Scaling

**Excluded:**

- Feature requirements (this is infrastructure, not product)
