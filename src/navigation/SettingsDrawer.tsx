import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function SettingsDrawer({ logout }: { logout: () => void }) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Settings">
        {() => <SettingsScreen logout={logout} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
