import { Image as ExpoImage } from 'expo-image';
import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  shadows,
  spacing,
} from '../../theme';

const HERO_SOURCES = {
  optimized: 'https://picsum.photos/id/1003/640/360.webp',
  heavy: 'https://picsum.photos/id/1003/2200/1400.jpg',
} as const;

const LIST_SOURCES = Array.from({ length: 1800 }, (_, index) => {
  return `https://picsum.photos/id/${40 + index}/320/220.webp`;
});

type Variant = keyof typeof HERO_SOURCES;

export const ImageOptimizationScreen = () => {
  const rnStartedAt = useRef<number>(Date.now());
  const expoStartedAt = useRef<number>(Date.now());

  const [variant, setVariant] = useState<Variant>('optimized');
  const [rnLoadMs, setRnLoadMs] = useState<number | null>(null);
  const [expoLoadMs, setExpoLoadMs] = useState<number | null>(null);

  const activeSource = HERO_SOURCES[variant];

  const summary = useMemo(() => {
    if (rnLoadMs == null || expoLoadMs == null) {
      return 'Switch source to measure both loaders.';
    }

    if (expoLoadMs <= rnLoadMs) {
      return `expo-image finished ${rnLoadMs - expoLoadMs} ms faster in this run.`;
    }

    return `RN Image finished ${expoLoadMs - rnLoadMs} ms faster in this run.`;
  }, [expoLoadMs, rnLoadMs]);

  const toggleVariant = () => {
    setVariant(prev => (prev === 'optimized' ? 'heavy' : 'optimized'));
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>Image performance demo</Text>
        <Text style={styles.title}>expo-image vs RN Image</Text>
        <Text style={styles.description}>
          Compare the same asset in two loaders. Toggle between an optimized source and a heavy
          source to explain decode, scaling, and cache behavior. See difference between expo and
          native image in list.
        </Text>
      </View>

      <View style={styles.controlsRow}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={toggleVariant}
        >
          <Text style={styles.buttonLabel}>
            Source: {variant === 'optimized' ? 'WebP (optimized)' : 'Large JPG (heavy)'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.comparisonRow}>
        <View style={styles.loaderCard}>
          <Text style={styles.loaderTitle}>RN native Image</Text>
          <RNImage
            onLoadStart={() => {
              rnStartedAt.current = Date.now();
            }}
            source={{ uri: activeSource }}
            style={styles.previewImage}
            resizeMode="cover"
            onLoad={() => {
              setRnLoadMs(Date.now() - rnStartedAt.current);
            }}
          />
          <Text style={styles.loaderMetric}>
            Load time: {rnLoadMs == null ? '-' : `${rnLoadMs} ms`}
          </Text>
        </View>

        <View style={styles.loaderCard}>
          <Text style={styles.loaderTitle}>expo-image</Text>
          <ExpoImage
            source={activeSource}
            style={styles.previewImage}
            contentFit="cover"
            // turn on for better performance (no transition, aggressive caching, and priority hints)
            // transition={250}
            // cachePolicy="memory-disk"
            // priority="high"
            onLoadStart={() => {
              expoStartedAt.current = Date.now();
            }}
            onLoad={() => {
              setExpoLoadMs(Date.now() - expoStartedAt.current);
            }}
          />
          <Text style={styles.loaderMetric}>
            Load time: {expoLoadMs == null ? '-' : `${expoLoadMs} ms`}
          </Text>
        </View>
      </View>

      <Text style={styles.summary}>{summary}</Text>

      <View style={styles.listSection}>
        <FlatList
          data={LIST_SOURCES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listRow}
          renderItem={({ item: uri, index }) => (
            <View key={uri} style={styles.listCard}>
              <ExpoImage
                source={uri}
                style={styles.listImage}
                contentFit="cover"
                cachePolicy="memory-disk"
                priority={index < 4 ? 'high' : 'low'} //would need to prioritize images in the viewport
                transition={150}
              />
            </View>
          )}
        />
        {/* <FlatList
          data={LIST_SOURCES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listRow}
          renderItem={({ item: uri }) => (
            <View key={uri} style={styles.listCard}>
              <RNImage source={{ uri }} style={styles.listImage} resizeMode="cover" />
            </View>
          )}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    rowGap: spacing.md,
    paddingBottom: spacing.xl,
  },
  heroCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.elevated,
    padding: spacing.lg,
    rowGap: spacing.sm,
    ...shadows.card,
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
    fontSize: fontSizes.title,
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },
  description: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    color: colors.text.secondary,
  },
  controlsRow: {
    rowGap: spacing.sm,
  },
  button: {
    borderRadius: radius.md,
    backgroundColor: colors.action.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonLabel: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.inverse,
    fontWeight: fontWeights.semibold,
  },

  comparisonRow: {
    rowGap: spacing.md,
  },
  loaderCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.elevated,
    padding: spacing.md,
    rowGap: spacing.sm,
  },
  loaderTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.bodyLarge,
    color: colors.text.primary,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: radius.sm,
    backgroundColor: colors.surface.subtle,
  },
  loaderMetric: {
    fontFamily: fontFamilies.accent,
    fontSize: fontSizes.meta,
    color: colors.text.secondary,
  },
  summary: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.meta,
    color: colors.action.link,
  },
  listSection: {
    rowGap: spacing.sm,
  },
  listRow: {
    columnGap: spacing.sm,
    paddingRight: spacing.lg,
  },
  listCard: {
    width: 170,
    rowGap: spacing.xs,
  },
  listImage: {
    width: 170,
    height: 115,
    borderRadius: radius.sm,
    backgroundColor: colors.surface.subtle,
  },
});
