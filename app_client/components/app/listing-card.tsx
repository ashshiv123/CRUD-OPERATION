import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { averageRating, formatPrice, getListingImageUrls } from '@/lib/listings';
import { useFavorites } from '@/providers/favorites-context';
import { Listing } from '@/types/domain';

export function ListingCard({ listing }: { listing: Listing }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(listing._id);

  return (
    <Pressable
      onPress={() => router.push((`/listings/${listing._id}`) as Href)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View>
        <Image contentFit="cover" source={getListingImageUrls(listing)[0]} style={styles.image} />
        <Pressable
          hitSlop={10}
          onPress={() => toggleFavorite(listing._id)}
          style={({ pressed }) => [styles.favoriteButton, pressed && { opacity: 0.75 }]}>
          <Ionicons
            color={favorite ? theme.colors.accent : theme.colors.text}
            name={favorite ? 'heart' : 'heart-outline'}
            size={18}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.title}>
            {listing.title}
          </Text>
          <View
            style={[
              styles.genderPill,
              { backgroundColor: listing.gender === 'girls' ? theme.colors.pink : theme.colors.primarySoft },
            ]}>
            <Text style={styles.genderText}>{listing.gender === 'girls' ? 'Girls' : 'Boys'}</Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.address}>
          {listing.address}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatPrice(listing.price)}</Text>
          <View style={styles.ratingWrap}>
            <Ionicons color={theme.colors.gold} name="star" size={15} />
            <Text style={styles.rating}>{averageRating(listing).toFixed(1)}</Text>
          </View>
        </View>

        {!!listing.amenities?.length ? (
          <View style={styles.amenityRow}>
            {listing.amenities.slice(0, 3).map((amenity) => (
              <View key={amenity} style={styles.amenityPill}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    marginBottom: 18,
    overflow: 'hidden',
    ...theme.shadow,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  image: {
    height: 200,
    width: '100%',
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: 14,
    top: 14,
    width: 36,
  },
  content: {
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 19,
    fontWeight: '800',
  },
  genderPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  genderText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  address: {
    color: theme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  price: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  ratingWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  rating: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  amenityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  amenityPill: {
    backgroundColor: theme.colors.mist,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  amenityText: {
    color: theme.colors.mutedText,
    fontSize: 12,
    fontWeight: '600',
  },
});
