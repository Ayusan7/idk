import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useCart } from '../context/CartContext';
import AppIcon from '../components/AppIcon';
import { getStockLimit } from '../utils/medicineStock';

export default function CartScreen() {
  const {
    cartItems,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart </Text>
      <Text style={styles.subtitle}> {cartCount} items in your cart</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} >
        {cartItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: item.color || '#E9E8FF' },
              ]}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.productImage} />
              ) : (
                <Text style={styles.icon}>
                  {item.symbol || item.name.slice(0, 2).toUpperCase()}
                </Text>
              )}
            </View>

            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.strength}>
                {item.manufacturer || item.strength || item.packSize}
              </Text>
              {item.packSize ? (
                <Text style={styles.packSize}>Packs: {item.packSize}</Text>
              ) : null}
              {item.ptr != null ? (
                <Text style={styles.price}>PTR: ₹{item.ptr}</Text>
              ) : null}

              <View style={styles.quantityRow}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => decreaseQuantity(item.id)}
                  accessibilityLabel={`Decrease ${item.name} quantity`}
                >
                  <Text style={styles.quantityText}>−</Text>
                </Pressable>

                <Text style={styles.quantity}>
                  {item.quantity}
                </Text>

                <Pressable
                  style={[
                    styles.quantityButton,
                    item.quantity >= getStockLimit(item.stockQuantity) &&
                      styles.disabledQuantityButton,
                  ]}
                  onPress={() => increaseQuantity(item.id)}
                  disabled={item.quantity >= getStockLimit(item.stockQuantity)}
                  accessibilityLabel={`Increase ${item.name} quantity`}
                >
                  <Text style={styles.quantityText}>+</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => removeFromCart(item.id)}
                accessibilityRole="button"
              >
                <Text style={styles.remove}>Remove</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {cartItems.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}><AppIcon name="cart" size={60}/></Text>
            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>
            <Text style={styles.emptyText}>
              Go to Search and add some medicines.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#172033',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 7,
    marginBottom: 22,
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 25,
  },
  details: {
    flex: 1,
    //backgroundColor: '#702e2e',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#172033',
  },
  strength: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },
  packSize: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#172033',
    marginTop: 3,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 12,
    marginBottom: 10,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledQuantityButton: {
    opacity: 0.4,
  },
  quantityText: {
    fontSize: 21,
    color: '#2563EB',
    fontWeight: '700',
  },
  quantity: {
    fontSize: 16,
    color: '#172033',
    fontWeight: '700',
  },
  remove: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 50,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#172033',
    marginTop: 15,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});