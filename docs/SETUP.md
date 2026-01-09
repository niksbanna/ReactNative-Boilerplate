# Setup Guide

This guide will help you set up the React Native Boilerplate for development.

## Prerequisites

### Required Software

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Watchman**: For file watching (Mac/Linux) ([Download](https://facebook.github.io/watchman/))

### Platform-Specific Requirements

#### iOS Development (Mac only)

- **Xcode**: Latest version from Mac App Store
- **Xcode Command Line Tools**:
  ```bash
  xcode-select --install
  ```
- **CocoaPods**:
  ```bash
  sudo gem install cocoapods
  ```

#### Android Development

- **Android Studio**: Latest version ([Download](https://developer.android.com/studio))
- **Android SDK**: Install via Android Studio
- **Java Development Kit (JDK)**: Version 11 or higher

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/niksbanna/ReactNative-Boilerplate.git
cd ReactNative-Boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native dependencies
- Expo SDK
- Redux Toolkit
- Navigation libraries
- Development tools

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
API_BASE_URL=https://jsonplaceholder.typicode.com
API_TIMEOUT=10000

# Environment
NODE_ENV=development

# Feature Flags
ENABLE_DEV_TOOLS=true
ENABLE_LOGGING=true
```

### 4. Install iOS Dependencies (Mac only)

```bash
cd ios
pod install
cd ..
```

### 5. Start the Development Server

```bash
npm start
```

This will start the Expo development server.

### 6. Run on Device/Simulator

#### iOS (Mac only)

```bash
npm run ios
```

Or press `i` in the Expo CLI.

#### Android

```bash
npm run android
```

Or press `a` in the Expo CLI.

#### Physical Device

1. Install Expo Go app from App Store or Play Store
2. Scan the QR code shown in the terminal

## Editor Setup

### Visual Studio Code (Recommended)

#### Install Extensions

1. **ESLint**: For linting
2. **Prettier**: For code formatting
3. **React Native Tools**: For debugging
4. **TypeScript**: Better TypeScript support
5. **Path Intellisense**: Auto-complete paths

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Other Editors

- **WebStorm**: Built-in support for React Native
- **Atom**: Install react-native package
- **Sublime Text**: Install JavaScript packages

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues

**Clear cache and restart:**

```bash
npm start -- --reset-cache
```

#### 2. iOS Build Fails

**Clean and rebuild:**

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

#### 3. Android Build Fails

**Clean Gradle cache:**

```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### 4. Module Not Found Errors

**Reinstall dependencies:**

```bash
rm -rf node_modules
npm install
```

#### 5. Expo Go Connection Issues

- Ensure your device and computer are on the same network
- Try using tunnel mode: `npm start -- --tunnel`
- Check firewall settings

### Platform-Specific Issues

#### iOS

**Error: Unable to boot device**

Reset iOS Simulator:
```bash
xcrun simctl erase all
```

**Code Signing Errors**

Open project in Xcode and configure signing manually.

#### Android

**SDK not found**

Set ANDROID_HOME environment variable:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Gradle daemon issues**

Stop all Gradle daemons:
```bash
cd android
./gradlew --stop
cd ..
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

Write your code following the project structure and conventions.

### 3. Run Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm test
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

The pre-commit hook will automatically run linting and formatting.

### 5. Push and Create PR

```bash
git push origin feature/my-feature
```

Then create a pull request on GitHub.

## Useful Commands

### Development

```bash
npm start                 # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run web              # Run in browser
```

### Quality Checks

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run type-check       # Run TypeScript checks
```

### Testing

```bash
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### Building

```bash
npm run build            # Build for production (web)
```

### EAS Build

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios --profile development

# Build for Android
eas build --platform android --profile development
```

## Next Steps

After setup is complete:

1. Read the [Architecture Documentation](./ARCHITECTURE.md)
2. Check [Contributing Guidelines](../CONTRIBUTING.md)
3. Explore the example screens and components
4. Start building your features!

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search [GitHub Issues](https://github.com/niksbanna/ReactNative-Boilerplate/issues)
3. Create a new issue with details about your problem
4. Join our community discussions

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/)
