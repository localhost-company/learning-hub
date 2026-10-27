/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function BlockingOrdersScreen() {
  const poradieObjednavky = useRef(1);

  function priprav(cislo: number) {
    console.log(`Príprava ${cislo}`);

    for (let i = 0; i < 10_000; i++) {
      const koniec = performance.now() + 0.2;
      while (performance.now() < koniec) {
        // Zámerne blokujeme JS vlákno: spolu približne 2 sekundy.
      }
    }
  }

  function objednaj() {
    const cislo = poradieObjednavky.current++;
    console.log(`Objednávka ${cislo}.`);
    priprav(cislo);
    console.log(`Odovzdanie ${cislo}`);
  }

  return (
    <View style={styles.container}>
      <Button title="Vytvoriť objednávku" onPress={objednaj} color={colors.action.primary} />
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
