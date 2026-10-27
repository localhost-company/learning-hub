/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function OrderQueuesScreen() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function objednaj(cislo: number) {
    console.log(`Objednávka ${cislo}.`);
    console.log(`Príprava ${cislo}`);

    timers.current.push(
      setTimeout(function odovzdaj() {
        console.log(`Odovzdanie ${cislo}`);

        Promise.resolve().then(function uzavri() {
          console.log(`Uzavretie ${cislo}`);
        });
      }, 0),
    );

    Promise.resolve().then(function potvrd() {
      console.log(`Potvrdenie ${cislo}`);

      queueMicrotask(function vystavDoklad() {
        console.log(`Doklad ${cislo}`);
      });
    });
  }

  function runExample() {
    console.log('Začiatok');
    objednaj(1);
    objednaj(2);
    console.log('Koniec');
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Objednávky – task a microtask"
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
