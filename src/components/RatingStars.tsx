import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../theme";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function RatingStars({ rating, size = 15, showValue = true }: RatingStarsProps) {
  return (
    <View style={styles.row}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={rating >= star ? "star" : rating >= star - 0.5 ? "star-half" : "star-outline"}
            size={size}
            color={colors.warning}
          />
        ))}
      </View>
      {showValue ? <Text style={styles.value}>{rating.toFixed(1)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  stars: {
    flexDirection: "row",
  },
  value: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "700",
  },
});
