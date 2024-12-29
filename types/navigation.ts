// types/navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Authentication: undefined;
  Home: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
