import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app/app-header';
import { EmptyState } from '@/components/app/empty-state';
import { LoadingState } from '@/components/app/loading-state';
import { ReviewCard } from '@/components/app/review-card';
import { ReviewForm } from '@/components/app/review-form';
import { SectionTitle } from '@/components/app/section-title';
import { theme } from '@/constants/theme';
import { apiRequest } from '@/lib/api';
import { averageRating, formatPrice, getListingImageUrls, getOwnerId } from '@/lib/listings';
import { useAuth } from '@/providers/auth-context';
import { useFavorites } from '@/providers/favorites-context';
import { useFlash } from '@/providers/flash-context';
import { Listing, Review } from '@/types/domain';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { showFlash } = useFlash();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [review, setReview] = useState({ rating: 4, comment: '' });

  useEffect(() => {
    if (!id) return;
    let active = true;

    apiRequest<{ listing: Listing }>(`/api/listings/${id}`)
      .then((data) => {
        if (active) {
          setListing(data.listing);
        }
      })
      .catch((error) => {
        if (active) {
          showFlash({
            type: 'error',
            message: error instanceof Error ? error.message : 'Unable to load listing.',
          });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, showFlash]);

  const imageUrls = useMemo(() => getListingImageUrls(listing), [listing]);
  const canDeleteListing = user && getOwnerId(listing) === user._id;

  const handleDeleteListing = async () => {
    if (!listing) return;

    Alert.alert('Delete listing', 'This will permanently remove the listing from the backend.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await apiRequest(`/api/listings/${listing._id}`, { method: 'DELETE' });
            showFlash({ type: 'success', message: 'Listing deleted.' });
            router.replace('/discover' as Href);
          } catch (error) {
            showFlash({
              type: 'error',
              message: error instanceof Error ? error.message : 'Unable to delete listing.',
            });
          }
        },
      },
    ]);
  };

  const handleReviewSubmit = async () => {
    if (!listing || !review.comment.trim()) {
      showFlash({ type: 'error', message: 'Please write a short review before posting.' });
      return;
    }

    setSubmittingReview(true);
    try {
      const data = await apiRequest<{ review: Review }>(`/api/listings/${listing._id}/reviews`, {
        method: 'POST',
        body: { review: { rating: review.rating, comment: review.comment.trim() } },
      });
      setListing((current) =>
        current
          ? { ...current, reviews: [data.review, ...(current.reviews || [])] }
          : current
      );
      setReview({ rating: 4, comment: '' });
      showFlash({ type: 'success', message: 'Review posted.' });
    } catch (error) {
      showFlash({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to post review.',
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    if (!listing) return;

    try {
      await apiRequest(`/api/listings/${listing._id}/reviews/${reviewId}`, { method: 'DELETE' });
      setListing((current) =>
        current
          ? { ...current, reviews: (current.reviews || []).filter((item) => item._id !== reviewId) }
          : current
      );
      showFlash({ type: 'success', message: 'Review deleted.' });
    } catch (error) {
      showFlash({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to delete review.',
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Listing details" />
        <LoadingState label="Loading property..." />
      </SafeAreaView>
    );
  }

  if (!listing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Listing details" />
        <View style={styles.content}>
          <EmptyState
            description="The property may have been removed or is temporarily unavailable."
            icon="alert-circle"
            title="Listing not found"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <AppHeader
        actionIcon={isFavorite(listing._id) ? 'heart' : 'heart-outline'}
        onActionPress={() => toggleFavorite(listing._id)}
        subtitle={listing.address}
        title={listing.title}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {imageUrls.map((url, index) => (
            <Image key={`${url}-${index}`} contentFit="cover" source={url} style={styles.heroImage} />
          ))}
        </ScrollView>

        <View style={styles.topCard}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(listing.price)}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons color={theme.colors.gold} name="star" size={15} />
              <Text style={styles.ratingText}>{averageRating(listing).toFixed(1)}</Text>
            </View>
          </View>
          <Text style={styles.description}>{listing.description || 'No description added yet.'}</Text>

          <View style={styles.chipRow}>
            <View style={[styles.chip, { backgroundColor: listing.gender === 'girls' ? theme.colors.pink : theme.colors.primarySoft }]}>
              <Text style={styles.chipText}>{listing.gender === 'girls' ? 'For Girls' : 'For Boys'}</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: theme.colors.accentSoft }]}>
              <Text style={styles.chipText}>{listing.reviews?.length || 0} reviews</Text>
            </View>
          </View>
        </View>

        <SectionTitle subtitle="Quick facts from your existing backend data." title="Stay details" />
        <View style={styles.detailGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{listing.address}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Amenities</Text>
            <Text style={styles.detailValue}>{listing.amenities?.join(', ') || 'Amenities not listed yet'}</Text>
          </View>
        </View>

        {canDeleteListing ? (
          <Pressable onPress={handleDeleteListing} style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
            <Text style={styles.deleteText}>Delete listing</Text>
          </Pressable>
        ) : null}

        <SectionTitle
          subtitle="Fresh, honest feedback from students already using the place."
          title="Reviews"
        />

        {user ? (
          <ReviewForm
            comment={review.comment}
            onCommentChange={(value) => setReview((current) => ({ ...current, comment: value }))}
            onRatingChange={(rating) => setReview((current) => ({ ...current, rating }))}
            onSubmit={handleReviewSubmit}
            rating={review.rating}
            submitting={submittingReview}
          />
        ) : (
          <EmptyState
            actionLabel="Login to review"
            description="Sign in to share your experience and help other students choose better."
            icon="chatbubble-ellipses"
            onActionPress={() => router.push('/auth' as Href)}
            title="Reviews are open for logged-in users"
          />
        )}

        {(listing.reviews || []).length ? (
          <View style={styles.reviewList}>
            {(listing.reviews || []).map((item) => (
              <ReviewCard key={item._id} onDelete={handleReviewDelete} review={item} />
            ))}
          </View>
        ) : (
          <EmptyState
            description="Be the first person to leave a review for this property."
            icon="sparkles"
            title="No reviews yet"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  carousel: {
    marginTop: 8,
  },
  heroImage: {
    borderRadius: theme.radius.xl,
    height: 260,
    marginRight: 14,
    width: 320,
  },
  topCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    marginTop: 18,
    padding: 18,
    ...theme.shadow,
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: theme.colors.primary,
    fontSize: 26,
    fontWeight: '800',
  },
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: '#FFF8DD',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ratingText: {
    color: theme.colors.text,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipText: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  detailGrid: {
    gap: 12,
  },
  detailCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 18,
  },
  detailLabel: {
    color: theme.colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  detailValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginTop: 8,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#FFE8E6',
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 14,
  },
  deleteText: {
    color: theme.colors.danger,
    fontWeight: '800',
  },
  reviewList: {
    marginTop: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});
