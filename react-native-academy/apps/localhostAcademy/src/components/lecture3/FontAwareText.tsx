import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors, fontFamilies, fontSizes } from '../../theme';

interface FontAwareTextProps extends TextProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

const FontAwareText = ({ children, style, isDarkMode, ...props }: FontAwareTextProps) => {
  const textColor = isDarkMode ? colors.text.inverse : colors.text.primary;

  const customStyle = {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.meta,
    color: textColor,
  };

  return (
    <Text style={[customStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default FontAwareText;
