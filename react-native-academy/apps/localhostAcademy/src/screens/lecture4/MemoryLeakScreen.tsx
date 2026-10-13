import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Globálna premenná na ukladanie closure funkcií
let leakyClosures: (() => void)[] = [];
// Vygeneruje náhodné dáta
const generateLargeData = () => {
  return new Array(1000).fill(null).map(() => ({
    id: Math.random().toString(),
    data: new Array(500).fill('??').join(''),
    timestamp: new Date().toISOString(),
    nested: {
      moreData: new Array(100).fill({
        value: Math.random(),
        text: 'vnorené dáta, ktoré zaberajú pamäť',
      }),
    },
  }));
};

const createClosure = () => {
  const newDataLeak = generateLargeData(); // Vytvorí veľké pole dát
  return () => {
    newDataLeak.forEach(data => data.id); // Closure zachytí referenciu na pole
  };
};
// Vytvorí mnoho closure funkcií, každá zachytí vlastné veľké pole dát
const createManyLeaks = () => {
  for (let i = 0; i < 10; i++) {
    const leakyClosure = createClosure();
    // leakyClosure(); // priamym volaním closure necháme GC uvoľniť pamäť
    leakyClosures.push(leakyClosure); // Uloží referenciu, aby GC nemohol objekt uvoľniť
    // Spustí všetky closures, aby dáta zostali „aktívne"
    leakyClosures.forEach(closure => closure());
  }
};

export const MemoryLeakScreen = () => {
  useEffect(() => {
    leakyClosures = [];
    return () => {
      leakyClosures = [];
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={createManyLeaks}>
        <Text>Run Memory leak</Text>
      </Pressable>
    </View>
  );
};

export default MemoryLeakScreen;
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
