import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import DarkModeButtonSection from '../../components/lecture3/DarkModeButtonSection';
import FlatListSection from '../../components/lecture3/FlatListSection';
import ImageSection from '../../components/lecture3/ImageSection';
import PressableSection from '../../components/lecture3/PressableSection';
import ScrollViewSection from '../../components/lecture3/ScrollViewSection';
import SwitchSection from '../../components/lecture3/SwitchSection';
import TextInputSection from '../../components/lecture3/TextInputSection';
import TextSection from '../../components/lecture3/TextSection';
import ViewSection from '../../components/lecture3/ViewSection';
import { DarkModeContext } from '../../providers/DarkThemeContext';
import { colors, fontFamilies, fontSizes, fontWeights, spacing } from '../../theme';

/*
 Prerabka na Context bude asi live coding, uvidim podla casu
 Ukazem, ako sa da spravit globalny dark mode stav pomocou Contextu, a potom ho pouzijem v celej obrazovke
 v pripade DarkModeButtonSection sa len preposiela props do FontAwareButton cize na tom ukazem props drilling.
 Ukazem aj "druhu" moznost vytvorenia contextu v react 19 - bez ".Provider"
*/
const DarkModeScreenContext = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const contextValue = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

  return (
    <DarkModeContext value={contextValue}>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: darkMode ? '#030712' : colors.surface.canvas }]}
      >
        <ScrollView
          style={{ backgroundColor: darkMode ? '#030712' : colors.surface.canvas }}
          contentContainerStyle={styles.content}
        >
          <DarkModeButtonSection toggleDarkMode={toggleDarkMode} />

          <ViewSection isDarkMode={darkMode} />
          <TextSection isDarkMode={darkMode} />
          <ImageSection isDarkMode={darkMode} />
          <TextInputSection isDarkMode={darkMode} />
          <PressableSection isDarkMode={darkMode} />
          <SwitchSection isDarkMode={darkMode} />
          <FlatListSection isDarkMode={darkMode} />
          <ScrollViewSection isDarkMode={darkMode} />
        </ScrollView>
      </SafeAreaView>
    </DarkModeContext>
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

export default DarkModeScreenContext;
