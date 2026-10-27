import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFavoriteProducts, Product } from '../mock-data/data';
import { BottomTabNavigationScreenProps } from '../types/NavigationParamList';

const productList = getFavoriteProducts();

const keyExtractor = (item: Product) => item.id;

function ProductSeparator() {
  return <View style={styles.separator} />;
}

function FavoriteProductListScreen({
  navigation,
}: BottomTabNavigationScreenProps<'FavoriteProductList'>) {
  const insets = useSafeAreaInsets();

  const navigateToProductDetail = useCallback(
    (productId: string) => {
      navigation.navigate('ProductsStack', {
        screen: 'ProductDetail',
        params: { productId },
      });
    },
    [navigation],
  );

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <Pressable style={styles.card} onPress={() => navigateToProductDetail(item.id)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.category} • {item.manufacturer}
        </Text>
        <Text style={styles.meta}>Typ stroja: {item.machineType.join(', ')}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>
            {item.price.toFixed(2)} {item.currency}
          </Text>
          <Text style={styles.stock}>Skladom: {item.stock}</Text>
        </View>
      </Pressable>
    ),
    [navigateToProductDetail],
  );

  const renderHeader = useCallback(
    () => (
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
    ),
    [],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={productList}
        ListHeaderComponent={renderHeader}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ProductSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
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
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    padding: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  meta: {
    color: '#6E6E73',
    marginBottom: 4,
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  stock: {
    fontSize: 13,
    color: '#006C3C',
    fontWeight: '600',
  },
  separator: {
    height: 10,
  },
});

export default FavoriteProductListScreen;
