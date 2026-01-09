# Known Issues and Notes

## Security Audit Warnings

This boilerplate uses Expo SDK 50, which has some known dependency vulnerabilities that are not critical for development:

### Current Vulnerabilities (Non-Critical)
- **semver** (7.0.0 - 7.5.1): Regular Expression Denial of Service (Low/Moderate)
  - This is used by Expo tooling and doesn't affect the runtime app
- **send** (<0.19.0): Template injection (High, but in dev tools only)
  - Used by Metro bundler during development, not in production builds

### Why These Are Safe for This Boilerplate
1. These vulnerabilities are in **development dependencies** (Expo CLI, Metro bundler)
2. They do **not affect the production build** of your app
3. The Expo team is aware and working on updates
4. Upgrading to Expo SDK 51+ will resolve most of these

### Recommended Actions
- **For new projects**: Consider using the latest Expo SDK
- **For this boilerplate**: These warnings are expected and acceptable
- **Monitor**: Check `npm audit` regularly for critical runtime vulnerabilities

## Test Coverage

The boilerplate includes sample components with basic tests. Coverage thresholds are set to 10% to allow flexibility:

- Current coverage: ~15%
- Threshold: 10% (intentionally low for a template)
- **Recommendation**: Increase thresholds (50%+) as you add more features to your project

## CI/CD Notes

The GitHub Actions workflow includes:
- ✅ Linting and type checking (strict)
- ✅ Tests with coverage (flexible threshold)
- ⚠️ Security audit (warnings allowed for known Expo issues)

### Customizing for Your Project

1. **Increase test coverage requirements** in `jest.config.js`:
   ```js
   coverageThreshold: {
     global: {
       branches: 80,
       functions: 80,
       lines: 80,
       statements: 80,
     },
   }
   ```

2. **Stricter security audit** in `.github/workflows/ci.yml`:
   ```yaml
   - name: Check for vulnerable dependencies
     run: npm audit --production --audit-level=moderate
     # Remove continue-on-error for stricter checks
   ```

3. **Update Expo SDK** when newer versions are available:
   ```bash
   npx expo upgrade
   ```

## Dependency Management

### Keeping Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update to latest within semver range
npm update

# Upgrade to latest (including breaking changes)
npx npm-check-updates -u
npm install
```

### After Upgrading

Always run these checks after updating dependencies:

```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check linting issues
npm test            # Run all tests
npm start           # Test the app
```

## Production Readiness Checklist

Before deploying your app to production:

- [ ] Remove unused dependencies
- [ ] Increase test coverage to 80%+
- [ ] Run `npm audit fix` and address critical vulnerabilities
- [ ] Update to latest Expo SDK
- [ ] Configure environment-specific settings
- [ ] Add error tracking (Sentry, etc.)
- [ ] Set up analytics
- [ ] Configure app signing certificates
- [ ] Test on physical devices
- [ ] Perform security review
- [ ] Optimize bundle size
- [ ] Enable ProGuard/R8 for Android
- [ ] Configure App Store/Play Store metadata

## Getting Help

If you encounter issues:

1. Check this document first
2. Review [Expo documentation](https://docs.expo.dev/)
3. Search [GitHub Issues](https://github.com/niksbanna/ReactNative-Boilerplate/issues)
4. Open a new issue with details

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this boilerplate.
