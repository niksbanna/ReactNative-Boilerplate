# Assets

This directory contains static assets for the application.

## Directory Structure

```
assets/
├── icon.png           # App icon (1024x1024)
├── splash.png         # Splash screen
├── adaptive-icon.png  # Android adaptive icon
├── favicon.png        # Web favicon
├── fonts/            # Custom fonts (if any)
└── images/           # Image assets
```

## Asset Guidelines

### App Icon (icon.png)
- **Size**: 1024x1024px
- **Format**: PNG
- **Purpose**: iOS app icon, Android launcher icon base
- **Notes**: Should have no transparency

### Splash Screen (splash.png)
- **Size**: 1284x2778px (or larger)
- **Format**: PNG
- **Purpose**: Initial loading screen
- **Notes**: Will be resized for different devices

### Adaptive Icon (adaptive-icon.png)
- **Size**: 1024x1024px
- **Format**: PNG
- **Purpose**: Android adaptive icon foreground
- **Notes**: Keep content within safe zone (center 66%)

### Favicon (favicon.png)
- **Size**: 48x48px (or larger)
- **Format**: PNG
- **Purpose**: Web app favicon
- **Notes**: Used when running as PWA

## Adding Custom Assets

### Images

Place images in `assets/images/`:

```typescript
import logo from '../assets/images/logo.png';

<Image source={logo} />
```

### Fonts

1. Place font files in `assets/fonts/`
2. Load fonts in App.tsx using expo-font
3. Use in styles:

```typescript
{
  fontFamily: 'CustomFont-Regular'
}
```

## Optimization

### Before Adding Images

- Compress images using tools like:
  - [TinyPNG](https://tinypng.com/)
  - [ImageOptim](https://imageoptim.com/)
  - [Squoosh](https://squoosh.app/)

### Recommended Formats

- **Icons**: SVG (use react-native-svg)
- **Photos**: JPEG (compressed)
- **Graphics**: PNG (for transparency)
- **Animations**: Lottie JSON (use lottie-react-native)

## Asset Generation

Use Expo's asset generation tools:

```bash
# Generate app icons and splash screens
npx expo-optimize
```

## Platform-Specific Assets

### iOS

Icons are generated from `icon.png` and placed in:
```
ios/[AppName]/Images.xcassets/AppIcon.appiconset/
```

### Android

Icons are generated from `icon.png` and placed in:
```
android/app/src/main/res/mipmap-*/
```

## Notes

- Expo automatically optimizes assets during build
- Use `@2x` and `@3x` suffixes for iOS image scales
- Android uses density-specific folders (hdpi, xhdpi, etc.)
- Keep total asset size under 50MB for faster builds
