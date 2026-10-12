import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { v4 } from 'uuid';
import { colors, fontFamilies, fontSizes } from '../../theme';

type DemoItem = {
  id: string;
  icon: string;
  isFeatured: boolean;
  lesson: string;
  order: number;
};

const ITEM_HEIGHT = 92;
// change this to slow render for testing purposes
const RENDER_WORK_ITERATIONS = 80;

const calculateRenderLoad = (order: number) => {
  let load = order + 1;

  for (let iteration = 0; iteration < RENDER_WORK_ITERATIONS; iteration += 1) {
    load = Math.sin(load + iteration) * Math.cos(load - iteration);
  }

  return Math.round(Math.abs(load) * 100);
};

const getRandomItem = (order: number): DemoItem => {
  return {
    lesson: `List item #${order + 1}`,
    icon: '🌟',
    id: v4(),
    order,
    isFeatured: order % 4 === 0,
  };
};

const ITEMS = Array.from({ length: 5000 }, (_, index) => getRandomItem(index));

type ListHeaderProps = {
  isReversed: boolean;
  onToggleFeatured: () => void;
  onToggleSort: () => void;
  showFeaturedOnly: boolean;
};

const ListHeader = ({
  isReversed,
  onToggleFeatured,
  onToggleSort,
  showFeaturedOnly,
}: ListHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  return (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>List performance demo</Text>
        <Text style={styles.title}>List essentials</Text>
        <Text style={styles.description}>
          Explore how filtering and sorting impact rendering in long lists. Learn about
          virtualization, key extraction, and optimization.
        </Text>
      </View>

      <Pressable onPress={toggleFilter} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>
          {isFilterOpen ? 'Hide List Controls' : 'Show List Controls'}
        </Text>
      </Pressable>

      {isFilterOpen && (
        <Animated.View style={styles.filterOptions} entering={FadeIn} exiting={FadeOut}>
          <View style={styles.actionsRow}>
            <Pressable onPress={onToggleSort} style={styles.controlButton}>
              <Text style={styles.controlButtonLabel}>
                Sort: {isReversed ? 'Descending' : 'Ascending'}
              </Text>
            </Pressable>
          </View>

          <Pressable onPress={onToggleFeatured} style={styles.controlButtonWide}>
            <Text style={styles.controlButtonLabel}>
              Filter: {showFeaturedOnly ? 'Featured only' : 'All items'}
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};

export const ListExampleScreen = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const visibleItems = useMemo(() => {
    const filtered = showFeaturedOnly ? ITEMS.filter(item => item.isFeatured) : ITEMS;
    const sorted = [...filtered].sort((a, b) =>
      isReversed ? b.order - a.order : a.order - b.order,
    );
    return sorted;
  }, [isReversed, showFeaturedOnly]);

  const toggleSort = () => {
    setIsReversed(prev => !prev);
  };

  const toggleFeatured = () => {
    setShowFeaturedOnly(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <FlashList
        contentContainerStyle={styles.contentStyle}
        data={visibleItems}
        // maybe during live coding ...
        // getItemLayout={(_, index) => ({
        //   length: ITEM_HEIGHT,
        //   offset: ITEM_HEIGHT * index,
        //   index,
        // })}
        // initialNumToRender={10}
        // keyExtractor={item => item.id}
        // maxToRenderPerBatch={10}
        // removeClippedSubviews
        renderItem={({ item }) => {
          const { lesson, icon, isFeatured } = item;
          const renderLoad = calculateRenderLoad(item.order);

          return (
            <View style={[styles.itemContainer, styles.itemContainerComfy]}>
              <Text style={styles.itemOrder}>#{item.order + 1}</Text>
              <Text style={styles.lesson}>{lesson}</Text>
              <Text style={styles.icon}>{icon}</Text>
              {isFeatured && <Text style={styles.featured}>featured</Text>}
              <Text style={styles.renderProbe}>calc {renderLoad}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={ListSeparator}
        ListFooterComponent={<ListFooter total={visibleItems.length} />}
        ListHeaderComponent={
          <ListHeader
            isReversed={isReversed}
            onToggleFeatured={toggleFeatured}
            onToggleSort={toggleSort}
            showFeaturedOnly={showFeaturedOnly}
          />
        }
        // windowSize={7}
      />
    </View>
  );
};

const ListSeparator = () => <View style={styles.separator} />;

type ListFooterProps = {
  total: number;
};

const ListFooter = ({ total }: ListFooterProps) => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Rendered dataset size: {total} items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#dde4f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemContainerComfy: {
    minHeight: ITEM_HEIGHT,
  },
  itemOrder: {
    fontSize: 13,
    color: '#33466c',
    width: 44,
    fontWeight: '700',
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
  },
  lesson: {
    flex: 1,
    fontSize: 15,
    color: '#1d2f53',
    fontWeight: '600',
  },
  featured: {
    fontSize: 11,
    color: '#124889',
    backgroundColor: '#dcecff',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
    overflow: 'hidden',
  },
  renderProbe: {
    fontSize: 10,
    color: '#8a3d15',
    backgroundColor: '#fff0df',
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginLeft: 8,
    overflow: 'hidden',
  },
  contentStyle: {
    padding: 16,
    paddingBottom: 24,
  },
  heroCard: {
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
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
    paddingVertical: 6,
    marginBottom: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#cfdbff',
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#2a4e9b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#3d65ba',
  },
  controlButtonWide: {
    backgroundColor: '#2a4e9b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#3d65ba',
  },
  controlButtonLabel: {
    color: '#f4f7ff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#3157a3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterOptions: {
    backgroundColor: '#e6efff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  separator: {
    height: 10,
  },
  footerContainer: {
    marginTop: 14,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#e2e9f7',
  },
  footerText: {
    textAlign: 'center',
    color: '#1d2f53',
    fontSize: 13,
    fontWeight: '600',
  },
});
