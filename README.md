# React Native Biometric Authentication

A TypeScript-based React Native application that implements forced biometric (fingerprint/Face ID) authentication. The app requires biometric authentication to access any content and re-authenticates when returning from background.

## Features

- 🔐 Forced biometric authentication
- 🔄 Automatic re-authentication when app returns from background
- 📱 Support for both Face ID and Touch ID
- 🛡️ Type-safe implementation using TypeScript
- ⚡ Proper error handling and retry logic
- 📱 Cross-platform support (iOS and Android)

## Prerequisites

- Node.js >= 14
- React Native development environment set up
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository or copy the project files

2. Install dependencies:

```bash
npm install
```

3. Install required packages:

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-biometrics react-native-screens react-native-safe-area-context
```

4. Install dev dependencies:

```bash
npm install --save-dev typescript @types/react @types/react-native
```

## Platform-Specific Setup

### iOS

1. Navigate to the iOS folder and install pods:

```bash
cd ios && pod install
```

2. Add the following to your `Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Authentication is required to use this app</string>
```

### Android

No additional setup required for Android as the necessary permissions are included in the package.

## Project Structure

```
your-project/
  ├── App.tsx                 # Main application component
  ├── babel.config.js         # Babel configuration
  ├── tsconfig.json          # TypeScript configuration
  ├── types/
  │   └── navigation.ts      # Navigation type definitions
  └── screens/
      ├── AuthenticationScreen.tsx  # Biometric authentication screen
      └── HomeScreen.tsx           # Protected home screen
```

## Usage

The app implements a simple flow:

1. On startup, the app checks for biometric capability
2. If biometrics is available, it prompts for authentication
3. Upon successful authentication, the user is taken to the home screen
4. When the app comes back from background, it re-authenticates

### Key Components

#### AuthenticationScreen

Handles the biometric authentication process:

- Checks device compatibility
- Manages authentication flow
- Handles errors and retries

```typescript
// Example usage in another component
navigation.navigate('Authentication');
```

#### HomeScreen

Protected content that's only accessible after authentication:

- Monitors app state
- Triggers re-authentication when needed
- Displays authenticated content

## Error Handling

The app handles various scenarios:

- Device without biometric capabilities
- Failed authentication attempts
- Cancelled authentication
- Background/foreground transitions

## Customization

### Modifying Authentication Messages

In `AuthenticationScreen.tsx`, you can customize the prompts:

```typescript
const {success} = await rnBiometrics.simplePrompt({
  promptMessage: 'Your custom message here',
  cancelButtonText: 'Custom cancel text',
  fallbackPromptMessage: 'Custom fallback message',
});
```

### Styling

Each screen contains a `StyleSheet` object that you can modify to match your app's design:

```typescript
const styles = StyleSheet.create({
  container: {
    // Your custom styles
  },
});
```

## Security Considerations

- The app forces biometric authentication on every launch
- Re-authentication is required when returning from background
- No biometric data is stored in the app
- Uses system-level biometric APIs

## Troubleshooting

Common issues and solutions:

1. Biometrics not working on simulator

   - Use physical device for testing biometrics

2. iOS build fails

   - Ensure pods are installed
   - Check Info.plist configuration

3. Android authentication not showing
   - Verify device has fingerprint/face recognition set up
   - Check Android SDK version compatibility

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For issues and feature requests, please create an issue in the repository.
