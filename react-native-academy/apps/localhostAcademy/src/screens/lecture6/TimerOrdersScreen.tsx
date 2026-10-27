/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function TimerOrdersScreen() {
  const poradieObjednavky = useRef(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function priprav(cislo: number) {
    const cakanie = (Math.floor(Math.random() * 3) + 1) * 1000;
    console.log(`Príprava ${cislo} (${cakanie / 1000} s)`);

    timers.current.push(
      setTimeout(function odovzdaj() {
        console.log(`Odovzdanie ${cislo}`);
      }, cakanie),
    );
  }

  function objednaj() {
    const cislo = poradieObjednavky.current++;
    console.log(`Objednávka ${cislo}.`);
    priprav(cislo);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Vytvoriť objednávku cez setTimeout"
        onPress={objednaj}
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
