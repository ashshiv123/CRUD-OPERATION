import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { getReviewAuthorId } from '@/lib/listings';
import { useAuth } from '@/providers/auth-context';
import { Review } from '@/types/domain';

type ReviewCardProps = {
  review: Review;
  onDelete?: (reviewId: string) => Promise<void> | void;
};

export function ReviewCard({ review, onDelete }: ReviewCardProps) {
  const { user } = useAuth();
  const authorName = typeof review.author === 'string' ? 'Student' : review.author?.username || 'Student';
  const canDelete = user && getReviewAuthorId(review.author) === user._id;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.author}>{authorName}</Text>
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={`${review._id}-${index}`}
                color={index < review.rating ? theme.colors.gold : '#D7DDE8'}
                name="star"
                size={14}
              />
            ))}
          </View>
        </View>
        {canDelete && onDelete ? (
          <Pressable
            onPress={() =>
              Alert.alert('Delete review', 'Do you want to remove this review?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => onDelete(review._id) },
              ])
            }>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    marginTop: 12,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 6,
  },
  comment: {
    color: theme.colors.mutedText,
    lineHeight: 21,
    marginTop: 12,
  },
  delete: {
    color: theme.colors.danger,
    fontWeight: '700',
  },
});
