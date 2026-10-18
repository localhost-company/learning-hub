import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getProductById, getRandomProductId } from '../mock-data/data';
import { NavigationParamList } from '../types/NavigationParamList';

type Props = NativeStackScreenProps<NavigationParamList, 'ProductDetail'>;

function ProductDetailScreen({ route, navigation }: Props) {
  const product = useMemo(() => {
    return getProductById(route.params.productId);
  }, [route.params.productId]);

  const onRandomProductPress = useCallback(() => {
    let nextId = getRandomProductId();

    while (nextId === route.params.productId) {
      nextId = getRandomProductId();
    }

    // 1. pouzitie navigate na rovnaku screenu, na ktorej sa nachadzame, nahradi aktualnu screenu novou instanciou s novym parametrom
    // navigation.navigate('ProductDetail', { productId: nextId });
    // 2. nevrati ma na 'ProductList' screenu ale prida novu do stacku
    // navigation.navigate('ProductList');
    // 3. prida novu detail screnu s inym produktom
    // navigation.push('ProductDetail', { productId: nextId });
    // 4. vrati ma na 'ProductList' screenu
    // navigation.goBack();
    // navigation.pop(3);
    // 5. naviguje na 'ProductSpecialDetail' pre demonstraciu popTo
    // navigation.navigate('ProductSpecialDetail', { productId: nextId });
    // 6. zavolanie pop to top ma vrati na PorductList
    // navigation.popToTop();
  }, [navigation, route.params.productId]);

  if (!product) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Produkt sa nenašiel.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.subtitle}>
        {product.category} • {product.manufacturer}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          {product.price.toFixed(2)} {product.currency}
        </Text>
        {!!product.originalPrice && (
          <Text style={styles.originalPrice}>
            {product.originalPrice.toFixed(2)} {product.currency}
          </Text>
        )}
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Dostupnosť</Text>
        <Text style={styles.value}>Skladom: {product.stock} ks</Text>
        <Text style={styles.value}>Stav: {product.condition}</Text>
        <Text style={styles.value}>Dostupnosť: {product.availability}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Technické info</Text>
        <Text style={styles.value}>OEM: {product.oemNumber}</Text>
        <Text style={styles.value}>Hmotnosť: {product.weightKg} kg</Text>
        <Text style={styles.value}>Typ stroja: {product.machineType.join(', ')}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Popis</Text>
        <Text style={styles.value}>{product.description}</Text>
        <Text style={styles.value}>{product.compatibility}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Doručenie a záruka</Text>
        <Text style={styles.value}>{product.shipping}</Text>
        <Text style={styles.value}>{product.warranty}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Hodnotenie</Text>
        <Text style={styles.value}>
          {product.rating.toFixed(1)} / 5 ({product.reviewCount} recenzií)
        </Text>
      </View>

      <View style={styles.tags}>
        {product.tags.map(tag => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onRandomProductPress}
        style={({ pressed }) => [styles.randomButton, pressed && styles.randomButtonPressed]}
      >
        <Text style={styles.randomButtonText}>Naviguj ma →</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    color: '#6E6E73',
  },
  priceRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  originalPrice: {
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  block: {
    marginTop: 18,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  value: {
    lineHeight: 20,
    marginBottom: 4,
  },
  tags: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: '#3641A3',
    fontWeight: '600',
  },
  randomButton: {
    marginTop: 24,
    backgroundColor: '#3641A3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  randomButtonPressed: {
    opacity: 0.75,
  },
  randomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
