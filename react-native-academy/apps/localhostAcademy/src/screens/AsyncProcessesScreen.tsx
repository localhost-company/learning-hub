import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LectureCard, { LectureItem } from '../components/LectureCard';
import { colors, fontFamilies, fontSizes, fontWeights, spacing } from '../theme';

const examples: LectureItem[] = [
  {
    title: 'Nested calls',
    navigateTo: 'AsyncCallStack',
    description: 'Calling a function from another function.',
  },
  {
    title: 'Numbered orders',
    navigateTo: 'AsyncBlockingOrders',
    description: 'A second click while the first order is being prepared.',
  },
  {
    title: 'Deferring with setTimeout',
    navigateTo: 'AsyncTaskQueue',
    description: 'Preparing an order with a random delay.',
  },
  {
    title: 'Orders with setTimeout',
    navigateTo: 'AsyncTimerOrders',
    description: 'Multiple orders with delays of 1 to 3 seconds.',
  },
  {
    title: 'Timer and a busy call stack',
    navigateTo: 'AsyncBlockedTimer',
    description: 'A 500 ms timer during a 2-second synchronous computation.',
  },
  {
    title: 'Executor and handler',
    navigateTo: 'AsyncPromiseExecutor',
    description: 'Creating a Promise and attaching a handler.',
  },
  {
    title: 'Chaining values',
    navigateTo: 'AsyncPromiseChaining',
    description: 'Passing values between .then handlers.',
  },
  {
    title: 'Reject, catch, and finally',
    navigateTo: 'AsyncPromiseRejection',
    description: 'Rejecting a Promise and handling the error.',
  },
  {
    title: 'Orders – tasks and microtasks',
    navigateTo: 'AsyncOrderQueues',
    description: 'Timers, Promise handlers, and nested microtasks.',
  },
  {
    title: 'An order with async/await',
    navigateTo: 'AsyncAwait',
    description: 'Waiting for an order to be prepared using await.',
  },
  {
    title: 'Sequential execution',
    navigateTo: 'AsyncSequential',
    description: 'Orders prepared sequentially.',
  },
  {
    title: 'Concurrent execution with Promise.all',
    navigateTo: 'AsyncPromiseAll',
    description: 'Orders prepared concurrently.',
  },
  {
    title: 'Promise.all on error',
    navigateTo: 'AsyncPromiseAllError',
    description: 'Failure of one of the concurrent orders.',
  },
  {
    title: 'GET: success',
    navigateTo: 'AsyncHttpGet',
    description: 'Fetching products from DummyJSON.',
  },
  {
    title: 'GET: slow response',
    navigateTo: 'AsyncHttpSlow',
    description: 'Fetching data in useEffect and cleaning up the request.',
  },
  {
    title: 'GET: HTTP 500',
    navigateTo: 'AsyncHttpError',
    description: 'Handling HTTP 500 using response.ok.',
  },
  {
    title: 'GET: network error',
    navigateTo: 'AsyncNetworkError',
    description: 'A request to an unreachable domain.',
  },
];

export default function AsyncProcessesScreen() {
  return (
    <View style={styles.overlay}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Lecture 6</Text>
        <Text style={styles.title}>Asynchronous Processes</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {examples.map(example => (
          <LectureCard key={example.title} {...example} />
        ))}
      </ScrollView>
    </View>
  );
}

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
