import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
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

const capabilities = {
  view: ['layout with flexbox', 'nesting and grouping', 'visual styling with StyleSheet'],
  text: ['typography styles', 'inline emphasis', 'numberOfLines truncation'],
  image: ['remote image loading', 'resize modes'],
  textInput: ['capturing user input', 'placeholder and keyboard options', 'state binding'],
  pressable: ['touch events', 'pressed-state feedback', 'triggering actions'],
  switch: ['boolean input', 'controlled state'],
  flatList: ['efficient list rendering', 'item separators', 'stable key extraction'],
  scrollView: ['vertical scrolling', 'content container styling', 'section-based screens'],
};

const listData = [
  { id: '1', label: 'Fast rendering for larger lists' },
  { id: '2', label: 'Easy item separators and key extraction' },
  { id: '3', label: 'Works well with dynamic data' },
];

const DarkModeScreen = () => {
  const [name, setName] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>React Native Core Components</Text>
        <Text style={styles.screenSubtitle}>
          Every block below shows a core component and what it can do.
        </Text>

        {/* Section for View component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>View</Text>
          <Text style={styles.capabilities}>Capabilities: {capabilities.view.join(' | ')}</Text>
          <View style={styles.viewDemo}>
            <View style={[styles.box, styles.boxPrimary]} />
            <View style={[styles.box, styles.boxSecondary]} />
            <View style={[styles.box, styles.boxAccent]} />
          </View>
        </View>

        {/* Section for Text component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Text</Text>
          <Text style={styles.capabilities}>Capabilities: {capabilities.text.join(' | ')}</Text>
          <Text numberOfLines={2} style={styles.textDemo}>
            Text supports styling, inline formatting like{' '}
            <Text style={styles.textBold}>bold words</Text>, and line truncation when content is too
            long for the container.
          </Text>
        </View>

        {/* Section for Image component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Image</Text>
          <Text style={styles.capabilities}>Capabilities: {capabilities.image.join(' | ')}</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' }}
            style={styles.imageDemo}
            resizeMode="cover"
          />
        </View>

        {/* Section for TextInput component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>TextInput</Text>
          <Text style={styles.capabilities}>
            Capabilities: {capabilities.textInput.join(' | ')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Type your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Text style={styles.inputResult}>Hello {name || 'student'}!</Text>
        </View>

        {/* Section for Pressable component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pressable</Text>
          <Text style={styles.capabilities}>
            Capabilities: {capabilities.pressable.join(' | ')}
          </Text>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => setPressCount(count => count + 1)}
          >
            <Text style={styles.buttonText}>Tap me</Text>
          </Pressable>
          <Text style={styles.inputResult}>Tapped {pressCount} times</Text>
        </View>

        {/* Section for Switch component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Switch</Text>
          <Text style={styles.capabilities}>Capabilities: {capabilities.switch.join(' | ')}</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{isEnabled ? 'Enabled' : 'Disabled'}</Text>
            <Switch value={isEnabled} onValueChange={setIsEnabled} />
          </View>
        </View>

        {/* Section for FlatList component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>FlatList</Text>
          <Text style={styles.capabilities}>Capabilities: {capabilities.flatList.join(' | ')}</Text>
          <FlatList
            data={listData}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => <Text style={styles.listItem}>• {item.label}</Text>}
          />
        </View>

        {/* Section for ScrollView component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ScrollView</Text>
          <Text style={styles.capabilities}>
            Capabilities: {capabilities.scrollView.join(' | ')}
          </Text>
          <Text style={styles.textDemo}>
            This entire screen is wrapped in ScrollView, so it remains usable even when content
            grows.
          </Text>
        </View>
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
  viewDemo: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
  },
  boxPrimary: {
    backgroundColor: colors.brand.r1,
  },
  boxSecondary: {
    backgroundColor: colors.brand.r2,
  },
  boxAccent: {
    backgroundColor: colors.brand.g1,
  },
  textDemo: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
    lineHeight: lineHeights.relaxed,
  },
  textBold: {
    fontWeight: fontWeights.bold,
  },
  imageDemo: {
    width: '100%',
    height: 140,
    borderRadius: radius.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.strong,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface.primary,
  },
  inputResult: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.action.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.text.inverse,
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.bold,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 15,
    color: colors.text.primary,
  },
  separator: {
    height: spacing.sm,
  },
  listItem: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.body,
    color: colors.text.primary,
  },
});

export default DarkModeScreen;
