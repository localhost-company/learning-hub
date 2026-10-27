/* eslint-disable no-console -- Request and response logs are part of the HTTP example. */
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../theme';

export default function NetworkErrorScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  async function runExample() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError(null);

    try {
      console.log('GET https://async-demo.invalid/products');
      const response = await fetch('https://async-demo.invalid/products', {
        signal: controller.signal,
      });

      console.log('HTTP status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
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
        title="GET: sieťová chyba"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.xl, gap: spacing.lg },
  text: { color: colors.text.primary },
});
