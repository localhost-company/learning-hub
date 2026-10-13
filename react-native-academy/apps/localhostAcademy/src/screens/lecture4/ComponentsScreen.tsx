import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const ComponentsScreen = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('Current counter value:', counter);
  }, [counter]);

  const updateCounter = useCallback(() => {
    setCounter(prevCounter => prevCounter + 1);
  }, [setCounter]);

  const multipliedCounter = useMemo(() => {
    return counter * 2;
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {counter}</Text>
      <Pressable style={styles.button} onPress={updateCounter}>
        <Text>Update counter</Text>
      </Pressable>
    </View>
  );
};

export default ComponentsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
});
