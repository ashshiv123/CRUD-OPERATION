import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app/app-header';
import { HomeHero } from '@/components/app/home-hero';
import { ListingCard } from '@/components/app/listing-card';
import { LoadingState } from '@/components/app/loading-state';
import { Screen } from '@/components/app/screen';
import { SectionTitle } from '@/components/app/section-title';
import { theme } from '@/constants/theme';
import { useListings } from '@/hooks/use-listings';

const serviceHighlights = [
  { icon: 'shield-checkmark', title: 'Verified properties', copy: 'Browse real stays with clear photos and transparent pricing.' },
  { icon: 'restaurant', title: 'Food-friendly choices', copy: 'Find hostels and PGs near tiffin, mess, and canteen options.' },
  { icon: 'flash', title: 'Fast comparison', copy: 'Sort by budget, amenities, and reviews without leaving the app.' },
];

export default function HomeScreen() {
  const { listings, loading, refreshing, refresh } = useListings();

  const boysListings = listings.filter((listing) => listing.gender === 'boys').slice(0, 2);
  const girlsListings = listings.filter((listing) => listing.gender === 'girls').slice(0, 2);

  return (
    <Screen
      header={
        <AppHeader
          eyebrow="Your Mobile Experience"
          subtitle="A polished student housing app powered by your existing backend."
          title="Stay Finder"
        />
      }
      onRefresh={refresh}
      refreshing={refreshing}>
      <HomeHero />

      <SectionTitle
        subtitle="A fresher, faster mobile experience for students who want everything in one place."
        title="Why students will love this app"
      />
      <View style={styles.featureGrid}>
        {serviceHighlights.map((item) => (
          <View key={item.title} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons color={theme.colors.primary} name={item.icon as keyof typeof Ionicons.glyphMap} size={18} />
            </View>
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureCopy}>{item.copy}</Text>
          </View>
        ))}
      </View>

      {loading ? <LoadingState label="Loading campus stays..." /> : null}

      {!loading && boysListings.length ? (
        <>
          <SectionTitle subtitle="Quick picks for the latest boys listings." title="Boys Hostels & PG" />
          {boysListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </>
      ) : null}

      {!loading && girlsListings.length ? (
        <>
          <SectionTitle subtitle="Comfort-first listings for girls, near your campus." title="Girls Hostels & PG" />
          {girlsListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  featureGrid: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 18,
    ...theme.shadow,
  },
  featureIcon: {
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
    borderRadius: 14,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  featureTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
  },
  featureCopy: {
    color: theme.colors.mutedText,
    lineHeight: 20,
    marginTop: 6,
  },
});
