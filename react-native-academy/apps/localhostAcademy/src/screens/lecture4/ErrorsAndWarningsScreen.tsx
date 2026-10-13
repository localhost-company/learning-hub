import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const ErrorsAndWarningsScreen = () => {
  const logError = () => {
    console.error('This is an error');
  };

  const logWarning = () => {
    console.warn('This is a warning');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={logError}>
        <Text>Log Error</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={logWarning}>
        <Text>Log Warning</Text>
      </Pressable>
    </View>
  );
};

export default ErrorsAndWarningsScreen;
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
