import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = { id: string; name: string; price: number };

const INITIAL_ITEMS: Item[] = [
  { id: '1', name: 'Káva', price: 3.5 },
  { id: '2', name: 'Croissant', price: 2.2 },
  { id: '3', name: 'Čaj', price: 2.8 },
];

const SourcesDebuggerBreakpointsCodeScreen = () => {
  const [cart, setCart] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item: Item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    calculateTotal();
    console.log('Cart:', cart);
  };

  const calculateTotal = () => {
    const sum = cart.reduce((total, item) => total + item.price, 0);
    setTotal(sum);
    if (sum > 10) {
      throw new Error('Not Enough Money!');
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <TouchableOpacity style={styles.item} onPress={() => addToCart(item)}>
        <Text>
          {item.name} - {item.price}€
        </Text>
      </TouchableOpacity>
    ),
    [cart],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Môj Košík</Text>

      <FlatList data={INITIAL_ITEMS} keyExtractor={item => item.id} renderItem={renderItem} />

      <View style={styles.footer}>
        <Text>Celkom: {total.toFixed(2)}€</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Zaplatiť</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SourcesDebuggerBreakpointsCodeScreen;
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  item: { padding: 20, borderBottomWidth: 1, borderColor: '#ccc' },
  footer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white' },
});
