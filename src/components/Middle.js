
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function Middle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Medicines</Text>

      {Array.from({ length: 20 }, (_, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardText}>
            Medicine Item {index + 1}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F8',
    padding: 16,
    minHeight: 800,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222222',
  },
  card: {
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 18,
    justifyContent: 'center',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333333',
  },
});
