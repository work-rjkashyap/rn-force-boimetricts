import React, {useEffect} from 'react';
import {View, Text, StyleSheet, AppState, AppStateStatus} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types/navigation';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        // When app comes from background, re-authenticate
        if (nextAppState === 'active') {
          navigation.replace('Authentication');
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Text style={styles.subtext}>You have successfully authenticated</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
