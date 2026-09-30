import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
    marginTop: 24,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.mutedText,
    lineHeight: 20,
    marginTop: 6,
  },
});
