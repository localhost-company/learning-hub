/* eslint-disable no-console -- Request and response logs are part of the HTTP example. */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../theme';

type Product = { id: number; title: string; price: number };

export default function HttpSlowScreen() {
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (attempt === 0) return;
    const controller = new AbortController();
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setProducts([]);
      setError(null);

      try {
        console.log('GET /products?limit=3&select=title,price&delay=2500');
        const response = await fetch(
          'https://dummyjson.com/products?limit=3&select=title,price&delay=2500',
          { signal: controller.signal },
        );
        console.log('HTTP status:', response.status);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data: { products: Product[] } = await response.json();
        if (!ignore) {
          console.log(data.products);
          setProducts(data.products);
        }
      } catch (cause) {
        if (!ignore) {
          const message = cause instanceof Error ? cause.message : String(cause);
          console.log('Chyba:', message);
          setError(message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    void loadProducts();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [attempt]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="GET: pomalá odpoveď"
        onPress={() => setAttempt(value => value + 1)}
        disabled={loading}
        color={colors.action.primary}
      />
      {loading && <ActivityIndicator color={colors.action.primary} />}
      {error && (
        <Text accessibilityRole="alert" style={styles.text}>
          {error}
        </Text>
      )}
      {products.map(product => (
        <Text key={product.id} style={styles.text}>
          {product.title}: {product.price.toFixed(2)} USD
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.xl, gap: spacing.lg },
  text: { color: colors.text.primary },
});
