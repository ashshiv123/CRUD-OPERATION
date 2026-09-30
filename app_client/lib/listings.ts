import { Listing } from '@/types/domain';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80';

export function getListingImages(listing?: Partial<Listing> | null) {
  if (!listing?.images?.length) {
    return [];
  }

  return listing.images.filter((image) => image?.url);
}

export function getListingImageUrls(listing?: Partial<Listing> | null) {
  const urls = getListingImages(listing).map((image) => image.url).filter(Boolean) as string[];
  return urls.length ? urls : [FALLBACK_IMAGE];
}

export function formatPrice(price?: number) {
  return `₹ ${Number(price || 0).toLocaleString('en-IN')}/month`;
}

export function formatDistance(listing?: Partial<Listing> | null) {
  const coordinates = listing?.location?.coordinates;
  if (!coordinates || coordinates.length < 2) {
    return 'Near campus';
  }

  return `${Math.abs(coordinates[0]).toFixed(2)}°, ${Math.abs(coordinates[1]).toFixed(2)}°`;
}

export function getOwnerId(listing?: Partial<Listing> | null) {
  if (!listing?.owner) return null;
  return typeof listing.owner === 'string' ? listing.owner : listing.owner._id;
}

export function getReviewAuthorId(author?: Listing['owner'] | null) {
  if (!author) return null;
  return typeof author === 'string' ? author : author._id;
}

export function averageRating(listing?: Partial<Listing> | null) {
  const reviews = listing?.reviews || [];
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  return total / reviews.length;
}
