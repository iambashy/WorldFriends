"use client"

import React, { useState, useCallback, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { verticalScale } from "react-native-size-matters"
import { FlashList } from "@shopify/flash-list"
import type { BottomSheetModal } from "@gorhom/bottom-sheet"
import LottieView from "lottie-react-native"
import { useTheme } from "@/contexts/ThemeContext"
import { TabHeader } from "@/components/TabHeader"
import { Greetings } from "@/components/feed/Greetings"
import { PostCard } from "@/components/feed/PostCard"
import { PostCardSkeleton } from "@/components/feed/PostCardSkeleton"
import { CommentsSheet } from "@/components/feed/CommentsSheet" // Updated import
import { LikesSheet } from "@/components/feed/LikesSheet" // New import
import { ActionSheet, type ActionSheetOption } from "@/components/common/ActionSheet"
import { ConfirmationModal } from "@/components/common/ConfirmationModal"
import { ImageViewer } from "@/components/common/ImageViewer"
import { type PostData, DUMMY_POSTS } from "@/data/post-cards"
import { router } from "expo-router" // Added router import

export default function HomeScreen() {
  const { theme } = useTheme()
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null) // Renamed for clarity
  const [showCommentsSheet, setShowCommentsSheet] = useState(false) // New state for comments sheet
  const [showLikesSheet, setShowLikesSheet] = useState(false) // New state for likes sheet
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  const commentsSheetRef = useRef<BottomSheetModal>(null) // Renamed ref
  const likesSheetRef = useRef<BottomSheetModal>(null) // New ref
  const actionSheetRef = useRef<BottomSheetModal>(null)

  // Simulate initial data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(DUMMY_POSTS.slice(0, 10))
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLike = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }, [])

  const handleBookmark = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)),
    )
  }, [])

  const handleComment = useCallback((postId: string) => {
    setSelectedPostId(postId)
    commentsSheetRef.current?.present()
  }, [])

  const handleLikesPress = useCallback((postId: string) => {
    // New handler for likes press
    setSelectedPostId(postId)
    likesSheetRef.current?.present()
  }, [])

  const handleImagePress = useCallback((images: string[], index: number) => {
    setSelectedImages(images)
    setSelectedImageIndex(index)
    setShowImageViewer(true)
  }, [])

  const handleMorePress = useCallback((postId: string) => {
    setSelectedPostId(postId)
    actionSheetRef.current?.present()
  }, [])

  const handleReadMore = useCallback((postId: string) => {
    // Navigate to post detail screen for testing
    router.push(`/screens/post-details/${postId}`) // Use dynamic route
  }, [])

  const handlePromptPress = useCallback(() => {
    // Navigate to create post screen
    router.push("/screens/create-post")
  }, [])

  const handleDeletePost = useCallback(() => {
    actionSheetRef.current?.dismiss()
    setShowDeleteModal(true)
  }, [])

  const confirmDeletePost = useCallback(() => {
    if (postToDelete) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postToDelete))
      setPostToDelete(null)
    }
    setShowDeleteModal(false)
  }, [postToDelete])

  const handleLoadMore = useCallback(() => {
    if (loadingMore || posts.length >= DUMMY_POSTS.length) return

    setLoadingMore(true)
    setTimeout(() => {
      const nextPosts = DUMMY_POSTS.slice(posts.length, posts.length + 10)
      setPosts((prevPosts) => [...prevPosts, ...nextPosts])
      setLoadingMore(false)
    }, 1500)
  }, [posts.length, loadingMore])

  const actionSheetOptions: ActionSheetOption[] = [
    {
      id: "delete",
      title: "Delete Post",
      icon: "trash-outline",
      color: theme.colors.error,
      onPress: handleDeletePost,
    },
  ]

  const renderPost = useCallback(
    ({ item }: { item: PostData }) => (
      <PostCard
        post={item}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onComment={handleComment}
        onImagePress={handleImagePress}
        onMorePress={handleMorePress}
        onReadMore={handleReadMore}
        onLikesPress={handleLikesPress} // Pass new handler
      />
    ),
    [handleLike, handleBookmark, handleComment, handleImagePress, handleMorePress, handleReadMore, handleLikesPress],
  )

  const renderSkeleton = useCallback(() => <PostCardSkeleton />, [])

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null

    return (
      <View style={styles.footerLoader}>
        <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={styles.footerSpinner} />
      </View>
    )
  }, [loadingMore])

  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <LottieView source={require("@/assets/animations/feed.json")} autoPlay loop style={styles.emptyAnimation} />
        <Text style={styles.emptyText}>No posts yet</Text>
      </View>
    ),
    [],
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContainer: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: verticalScale(40),
    },
    emptyAnimation: {
      width: 200,
      height: 200,
      marginBottom: verticalScale(16),
    },
    emptyText: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "600",
      textAlign: "center",
    },
    footerLoader: {
      paddingVertical: verticalScale(20),
      alignItems: "center",
    },
    footerSpinner: {
      width: 30,
      height: 30,
    },
  })

  const handleNotificationPress = () => {
    // Navigate to user posts for testing
    router.push("/screens/user-posts/user1")
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <TabHeader title="Feed" onNotificationPress={handleNotificationPress} hasNotification={true} />
      <View style={styles.listContainer}>
        <FlashList
          data={loading ? Array(10).fill(null) : posts}
          renderItem={loading ? renderSkeleton : renderPost}
          keyExtractor={(item, index) => (loading ? `skeleton-${index}` : item.id)}
          estimatedItemSize={400}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            // Greetings component is always shown, not part of skeleton loading
            <Greetings userName="John" onPromptPress={handlePromptPress} />
          }
          ListFooterComponent={renderFooter}
          ListEmptyComponent={!loading ? renderEmptyState : null}
          contentContainerStyle={{
            paddingBottom: verticalScale(100), // Account for custom tab bar
          }}
        />
      </View>

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

