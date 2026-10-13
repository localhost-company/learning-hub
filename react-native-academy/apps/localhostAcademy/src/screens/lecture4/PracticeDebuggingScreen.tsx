import React, { useCallback, useReducer } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { brandColors } from '../../theme/colors';

type MockItem = {
  id: string;
  image: string;
  title: string;
  price: number;
  addedDate: string;
  description: string;
};

const nouns = [
  'Notebook',
  'Backpack',
  'Bottle',
  'Headphones',
  'Keyboard',
  'Mouse',
  'Lamp',
  'Jacket',
  'Sneakers',
  'Watch',
  'Wallet',
  'Sunglasses',
  'Camera',
  'Speaker',
  'Tablet',
];

const adjectives = [
  'Compact',
  'Premium',
  'Lightweight',
  'Durable',
  'Minimal',
  'Smart',
  'Classic',
  'Modern',
  'Portable',
  'Eco',
];

const tags = [
  'daily use',
  'travel',
  'home office',
  'outdoor',
  'students',
  'professionals',
  'weekend trips',
  'work setup',
  'gift idea',
  'small spaces',
];

const randomFrom = <T,>(arr: T[], i: number) => arr[i % arr.length];

// deterministic-ish date spread across past 180 days
const dateForIndex = (i: number) => {
  const now = new Date();
  const daysAgo = (i * 3) % 180;
  const d = new Date(now);
  d.setDate(now.getDate() - daysAgo);
  return d.toISOString();
};

export const mockItems: MockItem[] = Array.from({ length: 100 }, (_, i) => {
  const adj = randomFrom(adjectives, i);
  const noun = randomFrom(nouns, i * 7);
  const tag = randomFrom(tags, i * 11);
  const price = Number((9.99 + ((i * 2.37) % 140)).toFixed(2));

  return {
    id: `item-${String(i + 1).padStart(3, '0')}`,
    image: `https://picsum.photos/seed/product-${i + 1}/400/300`,
    title: `${adj} ${noun} ${i + 1}`,
    price,
    addedDate: dateForIndex(i),
    description: `A ${adj.toLowerCase()} ${noun.toLowerCase()} designed for ${tag}. Great balance of style and practicality.`,
  };
});

const QuantityButtons = ({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (delta: -1 | 1) => void;
}) => {
  const handleIncrement = useCallback(() => onChange(1), [onChange]);
  const handleDecrement = useCallback(() => onChange(-1), [onChange]);
  return (
    <View style={stylesButtons.container}>
      <TouchableOpacity onPress={handleDecrement} style={stylesButtons.button}>
        <Text style={stylesButtons.sign}>-</Text>
      </TouchableOpacity>
      <Text style={stylesButtons.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={stylesButtons.button}>
        <Text style={stylesButtons.sign}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesButtons = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
    gap: 8,
  },
  button: {
    height: 32,
    width: 32,
    backgroundColor: brandColors.r1,
    borderRadius: 16,
    alignItems: 'center',
  },
  quantity: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    width: 12,
  },
  sign: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 'bold',
    color: 'white',
  },
});

const ProductItem = ({
  item,
  style,
  quantityButtonsProps: { quantity, onQuantityChange },
}: {
  item: MockItem;
  style?: ViewStyle;
  quantityButtonsProps: {
    quantity: number;
    onQuantityChange: (delta: -1 | 1) => void;
  };
}) => {
  const formater = new Intl.DateTimeFormat('sk-SK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <View style={[stylesItem.container, style]}>
      <View style={stylesItem.image}>
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <View style={stylesItem.info}>
        <View style={stylesItem.titlePriceSection}>
          <Text style={stylesItem.title}>{item.title}</Text>
          <Text style={stylesItem.price}>${item.price}</Text>
        </View>
        <Text style={stylesItem.description}>{item.description}</Text>
        <View style={stylesItem.dateButtonSection}>
          <Text style={stylesItem.addedDate}>
            Added: {formater.format(new Date(item.addedDate))}
          </Text>
          <QuantityButtons onChange={onQuantityChange} quantity={quantity} />
        </View>
      </View>
    </View>
  );
};
const stylesItem = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    gap: 8,
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  titlePriceSection: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  dateButtonSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  addedDate: {
    flex: 1,
    fontSize: 14,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
  },
});

type ProductItemData = { item: MockItem; checkoutData: { quantity: number } };

function reducer(
  state: Record<string, ProductItemData>,
  action: {
    type: 'update_quantity';
    id: string;
    value: number;
  },
) {
  switch (action.type) {
    case 'update_quantity': {
      const currentItemData = state[action.id];
      if (!currentItemData) {
        throw new Error(`Item with id ${action.id} not found`);
      }
      if (action.value === 0) {
        return state;
      }
      if (currentItemData.checkoutData.quantity + action.value < 0) {
        return {
          ...state,
          [action.id]: {
            ...currentItemData,
            checkoutData: {
              ...currentItemData.checkoutData,
              quantity: 0,
            },
          },
        };
      }
      return {
        ...state,
        [action.id]: {
          ...currentItemData,
          checkoutData: {
            ...currentItemData.checkoutData,
            quantity: currentItemData.checkoutData.quantity + action.value,
          },
        },
      };
    }
  }
}

export const PracticeDebuggingScreen = () => {
  const [state, dispatch] = useReducer(reducer, mockItems, items => {
    return items.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: { item: item, checkoutData: { quantity: 0 } },
      };
    }, {});
  });

  const listOfProducts: ProductItemData[] = Object.values(state);
  /**
   * Tieto výpočty sa väčšinou spracúvajú na backende a aplikácia ich len zobrazuje.
   * V tejto úlohe je backend pre jednoduchosť vynechaný.
   */
  const total = listOfProducts.reduce(
    (acc, item) => acc + item.checkoutData.quantity * item.item.price,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>QUICK SHOP</Text>
      </View>
      <ScrollView style={styles.products}>
        {listOfProducts.map(item => (
          <ProductItem
            style={styles.item}
            item={item.item}
            quantityButtonsProps={{
              quantity: item.checkoutData.quantity,
              onQuantityChange: delta =>
                dispatch({ type: 'update_quantity', id: item.item.id, value: delta }),
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total}</Text>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() =>
            Alert.alert(
              'Checkout',
              'Congrats! You just unlocked the mythical Free Order. Your wallet says thanks.',
            )
          }
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PracticeDebuggingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleSection: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 8,
  },
  products: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    height: 100,
    borderTopWidth: 1,
    width: 540,
  },
  total: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkout: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'red',
  },
  checkoutText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
