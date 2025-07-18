"use client"

import type React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { useTheme } from "@/contexts/ThemeContext"
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder"
import { LinearGradient } from "expo-linear-gradient"

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export const ConversationCardSkeleton: React.FC = () => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(12),
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
      borderBottomColor: theme.colors.borderLight,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.shadow,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
        android: {
          elevation: 1,
        },
      }),
    },
    profileImage: {
      width: scale(52),
      height: scale(52),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(12),
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: verticalScale(6),
    },
    userName: {
      width: "60%",
      height: verticalScale(16),
      borderRadius: scale(theme.borderRadius.sm),
    },
    timeText: {
      width: scale(30),
      height: verticalScale(12),
      borderRadius: scale(theme.borderRadius.sm),
    },
    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    lastMessage: {
      width: "80%",
      height: verticalScale(14),
      borderRadius: scale(theme.borderRadius.sm),
    },
    unreadIndicator: {
      width: scale(8),
      height: scale(8),
      borderRadius: scale(theme.borderRadius.full),
    },
  })

  const shimmerColors = [theme.colors.surfaceSecondary, theme.colors.border, theme.colors.surfaceSecondary]

  return (
    <View style={styles.container}>
      <ShimmerPlaceholder shimmerColors={shimmerColors} style={styles.profileImage} />

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <ShimmerPlaceholder shimmerColors={shimmerColors} style={styles.userName} />
          <ShimmerPlaceholder shimmerColors={shimmerColors} style={styles.timeText} />
        </View>

        <View style={styles.bottomRow}>
          <ShimmerPlaceholder shimmerColors={shimmerColors} style={styles.lastMessage} />
          <ShimmerPlaceholder shimmerColors={shimmerColors} style={styles.unreadIndicator} />
        </View>
      </View>
    </View>
  )
}