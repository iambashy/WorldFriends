"use client"

import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"

interface SegmentedControlProps {
  segments: Array<{ key: string; title: string; count?: number }>
  selectedSegment: string
  onSegmentChange: (segment: string) => void
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  selectedSegment,
  onSegmentChange,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.colors.background,
      borderRadius: scale(theme.borderRadius.full),
      padding: scale(4),
      marginHorizontal: scale(16),
      marginVertical: verticalScale(12),
    },
    segment: {
      flex: 1,
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(16),
      borderRadius: scale(theme.borderRadius.full),
      alignItems: "center",
      justifyContent: "center",
    },
    activeSegment: {
      backgroundColor: theme.colors.primary,
    },
    inactiveSegment: {
      backgroundColor: "transparent",
    },
    segmentText: {
      fontSize: RFPercentage(2.2),
      fontWeight: "600",
    },
    activeSegmentText: {
      color: theme.colors.white,
    },
    inactiveSegmentText: {
      color: theme.colors.textMuted,
    },
  })

  return (
    <View style={styles.container}>
      {segments.map((segment) => {
        const isActive = selectedSegment === segment.key
        const displayTitle = segment.count !== undefined ? `${segment.title} (${segment.count})` : segment.title

        return (
          <TouchableOpacity
            key={segment.key}
            style={[styles.segment, isActive ? styles.activeSegment : styles.inactiveSegment]}
            onPress={() => onSegmentChange(segment.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, isActive ? styles.activeSegmentText : styles.inactiveSegmentText]}>
              {displayTitle}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
