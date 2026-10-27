/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function BlockedTimerScreen() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function blokuj() {
    const koniec = performance.now() + 2000;
    while (performance.now() < koniec) {
      // Synchrónna práca drží call stack obsadený približne 2 sekundy.
    }
  }

  function runExample() {
    const zaciatok = performance.now();
    console.log('Začiatok');

    timers.current.push(
      setTimeout(function poTimere() {
        const uplynulo = Math.round(performance.now() - zaciatok);
        console.log(`Timer 500 ms: spustený po ${uplynulo} ms`);
      }, 500),
    );

    blokuj();
    console.log('Koniec');
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Timer a plný call stack"
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
