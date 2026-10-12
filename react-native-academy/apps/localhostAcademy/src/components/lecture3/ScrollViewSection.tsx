import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, lineHeights, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type ScrollViewSectionProps = {
  isDarkMode?: boolean;
};

const ScrollViewSection = ({ isDarkMode }: ScrollViewSectionProps) => {
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
        ScrollView
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: vertical scrolling | content container styling | section-based screens
      </FontAwareText>
      <FontAwareText
        style={[styles.textDemo, { color: palette.textPrimary }]}
        isDarkMode={isDarkMode}
      >
        This entire screen is wrapped in ScrollView, so it remains usable even when content grows.
      </FontAwareText>
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
  textDemo: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
    lineHeight: lineHeights.relaxed,
  },
});

export default ScrollViewSection;
