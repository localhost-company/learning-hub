import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, radius, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type ImageSectionProps = {
  isDarkMode?: boolean;
};

const ImageSection = ({ isDarkMode }: ImageSectionProps) => {
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
        Image
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: remote image loading | resize modes
      </FontAwareText>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' }}
        style={styles.imageDemo}
        resizeMode="cover"
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
  imageDemo: {
    width: '100%',
    height: 140,
    borderRadius: radius.sm,
  },
});

export default ImageSection;
