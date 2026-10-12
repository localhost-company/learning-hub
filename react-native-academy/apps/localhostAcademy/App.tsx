import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { Image } from 'react-native';
import 'react-native-get-random-values';
import { useAppFonts } from './src/hooks/useAppFonts';
import HomeScreen from './src/screens/HomeScreen';
import BasicComponentsScreen from './src/screens/lecture3/BasicComponentsScreen';
import DarkModeScreen from './src/screens/lecture3/DarkModeScreen';
import DebouncedTextInputScreen from './src/screens/lecture3/DebouncedTextInputScreen';
import { ImageOptimizationScreen } from './src/screens/lecture3/ImageOptimizationScreen';
import { ListExampleScreen } from './src/screens/lecture3/ListExampleScreen';
import ScrollViewListScreen from './src/screens/lecture3/ScrollViewListScreen';
import RNBasicsScreen from './src/screens/RNBasicsScreen';
import { colors } from './src/theme';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

const logoHeaderOptions = {
  headerTitle: () => <LogoTitle />,
};

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 150, height: 50, resizeMode: 'cover' }}
      source={require('./assets/icon.png')}
    />
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.surface.canvas },
        headerStyle: { backgroundColor: colors.surface.primary },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={logoHeaderOptions} />
      <Stack.Screen name="RNBasics" component={RNBasicsScreen} options={logoHeaderOptions} />
      <Stack.Screen
        name="BasicComponents"
        component={BasicComponentsScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen name="DarkMode" component={DarkModeScreen} options={logoHeaderOptions} />
      <Stack.Screen
        name="ScrollViewList"
        component={ScrollViewListScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen
        name="DebouncedTextInputScreen"
        component={DebouncedTextInputScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen
        name="ListExampleScreen"
        component={ListExampleScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen
        name="ImageOptimizationScreen"
        component={ImageOptimizationScreen}
        options={logoHeaderOptions}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
