import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { colors, fontFamilies, fontWeights, radius } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

interface FontAwareButtonProps extends PressableProps {
  isDarkMode?: boolean;
  title: string;
}

const FontAwareButton = ({ isDarkMode, onPress, title, ...props }: FontAwareButtonProps) => {
  const palette = getSectionPalette(isDarkMode);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.buttonBackground },
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      {...props}
    >
      <FontAwareText
        style={[styles.buttonText, { color: palette.buttonText }]}
        isDarkMode={isDarkMode}
      >
        {title}
      </FontAwareText>
    </Pressable>
  );
};
const styles = StyleSheet.create({
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
});

export default FontAwareButton;
