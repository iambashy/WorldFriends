"use client"

import { useState, useCallback, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { scale, verticalScale } from "react-native-size-matters"
import { RFPercentage } from "react-native-responsive-fontsize"
import { FlashList } from "@shopify/flash-list"
import LottieView from "lottie-react-native"
import { useTheme } from "@/contexts/ThemeContext"
import { TabHeader } from "@/components/TabHeader"
import { UserCard } from "@/components/discover/UserCard"
import { UserCardSkeleton } from "@/components/discover/UserCardSkeleton"
import { SearchBar } from "@/components/discover/SearchBar"
import { DUMMY_USERS, type UserCardData } from "@/data/user-cards"

const INITIAL_LOAD_COUNT = 10
const LOAD_MORE_COUNT = 5 // Changed to 5 for more frequent loading in dummy data

export default function DiscoverScreen() {
  const { theme } = useTheme()
  const [users, setUsers] = useState<UserCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<UserCardData[]>([])
  const [allUsersLoaded, setAllUsersLoaded] = useState(false)

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(DUMMY_USERS.slice(0, INITIAL_LOAD_COUNT))
      setFilteredUsers(DUMMY_USERS.slice(0, INITIAL_LOAD_COUNT))
      setLoading(false)
      if (DUMMY_USERS.length <= INITIAL_LOAD_COUNT) {
        setAllUsersLoaded(true)
      }
    }, 2000) // Simulate network delay

    return () => clearTimeout(timer)
  }, [])

  // Filter users based on search text
  useEffect(() => {
    if (searchText.length >= 3) {
      const lowercasedSearchText = searchText.toLowerCase()
      const newFilteredUsers = DUMMY_USERS.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercasedSearchText) ||
          user.username.toLowerCase().includes(lowercasedSearchText),
      )
      setFilteredUsers(newFilteredUsers)
      setAllUsersLoaded(true) // Assume all filtered users are loaded for simplicity
    } else {
      // If search text is less than 3 characters, reset to initially loaded users
      setFilteredUsers(users)
      setAllUsersLoaded(users.length === DUMMY_USERS.length)
    }
  }, [searchText, users])

  const handleNotificationPress = useCallback(() => {
    console.log("Notification pressed on Discover screen")
    // Example navigation: router.push('/notifications');
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchText(query)
  }, [])

  const handleViewProfile = useCallback((userId: string) => {
    console.log("View profile for user:", userId)
    // Example navigation: router.push(`/screens/user-profile/${userId}`);
  }, [])

  const handleLoadMore = useCallback(() => {
    if (loadingMore || allUsersLoaded || searchText.length >= 3) {
      // Don't load more if already loading, all users loaded, or in search mode
      return
    }

    setLoadingMore(true)
    setTimeout(() => {
      const currentLength = users.length
      const nextUsers = DUMMY_USERS.slice(currentLength, currentLength + LOAD_MORE_COUNT)
      setUsers((prevUsers) => [...prevUsers, ...nextUsers])
      setFilteredUsers((prevFilteredUsers) => [...prevFilteredUsers, ...nextUsers]) // Update filtered list too
      setLoadingMore(false)

      if (currentLength + nextUsers.length >= DUMMY_USERS.length) {
        setAllUsersLoaded(true)
      }
    }, 1500) // Simulate network delay
  }, [loadingMore, allUsersLoaded, users, searchText.length])

  const renderUserCard = useCallback(
    ({ item }: { item: UserCardData }) => <UserCard user={item} onViewProfile={handleViewProfile} />,
    [handleViewProfile],
  )

  const renderSkeleton = useCallback(() => <UserCardSkeleton />, [])

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null
    return (
      <View style={styles.footerLoader}>
        <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={styles.footerSpinner} />
      </View>
    )
  }, [loadingMore])

  const renderEmptyState = useCallback(() => {
    if (loading) return null // Don't show empty state if still loading initially

    return (
      <View style={styles.emptyContainer}>
        <LottieView source={require("@/assets/animations/feed.json")} autoPlay loop style={styles.emptyAnimation} />
        <Text style={styles.emptyText}>
          {searchText.length >= 3 ? "No users found for your search." : "No users available yet."}
        </Text>
      </View>
    )
  }, [loading, searchText])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContainer: {
      flex: 1,
    },
    footerLoader: {
      paddingVertical: verticalScale(20),
      alignItems: "center",
    },
    footerSpinner: {
      width: scale(30),
      height: scale(30),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: verticalScale(40),
      paddingHorizontal: scale(20),
    },
    emptyAnimation: {
      width: scale(200),
      height: scale(200),
      marginBottom: verticalScale(16),
    },
    emptyText: {
      fontSize: RFPercentage(2.5),
      color: theme.colors.textMuted,
      textAlign: "center",
      fontWeight: "600",
    },
  })

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <TabHeader title="Discover" onNotificationPress={handleNotificationPress} hasNotification={false} />
      <SearchBar onSearch={handleSearch} />
      <View style={styles.listContainer}>
        <FlashList
          data={loading ? Array(INITIAL_LOAD_COUNT).fill(null) : filteredUsers}
          renderItem={loading ? renderSkeleton : renderUserCard}
          keyExtractor={(item, index) => (loading ? `skeleton-${index}` : item.id)}
          estimatedItemSize={350} // Estimate based on UserCard height
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{
            paddingBottom: verticalScale(100), // Account for custom tab bar
          }}
        />
      </View>
    </SafeAreaView>
  )
}

