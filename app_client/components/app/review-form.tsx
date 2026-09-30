import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { theme } from '@/constants/theme';

type ReviewFormProps = {
  rating: number;
  comment: string;
  submitting?: boolean;
  onRatingChange: (rating: number) => void;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
};

export function ReviewForm({
  rating,
  comment,
  submitting,
  onRatingChange,
  onCommentChange,
  onSubmit,
}: ReviewFormProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Share your review</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Pressable
            key={value}
            onPress={() => onRatingChange(value)}
            style={[styles.star, value <= rating && styles.activeStar]}>
            <Text style={[styles.starText, value <= rating && styles.activeStarText]}>{value}</Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={onCommentChange}
        placeholder="Tell other students what stood out to you..."
        placeholderTextColor="#8B98B2"
        style={styles.input}
        textAlignVertical="top"
        value={comment}
      />
      <Pressable
        disabled={submitting}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          (pressed || submitting) && {
            opacity: 0.82,
          },
        ]}>
        <Text style={styles.buttonText}>{submitting ? 'Submitting...' : 'Post Review'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    marginTop: 12,
    padding: 18,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  stars: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  star: {
    alignItems: 'center',
    backgroundColor: theme.colors.mist,
    borderRadius: 14,
    flex: 1,
    paddingVertical: 12,
  },
  activeStar: {
    backgroundColor: theme.colors.gold,
  },
  starText: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  activeStarText: {
    color: '#3E2F00',
  },
  input: {
    backgroundColor: '#F9FBFE',
    borderColor: theme.colors.border,
    borderRadius: 18,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 14,
    minHeight: 120,
    padding: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
    marginTop: 14,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
