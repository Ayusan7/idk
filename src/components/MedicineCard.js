
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useCart } from '../context/CartContext';
import { getStockLimit } from '../utils/medicineStock';

export default function MedicineCard({ medicine }) {
  const { cartItems, addToCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const cartItem = cartItems.find(item => item.id === medicine.id);
  const stockLimit = getStockLimit(medicine.stockQuantity);
  const remainingStock = Math.max(
    0,
    stockLimit - (cartItem?.quantity || 0)
  );
  const schemeText =
    typeof medicine.schemeText === 'string' ? medicine.schemeText.trim() : '';
  const isOutOfStock =
    stockLimit !== Infinity && stockLimit <= 0;

  useEffect(() => {
    setSelectedQuantity(currentQuantity => {
      if (remainingStock === 0) {
        return 0;
      }

      return currentQuantity === 0
        ? 1
        : Math.min(currentQuantity, remainingStock);
    });
  }, [remainingStock]);

  const initials = medicine.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <View style={[styles.card, schemeText && styles.cardWithScheme]}>
      {schemeText ? (
        <View style={styles.schemeTag}>
          <Text style={styles.schemeTagText}>SCHEME</Text>
        </View>
      ) : null}
      <View style={styles.productRow}>
        {medicine.image ? (
          <Image source={{ uri: medicine.image }} style={styles.localImage} />
        ) : (
          <View style={[styles.localImage, styles.imageFallback]}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
        )}
        <View style={styles.productDetails}>
          <View style={styles.productDetails1}>
            <Text style={styles.medicineName} numberOfLines={1}>
              {medicine.name}
            </Text>
            <Text style={styles.manufacturer} numberOfLines={1}>
              {medicine.manufacturer}
            </Text>
            <Text style={styles.packSize} numberOfLines={1}>
              Packs: {medicine.packSize}
            </Text>
          </View>
          <View style={styles.productDetails2}>
            <View style={[styles.stockBadge, isOutOfStock && styles.outOfStockBadge]}>
              <Text style={styles.stockText}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </Text>
            </View>
            {schemeText ? (
              <Text style={styles.schemeText}>{schemeText}</Text>
            ) : null}
          </View>
        </View>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.ptr} numberOfLines={1}>
          PTR: ₹{medicine.ptr}
        </Text>

        <Text style={styles.mrp} numberOfLines={1}>
          MRP: ₹{medicine.mrp}
        </Text>

        <Text style={styles.margin} numberOfLines={1}>
          MARGIN: {medicine.margin}%
        </Text>
      </View>

      <View style={styles.purchaseControls}>
        <View style={styles.quantitySelector}>
          <Pressable
            style={[
              styles.arrowButton,
              selectedQuantity <= 1 && styles.disabledControl,
            ]}
            onPress={() => setSelectedQuantity(quantity => Math.max(1, quantity - 1))}
            disabled={selectedQuantity <= 1}
            accessibilityRole="button"
            accessibilityLabel={`Decrease quantity for ${medicine.name}`}
          >
            <Text style={styles.arrowText}>▼</Text>
          </Pressable>
          <Text style={styles.selectedQuantity}>{selectedQuantity}</Text>
          <Pressable
            style={[
              styles.arrowButton,
              selectedQuantity >= remainingStock && styles.disabledControl,
            ]}
            onPress={() =>
              setSelectedQuantity(quantity =>
                Math.min(remainingStock, quantity + 1)
              )
            }
            disabled={selectedQuantity >= remainingStock}
            accessibilityRole="button"
            accessibilityLabel={`Increase quantity for ${medicine.name}`}
          >
            <Text style={styles.arrowText}>▲</Text>
          </Pressable>
        </View>
        <Pressable
          style={[
            styles.addButton,
            remainingStock === 0 && styles.disabledAddButton,
          ]}
          onPress={() => addToCart(medicine, selectedQuantity)}
          disabled={remainingStock === 0}
          accessibilityRole="button"
          accessibilityLabel={`Add ${selectedQuantity} ${medicine.name} to cart`}
        >
          <Text style={styles.addButtonText}>
            {remainingStock === 0 ? 'N/A' : 'Add'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    // paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 2,
    elevation: 1,
  },

  cardWithScheme: {
    paddingTop: 8,
  },

  schemeTag: {
    position:'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: '#F59E0B',
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 4,
    elevation: 3,
  },

  schemeTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
  },

  localImage: {
    width: 70,
    height: 70,
    backgroundColor: '#E9E8FF',
    marginRight: 14,
  },
  imageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#0875B5',
    fontSize: 20,
    fontWeight: '700',
  },
  productDetails1: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
    //backgroundColor: '#190eb4',
    justifyContent: 'flex-start',
  },
  productDetails2: {
    alignItems: 'flex-end',
    minWidth: 0,
    maxWidth: 125,
    marginLeft: 8,
   // backgroundColor: '#492424',
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#a76666',
    justifyContent: 'space-between',
  },

  medicineName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },

  manufacturer: {
    fontSize: 12,
    color: '#777777',
  },

  stockBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#00CC24',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  outOfStockBadge: {
    backgroundColor: '#B42318',
  },

  stockText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  schemeText: {
    color: '#9A5800',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
    textAlign: 'right',
  },

  packSize: {
    fontSize: 13,
  },
  pack: {
    backgroundColor: '#0019f7',
  },

  priceRow: {
    minHeight: 32,
    backgroundColor: '#E2FAF4',
    borderRadius: 9,
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  ptr: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },

  mrp: {
    flex: 1,
    fontSize: 12,
    color: '#666666',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },

  margin: {
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    color: '#00C832',
    textAlign: 'right',
  },

  purchaseControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 9,
  },

  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 7,
    overflow: 'hidden',
  },

  arrowButton: {
    width: 32,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },

  arrowText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '800',
  },

  selectedQuantity: {
    minWidth: 30,
    textAlign: 'center',
    color: '#172033',
    fontSize: 14,
    fontWeight: '700',
  },

  disabledControl: {
    opacity: 0.4,
  },

  addButton: {
    minWidth: 64,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0875B5',
  },

  disabledAddButton: {
    backgroundColor: '#94A3B8',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
