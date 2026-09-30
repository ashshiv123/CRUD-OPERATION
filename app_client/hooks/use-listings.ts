import { useEffect, useState, startTransition } from 'react';

import { apiRequest } from '@/lib/api';
import { useFlash } from '@/providers/flash-context';
import { Listing } from '@/types/domain';

export function useListings() {
  const { showFlash } = useFlash();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (mode: 'initial' | 'refresh' = 'initial') => {
    if (mode === 'refresh') {
      setRefreshing(true);
    }

    try {
      const data = await apiRequest<{ listings: Listing[] }>('/api/listings');
      startTransition(() => {
        setListings(data.listings || []);
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load listings.';
      showFlash({ type: 'error', message });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    listings,
    loading,
    refreshing,
    refresh: () => load('refresh'),
  };
}
