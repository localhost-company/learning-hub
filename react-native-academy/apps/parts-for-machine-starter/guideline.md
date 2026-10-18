## Setup navigácie v kóde

### Inštalácia dependencies

Najprv je potrebné nainštalovať knižnicu `@react-navigation/native`, ktorá obsahuje základné funkcionality navigácie.
```bash
pnpm add @react-navigation/native
```

Potom nainštalujeme konkrétne navigátory, ktoré chceme v aplikácii používať.
```bash
pnpm add @react-navigation/native-stack
pnpm add @react-navigation/bottom-tabs
pnpm add @react-navigation/drawer
pnpm add @react-navigation/stack
```

Potrebné je nainštalovať aj knižnice, ktoré používajú samotné navigátory:

Prostredníctvom Expo:
```bash
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets
npx expo install expo-linking  
npx expo install @react-native-masked-view/masked-view
```

Nakoniec nainštalujeme aj knižnice pre debugging navigácie:
```bash
pnpm add @react-navigation/devtools
npx expo install @dev-plugins/react-navigation
```

V zložke `app/parts-for-machine` už máme dané dependencies v `package.json`, takže stačí iba spustiť príkaz `pnpm install` a všetko sa nainštaluje.

### Vytvorenie základnej štruktúry stack navigácie

1. V `src` zložke si vytvoríme `screens/RootStack.tsx`
2. Vytvoríme stack navigátor pomocou `createNativeStackNavigator` a vytvoríme `RootStack` komponent.
```typescript jsx
const Stack = createNativeStackNavigator();

function RootStack() {
   return (
   <Stack.Navigator>
      <Stack.Screen name="" component={} />
   </Stack.Navigator>
);
}

export default RootStack;
```
3. Vytvoríme `src/screens/ProductListScreen.tsx` a v ňom vytvoríme jednoduchý `ProductListScreen.tsx` komponent.
```typescript jsx
function ProductListScreen() {
   return (
           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Product List Screen</Text>
           </View>
   );
}

export default ProductListScreen;
```
4. Vytvoríme `src/types/NavigationParamList.ts` a pridáme typ pre `createNativeStackNavigator`.
```typescript
export type NavigationParamList = {
   ProductList: undefined;
};
```
```typescript jsx
const Stack = createNativeStackNavigator<NavigationParamList>();
```

5. Definujeme name a component pre `Stack.Screen` komponentu.
```typescript jsx
<Stack.Screen name="ProductList" component={ProductListScreen} />
```

6. V `src/App.tsx` pridáme RootStack komponent do `NavigationContainer`.
```typescript jsx
export function App() {
   return (
      <NavigationContainer>
         <RootStack />
      </NavigationContainer>
   );
}
```

### Navigácia medzi obrazovkami

1. Vytvoríme `src/screens/ProductDetailScreen.tsx` a v ňom vytvoríme jednoduchý `ProductDetailScreen.tsx` komponent.
```typescript jsx
function ProductDetailScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Product Detail Screen</Text>
        </View>
    );
}

export default ProductDetailScreen;
```
2. Do `src/types/NavigationParamList.ts` pridáme typ pre `ProductDetailScreen`.
```typescript
export type NavigationParamList = {
   ProductList: undefined;
   ProductDetail: undefined;
};
```
3. Do `src/screens/RootStack.tsx` pridáme `ProductDetailScreen` do stacku.
```typescript jsx
<Stack.Navigator>
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
</Stack.Navigator>
```
4. Aby sme vedeli navigovať z `ProductListScreen` do `ProductDetailScreen`, potrebujeme získať `navigation` objekt. Máme na to 2 možnosti:
- použiť `useNavigation` hook, ktorý nám vráti navigation object.
```typescript jsx
import { useNavigation } from '@react-navigation/native';
...
const navigation = useNavigation();
```
- získať navigation object cez props, ktoré sú automaticky poskytované každému screenu.
```typescript jsx
function ProductListScreen({ navigation }: Props) {
   ...
}
```


5. Definujeme si `Props` pre `ProductListScreen` komponentu.
```typescript
type Props = NativeStackScreenProps<NavigationParamList, 'ProductList'>;
```

