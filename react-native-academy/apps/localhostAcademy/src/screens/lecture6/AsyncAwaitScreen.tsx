/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function AsyncAwaitScreen() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function wait(ms: number) {
    return new Promise<void>(resolve => {
      timers.current.push(setTimeout(resolve, ms));
    });
  }

  async function objednaj(cislo: number) {
    console.log(`Objednávka ${cislo}.`);
    console.log(`Príprava ${cislo}`);
    await wait(1000);
    console.log(`Odovzdanie ${cislo}`);
  }

  function runExample() {
    const result = objednaj(1);
    console.log('Pokračujeme mimo funkcie');
    return result;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Objednávka cez async/await"
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
