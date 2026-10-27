/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function PromiseAllErrorScreen() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function wait(ms: number) {
    return new Promise<void>(resolve => {
      timers.current.push(setTimeout(resolve, ms));
    });
  }

  async function runExample() {
    const slow = wait(900).then(() => console.log('Odovzdanie 2'));
    const fail = wait(300).then(() => {
      throw new Error('Objednávka 1 zlyhala');
    });

    try {
      await Promise.all([fail, slow]);
    } catch (error) {
      console.log(`Chyba: ${error instanceof Error ? error.message : String(error)}`);
    }

    await slow;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Promise.all pri chybe"
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
