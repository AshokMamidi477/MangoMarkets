import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './navigation/AuthNavigator';
import MainTabs from './navigation/MainTabs';
import { getToken } from './utils/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuthenticated ? (
          <MainTabs logout={() => setIsAuthenticated(false)} />
        ) : (
          <AuthNavigator onLogin={() => setIsAuthenticated(true)} />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
