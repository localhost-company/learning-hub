import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import FlatListSection from '../../components/lecture3/FlatListSection';
import ImageSection from '../../components/lecture3/ImageSection';
import PressableSection from '../../components/lecture3/PressableSection';
import ScrollViewSection from '../../components/lecture3/ScrollViewSection';
import SwitchSection from '../../components/lecture3/SwitchSection';
import TextInputSection from '../../components/lecture3/TextInputSection';
import TextSection from '../../components/lecture3/TextSection';
import ViewSection from '../../components/lecture3/ViewSection';
import { colors, fontFamilies, fontSizes, fontWeights, spacing } from '../../theme';

const BasicComponentsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>React Native Core Components</Text>
        <Text style={styles.screenSubtitle}>
          Every block below shows a core component and what it can do.
        </Text>

        <ViewSection />
        <TextSection />
        <ImageSection />
        <TextInputSection />
        <PressableSection />
        <SwitchSection />
        <FlatListSection />
        <ScrollViewSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface.canvas,
  },
  content: {
    padding: spacing.lg,
    rowGap: spacing.md,
    paddingBottom: 28,
  },
  screenTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.black,
    color: colors.brand.r4,
  },
  screenSubtitle: {
    fontFamily: fontFamilies.body,
    fontSize: 15,
    color: colors.text.secondary,
    marginBottom: 8,
  },
});

export default BasicComponentsScreen;
