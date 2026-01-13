import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { clearAuth } from '../../utils/authStorage';

// --------------------
// Dummy Settings Screens
// --------------------
function AccountSettings() {
  return <Text style={styles.screen}>Account Settings</Text>;
}

function NotificationSettings() {
  return <Text style={styles.screen}>Notification Settings</Text>;
}

function SecuritySettings() {
  return <Text style={styles.screen}>Security Settings</Text>;
}

function AppearanceSettings() {
  return <Text style={styles.screen}>Appearance Settings</Text>;
}

function AboutSettings() {
  return <Text style={styles.screen}>About MangoMarkets</Text>;
}

// --------------------
// Drawer
// --------------------
const Drawer = createDrawerNavigator();

// --------------------
// Custom Drawer Content
// --------------------
function SettingsDrawerContent({ logout, ...props }: any) {
    const handleLogout = async () => {
      await clearAuth(); // clear token
      logout();
    };
  
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
          onPress={handleLogout}
        />
      </DrawerContentScrollView>
    );
  }

// --------------------
// Settings Drawer Navigator
// --------------------
export default function SettingsDrawerNavigator({
  logout,
}: {
  logout: () => void;
}) {
  return (
    <Drawer.Navigator
      initialRouteName="Account"
      drawerContent={(props) => (
        <SettingsDrawerContent {...props} logout={logout} />
      )}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0D1B2A' },
        drawerStyle: { backgroundColor: '#0D1B2A' },
        drawerActiveTintColor: '#0ea5e9',
        drawerInactiveTintColor: '#94a3b8',
        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingHorizontal: 14 }}
            onPress={() => navigation.openDrawer()}
          >
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
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationSettings}
        options={{
          title: 'Notifications',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Security"
        component={SecuritySettings}
        options={{
          title: 'Security',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="lock-closed-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Appearance"
        component={AppearanceSettings}
        options={{
          title: 'Appearance',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="color-palette-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        component={AboutSettings}
        options={{
          title: 'About',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// --------------------
// Styles
// --------------------
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
