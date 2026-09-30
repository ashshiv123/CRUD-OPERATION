import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

type AppHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  onActionPress?: () => void;
};

export function AppHeader({ eyebrow, title, subtitle, actionIcon, onActionPress }: AppHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.textColumn}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {actionIcon ? (
        <Pressable onPress={onActionPress} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <Ionicons color={theme.colors.text} name={actionIcon} size={22} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  textColumn: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  action: {
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    height: 46,
    justifyContent: 'center',
    width: 46,
    ...theme.shadow,
  },
  pressed: {
    opacity: 0.75,
  },
});
