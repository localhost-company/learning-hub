import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, radius, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type PressableSectionProps = {
  isDarkMode?: boolean;
};

const PressableSection = ({ isDarkMode }: PressableSectionProps) => {
  const [pressCount, setPressCount] = useState(0);
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
        Pressable
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: touch events | pressed-state feedback | triggering actions
      </FontAwareText>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: palette.buttonBackground },
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setPressCount(c => c + 1)}
      >
        <FontAwareText
          style={[styles.buttonText, { color: palette.buttonText }]}
          isDarkMode={isDarkMode}
        >
          Tap me
        </FontAwareText>
      </Pressable>
      <FontAwareText
        style={[styles.inputResult, { color: palette.textPrimary }]}
        isDarkMode={isDarkMode}
      >
        Tapped {pressCount} times
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
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.action.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.text.inverse,
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.bold,
  },
  inputResult: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
  },
});

export default PressableSection;
