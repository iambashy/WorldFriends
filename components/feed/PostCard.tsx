"use client"

import type React from "react"
import { memo, useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"
import type { PostData } from "@/data/post-cards"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

interface PostCardProps {
  post: PostData
  onLike: (postId: string) => void
  onBookmark: (postId: string) => void
  onComment: (postId: string) => void
  onImagePress: (images: string[], index: number) => void
  onMorePress?: (postId: string) => void
  onReadMore: (postId: string) => void
  onLikesPress: (postId: string) => void // New prop for likes press
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const postDate = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

  if (diffInSeconds < 60) return "now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 3600)}h`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 86400)}d`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 604800)}w`
  return `${Math.floor(diffInSeconds / 604800)}w`
}

const PostCardComponent: React.FC<PostCardProps> = ({
  post,
  onLike,
  onBookmark,
  onComment,
  onImagePress,
  onMorePress,
  onReadMore,
  onLikesPress, // Destructure new prop
}) => {
  const { theme } = useTheme()
  const [imageLoadError, setImageLoadError] = useState<{ [key: string]: boolean }>({})

  const handleImageError = useCallback((imageUrl: string) => {
    setImageLoadError((prev) => ({ ...prev, [imageUrl]: true }))
  }, [])

  const handleLike = useCallback(() => {
    onLike(post.id)
  }, [post.id, onLike])

  const handleBookmark = useCallback(() => {
    onBookmark(post.id)
  }, [post.id, onBookmark])

  const handleComment = useCallback(() => {
    onComment(post.id)
  }, [post.id, onComment])

  const handleMorePress = useCallback(() => {
    onMorePress?.(post.id)
  }, [post.id, onMorePress])

  const handleReadMore = useCallback(() => {
    onReadMore(post.id)
  }, [post.id, onReadMore])

  const handleImagePress = useCallback(
    (index: number) => {
      if (post.images) {
        onImagePress(post.images, index)
      }
    },
    [post.images, onImagePress],
  )

  const handleLikesPress = useCallback(() => {
    // New handler for likes press
    onLikesPress(post.id)
  }, [post.id, onLikesPress])

  const shouldShowReadMore = post.content.length > 100
  const displayContent = shouldShowReadMore
    ? post.content.substring(0, 100).replace(/\n/g, " ") + "..."
    : post.content.replace(/\n/g, " ")

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      width: SCREEN_WIDTH,
      marginBottom: verticalScale(1),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(12),
    },
    profileImage: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(12),
    },
    profileImageError: {
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: RFPercentage(2.2),
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: verticalScale(2),
    },
    timeAgo: {
      fontSize: RFPercentage(1.8),
      color: theme.colors.textMuted,
    },
    moreButton: {
      padding: scale(8),
    },
    content: {
      paddingHorizontal: scale(16),
      marginBottom: verticalScale(12),
    },
    contentText: {
      fontSize: RFPercentage(2.1),
      color: theme.colors.text,
      lineHeight: RFPercentage(2.8),
    },
    readMoreText: {
      color: theme.colors.primary,
      fontWeight: "500",
    },
    imagesContainer: {
      marginBottom: verticalScale(12),
    },
    singleImage: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH * 0.75,
    },
    multiImageContainer: {
      position: "relative",
    },
    multiImage: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH * 0.6,
    },
    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    overlayText: {
      color: "#FFFFFF",
      fontSize: RFPercentage(2.8),
      fontWeight: "700",
    },
    imageError: {
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: scale(16),
      paddingBottom: verticalScale(12),
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: scale(20),
    },
    actionText: {
      fontSize: RFPercentage(2),
      color: theme.colors.textSecondary,
      marginLeft: scale(6),
      fontWeight: "500",
    },
    bookmarkButton: {
      marginLeft: "auto",
      padding: scale(4),
    },
  })

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.user.profilePicture }}
          style={[styles.profileImage, imageLoadError[post.user.profilePicture] && styles.profileImageError]}
          onError={() => handleImageError(post.user.profilePicture)}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
        </View>
        {post.isOwner && (
          <TouchableOpacity style={styles.moreButton} onPress={handleMorePress} activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={scale(20)} color={theme.colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {displayContent}
          {shouldShowReadMore && (
            <Text style={styles.readMoreText} onPress={handleReadMore}>
              {" read more"}
            </Text>
          )}
        </Text>
      </View>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {post.images.length === 1 ? (
            <TouchableOpacity onPress={() => handleImagePress(0)} activeOpacity={0.9}>
              <Image
                source={{ uri: post.images[0] }}
                style={[styles.singleImage, imageLoadError[post.images[0]] && styles.imageError]}
                onError={() => handleImageError(post.images[0])}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.multiImageContainer}
              onPress={() => handleImagePress(0)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: post.images[0] }}
                style={[styles.multiImage, imageLoadError[post.images[0]] && styles.imageError]}
                onError={() => handleImageError(post.images[0])}
              />
              {post.images.length > 1 && (
                <View style={styles.imageOverlay}>
                  <Text style={styles.overlayText}>+{post.images.length - 1} more</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike} activeOpacity={0.7}>
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={scale(22)}
            color={post.isLiked ? theme.colors.error : theme.colors.textSecondary}
          />
          <TouchableOpacity onPress={handleLikesPress} activeOpacity={0.7}>
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleComment} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={scale(20)} color={theme.colors.textSecondary} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark} activeOpacity={0.7}>
          <Ionicons
            name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={scale(22)}
            color={post.isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const PostCard = memo(PostCardComponent)

