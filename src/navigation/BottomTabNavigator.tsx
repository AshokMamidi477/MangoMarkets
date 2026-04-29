import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../theme';
import {HomeIcon, AIIcon, NewsIcon, PortfolioIcon} from '../components/icons';

import HomeScreen from '../screens/HomeScreen';
import AIChatScreen from '../screens/AIChatScreen';
import NewsScreen from '../screens/NewsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 60 + insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, {height: tabBarHeight, paddingBottom: insets.bottom}],
        tabBarActiveTintColor: Colors.accentPurple,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <HomeIcon size={21} color={color} />,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({color}) => <NewsIcon size={21} color={color} />,
        }}
      />
      <Tab.Screen
        name="AI"
        component={AIChatScreen}
        options={{
          tabBarLabel: 'AI',
          tabBarIcon: ({color, focused}) => (
            <View style={[styles.aiTab, focused && styles.aiTabActive]}>
              <AIIcon size={21} color={focused ? Colors.accentPurple : color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#08080F',
    borderTopWidth: 1,
    borderTopColor: '#151525',
    paddingTop: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  aiTab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -6,
  },
  aiTabActive: {
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
});

export default BottomTabNavigator;
