
// App.tsx
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Screens (replace these with your real components) ---
function Home()      { return null; }
function Markets()   { return null; }
function Trade()     { return null; }
function Portfolio() { return null; }

// --- Your Login screen ---
import LoginScreen from './screens/LoginScreen';

// --- Settings drawer inside the Settings tab ---
import SettingsDrawerNavigator from './screens/Navigation/Settings';

// ---------- Types (optional, but nice for TS) ----------
type RootTabsParamList = {
  Home: undefined;
  Markets: undefined;
  Trade: undefined;
  Portfolio: undefined;
  Settings: undefined; // mounts SettingsDrawerNavigator
};

type AuthStackParamList = {
  Login: undefined;
};

type AppStackParamList = {
  Tabs: undefined;
};

// ---------- Tabs ----------
const Tab = createBottomTabNavigator<RootTabsParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarIcon: ({ focused, color }) => {
          const icons: Record<keyof RootTabsParamList, string> = {
            Home:      focused ? 'home' : 'home-outline',
            Markets:   focused ? 'bar-chart' : 'bar-chart-outline',
            Trade:     focused ? 'swap-horizontal' : 'swap-horizontal-outline',
            Portfolio: focused ? 'wallet' : 'wallet-outline',
            Settings:  focused ? 'settings' : 'settings-outline',
          };
          return <Ionicons name={icons[route.name as keyof RootTabsParamList]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Markets" component={Markets} />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      {/* Settings tab mounts the Drawer Navigator */}
      <Tab.Screen name="Settings" component={SettingsDrawerNavigator} />
    </Tab.Navigator>
  );
}

// ---------- App Stack (wraps Tabs) ----------
const AppStack = createNativeStackNavigator<AppStackParamList>();
function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Tabs" component={MainTabs} />
    </AppStack.Navigator>
  );
}

// ---------- Auth Stack (shows Login first) ----------
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
function AuthStackNavigator({ onLogin }: { onLogin: () => void }) {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login">
        {() => <LoginScreen onLogin={() => onLogin()} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

// ---------- Root ----------
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: replace with persisted token check (AsyncStorage, etc.)
    setIsAuthenticated(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={DefaultTheme}>
        {isAuthenticated ? (
          <AppStackNavigator />
        ) : (
          <AuthStackNavigator onLogin={() => setIsAuthenticated(true)} />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
