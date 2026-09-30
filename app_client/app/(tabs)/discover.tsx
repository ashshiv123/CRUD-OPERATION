import { useDeferredValue, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '@/components/app/app-header';
import { EmptyState } from '@/components/app/empty-state';
import { ListingCard } from '@/components/app/listing-card';
import { LoadingState } from '@/components/app/loading-state';
import { Screen } from '@/components/app/screen';
import { theme } from '@/constants/theme';
import { useListings } from '@/hooks/use-listings';

type GenderFilter = 'all' | 'boys' | 'girls';

export default function DiscoverScreen() {
  const { listings, loading, refreshing, refresh } = useListings();
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState<GenderFilter>('all');
  const deferredQuery = useDeferredValue(query);

  const filteredListings = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return listings.filter((listing) => {
      const matchesGender = gender === 'all' ? true : listing.gender === gender;
      const haystack = [listing.title, listing.address, listing.description, ...(listing.amenities || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesSearch = normalized ? haystack.includes(normalized) : true;
      return matchesGender && matchesSearch;
    });
  }, [deferredQuery, gender, listings]);

  return (
    <Screen
      header={
        <AppHeader
          eyebrow="Discover"
          subtitle="Search by vibe, address, price, and amenities."
          title="Find your next stay"
        />
      }
      onRefresh={refresh}
      refreshing={refreshing}>
      <TextInput
        onChangeText={setQuery}
        placeholder="Search by title, area, mess, wifi..."
        placeholderTextColor="#90A0BA"
        style={styles.search}
        value={query}
      />

      <View style={styles.filters}>
        {(['all', 'boys', 'girls'] as GenderFilter[]).map((value) => (
          <Pressable
            key={value}
            onPress={() => setGender(value)}
            style={[styles.filterPill, gender === value && styles.filterPillActive]}>
            <Text style={[styles.filterText, gender === value && styles.filterTextActive]}>
              {value === 'all' ? 'All stays' : value === 'boys' ? 'Boys' : 'Girls'}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? <LoadingState label="Curating listings..." /> : null}

      {!loading && !filteredListings.length ? (
        <EmptyState
          description="Try a different keyword or switch the category filter."
          icon="search"
          title="No listings matched your search"
        />
      ) : null}

      {!loading &&
        filteredListings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#FFFFFF',
    borderColor: theme.colors.border,
    borderRadius: 18,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  filters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    marginTop: 14,
  },
  filterPill: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
});
