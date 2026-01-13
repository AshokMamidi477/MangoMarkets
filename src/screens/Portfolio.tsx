// src/screens/Portfolio.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Portfolio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>
      <Text style={styles.subtitle}>Your Assets Overview</Text>
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
    color: '#a855f7',
    fontSize: 26,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 6,
    color: '#94a3b8',
  },
});
