import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LectureCard, { LectureItem } from '../components/LectureCard';
import { colors, fontFamilies, fontSizes, fontWeights, spacing } from '../theme';

const lectures: LectureItem[] = [
  {
    title: 'Errors and Warnings',
    navigateTo: 'ErrorsAndWarnings',
    description:
      'Read console messages and LogBox stack traces to identify errors and warnings.',
  },
  {
    title: 'Sources, Debugger, Breakpoints, Code',
    navigateTo: 'SourcesDebuggerBreakpointsCode',
    description:
      'Pause execution with breakpoints and inspect variables and the call stack to find bugs.',
  },
  {
    title: 'Network',
    navigateTo: 'Network',
    description:
      'Inspect API requests, headers, payloads, and responses to troubleshoot network issues.',
  },
  {
    title: 'Performance CPU JS',
    navigateTo: 'PerformanceCPUJs',
    description:
      'Analyze JavaScript CPU usage and call stacks to find code that blocks the JS thread.',
  },
  {
    title: 'Performance CPU Render',
    navigateTo: 'PerformanceCPURender',
    description:
      'Inspect rendering activity and scheduler timings to identify excessive re-renders and UI slowdowns.',
  },
  {
    title: 'Memory leak',
    navigateTo: 'MemoryLeak',
    description:
      'Track memory allocations and inspect heap snapshots to detect retained objects and memory leaks.',
  },
  {
    title: 'Components',
    navigateTo: 'Components',
    description:
      'Explore the React component tree and inspect or edit props and state in real time.',
  },
  {
    title: 'Profiler',
    navigateTo: 'Profiler',
    description:
      'Record component render times and causes to identify slow or unnecessary renders.',
  },
  {
    title: 'Practise Debugging',
    navigateTo: 'PractiseDebugging',
    description:
      'Practise reproducing bugs, isolating problematic code, and using debugging tools to find the root cause.',
  },
];

const DebuggingScreen = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Lecture 4</Text>
        <Text style={styles.title}>Debugging</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {lectures.map(item => (
          <LectureCard key={item.title} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.surface.canvas,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    rowGap: spacing.lg,
    paddingBottom: spacing.xl,
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
});

export default DebuggingScreen;
