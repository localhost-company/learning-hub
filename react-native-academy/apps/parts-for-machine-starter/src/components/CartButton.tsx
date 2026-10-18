import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ProductStackScreenProps } from '../types/NavigationParamList';

type CartButtonNavigationProp = ProductStackScreenProps<'ProductList'>['navigation'];

export function CartButton() {
  const navigation = useNavigation<CartButtonNavigationProp>();

  const navigateToCheckout = useCallback(() => {
    navigation.navigate('CheckoutCart');
  }, [navigation]);

  return (
    <Pressable style={styles.menuButton} onPress={navigateToCheckout}>
      <Text style={styles.menuButtonText}>Košík</Text>
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

export default CartButton;