6. Pridáme `navigate` do `Props` a vytvoríme `navigateToProductDetail` funkciu.
```typescript jsx
function ProductListScreen({ navigation }: Props) {
    const navigateToProductDetail = useCallback(() => {
        navigation.navigate('ProductDetail');
    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Product List Screen</Text>
            <Button
                title="Go to Product Detail"
                onPress={navigateToProductDetail}
            />
        </View>
    );
}
```

### Odosielanie parametrov medzi obrazovkami
1. Skopírujme obsah  `/src/prepared-screens/ProductListScreen.tsx` do `/src/screens/ProductListScreen.tsx`
2. Skopírujme obsah  `/src/prepared-screens/ProductDetailScreen.tsx` do `/src/screens/ProductDetailScreen.tsx`

3. Pridáme `productId` pre `ProductDetail` do `ProductStackParamList` a následne `route` do parametra funkcie pre `ProductDetailScreen`.
```typescript
ProductDetail: { productId: string };
```
```typescript jsx
function ProductDetailScreen({route}: Props) {
``` 

4. Následne môžeme získať konkrétny produkt pomocou `getProductById` funkcie a `productId` z `route.params`.
```typescript jsx
const product = useMemo(() => {
    return getProductById(route.params.productId);
}, [route.params.productId]);
```

5. Aby `ProductDetailScreen` vedel o `productId`, musíme ho odoslať z `ProductListScreen` pri navigácii.
```typescript jsx
function ProductListScreen({ navigation }: Props) {
    const navigateToProductDetail = useCallback((productId: string) => {
        navigation.navigate('ProductDetail', { productId });
    }, [navigation]);
    ...
    onPress={() => navigateToProductDetail(item.id)}
}
```

---


#### Ako sa k stavu dostať

Prvým spôsobom môžeme každú zmenu stavu logovat do consoly.

1. V `src/App.tsx` vytvoríme metódu na počúvanie zmeny stavu.
```typescript jsx
const onStateChange = useCallback((state: Readonly<NavigationState> | undefined) => {
    console.log(JSON.stringify(state, null, 2));
}, []);
```
2. Metódu pridáme do `NavigationContainer` ako `onStateChange` prop.
```typescript jsx
<NavigationContainer
  onStateChange={onStateChange}
>
  <RootStack />
</NavigationContainer>
```

Druhým spôsobom použijeme `useLogger` hook z knižnice `@react-navigation/devtools`.

1. V `src/App.tsx` pridáme `navigationRef`, ktorý je potrebný pre `useLogger`:
```typescript jsx
const navigationRef = useNavigationContainerRef();
...
<NavigationContainer onStateChange={onStateChange} ref={navigationRef}>
```
2. Použijeme `useLogger` hook a odovzdáme mu `navigationRef`.
```typescript jsx
useLogger(navigationRef);
```

Tretím spôsobom použijeme `@dev-plugins/react-navigation` expo plugin.

1. V `src/App.tsx` pridáme volanie hooku `useReactNavigationDevTools`
```typescript jsx
useReactNavigationDevTools(navigationRef);
```
2. V termináli cez `Shift + M` otvoríme Expo plugin.

---

### Vnorená navigácia (Nested navigation)

#### BottomTab navigácia


1. Skopírujeme súbor `src/screens/ProductListScreen.tsx` a dáme mu názov `src/screens/FavoriteProductListScreen.tsx`. Taktiež zmeníme názov komponentu.
2. V `src/screens/RootStack.tsx` premenujeme `RootStack` komponent na `ProductStack`.
```typescript jsx
export function ProductsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
}
```
3. Vytvoríme BottomTabNavigator.
```typescript jsx
const BottomTab = createBottomTabNavigator();
```
4. Upravíme typy v `src/types/NavigationParamList.ts` na:
```typescript
import {NavigatorScreenParams} from "@react-navigation/native";

export type ProductStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: string };
};

export type BottomTabParamList = {
    ProductsStack: NavigatorScreenParams<ProductStackParamList>
    FavoriteProductList: undefined;
}
```
5. Pridáme typ k `createBottomTabNavigator()` a vytvoríme nový `RootNavigation`, ktorý bude obsahovať BottomTab navigátor, ktorý nakonfiguruje navigáciu pre obrazovky `ProductStack` a `FavoriteProductList`. Taktiež premenujeme súbor z `RootStack` na `RootNavigation`.
```typescript jsx
const Stack = createNativeStackNavigator<ProductStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function ProductsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
}

export const RootNavigation = () => {
    return (
        <BottomTab.Navigator initialRouteName="FavoriteProductList">
            <BottomTab.Screen name="ProductsStack" component={ProductsStack} />
            <BottomTab.Screen name="FavoriteProductList" component={FavoriteProductListScreen} />
        </BottomTab.Navigator>
    );
}
```
6. Nakoniec opravíme v `FavoriteProductListScreen` `Prop` typ, zobrazenie favorite products a volanie `navigation.navigate`.
```typescript jsx
import {getFavoriteProducts, Product} from '../mock-data/data';
...
type Props = BottomTabScreenProps<BottomTabParamList, 'FavoriteProductList'>;
...
const navigateToProductDetail = useCallback((productId: string) => {
    navigation.navigate('ProductsStack', {
        screen: 'ProductDetail',
        params: { productId },
    });
}, [navigation]);
```

