
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

import MedicineCard from '../components/MedicineCard';
import AppIcon from '../components/AppIcon';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = search.trim();
    setMedicines([]);
    setError(null);

    if (!query) {
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    let active = true;
    setLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        console.log('response fetch successfully');
        const response = await fetch(
          `https://api.jeplus.tech/api/v1/jeplus/items/searchv2?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Search failed (${response.status}).`);
        }

        const result = await response.json();
        if (!result.success || !Array.isArray(result.data?.items)) {
          throw new Error(result.message || 'The search response was invalid.');
        }

        if (active) {
          setMedicines(result.data.items.map(item => ({
            id: String(item.ProductId || item.ItemCode),
            name: item.ItemName || 'Unnamed product',
            image: item.PrimaryImage,
            manufacturer: item.Compname || 'Unknown manufacturer',
            packSize: item.Pack || '—',
            ptr: item.ptr,
            mrp: item.Mrp,
            margin: item.margin,
            stockQuantity: item.Clqty,
            schemeText: item.schemeText || (
              Number(item.CurrScm1) > 0 && Number(item.CurrScm2) > 0
                ? `Buy ${item.CurrScm1} Get ${item.CurrScm2} Free`
                : ''
            ),
          })));
        }
      } catch (requestError) {
        if (active && (!requestError || requestError.name !== 'AbortError')) {
          setError(requestError?.message || 'Unable to search products.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  return (
    <View style={styles.container}>
      {/* Search bar only — no header or footer */}
      <View style={styles.searchContainer}>
        <AppIcon name="search" size={25} color='#999999'/>
        <TextInput value={search}  onChangeText={setSearch}
          placeholder="Search for products..."
          placeholderTextColor="#999999"
          style={styles.searchInput}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      {/* Scrollable medicine cards */}
      <FlatList data={medicines} keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <MedicineCard medicine={item} />
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[styles.emptyText, error && styles.errorText]}>
            {loading
              ? 'Searching...'
              : error || (search.trim()
                ? 'No medicines found.'
                : 'Search for products to see results.')}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  search:{
    color: '#41414100',
  },
  searchContainer: {
    height: 58,
    marginHorizontal: 12,
    marginTop:50,
    marginBottom: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#d3d3d3',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#333333',
    paddingVertical: 8,
  },

  listContent: {
    paddingBottom: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#777777',
    fontSize: 16,
    marginTop: 35,
    marginHorizontal: 20,
  },

  errorText: {
    color: '#B42318',
  },
});
