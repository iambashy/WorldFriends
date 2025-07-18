"use client"

import React, { forwardRef, useMemo, useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { BottomSheetModal, BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "@/contexts/ThemeContext"
import { type CommentData, DUMMY_COMMENTS } from "@/data/post-cards"
import LottieView from "lottie-react-native"

interface CommentsSheetProps {
  postId: string // Keep postId if comments are specific to a post
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 86400)}h`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 604800)}d`
  return `${Math.floor(diffInSeconds / 604800)}w`
}

const CommentItem: React.FC<{
  comment: CommentData
  onReplyPress: (commentId: string) => void
  onMorePress: (commentId: string) => void
}> = ({ comment, onReplyPress, onMorePress }) => {
  const { theme } = useTheme()
  const [showReply, setShowReply] = useState(false)

  const shouldShowReadMore = comment.content.length > 150
  const displayContent = shouldShowReadMore ? comment.content.substring(0, 150) + "..." : comment.content

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    profileImage: {
      width: scale(32),
      height: scale(32),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(12),
    },
    content: {
      flex: 1,
    },
    userName: {
      fontSize: RFPercentage(2),
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: verticalScale(4),
    },
    commentText: {
      fontSize: RFPercentage(1.9),
      color: theme.colors.text,
      lineHeight: RFPercentage(2.5),
      marginBottom: verticalScale(6),
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
    },
    timeText: {
      fontSize: RFPercentage(1.7),
      color: theme.colors.textMuted,
      marginRight: scale(16),
    },
    replyButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    replyText: {
      fontSize: RFPercentage(1.7),
      color: theme.colors.primary,
      fontWeight: "500",
      marginLeft: scale(4),
    },
    moreButton: {
      marginLeft: "auto",
      padding: scale(4),
    },
    replyContainer: {
      marginTop: verticalScale(12), // Increased margin for better separation
      marginLeft: scale(44), // Aligned with comment content
      paddingLeft: scale(12),
      borderLeftWidth: 2,
      borderLeftColor: theme.colors.borderLight,
      paddingVertical: verticalScale(8), // Added vertical padding for reply
    },
    replyHeader: {
      // Added specific style for reply header
      flexDirection: "row",
      alignItems: "flex-start",
    },
    replyProfileImage: {
      // Added specific style for reply profile image
      width: scale(28),
      height: scale(28),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(10),
    },
    replyContent: {
      // Added specific style for reply content
      flex: 1,
    },
    replyUserName: {
      // Added specific style for reply user name
      fontSize: RFPercentage(1.9),
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: verticalScale(3),
    },
    replyCommentText: {
      // Added specific style for reply comment text
      fontSize: RFPercentage(1.8),
      color: theme.colors.text,
      lineHeight: RFPercentage(2.4),
      marginBottom: verticalScale(5),
    },
    replyTimeText: {
      // Added specific style for reply time text
      fontSize: RFPercentage(1.6),
      color: theme.colors.textMuted,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: comment.user.profilePicture }} style={styles.profileImage} />
        <View style={styles.content}>
          <Text style={styles.userName}>{comment.user.name}</Text>
          <Text style={styles.commentText}>{displayContent}</Text>
          <View style={styles.footer}>
            <Text style={styles.timeText}>{formatTimeAgo(comment.createdAt)}</Text>
            {comment.reply && (
              <TouchableOpacity style={styles.replyButton} onPress={() => setShowReply(!showReply)} activeOpacity={0.7}>
                <Ionicons name={showReply ? "remove" : "add"} size={scale(16)} color={theme.colors.primary} />
                <Text style={styles.replyText}>{showReply ? "Hide reply" : "View reply"}</Text>
              </TouchableOpacity>
            )}
          </View>
          {showReply && comment.reply && (
            <View style={styles.replyContainer}>
              <View style={styles.replyHeader}>
                <Image source={{ uri: comment.reply.user.profilePicture }} style={styles.replyProfileImage} />
                <View style={styles.replyContent}>
                  <Text style={styles.replyUserName}>{comment.reply.user.name}</Text>
                  <Text style={styles.replyCommentText}>{comment.reply.content}</Text>
                  <Text style={styles.replyTimeText}>{formatTimeAgo(comment.reply.createdAt)}</Text>
                </View>
                {comment.reply.isOwner && (
                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => onMorePress(comment.reply!.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="ellipsis-horizontal" size={scale(16)} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
        {comment.isOwner && (
          <TouchableOpacity style={styles.moreButton} onPress={() => onMorePress(comment.id)} activeOpacity={0.7}>
            <Ionicons name="ellipsis-horizontal" size={scale(16)} color={theme.colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export const CommentsSheet = forwardRef<BottomSheetModal, CommentsSheetProps>(({ postId }, ref) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<CommentData[]>([])

  const snapPoints = useMemo(() => ["50%", "90%"], [])

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setComments(DUMMY_COMMENTS)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [postId])

  const handleReplyPress = useCallback((commentId: string) => {
    console.log("Reply to comment:", commentId)
  }, [])

  const handleMorePress = useCallback((commentId: string) => {
    console.log("More options for comment:", commentId)
  }, [])

  const renderCommentItem = useCallback(
    ({ item }: { item: CommentData }) => (
      <CommentItem comment={item} onReplyPress={handleReplyPress} onMorePress={handleMorePress} />
    ),
    [handleReplyPress, handleMorePress],
  )

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
          <Text style={styles.headerTitle}>Comments</Text>
        </View>

        {loading ? (
          renderLoader()
        ) : comments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No comments yet</Text>
          </View>
        ) : (
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={renderCommentItem}
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

CommentsSheet.displayName = "CommentsSheet"

