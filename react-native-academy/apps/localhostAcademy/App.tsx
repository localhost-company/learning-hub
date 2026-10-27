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
import Profiler from './src/screens/lecture4/Profiler';
import ErrorsAndWarningsScreen from './src/screens/lecture4/ErrorsAndWarningsScreen';
import SourcesDebuggerBreakpointsCodeScreen from './src/screens/lecture4/SourcesDebuggerBreakpointsCodeScreen';
import NetworkScreen from './src/screens/lecture4/NetworkScreen';
import PerformanceCPUJsScreen from './src/screens/lecture4/PerformanceCPUJsScreen';
import PerformanceCPURenderScreen from './src/screens/lecture4/PerformanceCPURenderScreen';
import MemoryLeakScreen from './src/screens/lecture4/MemoryLeakScreen';
import ComponentsScreen from './src/screens/lecture4/ComponentsScreen';
import DebuggingScreen from './src/screens/DebuggingScreen';
import PracticeDebuggingScreen from './src/screens/lecture4/PracticeDebuggingScreen';
import AsyncProcessesScreen from './src/screens/AsyncProcessesScreen';
import CallStackScreen from './src/screens/lecture6/CallStackScreen';
import BlockingOrdersScreen from './src/screens/lecture6/BlockingOrdersScreen';
import TaskQueueScreen from './src/screens/lecture6/TaskQueueScreen';
import TimerOrdersScreen from './src/screens/lecture6/TimerOrdersScreen';
import BlockedTimerScreen from './src/screens/lecture6/BlockedTimerScreen';
import OrderQueuesScreen from './src/screens/lecture6/OrderQueuesScreen';
import PromiseExecutorScreen from './src/screens/lecture6/PromiseExecutorScreen';
import PromiseChainingScreen from './src/screens/lecture6/PromiseChainingScreen';
import PromiseRejectionScreen from './src/screens/lecture6/PromiseRejectionScreen';
import AsyncAwaitScreen from './src/screens/lecture6/AsyncAwaitScreen';
import SequentialScreen from './src/screens/lecture6/SequentialScreen';
import PromiseAllScreen from './src/screens/lecture6/PromiseAllScreen';
import PromiseAllErrorScreen from './src/screens/lecture6/PromiseAllErrorScreen';
import HttpGetScreen from './src/screens/lecture6/HttpGetScreen';
import HttpSlowScreen from './src/screens/lecture6/HttpSlowScreen';
import HttpErrorScreen from './src/screens/lecture6/HttpErrorScreen';
import NetworkErrorScreen from './src/screens/lecture6/NetworkErrorScreen';

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
      <Stack.Screen name="Debugging" component={DebuggingScreen} options={logoHeaderOptions} />
      <Stack.Screen name="Profiler" component={Profiler} options={logoHeaderOptions} />
      <Stack.Screen
        name="ErrorsAndWarnings"
        component={ErrorsAndWarningsScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen
        name="SourcesDebuggerBreakpointsCode"
        component={SourcesDebuggerBreakpointsCodeScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen name="Network" component={NetworkScreen} options={logoHeaderOptions} />
      <Stack.Screen
        name="PerformanceCPUJs"
        component={PerformanceCPUJsScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen
        name="PerformanceCPURender"
        component={PerformanceCPURenderScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen name="MemoryLeak" component={MemoryLeakScreen} options={logoHeaderOptions} />
      <Stack.Screen name="Components" component={ComponentsScreen} options={logoHeaderOptions} />
      <Stack.Screen
        name="PractiseDebugging"
        component={PracticeDebuggingScreen}
        options={logoHeaderOptions}
      />
      <Stack.Screen
        name="AsyncProcesses"
        component={AsyncProcessesScreen}
        options={logoHeaderOptions}
      />
      <Stack.Group screenOptions={logoHeaderOptions}>
        <Stack.Screen name="AsyncCallStack" component={CallStackScreen} />
        <Stack.Screen name="AsyncBlockingOrders" component={BlockingOrdersScreen} />
        <Stack.Screen name="AsyncTaskQueue" component={TaskQueueScreen} />
        <Stack.Screen name="AsyncTimerOrders" component={TimerOrdersScreen} />
        <Stack.Screen name="AsyncBlockedTimer" component={BlockedTimerScreen} />
        <Stack.Screen name="AsyncOrderQueues" component={OrderQueuesScreen} />
        <Stack.Screen name="AsyncPromiseExecutor" component={PromiseExecutorScreen} />
        <Stack.Screen name="AsyncPromiseChaining" component={PromiseChainingScreen} />
        <Stack.Screen name="AsyncPromiseRejection" component={PromiseRejectionScreen} />
        <Stack.Screen name="AsyncAwait" component={AsyncAwaitScreen} />
        <Stack.Screen name="AsyncSequential" component={SequentialScreen} />
        <Stack.Screen name="AsyncPromiseAll" component={PromiseAllScreen} />
        <Stack.Screen name="AsyncPromiseAllError" component={PromiseAllErrorScreen} />
        <Stack.Screen name="AsyncHttpGet" component={HttpGetScreen} />
        <Stack.Screen name="AsyncHttpSlow" component={HttpSlowScreen} />
        <Stack.Screen name="AsyncHttpError" component={HttpErrorScreen} />
        <Stack.Screen name="AsyncNetworkError" component={NetworkErrorScreen} />
      </Stack.Group>
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
