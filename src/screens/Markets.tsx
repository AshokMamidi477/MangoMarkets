// src/screens/Markets.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Markets() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Markets</Text>
      <Text style={styles.subtitle}>Crypto & Stock Market Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#0ea5e9',
    fontSize: 26,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 6,
    color: '#94a3b8',
  },
});
