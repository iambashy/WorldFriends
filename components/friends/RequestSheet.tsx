"use client"

import React, { forwardRef, useMemo, useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "@/contexts/ThemeContext"
import { getCountryByCode } from "@/constants/user-data"
import type { RequestData } from "@/data/requests"

interface RequestSheetProps {
  request: RequestData | null
  onAccept: (requestId: string) => void
  onDecline: (requestId: string) => void
}

export const RequestSheet = forwardRef<BottomSheetModal, RequestSheetProps>(
  ({ request, onAccept, onDecline }, ref) => {
    const { theme } = useTheme()
    const insets = useSafeAreaInsets()
    const [imageLoadError, setImageLoadError] = useState(false)

    const snapPoints = useMemo(() => ["60%"], [])

    const handleAccept = useCallback(() => {
      if (request) {
        onAccept(request.id)
        ;(ref as any)?.current?.dismiss()
      }
    }, [request, onAccept, ref])

    const handleDecline = useCallback(() => {
      if (request) {
        onDecline(request.id)
        ;(ref as any)?.current?.dismiss()
      }
    }, [request, onDecline, ref])

    const handleImageError = useCallback(() => {
      setImageLoadError(true)
    }, [])

    if (!request) return null

    const country = getCountryByCode(request.countryCode)

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.colors.surface,
        flex: 1,
        paddingBottom: insets.bottom + verticalScale(20),
        paddingHorizontal: scale(20),
      },
      header: {
        alignItems: "center",
        paddingVertical: verticalScale(16),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        marginBottom: verticalScale(20),
      },
      headerTitle: {
        fontSize: RFPercentage(2.4),
        fontWeight: "700",
        color: theme.colors.text,
      },
      profileSection: {
        alignItems: "center",
        marginBottom: verticalScale(24),
      },
      profileImageContainer: {
        width: scale(80),
        height: scale(80),
        borderRadius: scale(theme.borderRadius.full),
        borderWidth: scale(3),
        borderColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(12),
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
        fontSize: RFPercentage(2.6),
        fontWeight: "700",
        color: theme.colors.text,
        marginBottom: verticalScale(8),
      },
      infoRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(8),
      },
      genderButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.error, // Red for female
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: scale(theme.borderRadius.full),
        marginRight: scale(8),
      },
      genderButtonMale: {
        backgroundColor: theme.colors.info, // Blue for male
      },
      ageButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.info,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: scale(theme.borderRadius.full),
      },
      ageText: {
        fontSize: RFPercentage(1.8),
        color: theme.colors.white,
        fontWeight: "600",
        marginLeft: scale(4),
      },
      countryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      flagEmoji: {
        fontSize: RFPercentage(2),
        marginRight: scale(6),
      },
      countryText: {
        fontSize: RFPercentage(1.9),
        color: theme.colors.textSecondary,
        fontWeight: "500",
      },
      messageSection: {
        backgroundColor: theme.colors.background,
        borderRadius: scale(theme.borderRadius.md),
        padding: scale(16),
        marginBottom: verticalScale(24),
      },
      messageLabel: {
        fontSize: RFPercentage(2),
        fontWeight: "600",
        color: theme.colors.text,
        marginBottom: verticalScale(8),
      },
      messageText: {
        fontSize: RFPercentage(2),
        color: theme.colors.textSecondary,
        lineHeight: RFPercentage(2.6),
      },
      buttonContainer: {
        flexDirection: "row",
        gap: scale(12),
      },
      button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: verticalScale(14),
        borderRadius: scale(theme.borderRadius.full),
      },
      acceptButton: {
        backgroundColor: theme.colors.success,
      },
      declineButton: {
        backgroundColor: theme.colors.error,
      },
      buttonText: {
        fontSize: RFPercentage(2.2),
        fontWeight: "600",
        color: theme.colors.white,
        marginLeft: scale(8),
      },
    })

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textMuted }}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Friend Request</Text>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              {imageLoadError ? (
                <View style={styles.profileImageError}>
                  <Ionicons name="person" size={scale(40)} color={theme.colors.textMuted} />
                </View>
              ) : (
                <Image
                  source={{ uri: request.user.profilePicture }}
                  style={styles.profileImage}
                  onError={handleImageError}
                />
              )}
            </View>

            <Text style={styles.name}>{request.user.name}</Text>

            <View style={styles.infoRow}>
              <View style={[styles.genderButton, request.gender === "male" && styles.genderButtonMale]}>
                <Text style={{ fontSize: RFPercentage(1.8) }}>
                  {request.gender === "female" ? "👩" : request.gender === "male" ? "👨" : "👤"}
                </Text>
              </View>
              <View style={styles.ageButton}>
                <Text style={styles.ageText}>🎂</Text>
                <Text style={styles.ageText}>{request.age}</Text>
              </View>
            </View>

            <View style={styles.countryRow}>
              {country && <Text style={styles.flagEmoji}>{country.flag}</Text>}
              <Text style={styles.countryText}>{country?.name || "Unknown"}</Text>
            </View>
          </View>

          <View style={styles.messageSection}>
            <Text style={styles.messageLabel}>Message:</Text>
            <Text style={styles.messageText}>{request.message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline} activeOpacity={0.8}>
              <Ionicons name="close" size={scale(20)} color={theme.colors.white} />
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept} activeOpacity={0.8}>
              <Ionicons name="checkmark" size={scale(20)} color={theme.colors.white} />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  }
)

RequestSheet.displayName = "RequestSheet"
