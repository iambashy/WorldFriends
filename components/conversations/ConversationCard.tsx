"use client"

import type React from "react"
import { memo, useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"
import type { ConversationData } from "@/data/conversations"

interface ConversationCardProps {
  conversation: ConversationData
  onPress: (conversationId: string) => void
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
  return `${Math.floor(diffInSeconds / 604800)}w`
}

const ConversationCardComponent: React.FC<ConversationCardProps> = ({ conversation, onPress }) => {
  const { theme } = useTheme()
  const [imageLoadError, setImageLoadError] = useState(false)

  const handleImageError = useCallback(() => {
    setImageLoadError(true)
  }, [])

  const handlePress = useCallback(() => {
    onPress(conversation.id)
  }, [conversation.id, onPress])

  const truncateMessage = (message: string, maxLength: number = 45): string => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength).trim() + "..."
  }

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
    profileImageContainer: {
      width: scale(52),
      height: scale(52),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(12),
      overflow: "hidden",
      backgroundColor: theme.colors.border,
    },
    profileImage: {
      width: "100%",
      height: "100%",
    },
    profileImageError: {
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: verticalScale(4),
    },
    userName: {
      fontSize: RFPercentage(2.2),
      fontWeight: "600",
      color: theme.colors.text,
      flex: 1,
      marginRight: scale(8),
    },
    timeContainer: {
      alignItems: "flex-end",
    },
    timeText: {
      fontSize: RFPercentage(1.8),
      color: theme.colors.textMuted,
      fontWeight: "500",
    },
    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    lastMessage: {
      fontSize: RFPercentage(2),
      color: theme.colors.textSecondary,
      flex: 1,
      marginRight: scale(8),
      lineHeight: RFPercentage(2.4),
    },
    lastMessageUnread: {
      color: theme.colors.text,
      fontWeight: "500",
    },
    unreadIndicator: {
      width: scale(8),
      height: scale(8),
      borderRadius: scale(theme.borderRadius.full),
      backgroundColor: theme.colors.error,
      alignSelf: "flex-end",
    },
  })

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.profileImageContainer}>
        {imageLoadError ? (
          <View style={styles.profileImageError}>
            <Ionicons name="person" size={scale(24)} color={theme.colors.textMuted} />
          </View>
        ) : (
          <Image
            source={{ uri: conversation.user.profilePicture }}
            style={styles.profileImage}
            onError={handleImageError}
          />
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.userName} numberOfLines={1}>
            {conversation.user.name}
          </Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTimeAgo(conversation.lastMessage.sentAt)}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text
            style={[
              styles.lastMessage,
              !conversation.lastMessage.isRead && styles.lastMessageUnread,
            ]}
            numberOfLines={1}
          >
            {truncateMessage(conversation.lastMessage.content)}
          </Text>
          {!conversation.lastMessage.isRead && <View style={styles.unreadIndicator} />}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const ConversationCard = memo(ConversationCardComponent)