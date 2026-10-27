/* eslint-disable no-console -- Request and response logs are part of the HTTP example. */
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../theme';

type Product = { id: number; title: string; price: number };

export default function HttpGetScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  async function runExample() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      console.log('GET https://dummyjson.com/products?limit=3&select=title,price');
      const response = await fetch('https://dummyjson.com/products?limit=3&select=title,price', {
        signal: controller.signal,
      });

      console.log('HTTP status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: { products: Product[] } = await response.json();
      console.log(data.products);
      if (!controller.signal.aborted) setProducts(data.products);
    } catch (cause) {
      if (!controller.signal.aborted) {
        const message = cause instanceof Error ? cause.message : String(cause);
        console.log('Chyba:', message);
        setError(message);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="GET: úspech"
        onPress={runExample}
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
