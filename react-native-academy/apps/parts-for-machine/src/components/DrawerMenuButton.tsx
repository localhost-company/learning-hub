import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { DrawerParamList } from '../types/NavigationParamList';

export function DrawerMenuButton() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <Pressable style={styles.menuButton} onPress={openDrawer} hitSlop={8}>
      <Text style={styles.menuButtonText}>Menu</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default DrawerMenuButton;
