import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  BackHandler,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {NavigationProps} from '../types/navigation';

const AuthenticationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const authenticateUser = async (): Promise<void> => {
    try {
      // Check if biometrics is available
      const {available} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert(
          'Error',
          'Biometric authentication is required to use this app',
          [
            {
              text: 'Exit App',
              onPress: () => Platform.OS === 'android' && BackHandler.exitApp(),
            },
          ],
        );
        return;
      }

      // Prompt for authentication
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authentication required to continue',
        cancelButtonText: 'Exit',
        fallbackPromptMessage: 'Use device passcode',
      });

      if (success) {
        navigation.replace('Home');
      } else {
        // If cancelled or failed, try again
        setTimeout(authenticateUser, 500);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setTimeout(authenticateUser, 500);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default AuthenticationScreen;
