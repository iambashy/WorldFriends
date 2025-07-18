"use client"

import type React from "react"
import { memo, useCallback, useState, useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"
import type { RequestData } from "@/data/requests"

interface RequestCardProps {
  request: RequestData
  onPress: (requestId: string) => void
}

const RequestCardComponent: React.FC<RequestCardProps> = ({ request, onPress }) => {
  const { theme } = useTheme()
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    )
    pulse.start()

    return () => pulse.stop()
  }, [pulseAnim])

  const handlePress = useCallback(() => {
    onPress(request.id)
  }, [request.id, onPress])

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
    messageIconContainer: {
      width: scale(100),
      height: scale(100),
      borderRadius: scale(theme.borderRadius.full),
      backgroundColor: '#FEF2F2', // Light red background
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(16),
    },
    messageIcon: {
      // Animated icon will be styled inline
    },
  })

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.messageIconContainer}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Ionicons 
            name="mail" 
            size={scale(50)} 
            color="#EF4444" // Light red color for the icon
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
}

export const RequestCard = memo(RequestCardComponent)
