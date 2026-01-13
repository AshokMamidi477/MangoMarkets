import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'IS_AUTHENTICATED';

export const saveAuth = async () => {
  await AsyncStorage.setItem(AUTH_KEY, 'true');
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

export const getAuth = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(AUTH_KEY);
  return value === 'true';
};
