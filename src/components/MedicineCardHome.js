
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

export default function MedicineCardHome({ medicine, onAdd }) {
  const { width: screenWidth } = useWindowDimensions();

  // Two cards and a glimpse of the next card on most phones.
  const cardWidth = Math.min(280, Math.max(200, screenWidth * 0.365));

  const name =
    medicine.ItemName ??
    'Medicine';

  const image =
    medicine.PrimaryImage ?? 'logo.png';

  const price = Number(
    medicine.Srate??
    0
  );

  const originalPrice = Number(
    medicine.mrp ??
    medicine.MRP ??
    medicine.maxRetailPrice ??
    0
  );

  const rating = medicine.rating ?? medicine.averageRating;
  const quantity =
    medicine.quantity ??
    medicine.packSize ??
    medicine.unit ??
    medicine.weight ??
    '';

  const discount =
    originalPrice > price && originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const formatPrice = value =>
    `₹${Number(value).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })}`;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {/* Product image */}
      <View style={styles.imageBox}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No image</Text>
          </View>
        )}

        {rating != null && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {rating}</Text>
          </View>
        )}
      </View>

      {/* Product information */}
      <Text style={styles.name} numberOfLines={3}>
        {name}
      </Text>

      {!!quantity && (
        <Text style={styles.quantity} numberOfLines={1}>
          {String(quantity)}
        </Text>
      )}

      <Text style={styles.delivery} numberOfLines={1}>
        {medicine.deliveryTime ?? 'Delivery available'}
      </Text>

      {/* Price */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(price)}</Text>

        {originalPrice > price && (
          <Text style={styles.originalPrice}>
            {formatPrice(originalPrice)}
          </Text>
        )}
      </View>

      <View style={styles.discountRow}>
        {discount > 0 ? (
          <Text style={styles.discount}>{discount}% off</Text>
        ) : (
          <Text style={styles.discount}> </Text>
        )}
      </View>

      {/* Optional promotional offer */}
      {!!medicine.offerText && (
        <Text style={styles.offer} numberOfLines={2}>
          {medicine.offerText}
        </Text>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => onAdd?.(medicine)}
        accessibilityRole="button"
        accessibilityLabel={`Add ${name}`}
      >
        <Text style={styles.addText}>ADD</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginRight: 14,
    flexShrink: 0,
  },

  imageBox: {
    height: 200,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  productImage: {
    width: '94%',
    height: '85%',
  },

  imagePlaceholder: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },

  placeholderText: {
    color: '#999999',
    fontSize: 12,
  },

  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: '#087443',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },

  ratingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  name: {
    marginTop: 12,
    color: '#161616',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    minHeight: 69,
  },

  quantity: {
    marginTop: 3,
    color: '#666666',
    fontSize: 14,
  },

  delivery: {
    marginTop: 14,
    color: '#666666',
    fontSize: 13,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 18,
    gap: 7,
  },

  price: {
    fontSize: 17,
    fontWeight: '800',
    color: '#171717',
  },

  originalPrice: {
    fontSize: 13,
    color: '#777777',
    textDecorationLine: 'line-through',
  },

  discountRow: {
    minHeight: 24,
    marginTop: 3,
  },

  discount: {
    fontSize: 14,
    color: '#087443',
    fontWeight: '700',
  },

  offer: {
    fontSize: 12,
    color: '#A33B72',
    marginTop: 2,
    minHeight: 30,
  },

  addButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DADFE3',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },

  addText: {
    color: '#E44D4D',
    fontSize: 17,
    fontWeight: '700',
  },

  buttonPressed: {
    backgroundColor: '#FFF0F0',
  },
});
