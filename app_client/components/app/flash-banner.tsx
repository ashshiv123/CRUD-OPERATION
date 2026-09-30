import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/constants/theme';
import { useFlash } from '@/providers/flash-context';

export function FlashBanner() {
  const { flash, clearFlash } = useFlash();
  const insets = useSafeAreaInsets();

  if (!flash) {
    return null;
  }

  const tint =
    flash.type === 'success'
      ? theme.colors.success
      : flash.type === 'error'
        ? theme.colors.danger
        : theme.colors.primary;

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { top: insets.top + 12 }]}>
      <Pressable onPress={clearFlash} style={[styles.banner, { borderColor: tint }]}>
        <Ionicons
          color={tint}
          name={flash.type === 'success' ? 'checkmark-circle' : flash.type === 'error' ? 'alert-circle' : 'information-circle'}
          size={22}
        />
        <Text style={styles.message}>{flash.message}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    left: 16,
    position: 'absolute',
    right: 16,
    zIndex: 30,
  },
  banner: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...theme.shadow,
  },
  message: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
});
