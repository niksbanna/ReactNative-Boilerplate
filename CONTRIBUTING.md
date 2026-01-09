# Contributing to React Native Boilerplate

First off, thank you for considering contributing to React Native Boilerplate! It's people like you that make this boilerplate a great tool for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Strategy](#branch-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- iOS development: Xcode (Mac only)
- Android development: Android Studio

### Setup Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ReactNative-Boilerplate.git
   cd ReactNative-Boilerplate
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/niksbanna/ReactNative-Boilerplate.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

6. Set up git hooks:
   ```bash
   npm run prepare
   ```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch from `main` for your work:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-biometric-auth`)
- `fix/` - Bug fixes (e.g., `fix/navigation-crash`)
- `docs/` - Documentation changes (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-api-client`)
- `test/` - Test additions or modifications (e.g., `test/add-button-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### 2. Make Your Changes

- Write clean, readable code following our [coding standards](#coding-standards)
- Add tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

### 3. Run Quality Checks

Before committing, ensure your code passes all checks:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add biometric authentication"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Branch Strategy

We follow a simplified Git flow:

### Main Branch
- `main` - Production-ready code
- All releases are tagged from `main`
- Protected branch (requires PR and review)

### Feature Branches
- Created from `main`
- Merged back to `main` via PR
- Deleted after merge

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, etc.
- `ci`: Changes to CI configuration files and scripts

### Examples

```bash
# Feature
git commit -m "feat: add dark mode toggle to settings"

# Bug fix
git commit -m "fix: resolve navigation state persistence issue"

# Documentation
git commit -m "docs: update installation instructions"

# Refactoring
git commit -m "refactor: simplify authentication logic"

# Breaking change
git commit -m "feat!: migrate to Expo SDK 51

BREAKING CHANGE: This update requires Node.js 18+
```

## Pull Request Process

### Before Submitting

1. ✅ Update documentation if needed
2. ✅ Add/update tests
3. ✅ Run all quality checks locally
4. ✅ Rebase on latest `main` if needed
5. ✅ Ensure CI passes

### PR Title

Use the same format as commit messages:

```
feat: add biometric authentication
fix: resolve navigation crash on Android
```

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Manual testing
- [ ] Unit tests
- [ ] Integration tests

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### Review Process

1. At least one maintainer must review the PR
2. All CI checks must pass
3. All review comments must be addressed
4. PRs should be kept up-to-date with `main`

### Merging

- Squash and merge for feature branches
- Maintainers will merge approved PRs
- Delete branch after merge

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Define types for all props and state
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes
- Use type aliases for unions and primitives

```typescript
// ✅ Good
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// ❌ Bad
const Button = (props: any) => { ... }
```

### React/React Native

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use memo for expensive components
- Avoid inline styles

```typescript
// ✅ Good
const MyComponent: React.FC<Props> = ({ title }) => {
  const { theme } = useTheme();
  return <Text style={styles.title}>{title}</Text>;
};

// ❌ Bad
const MyComponent = (props) => {
  return <Text style={{ fontSize: 16 }}>{props.title}</Text>;
};
```

### File Naming

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)

### Import Order

1. React/React Native imports
2. Third-party libraries
3. Local imports (absolute paths)
4. Relative imports
5. Types

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components';
import { useAuth } from '@/hooks';

import { formatDate } from './utils';
import type { UserProfile } from './types';
```

### ESLint & Prettier

- ESLint and Prettier are configured and enforced
- Pre-commit hooks will automatically format code
- Fix linting issues before committing:
  ```bash
  npm run lint:fix
  npm run format
  ```

## Testing Requirements

### Unit Tests

- Write tests for all new components
- Test business logic thoroughly
- Aim for >80% code coverage for new code
- Use descriptive test names

```typescript
describe('Button', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<Button title="Click me" onPress={() => {}} />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click me" onPress={onPress} />);
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

- Test user flows
- Test navigation
- Test API integration

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Documentation

### Code Comments

- Write self-documenting code when possible
- Add comments for complex logic
- Document public APIs
- Use JSDoc for functions

```typescript
/**
 * Formats a date string into a user-friendly format
 * @param date - ISO date string
 * @param format - Desired format (default: 'MM/DD/YYYY')
 * @returns Formatted date string
 */
export const formatDate = (date: string, format = 'MM/DD/YYYY'): string => {
  // Implementation
};
```

### README Updates

- Update README.md when adding features
- Keep examples up-to-date
- Update dependency versions

### Storybook Stories

- Add stories for new components
- Document component props
- Show different states/variants

```typescript
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => (
  <Button title="Primary Button" variant="primary" onPress={() => {}} />
);
```

## Getting Help

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Join our community (if applicable)
- Tag maintainers for urgent issues

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing! 🎉
