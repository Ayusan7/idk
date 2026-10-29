
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import MedicineCardHome from './MedicineCardHome';

const API_URL =
  'https://api.jeplus.tech/api/v1/jeplus/newly-added-item';

export default function MedicineDeals({
  onAddToCart,
  onSeeAll,
}) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();

      // Support common API response formats.
      const list = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
          ? result.data
          : Array.isArray(result.items)
            ? result.items
            : Array.isArray(result.medicines)
              ? result.medicines
              : Array.isArray(result.data?.items)
                ? result.data.items
                : null;

      if (!list) {
        throw new Error(
          'The API response does not contain a recognized medicine array.'
        );
      }

      setMedicines(list);
    } catch (err) {
      console.error('Medicine API error:', err);
      setError(err.message || 'Unable to load medicines.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const cardWidth = Math.min(280, Math.max(200, width * 0.365));

  const renderMedicine = ({ item }) => (
    <MedicineCardHome
      medicine={item}
      onAdd={onAddToCart}
    />
  );

  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.header}>
        <Text style={styles.heading} numberOfLines={1}>
          Deals you can't miss
        </Text>

        <Pressable
          onPress={onSeeAll}
          accessibilityRole="button"
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllText}>See all</Text>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E44D4D" />
          <Text style={styles.message}>Loading medicines...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchMedicines}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : medicines.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.message}>No medicines available.</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={medicines}
          renderItem={renderMedicine}
          keyExtractor={(item, index) =>
            String(item.id ?? item._id ?? item.medicineId ?? index)
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={4}
          windowSize={5}
          extraData={cardWidth}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 8,
  },

  heading: {
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
    color: '#171717',
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },

  seeAllText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E44D4D',
  },

  arrow: {
    fontSize: 27,
    lineHeight: 28,
    color: '#E44D4D',
    marginLeft: 5,
  },

  listContent: {
    paddingHorizontal: 16,
    alignItems: 'stretch',
  },

  center: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  message: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },

  retryButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E44D4D',
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
