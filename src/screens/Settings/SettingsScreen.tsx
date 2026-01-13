import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { clearToken } from '../../utils/auth';

export default function SettingsScreen({ logout }: { logout: () => void }) {
  const handleLogout = async () => {
    await clearToken();
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
});
