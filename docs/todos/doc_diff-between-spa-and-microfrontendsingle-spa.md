# SPA vs. single-spa Architecture

## Summary

### Single Page Application (SPA)

- **Definition**: A web application that operates on a single HTML page.
- **Functionality**: Dynamically updates content without full page reloads.
- **Frameworks**: Commonly uses frameworks like React, Angular, and Vue.js.
- **User Experience**: Provides a smooth, app-like experience.

### single-spa

- **Definition**: A JavaScript framework for building micro-frontends.
- **Functionality**: Orchestrates multiple micro-frontends (each can be a SPA or part of a SPA) into a single application.
- **Flexibility**: Allows using multiple frameworks or libraries within the same application (e.g., React and Angular).
- **Maintenance**: Enables independent development, deployment, and maintenance of each micro-frontend.

## Key Differences

- **SPA**: Single application with dynamic content updates, usually using one framework.
- **single-spa**: Combines multiple micro-frontends into one application, allowing the use of multiple frameworks.
