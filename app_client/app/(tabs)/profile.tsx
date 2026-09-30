import { useMemo } from 'react';
import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app/app-header';
import { EmptyState } from '@/components/app/empty-state';
import { ListingCard } from '@/components/app/listing-card';
import { LoadingState } from '@/components/app/loading-state';
import { Screen } from '@/components/app/screen';
import { SectionTitle } from '@/components/app/section-title';
import { theme } from '@/constants/theme';
import { useListings } from '@/hooks/use-listings';
import { getOwnerId } from '@/lib/listings';
import { useAuth } from '@/providers/auth-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { listings, loading: listingsLoading, refreshing, refresh } = useListings();

  const ownedListings = useMemo(
    () => listings.filter((listing) => getOwnerId(listing) === user?._id),
    [listings, user?._id]
  );

  return (
    <Screen
      header={
        <AppHeader
          eyebrow="Profile"
          subtitle="Account, activity, and owner-side visibility in one place."
          title={user ? user.username : 'Your account'}
        />
      }
      onRefresh={refresh}
      refreshing={refreshing}>
      {loading ? <LoadingState label="Loading your profile..." /> : null}

      {!loading && !user ? (
        <EmptyState
          actionLabel="Open auth"
          description="Log in or create an account to post reviews and manage your presence."
          icon="person-add"
          onActionPress={() => router.push('/auth' as Href)}
          title="You are browsing as a guest"
        />
      ) : null}

      {!loading && user ? (
        <>
          <View style={styles.accountCard}>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.badges}>
              <View style={[styles.badge, { backgroundColor: theme.colors.primarySoft }]}>
                <Text style={styles.badgeText}>Verified session</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: theme.colors.accentSoft }]}>
                <Text style={styles.badgeText}>{ownedListings.length} owned listings</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={() => router.push('/auth' as Href)}
                style={[styles.secondaryButton, styles.flexButton]}>
                <Text style={styles.secondaryButtonText}>Switch account</Text>
              </Pressable>
              <Pressable onPress={logout} style={[styles.primaryButton, styles.flexButton]}>
                <Text style={styles.primaryButtonText}>Logout</Text>
              </Pressable>
            </View>
          </View>

          <SectionTitle
            subtitle="Listings you currently own on the backend."
            title="Your live inventory"
          />

          {listingsLoading ? <LoadingState label="Loading your listings..." /> : null}
          {!listingsLoading && !ownedListings.length ? (
            <EmptyState
              description="Your account is connected. Once this backend has owner listings for you, they will appear here."
              icon="storefront"
              title="No owner listings yet"
            />
          ) : null}
          {!listingsLoading &&
            ownedListings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  accountCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    padding: 20,
    ...theme.shadow,
  },
  name: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  email: {
    color: theme.colors.mutedText,
    marginTop: 6,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  flexButton: {
    flex: 1,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#F3F7FD',
    borderRadius: 16,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontWeight: '800',
  },
});
