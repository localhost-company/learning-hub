import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const SlowItem = ({ index }: { index: number }) => {
  return (
    <View style={styles.item}>
      <Text>Položka č. {index}</Text>
    </View>
  );
};

// const SlowItem = memo(({index}: { index: number }) => {
//     return (
//         <View style={styles.item}>
//             <Text>Položka č. {index}</Text>
//         </View>
//     );
// });

const PerformanceCPURenderScreen = () => {
  const [count, setCount] = useState(0);

  const items = Array.from({ length: 10000 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Počítadlo: {count}</Text>

      <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
        <Text>Zvýšiť počítadlo</Text>
      </Pressable>

      <ScrollView>
        {items.map(item => (
          <SlowItem key={item} index={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PerformanceCPURenderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
});
