import { Platform } from 'react-native';

export const palette = {
  ink: '#172033',
  slate: '#60708F',
  line: '#DCE3F0',
  surface: '#FFFFFF',
  canvas: '#F5F7FB',
  mist: '#EEF3FB',
  primary: '#0E7490',
  primarySoft: '#D9F0F4',
  accent: '#FF7A59',
  accentSoft: '#FFE2D8',
  gold: '#F5B700',
  mint: '#D8F3E5',
  pink: '#FFE6EF',
  danger: '#D64545',
  success: '#1E8E5A',
};

export const theme = {
  colors: {
    text: palette.ink,
    mutedText: palette.slate,
    background: palette.canvas,
    card: palette.surface,
    border: palette.line,
    mist: palette.mist,
    primary: palette.primary,
    primarySoft: palette.primarySoft,
    accent: palette.accent,
    accentSoft: palette.accentSoft,
    gold: palette.gold,
    mint: palette.mint,
    pink: palette.pink,
    danger: palette.danger,
    success: palette.success,
  },
  radius: {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
  },
  shadow: Platform.select({
    ios: {
      shadowColor: '#173A57',
      shadowOpacity: 0.08,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 4,
    },
    default: {
      boxShadow: '0px 12px 30px rgba(23, 58, 87, 0.08)',
    },
  }),
};

export const Colors = {
  light: {
    text: theme.colors.text,
    background: theme.colors.background,
    tint: theme.colors.primary,
    icon: theme.colors.mutedText,
    tabIconDefault: '#7B8BA8',
    tabIconSelected: theme.colors.primary,
  },
  dark: {
    text: theme.colors.text,
    background: theme.colors.background,
    tint: theme.colors.primary,
    icon: theme.colors.mutedText,
    tabIconDefault: '#7B8BA8',
    tabIconSelected: theme.colors.primary,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Avenir Next',
    serif: 'Georgia',
    rounded: 'Avenir Next',
    mono: 'Menlo',
  },
  android: {
    sans: 'sans-serif-medium',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  web: {
    sans: "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
});
