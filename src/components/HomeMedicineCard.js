
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';

const API_URL =
  'https://api.jeplus.tech/api/v1/jeplus/get-all-category?page=1&limit=20';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32) / 3;

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data?.categories)) {
          setCategories(result.data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <View
            key={String(item._id || item.ItemCatCode || index)}
            style={styles.card}
          >
            <Image
              source={{ uri: item.Url }}
              style={styles.categoryImage}
              resizeMode="cover"
            />

            <Text style={styles.categoryName} numberOfLines={2}>
              {item.ItemCatName}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  card: {
    width: cardWidth,
    marginHorizontal: 2,
    marginBottom: 6,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },

  categoryImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },

  categoryName: {
    marginTop: 6,
    marginBottom: 6,
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#172033',
    textAlign: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: '#B42318',
    fontSize: 15,
  },
});
