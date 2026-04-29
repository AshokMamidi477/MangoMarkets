import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import SplashScreen from './screens/SplashScreen';
import {Colors} from './theme';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: Colors.accentPurple,
            background: Colors.bgPrimary,
            card: Colors.bgPrimary,
            text: Colors.textPrimary,
            border: Colors.border,
            notification: Colors.accentPurple,
          },
        }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
