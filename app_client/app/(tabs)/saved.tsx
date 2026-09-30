import { useMemo } from 'react';

import { AppHeader } from '@/components/app/app-header';
import { EmptyState } from '@/components/app/empty-state';
import { ListingCard } from '@/components/app/listing-card';
import { LoadingState } from '@/components/app/loading-state';
import { Screen } from '@/components/app/screen';
import { useListings } from '@/hooks/use-listings';
import { useFavorites } from '@/providers/favorites-context';

export default function SavedScreen() {
  const { favoriteIds } = useFavorites();
  const { listings, loading, refreshing, refresh } = useListings();

  const savedListings = useMemo(
    () => listings.filter((listing) => favoriteIds.includes(listing._id)),
    [favoriteIds, listings]
  );

  return (
    <Screen
      header={
        <AppHeader
          eyebrow="Saved"
          subtitle="Keep the strongest options in one place before making a final call."
          title="Your shortlist"
        />
      }
      onRefresh={refresh}
      refreshing={refreshing}>
      {loading ? <LoadingState label="Loading your shortlist..." /> : null}

      {!loading && !savedListings.length ? (
        <EmptyState
          actionLabel="Browse listings"
          description="Tap the heart on any property card and it will show up here."
          icon="heart-outline"
          onActionPress={refresh}
          title="No saved stays yet"
        />
      ) : null}

      {!loading && savedListings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
    </Screen>
  );
}
