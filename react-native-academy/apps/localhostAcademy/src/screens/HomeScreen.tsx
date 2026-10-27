import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LectureCard, { LectureItem } from '../components/LectureCard';
import { colors, fontFamilies, fontSizes, fontWeights, lineHeights, spacing } from '../theme';

const lectures: LectureItem[] = [
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '1. Introduction to RN Academy',
  //   navigateTo: 'RNBasics',
  //   description:
  //     'React as the foundation, what React Native is, how it works under the hood, Expo, creating a project, project structure and running the app.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '2. React Fundamentals',
  //   navigateTo: 'RNBasics',
  //   description:
  //     'Components, thinking in React and state management, styling, flexbox layout and hooks: useState, useEffect, useCallback, useMemo.',
  // },
  {
    image: require('../../assets/RN-icon.webp'),
    title: '3. React Native Basics',
    navigateTo: 'RNBasics',
    description:
      'ScrollView vs FlatList, images, input events, rendering and re-rendering, props drilling and Context for state management.',
  },
  {
    image: require('../../assets/RN-icon.webp'),
    title: '4. Debugging',
    navigateTo: 'Debugging',
    description:
      'Working with the debug console, debugging code, tracking re-renders and optimization via keys, useMemo and useCallback.',
  },
  {
    image: require('../../assets/RN-icon.webp'),
    title: '6. Asynchronous Processes',
    navigateTo: 'AsyncProcesses',
    description:
      'Event loop, task queue and macrotask queue, Promises and HTTP requests with fetch and the public DummyJSON API.',
  },
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '7. Global State Management',
  //   navigateTo: 'RNBasics',
  //   description:
  //     'What state management is, overview of libraries, useQuery/useMutation from TanStack Query and practical use of Zustand.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '8. Form Handling',
  //   navigateTo: 'FormHandling',
  //   description:
  //     'Theory of inputs and their states, React Hook Form, validations with Zod, library setup and form UX for mobile platforms.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '9. Using Native Functionality',
  //   navigateTo: 'NativeCapabilitiesScreen',
  //   description:
  //     'Camera, location, maps, secure storage and handling permissions for apps on iOS and Android.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '10. Push Notifications (optional)',
  //   navigateTo: 'RNBasics',
  //   description:
  //     'Types of notifications, iOS vs Android differences, Expo Go limitations and basics of implementing local and remote notifications.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '11. Authentication and Authorization (optional)',
  //   navigateTo: 'RNBasics',
  //   description:
  //     'Theoretical introduction to authentication and authorization and practical integration of login in a React Native app.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '12. Unit testing',
  //   navigateTo: 'RNBasics',
  //   description: 'Testing basics, testing theory and practical unit test examples using Jest.',
  // },
  // {
  //   image: require('../../assets/RN-icon.webp'),
  //   title: '13. Advanced UI and Storybook',
  //   navigateTo: 'RNBasics',
  //   description:
  //     'Responsiveness, orientation, Dimensions API, platform-specific code, dark/light mode, status bar, splash screen, app icons and Storybook.',
  // },
];

const HomeScreen = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.hero}>
        <Text style={styles.title}>Welcome to Academy</Text>
        <Text style={styles.subtitle}>Learn React Native from scratch and build amazing apps.</Text>
        <Text style={styles.meta}>13 lectures with practical examples</Text>
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
  hero: {
    rowGap: 6,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.black,
    color: colors.brand.r4,
    lineHeight: lineHeights.display,
  },
  subtitle: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.bodyLarge,
    color: colors.text.secondary,
    lineHeight: lineHeights.relaxed,
  },
  meta: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.meta,
    color: colors.text.muted,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    rowGap: spacing.lg,
    paddingBottom: spacing.xl,
  },
});

export default HomeScreen;
