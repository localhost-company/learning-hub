import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  shadows,
  spacing,
} from '../theme';

export type LectureItem = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  navigateTo: string;
};

const LectureCard = ({ image, title, description, navigateTo }: LectureItem) => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();

  const navigateToCallback = () => {
    navigate(navigateTo);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={`Open lecture ${title}`}
      onPress={navigateToCallback}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardHeader}>
        <Image source={image} style={styles.image} />
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
        <Text style={styles.cta}>Tap to continue</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.elevated,
    padding: spacing.lg,
    borderRadius: radius.md,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  image: {
    height: 44,
    width: 44,
    resizeMode: 'cover',
    borderRadius: radius.sm,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.md,
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  content: {
    rowGap: spacing.sm,
  },
  description: {
    color: colors.text.secondary,
    lineHeight: lineHeights.body,
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
  },
  cta: {
    color: colors.action.link,
    fontFamily: fontFamilies.accent,
    fontWeight: fontWeights.semibold,
    fontSize: fontSizes.meta,
  },
});

export default LectureCard;
