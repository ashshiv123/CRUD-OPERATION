import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

const stats = [
  { label: 'Verified stays', value: '270+' },
  { label: 'Food options', value: '50+' },
  { label: 'Near campus', value: '0.5-2km' },
];

export function HomeHero() {
  const router = useRouter();

  return (
    <View style={styles.hero}>
      <View style={[styles.blob, styles.blobOne]} />
      <View style={[styles.blob, styles.blobTwo]} />
      <Text style={styles.eyebrow}>Campus Living, Reimagined</Text>
      <Text style={styles.title}>Find a stay that feels right from your phone.</Text>
      <Text style={styles.subtitle}>
        Browse verified hostels, compare amenities, read reviews, and shortlist your best options in minutes.
      </Text>

      <View style={styles.actions}>
        <Pressable
          onPress={() => router.push('/discover' as Href)}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Explore Listings</Text>
        </Pressable>
        <View style={styles.secondaryPill}>
          <Ionicons color={theme.colors.accent} name="restaurant" size={16} />
          <Text style={styles.secondaryPillText}>Meals, PG, hostels</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#0F1C2E',
    borderRadius: theme.radius.xl,
    marginTop: 10,
    overflow: 'hidden',
    padding: 22,
  },
  blob: {
    borderRadius: 999,
    position: 'absolute',
  },
  blobOne: {
    backgroundColor: 'rgba(255,122,89,0.22)',
    height: 180,
    right: -40,
    top: -60,
    width: 180,
  },
  blobTwo: {
    backgroundColor: 'rgba(14,116,144,0.35)',
    bottom: -80,
    height: 200,
    left: -40,
    width: 200,
  },
  eyebrow: {
    color: '#7FD7E4',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: 10,
    maxWidth: '90%',
  },
  subtitle: {
    color: '#D9E4F2',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  actions: {
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 18,
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  secondaryPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryPillText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    flex: 1,
    padding: 14,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: theme.colors.mutedText,
    fontSize: 12,
    marginTop: 6,
  },
  pressed: {
    opacity: 0.86,
  },
});
