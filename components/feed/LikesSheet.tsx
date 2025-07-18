"use client"

import React, { forwardRef, useMemo, useState, useCallback } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { BottomSheetModal, BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "@/contexts/ThemeContext"
import { type LikeData, DUMMY_LIKES } from "@/data/post-cards"
import LottieView from "lottie-react-native"

interface LikesSheetProps {
  postId: string // Keep postId if likes are specific to a post
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 86400)}d`
  return `${Math.floor(diffInSeconds / 604800)}w`
}

const LikeItem: React.FC<{ like: LikeData }> = ({ like }) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(8),
      minWidth: scale(80), // Ensure minimum width for each item
    },
    profileImage: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(theme.borderRadius.full),
      marginBottom: verticalScale(8),
    },
    userName: {
      fontSize: RFPercentage(1.8),
      fontWeight: "500",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: verticalScale(4),
    },
    timeText: {
      fontSize: RFPercentage(1.6),
      color: theme.colors.textMuted,
      textAlign: "center",
    },
  })

  return (
    <View style={styles.container}>
      <Image source={{ uri: like.user.profilePicture }} style={styles.profileImage} />
      <Text style={styles.userName} numberOfLines={1}>
        {like.user.name}
      </Text>
      <Text style={styles.timeText}>{formatTimeAgo(like.createdAt)}</Text>
    </View>
  )
}

export const LikesSheet = forwardRef<BottomSheetModal, LikesSheetProps>(({ postId }, ref) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState<LikeData[]>([])

  const snapPoints = useMemo(() => ["50%", "90%"], [])

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLikes(DUMMY_LIKES)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [postId])

  const renderLikeItem = useCallback(({ item }: { item: LikeData }) => <LikeItem like={item} />, [])

  const renderLoader = () => (
    <View style={loaderStyles.container}>
      <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={loaderStyles.spinner} />
    </View>
  )

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flex: 1,
      paddingBottom: insets.bottom,
    },
    header: {
      alignItems: "center",
      paddingVertical: verticalScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: RFPercentage(2.4),
      fontWeight: "700",
      color: theme.colors.text,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: verticalScale(40),
    },
    emptyText: {
      fontSize: RFPercentage(2.2),
      color: theme.colors.textMuted,
      textAlign: "center",
    },
  })

  const loaderStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: verticalScale(40),
    },
    spinner: {
      width: scale(40),
      height: scale(40),
    },
  })

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.textMuted }}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Likes</Text>
        </View>

        {loading ? (
          renderLoader()
        ) : likes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No likes yet</Text>
          </View>
        ) : (
          <BottomSheetFlatList
            data={likes}
            keyExtractor={(item) => item.id}
            renderItem={renderLikeItem}
            numColumns={3} // Display likes in 3 columns
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: verticalScale(20),
            }}
          />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  )
})

LikesSheet.displayName = "LikesSheet"

