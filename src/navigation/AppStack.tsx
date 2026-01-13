// src/navigation/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackNavigator({ logout }: { logout: () => void }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs">
        {() => <MainTabs logout={logout} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
