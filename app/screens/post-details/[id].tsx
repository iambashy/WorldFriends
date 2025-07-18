"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import type { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Ionicons } from "@expo/vector-icons"
import LottieView from "lottie-react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"
import { ScreenHeader } from "@/components/ScreenHeader" 
import { CommentsSheet } from "@/components/feed/CommentsSheet"
import { LikesSheet } from "@/components/feed/LikesSheet"
import { ActionSheet, type ActionSheetOption } from "@/components/common/ActionSheet"
import { ConfirmationModal } from "@/components/common/ConfirmationModal"
import { ImageViewer } from "@/components/common/ImageViewer"
import { POST_DETAIL_DATA } from "@/data/post-details"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function PostDetailsScreen() {
  const { theme } = useTheme()
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(POST_DETAIL_DATA)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const commentsSheetRef = useRef<BottomSheetModal>(null)
  const likesSheetRef = useRef<BottomSheetModal>(null)
  const actionSheetRef = useRef<BottomSheetModal>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setSelectedPostId(post.id) 
    }, 1500)

    return () => clearTimeout(timer)
  }, [post.id])

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

    if (diffInSeconds < 60) return "now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 86400)}h`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 604800)}d`
    return `${Math.floor(diffInSeconds / 604800)}w`
  }

  const handleLike = useCallback(() => {
    setPost((prevPost) => ({
      ...prevPost,
      isLiked: !prevPost.isLiked,
      likes: prevPost.isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
    }))
  }, [])

  const handleBookmark = useCallback(() => {
    setPost((prevPost) => ({
      ...prevPost,
      isBookmarked: !prevPost.isBookmarked,
    }))
  }, [])

  const handleComment = useCallback(() => {
    commentsSheetRef.current?.present()
  }, [])

  const handleLikesPress = useCallback(() => {
    likesSheetRef.current?.present()
  }, [])

  const handleImagePress = useCallback((images: string[], index: number) => {
    setSelectedImages(images)
    setSelectedImageIndex(index)
    setShowImageViewer(true)
  }, [])

  const handleEllipsisPress = useCallback(() => {
    actionSheetRef.current?.present()
  }, [])

  const handleDeletePost = useCallback(() => {
    actionSheetRef.current?.dismiss()
    setShowDeleteModal(true)
  }, [])

  const confirmDeletePost = useCallback(() => {
    console.log("Deleting post:", post.id)
    setShowDeleteModal(false)
    // Navigate back after deletion
  }, [post.id])

  const actionSheetOptions: ActionSheetOption[] = [
    {
      id: "delete",
      title: "Delete Post",
      icon: "trash-outline",
      color: theme.colors.error,
      onPress: handleDeletePost,
    },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    spinner: {
      width: scale(50),
      height: scale(50),
    },
    content: {
      flex: 1,
    },
    postContainer: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(16),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: verticalScale(16),
    },
    profileImage: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(12),
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: RFPercentage(2.4),
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: verticalScale(2),
    },
    timeAgo: {
      fontSize: RFPercentage(1.9),
      color: theme.colors.textMuted,
    },
    contentText: {
      fontSize: RFPercentage(2.2),
      color: theme.colors.text,
      lineHeight: RFPercentage(3),
      marginBottom: verticalScale(16),
    },
    imagesContainer: {
      marginBottom: verticalScale(16),
    },
    singleImage: {
      width: SCREEN_WIDTH - scale(32),
      height: (SCREEN_WIDTH - scale(32)) * 0.75,
      borderRadius: scale(theme.borderRadius.md),
    },
    multiImageContainer: {
      position: "relative",
    },
    multiImage: {
      width: SCREEN_WIDTH - scale(32),
      height: (SCREEN_WIDTH - scale(32)) * 0.6,
      borderRadius: scale(theme.borderRadius.md),
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
      borderRadius: scale(theme.borderRadius.md),
    },
    overlayText: {
      color: "#FFFFFF",
      fontSize: RFPercentage(2.8),
      fontWeight: "700",
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: verticalScale(8),
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderLight,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: scale(24),
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
        <ScreenHeader title="Post" />
        <View style={styles.loadingContainer}>
          <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={styles.spinner} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScreenHeader title="Post" rightComponent={post.isOwner ? "ellipsis" : null} onRightPress={handleEllipsisPress} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.postContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Image source={{ uri: post.user.profilePicture }} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{post.user.name}</Text>
              <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
            </View>
          </View>

          {/* Content */}
          <Text style={styles.contentText}>{post.content}</Text>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <View style={styles.imagesContainer}>
              {post.images.length === 1 ? (
                <TouchableOpacity onPress={() => handleImagePress(post.images!, 0)} activeOpacity={0.9}>
                  <Image source={{ uri: post.images[0] }} style={styles.singleImage} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.multiImageContainer}
                  onPress={() => handleImagePress(post.images!, 0)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: post.images[0] }} style={styles.multiImage} />
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
                size={scale(24)}
                color={post.isLiked ? theme.colors.error : theme.colors.textSecondary}
              />
              <TouchableOpacity onPress={handleLikesPress} activeOpacity={0.7}>
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleComment} activeOpacity={0.7}>
              <Ionicons name="chatbubble-outline" size={scale(22)} color={theme.colors.textSecondary} />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark} activeOpacity={0.7}>
              <Ionicons
                name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
                size={scale(24)}
                color={post.isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {selectedPostId && (
        <>
          <CommentsSheet ref={commentsSheetRef} postId={selectedPostId} />
          <LikesSheet ref={likesSheetRef} postId={selectedPostId} />
        </>
      )}

      <ActionSheet ref={actionSheetRef} options={actionSheetOptions} />

      <ConfirmationModal
        visible={showDeleteModal}
        icon="trash-outline"
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeletePost}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ImageViewer
        images={selectedImages.map((uri) => ({ uri }))}
        imageIndex={selectedImageIndex}
        visible={showImageViewer}
        onRequestClose={() => setShowImageViewer(false)}
      />
    </SafeAreaView>
  )
}
