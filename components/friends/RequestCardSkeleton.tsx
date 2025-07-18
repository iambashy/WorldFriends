"use client"

import type React from "react"
import { View, StyleSheet } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { useTheme } from "@/contexts/ThemeContext"
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder"
import { LinearGradient } from "expo-linear-gradient"

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export const RequestCardSkeleton: React.FC = () => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(20),
      marginHorizontal: scale(16),
      marginVertical: verticalScale(8),
      alignItems: "center",
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    messageIcon: {
      width: scale(100),
      height: scale(100),
      borderRadius: scale(theme.borderRadius.full),
    },
  })

  const shimmerColors = [theme.colors.surfaceSecondary, theme.colors.border, theme.colors.surfaceSecondary]

  return (
    <View style={styles.card}>
      <ShimmerPlaceholder shimmerColors={shimmerColors} style={styles.messageIcon} />
    </View>
  )
}
