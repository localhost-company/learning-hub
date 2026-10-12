import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, radius, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type ViewSectionProps = {
  isDarkMode?: boolean;
};

const ViewSection = ({ isDarkMode }: ViewSectionProps) => {
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
        View
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: layout with flexbox | nesting and grouping | visual styling with StyleSheet
      </FontAwareText>
      <View style={styles.viewDemo}>
        <View style={[styles.box, styles.boxPrimary]} />
        <View style={[styles.box, styles.boxSecondary]} />
        <View style={[styles.box, styles.boxAccent]} />
      </View>
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
  viewDemo: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
  },
  boxPrimary: {
    backgroundColor: colors.brand.r1,
  },
  boxSecondary: {
    backgroundColor: colors.brand.r2,
  },
  boxAccent: {
    backgroundColor: colors.brand.g1,
  },
});

export default ViewSection;
