import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { medicines } from '../data/medicines';
import MedicineCard from '../components/MedicineCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const favoriteMedicines = medicines.filter((medicine) =>
    favoriteIds.includes(medicine.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      <Text style={styles.subtitle}>
        Your saved medicines
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {favoriteMedicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            isFavorite={true}
            onToggleFavorite={toggleFavorite}
          />
        ))}

        {favoriteMedicines.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.icon}>♡</Text>
            <Text style={styles.emptyTitle}>
              No favorites yet
            </Text>
            <Text style={styles.emptyText}>
              Tap the heart on a medicine to save it here.
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
    paddingHorizontal: 20,
    paddingTop: 55,
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
  empty: {
    alignItems: 'center',
    paddingTop: 100,
  },
  icon: {
    fontSize: 55,
    color: '#2563EB',
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#172033',
    marginTop: 15,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
});