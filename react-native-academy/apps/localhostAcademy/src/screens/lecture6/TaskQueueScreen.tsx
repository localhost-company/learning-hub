/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function TaskQueueScreen() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function priprav() {
    console.log('Príprava');
    const cakanie = (Math.floor(Math.random() * 3) + 1) * 1000;

    timers.current.push(
      setTimeout(function odovzdaj() {
        console.log('Odovzdanie');
      }, cakanie),
    );
  }

  function objednaj() {
    console.log('Objednávka');
    priprav();
  }

  function runExample() {
    console.log('Začiatok');
    objednaj();
    console.log('Koniec');
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Odovzdanie cez setTimeout"
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
