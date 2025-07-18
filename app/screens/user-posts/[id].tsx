"use client"

import { useState, useEffect, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { FlashList } from "@shopify/flash-list"
import LottieView from "lottie-react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { useTheme } from "@/contexts/ThemeContext"
import { ScreenHeader } from "@/components/ScreenHeader" // Ensure this import is correct
import { PostCard } from "@/components/feed/PostCard"
import { USER_POSTS_DATA, getUserName } from "@/data/user-posts"
import type { PostData } from "@/data/post-cards"
import { ImageViewer } from "@/components/common/ImageViewer" // Import ImageViewer

export default function UserPostsScreen() {
  const { theme } = useTheme()
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PostData[]>([])
  const [userName, setUserName] = useState("")
  const [showImageViewer, setShowImageViewer] = useState(false) // State for image viewer
  const [selectedImages, setSelectedImages] = useState<string[]>([]) // State for images to view
  const [selectedImageIndex, setSelectedImageIndex] = useState(0) // State for initial image index

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(USER_POSTS_DATA)
      setUserName(getUserName(id as string))
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [id])

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
    console.log("Open comments for post:", postId)
    // In a real app, you would open a comments sheet/modal here
  }, [])

  const handleLikesPress = useCallback((postId: string) => {
    console.log("Open likes for post:", postId)
    // In a real app, you would open a likes sheet/modal here
  }, [])

  const handleImagePress = useCallback((images: string[], index: number) => {
    setSelectedImages(images)
    setSelectedImageIndex(index)
    setShowImageViewer(true)
  }, [])

  const handleReadMore = useCallback((postId: string) => {
    console.log("Navigate to post detail:", postId)
    // In a real app, you would navigate to the post detail screen
  }, [])

  const renderPost = useCallback(
    ({ item }: { item: PostData }) => (
      <PostCard
        post={item}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onComment={handleComment}
        onImagePress={handleImagePress}
        onReadMore={handleReadMore}
        onLikesPress={handleLikesPress}
      />
    ),
    [handleLike, handleBookmark, handleComment, handleImagePress, handleReadMore, handleLikesPress],
  )

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
    listContainer: {
      flex: 1,
    },
  })

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={[ "left", "right", "bottom"]}>
        <ScreenHeader title={`${userName}'s Posts`} />
        <View style={styles.loadingContainer}>
          <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={styles.spinner} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScreenHeader title={`${userName}'s Posts`} />

      <View style={styles.listContainer}>
        <FlashList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          estimatedItemSize={400}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: verticalScale(20),
          }}
        />
      </View>

      <ImageViewer
        images={selectedImages.map((uri) => ({ uri }))}
        imageIndex={selectedImageIndex}
        visible={showImageViewer}
        onRequestClose={() => setShowImageViewer(false)}
      />
    </SafeAreaView>
  )
}
