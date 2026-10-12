import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, radius, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type TextInputSectionProps = {
  isDarkMode?: boolean;
};

const TextInputSection = ({ isDarkMode }: TextInputSectionProps) => {
  const [name, setName] = useState('');
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
        TextInput
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: capturing user input | placeholder and keyboard options | state binding
      </FontAwareText>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: palette.inputBackground,
            borderColor: palette.inputBorder,
            color: palette.textPrimary,
          },
        ]}
        placeholder="Type your name"
        placeholderTextColor={palette.textSecondary}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <FontAwareText
        style={[styles.inputResult, { color: palette.textPrimary }]}
        isDarkMode={isDarkMode}
      >
        Hello {name || 'student'}!
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
  input: {
    borderWidth: 1,
    borderColor: colors.border.strong,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface.primary,
  },
  inputResult: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
  },
});

export default TextInputSection;
