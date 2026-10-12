import React, { useCallback, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 } from 'uuid';
import { colors, fontFamilies, fontSizes } from '../../theme';

const objects = [
  ['avocado', '🥑'],
  ['apple', '🍏'],
  ['orange', '🍊'],
  ['cactus', '🌵'],
];

const getRandomItem = () => {
  const item = objects[~~(Math.random() * objects.length)];
  return {
    name: item[0],
    icon: item[1],
    id: v4(),
  };
};

const _items = Array.from(new Array(50)).map(getRandomItem);

/*
  Tu ukazem, ako zmena isFilterOpen rerenderuje celu ScrollView aj ked nie je zavysla na tom stave.
  Potom nastavim limit pre items na 10k a vysvetlim, ze vsetky sa vyrenderuju naraz a opat aj prerenderuju pri zmene isFilterOpen, co je problem.
  + vidno ako animacia seka, lebo sa prerenderuje vela komponentov naraz.
*/
const ScrollViewListScreen = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const [items, setItems] = useState(_items);
  const addItem = useCallback(() => {
    setItems([getRandomItem()].concat(items));
  }, [items]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>ScrollView demo</Text>
        <Text style={styles.title}>Why list choice matters</Text>
        <Text style={styles.description}>
          This example shows how ScrollView renders the whole dataset at once and can become costly
          as the list grows.
        </Text>
      </View>

      <Button title="Add Item" onPress={addItem} />

      <Pressable onPress={toggleFilter} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{isFilterOpen ? 'Close Filter' : 'Open Filter'}</Text>
      </Pressable>
      {isFilterOpen && (
        <Animated.View style={styles.filterOptions} entering={FadeIn} exiting={FadeOut}>
          <Text>Filter options would go here</Text>
        </Animated.View>
      )}

      <ScrollView contentContainerStyle={styles.contentStyle}>
        {items.map(({ name, icon, id }) => (
          <View style={styles.itemContainer} key={id}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.icon}>{icon}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroCard: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#102347',
    borderWidth: 1,
    borderColor: '#1b3972',
  },
  badge: {
    alignSelf: 'flex-start',
    fontSize: fontSizes.caption,
    fontFamily: fontFamilies.accent,
    color: colors.badge.color,
    backgroundColor: colors.badge.backgroundColor,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: '#cfdbff',
  },
  contentStyle: {
    rowGap: 12,
  },
  itemContainer: {
    borderWidth: 1,
    margin: 3,
    padding: 5,
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    width: 150,
  },
  icon: {
    fontSize: 20,
  },
  filterButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterOptions: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
});

export default ScrollViewListScreen;
