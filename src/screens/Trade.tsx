// src/screens/Trade.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Trade() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade</Text>
      <Text style={styles.subtitle}>Buy & Sell Assets</Text>
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
    color: '#22c55e',
    fontSize: 26,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 6,
    color: '#94a3b8',
  },
});
