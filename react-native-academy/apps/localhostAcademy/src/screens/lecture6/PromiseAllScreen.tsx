/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function PromiseAllScreen() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function wait(ms: number) {
    return new Promise<void>(resolve => {
      timers.current.push(setTimeout(resolve, ms));
    });
  }

  async function priprav(cislo: number, ms: number) {
    console.log(`Príprava ${cislo}`);
    await wait(ms);
    console.log(`Odovzdanie ${cislo}`);
    return `Objednávka ${cislo}`;
  }

  async function runExample() {
    const started = Date.now();
    console.log('Štart');

    const prva = priprav(1, 900);
    const druha = priprav(2, 600);

    const results = await Promise.all([prva, druha]);
    console.log(`Výsledky: ${results.join(', ')}`);
    console.log(`Trvanie: ${Date.now() - started} ms`);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Súbežne cez Promise.all"
        onPress={runExample}
        color={colors.action.primary}
      />
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
