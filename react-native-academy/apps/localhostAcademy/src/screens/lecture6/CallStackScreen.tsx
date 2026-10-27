/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function CallStackScreen() {
  function priprav() {
    console.log('Príprava');

    for (let i = 0; i < 10_000; i++) {
      const koniec = performance.now() + 0.2;
      while (performance.now() < koniec) {
        // Zámerne blokujeme JS vlákno: spolu približne 2 sekundy.
      }
    }
  }

  function objednaj() {
    console.log('Objednávka');
    priprav();
    console.log('Odovzdanie');
  }

  function runExample() {
    console.log('Začiatok');
    objednaj();
    console.log('Koniec');
  }

  return (
    <View style={styles.container}>
      <Button title="Spustiť: Vnorené volania" onPress={runExample} color={colors.action.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
});
