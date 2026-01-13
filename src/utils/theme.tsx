import { DefaultTheme } from '@react-navigation/native';
import { COLORS } from './constants';

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    primary: COLORS.primary,
    text: COLORS.text,
    card: COLORS.background,
  },
};
