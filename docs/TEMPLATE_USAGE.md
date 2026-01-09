# Using This Repository as a Template

This guide explains how to use this boilerplate as a template for your new React Native project.

## Quick Start

### Method 1: Use as GitHub Template

1. Click the "Use this template" button on GitHub
2. Create your new repository
3. Clone your new repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git
   cd YOUR_PROJECT_NAME
   ```

### Method 2: Clone Directly

```bash
git clone https://github.com/niksbanna/ReactNative-Boilerplate.git YOUR_PROJECT_NAME
cd YOUR_PROJECT_NAME
rm -rf .git
git init
git add .
git commit -m "Initial commit from boilerplate"
```

## Customization Steps

After creating your project from this template, follow these steps:

### 1. Update Project Identity

#### package.json

```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  ...
}
```

#### app.json

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

### 2. Update App Identifiers

The template uses:
- iOS: `com.niksbanna.reactnativeboilerplate`
- Android: `com.niksbanna.reactnativeboilerplate`

**Replace with your identifiers:**

1. **app.json**: Update `ios.bundleIdentifier` and `android.package`
2. **eas.json**: Identifiers are inherited from app.json
3. **README.md**: Update references to bundle identifiers

### 3. Configure EAS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Update project ID in app.json
```

The configuration will generate a project ID:

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-generated-project-id"
      }
    }
  }
}
```

### 4. Update Assets

Replace placeholder assets in `/assets`:

- **icon.png**: Your app icon (1024x1024px)
- **splash.png**: Your splash screen
- **adaptive-icon.png**: Android adaptive icon
- **favicon.png**: Web favicon

### 5. Configure Environment

Update `.env` with your API endpoints:

```env
API_BASE_URL=https://your-api.com
API_TIMEOUT=10000
NODE_ENV=development
```

### 6. Update Documentation

Update these files with your project info:

- **README.md**: Replace project description, URLs, badges
- **CONTRIBUTING.md**: Update contact methods, project-specific guidelines
- **CODE_OF_CONDUCT.md**: Update contact information
- **CHANGELOG.md**: Start fresh or keep as reference
- **LICENSE**: Update copyright holder and year

### 7. Configure Git Repository

```bash
# Set your remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_PROJECT.git

# Push your code
git push -u origin main
```

### 8. Set Up GitHub Secrets

For CI/CD and EAS builds, add these secrets in GitHub:

1. Go to Settings → Secrets and variables → Actions
2. Add:
   - `EXPO_TOKEN`: Your Expo access token ([Get it here](https://expo.dev/accounts/[account]/settings/access-tokens))

### 9. Customize Theme

Update design tokens in `app/theme/tokens.ts`:

```typescript
export const colors = {
  light: {
    primary: '#YOUR_PRIMARY_COLOR',
    secondary: '#YOUR_SECONDARY_COLOR',
    // ... other colors
  }
}
```

### 10. Remove Template Code (Optional)

If you want to start fresh:

#### Remove Example Screens

```bash
# Keep the structure but clear implementations
rm -rf app/screens/auth/*
rm -rf app/screens/main/*
```

#### Remove Example API

```bash
rm app/store/services/posts.ts
```

Update `app/store/index.ts` accordingly.

## Project-Specific Configuration

### Analytics

Add your analytics provider:

```bash
npm install @react-native-firebase/analytics
# or
npm install react-native-mixpanel
```

Update environment variables and add analytics service.

### Error Tracking

Add Sentry:

```bash
npx expo install sentry-expo
```

Configure in app.json:

```json
{
  "expo": {
    "plugins": [
      [
        "sentry-expo",
        {
          "organization": "your-org",
          "project": "your-project"
        }
      ]
    ]
  }
}
```

### App Store Configuration

#### iOS

1. Create App ID in Apple Developer Console
2. Update bundle identifier
3. Configure signing in Xcode
4. Update app.json with App Store Connect info

#### Android

1. Generate keystore:
   ```bash
   keytool -genkey -v -keystore my-app.keystore -alias my-app -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Configure in eas.json:
   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "app-bundle"
         }
       }
     }
   }
   ```

### Push Notifications

Set up push notifications:

```bash
npx expo install expo-notifications
```

Configure in app.json for FCM/APNs.

## Maintaining Your Fork

### Pulling Updates from Template

If you want to get updates from the original template:

```bash
# Add template as upstream
git remote add template https://github.com/niksbanna/ReactNative-Boilerplate.git

# Fetch template changes
git fetch template

# Merge changes (resolve conflicts if any)
git merge template/main

# Or cherry-pick specific commits
git cherry-pick <commit-hash>
```

### Creating Your Own Template

To make your customized version a template:

1. Go to GitHub repository Settings
2. Check "Template repository"
3. Others can now use your version as a template

## Release Process

### Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

### Creating a Release

1. Update version:
   ```bash
   # In package.json and app.json
   "version": "1.0.0"
   ```

2. Update CHANGELOG.md

3. Commit changes:
   ```bash
   git add .
   git commit -m "chore: bump version to 1.0.0"
   ```

4. Create tag:
   ```bash
   git tag -a v1.0.0 -m "Release 1.0.0"
   git push origin v1.0.0
   ```

5. Create GitHub Release with notes

### EAS Builds for Release

```bash
# iOS Production
eas build --platform ios --profile production

# Android Production
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## Troubleshooting

### Duplicate Bundle Identifier

If you get bundle identifier conflicts:

1. Ensure all references are updated in:
   - app.json
   - ios/ folder (if generated)
   - android/ folder (if generated)

2. Clean and rebuild:
   ```bash
   rm -rf ios android
   npx expo prebuild --clean
   ```

### EAS Build Errors

- Verify EXPO_TOKEN is set in GitHub secrets
- Check eas.json configuration
- Ensure app.json has correct bundle identifiers
- Review build logs for specific errors

### Module Resolution

If you change the app structure:

1. Update tsconfig.json paths
2. Update babel.config.js alias
3. Restart Metro bundler

## Best Practices

1. **Don't commit secrets**: Use .env (gitignored)
2. **Update dependencies**: Run `npm outdated` regularly
3. **Write tests**: Maintain test coverage
4. **Document changes**: Update README for major features
5. **Follow conventions**: Use linting and formatting rules
6. **Use branches**: Feature branches and PRs for changes
7. **Tag releases**: Use semantic versioning for tags

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Guidelines](https://play.google.com/about/developer-content-policy/)

## Support

If you encounter issues specific to this template:

1. Check [GitHub Issues](https://github.com/niksbanna/ReactNative-Boilerplate/issues)
2. Create a new issue with:
   - Template version
   - Steps to reproduce
   - Error messages
   - Environment details
