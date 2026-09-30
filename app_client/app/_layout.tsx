import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { FlashBanner } from '@/components/app/flash-banner';
import { theme } from '@/constants/theme';
import { AppProviders } from '@/providers/app-providers';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppProviders>
      <ThemeProvider
        value={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: theme.colors.background,
            card: theme.colors.card,
            border: theme.colors.border,
            primary: theme.colors.primary,
            text: theme.colors.text,
          },
        }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: theme.colors.background }, headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
          <Stack.Screen name="listings/[id]" />
        </Stack>
        <FlashBanner />
        <StatusBar style="dark" />
      </ThemeProvider>
    </AppProviders>
  );
}
