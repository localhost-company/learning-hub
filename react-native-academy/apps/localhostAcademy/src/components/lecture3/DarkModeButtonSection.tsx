import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwareButton from './FontAwareButton';

const DarkModeButtonSection = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <FontAwareButton
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        onPress={toggleDarkMode}
        isDarkMode={darkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default DarkModeButtonSection;
