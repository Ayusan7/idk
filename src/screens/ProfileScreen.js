import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>

        <Text style={styles.name}>Welcome, User!</Text>
        <Text style={styles.subtitle}>
          Your MediCare account
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Account settings
      </Text>

      <View style={styles.option}>
        <Text style={styles.optionIcon}>👤</Text>
        <Text style={styles.optionText}>Personal information</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionIcon}>🔔</Text>
        <Text style={styles.optionText}>Notifications</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionIcon}>🔒</Text>
        <Text style={styles.optionText}>Privacy and security</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionIcon}>ℹ️</Text>
        <Text style={styles.optionText}>About MediCare</Text>
      </View>

      <Text style={styles.footer}>
        MediCare v1.0.0
      </Text>
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
    marginBottom: 25,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 28,
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#2563EB',
    fontSize: 30,
    fontWeight: '800',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172033',
    marginTop: 14,
  },
  subtitle: {
    color: '#64748B',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 14,
    marginBottom: 10,
  },
  optionIcon: {
    fontSize: 19,
    marginRight: 13,
  },
  optionText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 30,
  },
});