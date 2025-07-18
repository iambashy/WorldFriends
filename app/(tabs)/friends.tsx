"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FlashList } from "@shopify/flash-list"
import LottieView from "lottie-react-native"
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useTheme } from '@/contexts/ThemeContext';
import { TabHeader } from '@/components/TabHeader';
import { SegmentedControl } from '@/components/friends/SegmentedControl';
import { FriendCard } from '@/components/friends/FriendCard';
import { FriendCardSkeleton } from '@/components/friends/FriendCardSkeleton';
import { RequestCard } from '@/components/friends/RequestCard';
import { RequestCardSkeleton } from '@/components/friends/RequestCardSkeleton';
import { RequestSheet } from '@/components/friends/RequestSheet';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { type FriendData, DUMMY_FRIENDS } from '@/data/friends';
import { type RequestData, DUMMY_REQUESTS } from '@/data/requests';

const INITIAL_LOAD_COUNT = 10
const LOAD_MORE_COUNT = 10

export default function FriendsScreen() {
  const { theme } = useTheme();
  const [selectedSegment, setSelectedSegment] = useState('friends')
  const [friends, setFriends] = useState<FriendData[]>([])
  const [requests, setRequests] = useState<RequestData[]>([])
  const [loadingFriends, setLoadingFriends] = useState(true)
  const [loadingRequests, setLoadingRequests] = useState(true)
  const [loadingMoreFriends, setLoadingMoreFriends] = useState(false)
  const [loadingMoreRequests, setLoadingMoreRequests] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [friendToRemove, setFriendToRemove] = useState<string | null>(null)
  const [allFriendsLoaded, setAllFriendsLoaded] = useState(false)
  const [allRequestsLoaded, setAllRequestsLoaded] = useState(false)

  const requestSheetRef = useRef<BottomSheetModal>(null)

  // Simulate initial data loading for friends
  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(DUMMY_FRIENDS.slice(0, INITIAL_LOAD_COUNT))
      setLoadingFriends(false)
      if (DUMMY_FRIENDS.length <= INITIAL_LOAD_COUNT) {
        setAllFriendsLoaded(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate initial data loading for requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(DUMMY_REQUESTS.slice(0, INITIAL_LOAD_COUNT))
      setLoadingRequests(false)
      if (DUMMY_REQUESTS.length <= INITIAL_LOAD_COUNT) {
        setAllRequestsLoaded(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSegmentChange = useCallback((segment: string) => {
    setSelectedSegment(segment)
  }, [])

  const handleMessage = useCallback((friendId: string) => {
    console.log('Message friend:', friendId)
    // Navigate to chat screen
  }, [])

  const handleRemoveFriend = useCallback((friendId: string) => {
    setFriendToRemove(friendId)
    setShowRemoveModal(true)
  }, [])

  const confirmRemoveFriend = useCallback(() => {
    if (friendToRemove) {
      setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendToRemove))
      setFriendToRemove(null)
    }
    setShowRemoveModal(false)
  }, [friendToRemove])

  const handleRequestPress = useCallback((requestId: string) => {
    const request = requests.find(req => req.id === requestId)
    if (request) {
      setSelectedRequest(request)
      requestSheetRef.current?.present()
    }
  }, [requests])

  const handleAcceptRequest = useCallback((requestId: string) => {
    console.log('Accept request:', requestId)
    setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId))
    // In real app, add to friends list
  }, [])

  const handleDeclineRequest = useCallback((requestId: string) => {
    console.log('Decline request:', requestId)
    setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId))
  }, [])

  const handleLoadMoreFriends = useCallback(() => {
    if (loadingMoreFriends || allFriendsLoaded) return

    setLoadingMoreFriends(true)
    setTimeout(() => {
      const currentLength = friends.length
      const nextFriends = DUMMY_FRIENDS.slice(currentLength, currentLength + LOAD_MORE_COUNT)
      setFriends(prevFriends => [...prevFriends, ...nextFriends])
      setLoadingMoreFriends(false)

      if (currentLength + nextFriends.length >= DUMMY_FRIENDS.length) {
        setAllFriendsLoaded(true)
      }
    }, 1500)
  }, [loadingMoreFriends, allFriendsLoaded, friends.length])

  const handleLoadMoreRequests = useCallback(() => {
    if (loadingMoreRequests || allRequestsLoaded) return

    setLoadingMoreRequests(true)
    setTimeout(() => {
      const currentLength = requests.length
      const nextRequests = DUMMY_REQUESTS.slice(currentLength, currentLength + LOAD_MORE_COUNT)
      setRequests(prevRequests => [...prevRequests, ...nextRequests])
      setLoadingMoreRequests(false)

      if (currentLength + nextRequests.length >= DUMMY_REQUESTS.length) {
        setAllRequestsLoaded(true)
      }
    }, 1500)
  }, [loadingMoreRequests, allRequestsLoaded, requests.length])

  const renderFriendCard = useCallback(
    ({ item }: { item: FriendData }) => (
      <FriendCard friend={item} onMessage={handleMessage} onRemove={handleRemoveFriend} />
    ),
    [handleMessage, handleRemoveFriend]
  )

  const renderRequestCard = useCallback(
    ({ item }: { item: RequestData }) => <RequestCard request={item} onPress={handleRequestPress} />,
    [handleRequestPress]
  )

  const renderFriendSkeleton = useCallback(() => <FriendCardSkeleton />, [])
  const renderRequestSkeleton = useCallback(() => <RequestCardSkeleton />, [])

  const renderFriendsFooter = useCallback(() => {
    if (!loadingMoreFriends) return null
    return (
      <View style={styles.footerLoader}>
        <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={styles.footerSpinner} />
      </View>
    )
  }, [loadingMoreFriends])

  const renderRequestsFooter = useCallback(() => {
    if (!loadingMoreRequests) return null
    return (
      <View style={styles.footerLoader}>
        <LottieView source={require("@/assets/animations/spinner.json")} autoPlay loop style={styles.footerSpinner} />
      </View>
    )
  }, [loadingMoreRequests])

  const renderFriendsEmptyState = useCallback(() => {
    if (loadingFriends) return null

    return (
      <View style={styles.emptyContainer}>
        <LottieView source={require("@/assets/animations/feed.json")} autoPlay loop style={styles.emptyAnimation} />
        <Text style={styles.emptyText}>No friends yet</Text>
      </View>
    )
  }, [loadingFriends])

  const renderRequestsEmptyState = useCallback(() => {
    if (loadingRequests) return null

    return (
      <View style={styles.emptyContainer}>
        <LottieView source={require("@/assets/animations/feed.json")} autoPlay loop style={styles.emptyAnimation} />
        <Text style={styles.emptyText}>No friend requests</Text>
      </View>
    )
  }, [loadingRequests])

  const segments = [
    { key: 'friends', title: 'Friends', count: friends.length },
    { key: 'requests', title: 'Requests', count: requests.length },
  ]

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
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  const handleNotificationPress = () => {
    console.log('Notification pressed')
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Friends"
        onNotificationPress={handleNotificationPress}
        hasNotification={requests.length > 0}
      />
      
      <SegmentedControl
        segments={segments}
        selectedSegment={selectedSegment}
        onSegmentChange={handleSegmentChange}
      />

      <View style={styles.listContainer}>
        {selectedSegment === 'friends' ? (
          <FlashList
            data={loadingFriends ? Array(INITIAL_LOAD_COUNT).fill(null) : friends}
            renderItem={loadingFriends ? renderFriendSkeleton : renderFriendCard}
            keyExtractor={(item, index) => (loadingFriends ? `friend-skeleton-${index}` : item.id)}
            estimatedItemSize={350}
            onEndReached={handleLoadMoreFriends}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFriendsFooter}
            ListEmptyComponent={renderFriendsEmptyState}
            contentContainerStyle={{
              paddingBottom: verticalScale(100), // Account for custom tab bar
            }}
          />
        ) : (
          <FlashList
            data={loadingRequests ? Array(INITIAL_LOAD_COUNT).fill(null) : requests}
            renderItem={loadingRequests ? renderRequestSkeleton : renderRequestCard}
            keyExtractor={(item, index) => (loadingRequests ? `request-skeleton-${index}` : item.id)}
            estimatedItemSize={150}
            onEndReached={handleLoadMoreRequests}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderRequestsFooter}
            ListEmptyComponent={renderRequestsEmptyState}
            contentContainerStyle={{
              paddingBottom: verticalScale(100), // Account for custom tab bar
            }}
          />
        )}
      </View>

      <RequestSheet
        ref={requestSheetRef}
        request={selectedRequest}
        onAccept={handleAcceptRequest}
        onDecline={handleDeclineRequest}
      />

      <ConfirmationModal
        visible={showRemoveModal}
        icon="person-remove-outline"
        title="Remove Friend"
        description="Are you sure you want to remove this friend? This action cannot be undone."
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={confirmRemoveFriend}
        onCancel={() => setShowRemoveModal(false)}
      />
    </SafeAreaView>
  )
}
