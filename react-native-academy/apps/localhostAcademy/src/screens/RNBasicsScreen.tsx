import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

type RNBasicsSubsection = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  navigateTo: string;
};

const subsections: RNBasicsSubsection[] = [
  {
    id: '1',
    title: 'Core Components',
    description:
      'Basic building blocks of React Native: View, Text, Image, ScrollView, TextInput, Pressable, and more.',
    highlights: ['components and props', 'styling via StyleSheet', 'user interaction'],
    navigateTo: 'BasicComponents',
  },
  {
    id: '2',
    title: 'Introduce Dark Mode',
    description: 'Impelementing dark mode in a React Native app.',
    highlights: ['theming best practices'],
    navigateTo: 'DarkMode',
  },
  {
    id: '3',
    title: 'ScrollView Deep Dive',
    description:
      'Exploration of the ScrollView component, including performance and best practices for rendering large lists.',
    highlights: ['ScrollView optimizations', 'rendering large lists'],
    navigateTo: 'ScrollViewList',
  },
  {
    id: '5',
    title: 'Lists with FlatList',
    description: 'Using FlatList for efficient rendering of large lists',
    highlights: ['FlatList usage', 'performance optimizations'],
    navigateTo: 'ListExampleScreen',
  },
  {
    id: '4',
    title: 'Debounced TextInput',
    description:
      'Creating a debounced TextInput component that delays updates until the user has stopped typing.',
    highlights: ['debouncing user input', 'state management'],
    navigateTo: 'DebouncedTextInputScreen',
  },
  {
    id: '6',
    title: 'Image Optimization',
    description:
      'Practical comparison of RN Image and expo-image with source switching, prefetch and priority hints.',
    highlights: ['expo-image vs RN Image', 'prefetch', 'priority'],
    navigateTo: 'ImageOptimizationScreen',
  },
];

const RNBasicsScreen = () => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.overlay}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Lecture 3</Text>
        <Text style={styles.title}>React Native Basics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {subsections.map(section => {
          const onPress = () => {
            if (section.navigateTo === 'RNBasicsSubsection') {
              navigate('RNBasicsSubsection', {
                title: section.title,
                description: section.description,
                highlights: section.highlights,
              });
              return;
            }

            navigate(section.navigateTo);
          };

          return (
            <Pressable
              key={section.id}
              onPress={onPress}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{section.title}</Text>
              </View>
              <Text style={styles.cardDescription}>{section.description}</Text>
              <Text style={styles.cardCta}>Open subsection</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.surface.canvas,
    padding: spacing.lg,
  },
  hero: {
    rowGap: 6,
    marginBottom: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    fontFamily: fontFamilies.accent,
    fontSize: fontSizes.caption,
    color: colors.badge.color,
    fontWeight: '700',
    backgroundColor: colors.badge.backgroundColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.black,
    color: colors.brand.r4,
  },
  scrollContent: {
    rowGap: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.elevated,
    borderRadius: radius.md,
    padding: 14,
    rowGap: 10,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  cardTitle: {
    flex: 1,
    fontFamily: fontFamilies.heading,
    fontSize: 17,
    color: colors.text.primary,
    fontWeight: fontWeights.bold,
  },
  cardDescription: {
    color: colors.text.secondary,
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  cardCta: {
    color: colors.action.link,
    fontFamily: fontFamilies.accent,
    fontSize: fontSizes.meta,
    fontWeight: fontWeights.semibold,
  },
});

export default RNBasicsScreen;
