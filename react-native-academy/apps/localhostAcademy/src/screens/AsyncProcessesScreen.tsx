import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LectureCard, { LectureItem } from '../components/LectureCard';
import { spacing } from '../theme';

const examples: LectureItem[] = [
  {
    title: 'Vnorené volania',
    navigateTo: 'AsyncCallStack',
    description: 'Volanie funkcie z inej funkcie.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Číslované objednávky',
    navigateTo: 'AsyncBlockingOrders',
    description: 'Druhé kliknutie počas prípravy prvej objednávky.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Odovzdanie cez setTimeout',
    navigateTo: 'AsyncTaskQueue',
    description: 'Príprava objednávky s náhodným oneskorením.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Objednávky cez setTimeout',
    navigateTo: 'AsyncTimerOrders',
    description: 'Viac objednávok s čakaním od 1 do 3 sekúnd.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Timer a plný call stack',
    navigateTo: 'AsyncBlockedTimer',
    description: 'Timer na 500 ms počas 2-sekundového synchrónneho výpočtu.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Executor a handler',
    navigateTo: 'AsyncPromiseExecutor',
    description: 'Vytvorenie Promise a pripojenie handlera.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Reťazenie hodnôt',
    navigateTo: 'AsyncPromiseChaining',
    description: 'Odovzdávanie hodnôt medzi .then handlermi.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Reject, catch a finally',
    navigateTo: 'AsyncPromiseRejection',
    description: 'Odmietnutie Promise a spracovanie chyby.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Objednávky – task a microtask',
    navigateTo: 'AsyncOrderQueues',
    description: 'Timery, Promise handlery a vnorené microtasks.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Objednávka cez async/await',
    navigateTo: 'AsyncAwait',
    description: 'Čakanie na prípravu objednávky cez await.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Sekvenčné vykonávanie',
    navigateTo: 'AsyncSequential',
    description: 'Objednávky pripravované postupne.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Súbežne cez Promise.all',
    navigateTo: 'AsyncPromiseAll',
    description: 'Objednávky pripravované súbežne.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'Promise.all pri chybe',
    navigateTo: 'AsyncPromiseAllError',
    description: 'Zlyhanie jednej zo súbežných objednávok.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'GET: úspech',
    navigateTo: 'AsyncHttpGet',
    description: 'Načítanie produktov z DummyJSON.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'GET: pomalá odpoveď',
    navigateTo: 'AsyncHttpSlow',
    description: 'Načítanie v useEffect a cleanup requestu.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'GET: HTTP 500',
    navigateTo: 'AsyncHttpError',
    description: 'Spracovanie HTTP 500 cez response.ok.',
    image: require('../../assets/RN-icon.webp'),
  },
  {
    title: 'GET: sieťová chyba',
    navigateTo: 'AsyncNetworkError',
    description: 'Request na nedostupnú doménu.',
    image: require('../../assets/RN-icon.webp'),
  },
];

export default function AsyncProcessesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {examples.map(example => (
        <LectureCard key={example.navigateTo} {...example} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
});
