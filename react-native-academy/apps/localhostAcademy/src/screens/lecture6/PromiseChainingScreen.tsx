/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function PromiseChainingScreen() {
  function runExample() {
    Promise.resolve(2)
      .then(value => value + 3)
      .then(value => value * 4)
      .then(value => console.log(value));
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Reťazenie hodnôt"
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