7. Opravíme problem s headerom, tak, že ho zrušíme pre `ProductStack`.
```typescript jsx
<BottomTab.Screen name="ProductsStack" component={ProductsStack} options={{ headerShown: false }}/>
```

8. Upravíme typy v `src/types/NavigationParamList.ts` na:
```typescript
import {CompositeScreenProps, NavigatorScreenParams} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

export type ProductStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: string };
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> = CompositeScreenProps<NativeStackScreenProps<ProductStackParamList, T>, RootNavigationScreenProps<'ProductsStack'>>

export type BottomTabParamList = {
    ProductsStack: NavigatorScreenParams<ProductStackParamList>
    FavoriteProductList: undefined;
}

export type RootNavigationScreenProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<BottomTabParamList, T>;
```
9. V `ProductList`, `ProductDetailScreen` a `FavoriteProductListScreen` upravíme prop typy:
```typescript jsx
function ProductListScreen({ navigation }: ProductStackScreenProps<'ProductList'>) { 
```
```typescript jsx
function ProductDetailScreen({route}: ProductStackScreenProps<'ProductDetail'>) {
```
```typescript jsx
function FavoriteProductListScreen({ navigation }: RootNavigationScreenProps<'FavoriteProductList'>) {
```

#### Drawer navigácia

1. Skopírujeme `src/prepared-screens/UserDetailScreen.tsx` do `src/screens/UserDetailScreen.tsx`.
2. Upravíme navigačné parametre v `src/types/NavigationParamList.ts` pre Drawer navigator:
```typescript
import {CompositeScreenProps, NavigatorScreenParams} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {DrawerScreenProps} from "@react-navigation/drawer";

export type ProductStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: string };
};

export type ProductStackScreenProps<T extends keyof ProductStackParamList> = CompositeScreenProps<NativeStackScreenProps<ProductStackParamList, T>, BottomTabNavigationScreenProps<'ProductsStack'>>

export type BottomTabParamList = {
    ProductsStack: NavigatorScreenParams<ProductStackParamList>
    FavoriteProductList: undefined;
}


export type BottomTabNavigationScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<BottomTabScreenProps<BottomTabParamList, T>, RootNavigationScreenProps<'BottomNavigation'>>;


export type DrawerParamList = {
    BottomNavigation: NavigatorScreenParams<BottomTabParamList>;
    UserDetail: undefined;
};

export type RootNavigationScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>
```
3. Keďže sme zmenili `RootNavigationScreenProps`, musíme v `FavoriteProductListScreen` upraviť správny typ pre props:
```typescript jsx
function FavoriteProductListScreen({ navigation }: BottomTabNavigationScreenProps<'FavoriteProductList'>) {
```
4. V súbore `src/screens/RootNavigation.tsx` premenujeme komponent `RootNavigation` na `BottomNavigation` a v novom komponente `RootNavigation` vytvoríme `Drawer` navigáciu.
```typescript jsx
const Drawer = createDrawerNavigator<DrawerParamList>();
...
export const BottomNavigation = () => {
...
export const RootNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="BottomNavigation"
                component={BottomNavigation}
            />
            <Drawer.Screen
                name="UserDetail"
                component={UserDetailScreen}
            />
        </Drawer.Navigator>
    )
}
```

5. Skryjeme header pre komponent `BottomNavigation`.
```typescript jsx
<Drawer.Screen
    name="BottomNavigation"
    component={BottomNavigation}
    options={{headerShown: false}}
/>
```

