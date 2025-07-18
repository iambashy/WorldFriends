"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { useTheme } from "@/contexts/ThemeContext"

interface SearchBarProps {
  onSearch: (query: string) => void
  initialPlaceholder?: string
}

const PLACEHOLDERS = [
  "Search by name...",
  "Search by username...",
  "Search hobbies...",
  "Find new friends...",
  "Explore interests...",
]

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { theme } = useTheme()
  const [searchText, setSearchText] = useState("")
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")

  useEffect(() => {
    // Set a random placeholder on component mount
    const randomIndex = Math.floor(Math.random() * PLACEHOLDERS.length)
    setCurrentPlaceholder(PLACEHOLDERS[randomIndex])
  }, [])

  const handleSearchPress = useCallback(() => {
    // Trigger search only if text length is 3 or more characters
    if (searchText.trim().length >= 3) {
      onSearch(searchText.trim())
    }
  }, [searchText, onSearch])

  const handleClearSearch = useCallback(() => {
    setSearchText("")
    onSearch("") // Clear search results
  }, [onSearch])

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      marginHorizontal: scale(16),
      marginVertical: verticalScale(12),
      paddingHorizontal: scale(16),
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textInput: {
      flex: 1,
      fontSize: RFPercentage(2.2),
      color: theme.colors.text,
      paddingVertical: verticalScale(12),
      paddingRight: scale(10),
    },
    searchButton: {
      padding: scale(8),
      borderRadius: scale(theme.borderRadius.full),
      backgroundColor: theme.colors.primary,
      marginLeft: scale(8),
    },
    clearButton: {
      padding: scale(8),
      borderRadius: scale(theme.borderRadius.full),
      marginLeft: scale(8),
    },
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={currentPlaceholder}
        placeholderTextColor={theme.colors.textMuted}
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        onSubmitEditing={handleSearchPress}
        selectionColor={theme.colors.primary}
      />
      {searchText.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={scale(20)} color={theme.colors.textMuted} />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress} activeOpacity={0.7}>
        <Ionicons name="search" size={scale(20)} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  )
}

