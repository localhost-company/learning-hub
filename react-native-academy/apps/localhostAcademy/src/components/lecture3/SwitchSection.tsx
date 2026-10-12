import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { colors, fontFamilies, fontSizes, fontWeights, shadows } from '../../theme';
import FontAwareText from './FontAwareText';
import { getSectionPalette } from './sectionTheme';

type SwitchSectionProps = {
  isDarkMode?: boolean;
};

const SwitchSection = ({ isDarkMode }: SwitchSectionProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
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
        Switch
      </FontAwareText>
      <FontAwareText
        style={[styles.capabilities, { color: palette.textSecondary }]}
        isDarkMode={isDarkMode}
      >
        Capabilities: boolean input | controlled state
      </FontAwareText>
      <View style={styles.switchRow}>
        <FontAwareText
          style={[styles.switchLabel, { color: palette.textPrimary }]}
          isDarkMode={isDarkMode}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </FontAwareText>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: palette.switchTrackFalse, true: palette.switchTrackTrue }}
          thumbColor={palette.switchThumb}
        />
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontFamily: fontFamilies.body,
    fontSize: 15,
    color: colors.text.primary,
  },
});

export default SwitchSection;
