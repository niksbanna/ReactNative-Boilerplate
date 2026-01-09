# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-09

### Added

#### Core Features
- Expo SDK 50 with TypeScript strict mode
- React Navigation with native-stack and bottom-tabs
- Authentication flow (Login, Register, Forgot Password)
- Redux Toolkit with RTK Query for state management
- Axios HTTP client with interceptors and auth injection
- Secure token storage with expo-secure-store
- Light/dark theme system with design tokens
- Form handling with react-hook-form and Zod validation

#### Components
- Reusable UI primitives: Button, Text, Input, Card
- Storybook integration for component development
- Theme-aware component system

#### Developer Tools
- ESLint + Prettier configuration
- Husky + lint-staged for pre-commit hooks
- Jest + React Native Testing Library
- TypeScript strict mode configuration
- Sample unit tests for components

#### Documentation
- Comprehensive README with setup instructions
- CONTRIBUTING.md with development workflow
- CODE_OF_CONDUCT.md (Contributor Covenant)
- Architecture documentation with diagrams
- Setup guide in docs folder

#### CI/CD
- GitHub Actions workflow for lint, typecheck, and tests
- Security audit workflow
- EAS Build workflow (manual trigger)
- Dependabot configuration for dependency updates

#### Configuration
- EAS build profiles (development, preview, production)
- Environment variable setup (.env.example)
- App identifiers configured for iOS and Android
- Mock data seed script

### Features in Detail

#### Authentication
- Secure token storage
- Auth gate pattern in navigation
- Token refresh placeholder
- Mock login/register/forgot password flows

#### State Management
- Redux store with typed hooks
- RTK Query service for Posts API (example)
- Auth slice for user state
- Automatic cache invalidation

#### Theming
- Design tokens (colors, spacing, typography, radius, shadows)
- Light and dark color schemes
- Theme context provider
- useTheme hook for components

#### Navigation
- Root navigator with auth guard
- Auth stack (Login, Register, Forgot Password)
- Main tabs (Home, Profile)
- Type-safe navigation

#### Data Fetching
- RTK Query integration
- Posts API example using jsonplaceholder
- Loading and error states
- Optimistic updates support

### Technical Details

#### Dependencies
- React Native 0.73.4
- Expo ~50.0.0
- TypeScript ^5.3.3
- Redux Toolkit ^2.0.1
- React Navigation ^6.1.9
- React Hook Form ^7.49.2
- Zod ^3.22.4
- Axios ^1.6.2

#### Project Structure
```
app/
├── components/       # Reusable UI components
├── navigation/       # Navigation configuration
├── screens/         # Screen components
├── services/        # API and storage services
├── store/           # Redux store and slices
├── theme/           # Design system
└── types/           # TypeScript types
```

### Notes

This is the initial release of the React Native Boilerplate. It provides a solid foundation for building production-ready React Native applications with best practices and modern tooling.

[1.0.0]: https://github.com/niksbanna/ReactNative-Boilerplate/releases/tag/v1.0.0
