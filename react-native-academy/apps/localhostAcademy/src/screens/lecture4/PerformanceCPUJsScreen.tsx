import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const PerformanceCPUJsScreen = () => {
  const longRunningFunction = () => {
    performance.mark('long-running-function-start');

    let i = 0;
    while (i < 1000000000) {
      i++;
    }
    performance.mark('long-running-function-end'); // Druhá značka
    performance.measure(
      'Long running function run',
      'long-running-function-start',
      'long-running-function-end',
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={longRunningFunction}>
        <Text>Run long running function</Text>
      </Pressable>
    </View>
  );
};

export default PerformanceCPUJsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
});