6. Do `ProductListScreen` pridáme tlačidlo na otvorenie Draweru.
```typescript jsx
const openMenu = useCallback(() => {
    navigation.openDrawer();
}, [navigation]);
...
<View style={styles.container}>
    <View style={styles.toolbar}>
        <Pressable style={styles.menuButton} onPress={openMenu}>
            <Text style={styles.menuButtonText}>Menu</Text>
        </Pressable>
    </View>
    <FlatList
...
toolbar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
},
menuButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
},
menuButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
},
```

---

### Deep linking

1. Do súboru `src/App.tsx` pridáme konfiguráciu:
```typescript jsx
import * as Linking from 'expo-linking';
const linking = {
  prefixes: [Linking.createURL('/')],
};
```
2. Konfiguráciu posunieme ako prop do `NavigationContainer`:
```typescript jsx
<NavigationContainer linking={linking} onStateChange={onStateChange} ref={navigationRef}>
```

> Pri používaní Expo Go bude deep link URL vyzerať nejako takto: `exp://192.168.x.x:8081/--/`

3. Spustíme deep link prostredníctvom príkazu:
```bash
xcrun simctl openurl booted "exp://192.168.x.x:8081/--/UserDetail"
```
```bash
xcrun simctl openurl booted "exp://192.168.x.x:8081/--/BottomNavigation/ProductsStack/ProductList"
```
```bash
xcrun simctl openurl booted "exp://192.168.x.x:8081/--/BottomNavigation/ProductsStack/ProductDetail?productId=b3m8q1"
```


5. Upravíme konfiguráciu pridaním `config` parametra:
```typescript
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
              ProductDetail: 'product-detail/:productId'
            }
          },
          FavoriteProductList: 'favorites'
        }
      },
      UserDetail: 'user'
    }
  }
};
```
6. Spustíme upravený deep link prostredníctvom príkazu:
```bash
xcrun simctl openurl booted "exp://192.168.x.x:8081/--/product-list"
```
```bash
xcrun simctl openurl booted "exp://192.168.x.x:8081/--/product-detail/b3m8q1"   
```
```bash
xcrun simctl openurl booted "exp://192.168.x.x:8081/--/user" 
```

---

### Podmienené renderovanie

1. Skopírujeme `src/prepared-screens/LoginScreen.tsx` do `src/screens/LoginScreen.tsx`.
2. Pridáme `Login: undefined` do `src/types/NavigationParamList.ts`:
```typescript
export type DrawerParamList = {
    BottomNavigation: NavigatorScreenParams<BottomTabParamList>;
    UserDetail: undefined;
    Login: undefined;
};
```
3. Pridáme `LoginScreen` do Drawer navigátora:
```typescript jsx
export const RootNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{headerShown: false}}
            />
            <Drawer.Screen
                name="UserDetail"
                component={UserDetailScreen}
            />
            <Drawer.Screen
                name="Login"
                component={LoginScreen}
            />
        </Drawer.Navigator>
    )
}
```


4. Vytvoríme `src/context/LoginContext.tsx` na uchovanie stavu `isLoggedIn`:
```typescript jsx
import { createContext, PropsWithChildren, useMemo, useState } from 'react';

export const LoginContextProvider = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const LoginContext = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contextValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);
  return (
          <LoginContextProvider.Provider value={contextValue}>{children}</LoginContextProvider.Provider>
  );
};

export default LoginContext;
```
5. V `src/App.tsx` obalíme `RootNavigation` do `LoginContext`:
```typescript jsx
return (
    <NavigationContainer linking={linking} onStateChange={onStateChange} ref={navigationRef}>
        <LoginContext>
            <RootNavigation/>
        </LoginContext>
    </NavigationContainer>
);
```
6. V `RootNavigation` použijeme `useContext` a podmienené renderovanie:
```typescript jsx
export const RootNavigation = () => {
    const {isLoggedIn} = useContext(LoginContextProvider);
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{headerShown: false}}
            />
            {isLoggedIn ? <Drawer.Screen
                    name="UserDetail"
                    component={UserDetailScreen}
                /> :
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                />}
        </Drawer.Navigator>
    )
}
```
7. V `LoginScreen` zavoláme `setIsLoggedIn(true)` po kliknutí na tlačidlo „Prihlásiť sa“:
```typescript jsx
const {setIsLoggedIn} = useContext(LoginContextProvider);

const handleLogin = useCallback(() => {
  setIsLoggedIn(true);
}, [setIsLoggedIn]);
...
<Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryButtonPressed,
        ]}
        android_ripple={{ color: '#FFFFFF33' }}
        onPress={handleLogin}
>
```
8. V `UserDetailScreen` pridáme a naimplementujeme tlačidlo „Odhlásiť sa“:
```typescript jsx
const { setIsLoggedIn } = useContext(LoginContextProvider);

const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
}, [setIsLoggedIn]);
...
      <Text style={styles.value}>Vernostný program: Zlatý partner</Text>
  </View>

  <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
          android_ripple={{ color: '#FFFFFF33' }}
          onPress={handleLogout}
  >
    <Text style={styles.logoutButtonText}>Odhlásiť sa</Text>
  </Pressable>

</ScrollView>
...
logoutButton: {
  marginTop: 28,
          backgroundColor: '#B3261E',
          borderRadius: 10,
          paddingVertical: 13,
          alignItems: 'center',
},
logoutButtonPressed: {
  backgroundColor: '#8C1D18',
          opacity: 0.9,
},
logoutButtonText: {
  color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '700',
},
```

