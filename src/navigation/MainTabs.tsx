import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Markets from '../screens/Markets';
import Trade from '../screens/Trade';
import Portfolio from '../screens/Portfolio';
import SettingsDrawer from './SettingsDrawer';

const Tab = createBottomTabNavigator();

export default function MainTabs({ logout }: { logout: () => void }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Markets" component={Markets} />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      <Tab.Screen name="Settings">
        {() => <SettingsDrawer logout={logout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
