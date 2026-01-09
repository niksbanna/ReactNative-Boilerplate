import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUser, setLoading } from '../store/slices/authSlice';
import { StorageService } from '../services/storage';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for stored auth on app launch
    const checkAuth = async () => {
      try {
        const user = await StorageService.getUser();
        const token = await StorageService.getAccessToken();

        if (user && token) {
          dispatch(
            setUser({
              id: user.id as string,
              email: user.email as string,
              name: user.name as string,
            })
          );
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    // TODO: Add a proper splash screen
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
