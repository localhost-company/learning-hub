import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, lineHeights, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type TextSectionProps = {
  isDarkMode?: boolean;
};

const TextSection = ({ isDarkMode }: TextSectionProps) => {
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
        Text
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: typography styles | inline emphasis | numberOfLines truncation
      </FontAwareText>
      <FontAwareText
        numberOfLines={2}
        style={[styles.textDemo, { color: palette.textPrimary }]}
        isDarkMode={isDarkMode}
      >
        Text supports styling, inline formatting like{' '}
        <FontAwareText
          style={[styles.textBold, { color: palette.textPrimary }]}
          isDarkMode={isDarkMode}
        >
          bold words
        </FontAwareText>
        , and line truncation when content is too long for the container.
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
  textBold: {
    fontWeight: fontWeights.bold,
  },
});

export default TextSection;
