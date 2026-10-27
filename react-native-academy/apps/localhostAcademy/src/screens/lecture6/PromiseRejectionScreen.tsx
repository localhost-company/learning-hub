/* eslint-disable no-console -- Console output is the example shown in DevTools. */
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export default function PromiseRejectionScreen() {
  function runExample() {
    Promise.reject(new Error('Vypredané'))
      .catch((error: Error) => {
        console.log(`Chyba: ${error.message}`);
        return 'Náhradný čaj';
      })
      .finally(() => console.log('Upratané'))
      .then(result => console.log(result));
  }

  return (
    <View style={styles.container}>
      <Button
        title="Spustiť: Reject, catch a finally"
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
