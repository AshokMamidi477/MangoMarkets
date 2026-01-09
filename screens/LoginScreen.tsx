
// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

type Props = {
  onLogin?: (email: string, password: string) => void;
};

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MangoMarkets</Text>

      {/* Optional illustration */}
      {/* <Image source={require('../assets/login-illustration-dark.png')} style={styles.image} resizeMode="contain" /> */}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#B0B0B0"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // TODO: validate, call API, save token, etc.
          onLogin?.(email, password);
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <Text style={styles.linkText}>Forgot Password?</Text>
        <Text style={styles.linkText}>Sign Up</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

// (styles from your snippet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
  },
  image: { width: 200, height: 200, marginBottom: 20 },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B2A44',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginVertical: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  linkText: { color: '#B0B0B0', fontSize: 14 },
});
