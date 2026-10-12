import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, shadows, spacing } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

const listData = [
  { id: '1', label: 'Fast rendering for larger lists' },
  { id: '2', label: 'Easy item separators and key extraction' },
  { id: '3', label: 'Works well with dynamic data' },
];

type FlatListSectionProps = {
  isDarkMode?: boolean;
};

const FlatListSection = ({ isDarkMode }: FlatListSectionProps) => {
  const palette = getSectionPalette(isDarkMode);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: palette.cardBackground, borderColor: palette.border },
      ]}
    >
      <FontAwareText
        style={[styles.cardTitle, { color: palette.textPrimary }]}
        isDarkMode={isDarkMode}
      >
        FlatList
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: efficient list rendering | item separators | stable key extraction
      </FontAwareText>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <FontAwareText
            style={[styles.listItem, { color: palette.textPrimary }]}
            isDarkMode={isDarkMode}
          >
            • {item.label}
          </FontAwareText>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface.elevated,
    borderRadius: 14,
    padding: 14,
    rowGap: 10,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    ...shadows.card,
  },
  cardTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  capabilities: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.meta,
    color: colors.text.secondary,
  },
  separator: {
    height: spacing.sm,
  },
  listItem: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
  },
});

export default FlatListSection;
