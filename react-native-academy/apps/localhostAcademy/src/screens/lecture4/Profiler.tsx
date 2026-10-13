import React, { useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';

const Profiler = () => {
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>{count}</Text>
      <Text>{second}</Text>
      <Button onPress={() => setCount(count + 1)} title="Press one" />
      <Button onPress={() => setSecond(second + 1)} title="Press two" />
    </View>
  );
};

const Button = ({ onPress, title }: { onPress: PressableProps['onPress']; title: string }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
};

// const Profiler = () => {
//   const [count, setCount] = useState(0);
//   const [second, setSecond] = useState(0);
//   const onPressHandler = useCallback(() => setCount(count + 1), [count]);
//   const secondHandler = useCallback(() => setSecond(second + 1), [second]);
//   return (
//     <View style={styles.container}>
//       <Text>Welcome!</Text>
//       <Text>{count}</Text>
//       <Text>{second}</Text>
//       <Button onPress={onPressHandler} title="Press one" />
//       <Button onPress={secondHandler} title="Press two" />
//     </View>
//   );
// };
//
// const Button = memo(({ onPress, title }: { onPress: PressableProps['onPress']; title: string }) => {
//   return (
//     <Pressable style={styles.button} onPress={onPress}>
//       <Text>{title}</Text>
//     </Pressable>
//   );
// });

export default Profiler;
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