---

### Modálna obrazovka

1. Skopírujeme si `src/prepared-screens/ProductFilterScreen.tsx` do `src/screens/ProductFilterScreen.tsx`.
2. V `src/types/NavigationParamList.ts` upravíme `ProductStackParamList` pre podporu filtrácie:
```typescript
import {GetProductListOptions} from "../mock-data/data";
...
export type ProductStackParamList = {
  ProductList: GetProductListOptions | undefined;
  ProductDetail: { productId: string };
  ProductFilter: GetProductListOptions | undefined;
};
``` 
3. Do `ProductsStack` v `src/screens/RootNavigation.tsx` pridáme obrazovku `ProductFilterScreen` a nastavíme jej `presentation` na `modal`:
```typescript jsx
<Stack.Screen name="ProductFilter" options={{presentation: 'modal'}}  component={ProductFilterScreen}/>
```
4. Do `ProductListScreen` navigačné parametre pre filtráciu a tlačidlo na otvorenie filtra:
```typescript jsx
function ProductListScreen({ navigation, route }: ProductStackScreenProps<'ProductList'>) {
...
const productList = useMemo(() => getProductList(route.params), [route.params]);
...
const openFilter = useCallback(() => {
        navigation.navigate('ProductFilter', route.params);
    }, [navigation, route.params]);
...
<View style={styles.toolbar}>
  <Pressable style={styles.menuButton} onPress={openMenu}>
    <Text style={styles.menuButtonText}>Menu</Text>
  </Pressable>
  <Pressable style={styles.menuButton} onPress={openFilter}>
    <Text style={styles.menuButtonText}>Filter</Text>
  </Pressable>
</View>
```


5. V nasledujúcich krokoch použijeme knižnicu `@react-navigation/stack`.
6. Upravíme navigačné parametre pre nový `RootStack` v `src/types/NavigationParamList.ts`:
```typescript
export type ProductStackParamList = {
  ProductList: GetProductListOptions | undefined;
  ProductDetail: { productId: string };
};
...
export type BottomTabNavigationScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<BottomTabScreenProps<BottomTabParamList, T>, DrawerNavigationScreenProps<'BottomNavigation'>>;
...
export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>;
  ProductFilter: GetProductListOptions | undefined;
}

export type DrawerNavigationScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<DrawerScreenProps<DrawerParamList, T>, RootStackScreenProps<'Drawer'>>

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>
```
7. Vytvoríme nový `RootStack` navigátor v `src/screens/RootNavigation.tsx` a presunieme do neho `ProductFilterScreen`:
```typescript jsx
const RootStack = createStackNavigator<RootStackParamList>();

export function ProductsStack() {
  return (
          <Stack.Navigator>
            <Stack.Screen name="ProductList" component={ProductListScreen}/>
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
          </Stack.Navigator>
  );
}
...
export const DrawerNavigation = () => {
  const {isLoggedIn} = useContext(LoginContextProvider);
...
export const RootNavigation = () => {
  return (
          <RootStack.Navigator>
            <RootStack.Screen options={{headerShown: false}} name="Drawer" component={DrawerNavigation}/>
            <RootStack.Screen options={{presentation: 'modal'}} name="ProductFilter"
                              component={ProductFilterScreen}/>
          </RootStack.Navigator>
  )
}
```
8. Upravíme typy parametrov a `popTo` pre `ProductFilterScreen`:
```typescript jsx
function ProductFilterScreen({ navigation, route }: RootStackScreenProps<'ProductFilter'>) {
...
  navigation.popTo('Drawer', {
    screen: 'BottomNavigation',
    params: {
      screen: 'ProductsStack',
      params: {
        screen: 'ProductList',
        params: {
          sortBy,
          direction
        }
      }
    }
  });
```

