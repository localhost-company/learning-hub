import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useLogger } from '@react-navigation/devtools';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import LoginContext from './context/LoginContext';
import RootNavigation from './screens/RootNavigation';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      BottomNavigation: {
        screens: {
          ProductsStack: {
            initialRouteName: 'ProductList',
            screens: {
              ProductList: 'product-list',
              ProductDetail: 'product-detail/:productId',
            },
          },
          FavoriteProductList: 'favorites',
        },
      },
      UserDetail: 'user',
    },
  },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(91, 196, 191)',
    primary: 'rgb(193, 66, 67)',
  },
};

function App() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);
  useLogger(navigationRef);

  return (
    <NavigationContainer theme={MyTheme} linking={linking} ref={navigationRef}>
      <LoginContext>
        <RootNavigation />
      </LoginContext>
    </NavigationContainer>
  );
}

export default App;
