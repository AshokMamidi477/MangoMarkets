// src/screens/Home.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to MangoMarkets</Text>
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
    color: '#FFA500',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    color: '#94a3b8',
    fontSize: 16,
  },
});