### Abstrakcia obrazoviek s výberom dát

1. Upravíme navigačné parametre pre `ProductFilter` v súbore `src/types/NavigationParamList.ts` tak, aby okrem filtračných parametrov obsahovali aj informáciu o tom, odkiaľ sa obrazovka otvorila:
```typescript
ProductFilter: {
  currentFilter?: GetProductListOptions;
  /** route.key zdrojovej obrazovky, ktorá otvorí filter */
  sourceScreenKey: string;
  /** navigation.getState().key navigátora, ktorý vlastní zdrojovú obrazovku */
  sourceNavigatorKey: string;
}
```
2. Upravíme `ProductFilterScreen`:
```typescript jsx
const [sortBy, setSortBy] = useState<ProductSortBy | undefined>(route.params.currentFilter?.sortBy);
const [direction, setDirection] = useState<SortDirection>(route.params.currentFilter?.direction ?? 'asc');
...
const applyFilter = useCallback(() => {
  navigation.dispatch({
    ...CommonActions.setParams({
      sortBy,
      direction
    }),
    source: route.params.sourceScreenKey,
    target: route.params.sourceNavigatorKey,
  });
  navigation.goBack();
}, [navigation, sortBy, direction, route.params.sourceScreenKey, route.params.sourceNavigatorKey]);
```
3. Upravíme parametre navigácie v `ProductListScreen`:
```typescript jsx
const openFilter = useCallback(() => {
  navigation.navigate('ProductFilter', {
    currentFilter: route.params,
    sourceScreenKey: route.key,
    sourceNavigatorKey: navigation.getState().key,
  });
}, [navigation, route.params, route.key]);
```

---

### Safe areas

1. V súbore `src/screens/RootNavigation.tsx` odstránime header z obrazovky `FavoriteProductList`:
```typescript jsx
<BottomTab.Screen name="FavoriteProductList" options={{headerShown: false}} component={FavoriteProductListScreen}/>
```
2. Do `FavoriteProductListScreen` pridáme vlastný nadpis:
```typescript jsx
const renderHeader = useCallback(() => (
        <View style={styles.header}>
          <Text
                  style={styles.title}
                  accessibilityRole="header"
                  numberOfLines={1}
                  adjustsFontSizeToFit
          >
            Obľúbené produkty
          </Text>
        </View>
), []);
...
<View style={styles.container}>
  <FlatList
          data={productList}
          ListHeaderComponent={renderHeader}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
</View>
...
header: {
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 4,
},
title: {
  fontSize: 28,
  lineHeight: 34,
  fontWeight: '700',
  letterSpacing: 0.35,
  color: '#1C1C1E',
},
```

3. Do komponentu `<FlatList>` pridáme prop `contentInsetAdjustmentBehavior`:
```typescript jsx
<FlatList
        data={productList}
        contentInsetAdjustmentBehavior={'automatic'}
        ListHeaderComponent={renderHeader}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
/>
```

4. Namiesto kontajnera `<View>` použijeme `<SafeAreaView>`:
```typescript jsx
import { SafeAreaView } from 'react-native-safe-area-context';
...
<SafeAreaView style={styles.container}>
...
<SafeAreaView>
```

5. Namiesto komponentu `<SafeAreaView>` použijeme hook `useSafeAreaInsets`:
```typescript jsx
import {useSafeAreaInsets} from 'react-native-safe-area-context';
...
const insets = useSafeAreaInsets();
...
<View style={[styles.container, { paddingTop: insets.top }]}>
  <FlatList
          data={productList}
          ListHeaderComponent={renderHeader}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
</View>
```

---

#### Témy (Themes)

1. Upravíme `src/App.tsx` – do `NavigationContainer` pridáme prop `theme`:
```typescript jsx
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(91, 196, 191)',
        primary: 'rgb(193, 66, 67)',
    },
};
...
<NavigationContainer theme={MyTheme} linking={linking} onStateChange={onStateChange} ref={navigationRef}>
```

