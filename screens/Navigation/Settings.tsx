
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ----- Sample section screens (replace with your real components) -----
function AccountSettings()      { return <Text style={styles.screen}>Account Settings</Text>; }
function NotificationSettings() { return <Text style={styles.screen}>Notifications</Text>; }
function SecuritySettings()     { return <Text style={styles.screen}>Security</Text>; }
function AppearanceSettings()   { return <Text style={styles.screen}>Appearance</Text>; }
function AboutSettings()        { return <Text style={styles.screen}>About MangoMarkets</Text>; }

// Drawer param list (optional for TS)
export type SettingsDrawerParamList = {
  Account: undefined;
  Notifications: undefined;
  Security: undefined;
  Appearance: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<SettingsDrawerParamList>();

// Custom drawer content (optional)
function SettingsDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* Example extra item */}
      <DrawerItem
        label="Support"
        icon={({ color, size }) => <Ionicons name="help-circle-outline" color={color} size={size} />}
        onPress={() => props.navigation.navigate('About')}
      />
    </DrawerContentScrollView>
  );
}

export default function SettingsDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Account"
      drawerContent={(p) => <SettingsDrawerContent {...p} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        drawerActiveTintColor: '#0ea5e9',
        drawerInactiveTintColor: '#94a3b8',
        // Hamburger button in header
        headerLeft: () => (
          <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={22} color="#0ea5e9" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Account"
        component={AccountSettings}
        options={{
          title: 'Account',
          drawerIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationSettings}
        options={{
          title: 'Notifications',
          drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Security"
        component={SecuritySettings}
        options={{
          title: 'Security',
          drawerIcon: ({ color, size }) => <Ionicons name="lock-closed-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Appearance"
        component={AppearanceSettings}
        options={{
          title: 'Appearance',
          drawerIcon: ({ color, size }) => <Ionicons name="color-palette-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutSettings}
        options={{
          title: 'About',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 80,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#0D1B2A',
    padding: 16,
  },
});
