"use client"

import type React from "react"
import { memo, useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"
import { getCountryByCode } from "@/constants/user-data"
import type { FriendData } from "@/data/friends"

interface FriendCardProps {
  friend: FriendData
  onMessage: (friendId: string) => void
  onRemove: (friendId: string) => void
}

const FriendCardComponent: React.FC<FriendCardProps> = ({ friend, onMessage, onRemove }) => {
  const { theme } = useTheme()
  const [imageLoadError, setImageLoadError] = useState(false)

  const country = getCountryByCode(friend.countryCode)

  const handleImageError = useCallback(() => {
    setImageLoadError(true)
  }, [])

  const handleMessage = useCallback(() => {
    onMessage(friend.id)
  }, [friend.id, onMessage])

  const handleRemove = useCallback(() => {
    onRemove(friend.id)
  }, [friend.id, onRemove])

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
    profileImageContainer: {
      width: scale(100),
      height: scale(100),
      borderRadius: scale(theme.borderRadius.full),
      borderWidth: scale(3),
      borderColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(16),
      overflow: "hidden",
    },
    profileImage: {
      width: "100%",
      height: "100%",
    },
    profileImageError: {
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      fontSize: RFPercentage(3),
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: verticalScale(12),
      textAlign: "center",
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(12),
      width: "100%",
    },
    genderButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.error, // Red for female
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(8),
      borderRadius: scale(theme.borderRadius.full),
      marginRight: scale(8),
    },
    genderButtonMale: {
      backgroundColor: theme.colors.info, // Blue for male
    },
    genderText: {
      fontSize: RFPercentage(2),
      color: theme.colors.white,
      fontWeight: "600",
      marginLeft: scale(4),
    },
    ageButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.info,
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(8),
      borderRadius: scale(theme.borderRadius.full),
    },
    ageText: {
      fontSize: RFPercentage(2),
      color: theme.colors.white,
      fontWeight: "600",
      marginLeft: scale(4),
    },
    countryRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      borderRadius: scale(theme.borderRadius.md),
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(16),
      marginBottom: verticalScale(20),
      width: "100%",
      justifyContent: "center",
    },
    flagEmoji: {
      fontSize: RFPercentage(2.2),
      marginRight: scale(8),
    },
    countryText: {
      fontSize: RFPercentage(2),
      color: theme.colors.text,
      fontWeight: "600",
    },
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      gap: scale(12),
    },
    messageButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
      paddingVertical: verticalScale(14),
      borderRadius: scale(theme.borderRadius.full),
    },
    messageButtonText: {
      fontSize: RFPercentage(2.2),
      fontWeight: "600",
      color: theme.colors.white,
      marginLeft: scale(8),
    },
    removeButton: {
      width: scale(48),
      height: scale(48),
      borderRadius: scale(theme.borderRadius.full),
      backgroundColor: theme.colors.error + '15',
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.error + '30',
    },
  })

  return (
    <View style={styles.card}>
      <View style={styles.profileImageContainer}>
        {imageLoadError ? (
          <View style={styles.profileImageError}>
            <Ionicons name="person" size={scale(60)} color={theme.colors.textMuted} />
          </View>
        ) : (
          <Image source={{ uri: friend.user.profilePicture }} style={styles.profileImage} onError={handleImageError} />
        )}
      </View>

      <Text style={styles.name}>{friend.user.name}</Text>

      <View style={styles.infoRow}>
        <View style={[styles.genderButton, friend.gender === "male" && styles.genderButtonMale]}>
          <Text style={{ fontSize: RFPercentage(2.2) }}>
            {friend.gender === "female" ? "👩" : friend.gender === "male" ? "👨" : "👤"}
          </Text>
        </View>
        <View style={styles.ageButton}>
          <Text style={styles.ageText}>🎂</Text>
          <Text style={styles.ageText}>{friend.age}</Text>
        </View>
      </View>

      <View style={styles.countryRow}>
        {country && <Text style={styles.flagEmoji}>{country.flag}</Text>}
        <Text style={styles.countryText}>{country?.name || "Unknown"}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage} activeOpacity={0.8}>
          <Ionicons name="chatbubble" size={scale(20)} color={theme.colors.white} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove} activeOpacity={0.8}>
          <Ionicons name="person-remove" size={scale(20)} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const FriendCard = memo(FriendCardComponent)