---

#### Úprava headera

1. V `src/screens/RootNavigation.tsx` upravíme tlačidlo späť pre všetky obrazovky v `ProductStack`:
```typescript jsx
<Stack.Navigator screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
```
2. V `src/screens/RootNavigation.tsx` pridáme pre obrazovku `ProductList` prop `title`:
```typescript jsx
<Stack.Screen
        name="ProductList"
        options={{
          title: 'Produkty',
        }}
        component={ProductListScreen}
/>
```
3. Pre `ProductDetail` pridáme prázdny `title`:
```typescript jsx
<Stack.Screen name="ProductDetail" options={{title: ''}} component={ProductDetailScreen}/>
```
4. V komponente `ProductDetailScreen` pridáme cez `setOptions` názov produktu:
```typescript jsx
useEffect(() => {
  if (product?.name) {
    navigation.setOptions({title: product.name});
  }
}, [navigation, product]);
```
5. Pre `ProductList`, `UserDetail` a `Login` pridáme tlačidlo na otváranie Drawera:
```typescript jsx
<Stack.Screen
        name="ProductList"
        options={{
          title: 'Produkty',
          headerLeft: () => <DrawerMenuButton/>,
        }}
        component={ProductListScreen}
/>
...
{isLoggedIn ? <Drawer.Screen
                name="UserDetail"
                component={UserDetailScreen}
                options={{headerLeft: () => <DrawerMenuButton/>}}
        /> :
        <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{headerLeft: () => <DrawerMenuButton/>}}
        />}
```
6. Z komponentu `ProductListScreen` odstránime tlačidlo Menu.

---
### Zabránenie návratu späť

1. Skopírujeme `src/prepared-screens/CheckoutCartScreen.tsx` do `/src/screens`.
2. Upravíme navigačné parametre v `src/types/NavigationParamList.ts`:
```typescript
export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>;
  ProductFilter: {
    currentFilter?: GetProductListOptions;
    /** route.key of the screen that opened the filter (receives the new params) */
    sourceScreenKey: string;
    /** navigation.getState().key of the navigator owning the source screen */
    sourceNavigatorKey: string;
  }
  CheckoutCart: undefined;
}
```
3. Pridáme obrazovku `CheckoutCart` do `RootStack`:
```typescript jsx
<RootStack.Navigator>
  <RootStack.Screen options={{headerShown: false}} name="Drawer" component={DrawerNavigation}/>
  <RootStack.Screen options={{presentation: 'modal'}} name="ProductFilter"
                    component={ProductFilterScreen}/>
  <RootStack.Screen
          name="CheckoutCart"
          component={CheckoutCartScreen}
          options={() => ({
            title: 'Košík',
          })}
  />
</RootStack.Navigator>
```
4. Pridáme komponent `<CartButton/>` do pravej časti headera obrazovky `ProductList`:
```typescript jsx
<Stack.Screen
        name="ProductList"
        options={{
          title: 'Produkty',
          headerLeft: () => <DrawerMenuButton/>,
          headerRight: () => <CartButton/>
        }}
        component={ProductListScreen}
/>
```

5. V `CheckoutCartScreen.tsx` použijeme hook `usePreventRemove`:
```typescript jsx
import {usePreventRemove} from "@react-navigation/native";
...
function CheckoutCartScreen({navigation}: RootStackScreenProps<'CheckoutCart'>) {
...
const hasUnsavedChanges = useMemo(() => {
  return (
          fullName !== '' ||
          street !== '' ||
          city !== '' ||
          zip !== '' ||
          phone !== '' ||
          cardHolder !== '' ||
          cardNumber !== '' ||
          expiry !== '' ||
          cvc !== ''
  );
}, [fullName, street, city, zip, phone, cardHolder, cardNumber, expiry, cvc]);

usePreventRemove(hasUnsavedChanges, ({ data }) => {
  Alert.alert(
          'Zahodiť zmeny?',
          'Máš neuložené zmeny. Naozaj chceš odísť a zahodiť ich?',
          [
            { text: 'Zostať', style: 'cancel', onPress: () => {} },
            {
              text: 'Zahodiť',
              style: 'destructive',
              onPress: () => navigation.dispatch(data.action),
            },
          ]
  );
});
```
