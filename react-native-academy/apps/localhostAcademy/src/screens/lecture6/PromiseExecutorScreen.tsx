/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function PromiseExecutorScreen() {
  function runExample() {
    const promise = new Promise<number>(resolve => {
      console.log(1);
      resolve(2);
    });

    promise.then(value => console.log(value));
    console.log(3);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Executor a handler"
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
