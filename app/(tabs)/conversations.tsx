import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import LottieView from 'lottie-react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useTheme } from '@/contexts/ThemeContext';
import { TabHeader } from '@/components/TabHeader';
import { ConversationCard } from '@/components/conversations/ConversationCard';
import { ConversationCardSkeleton } from '@/components/conversations/ConversationCardSkeleton';
import { type ConversationData, DUMMY_CONVERSATIONS } from '@/data/conversations';

const INITIAL_LOAD_COUNT = 10;
const LOAD_MORE_COUNT = 10;

export default function ConversationsScreen() {
  const { theme } = useTheme();
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allConversationsLoaded, setAllConversationsLoaded] = useState(false);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setConversations(DUMMY_CONVERSATIONS.slice(0, INITIAL_LOAD_COUNT));
      setLoading(false);
      if (DUMMY_CONVERSATIONS.length <= INITIAL_LOAD_COUNT) {
        setAllConversationsLoaded(true);
      }
    }, 2000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const handleConversationPress = useCallback((conversationId: string) => {
    console.log('Open conversation:', conversationId);
    // Navigate to chat screen
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || allConversationsLoaded) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = conversations.length;
      const nextConversations = DUMMY_CONVERSATIONS.slice(
        currentLength,
        currentLength + LOAD_MORE_COUNT
      );
      setConversations(prevConversations => [...prevConversations, ...nextConversations]);
      setLoadingMore(false);

      if (currentLength + nextConversations.length >= DUMMY_CONVERSATIONS.length) {
        setAllConversationsLoaded(true);
      }
    }, 1500); // Simulate network delay
  }, [loadingMore, allConversationsLoaded, conversations.length]);

  const renderConversationCard = useCallback(
    ({ item }: { item: ConversationData }) => (
      <ConversationCard conversation={item} onPress={handleConversationPress} />
    ),
    [handleConversationPress]
  );

  const renderSkeleton = useCallback(() => <ConversationCardSkeleton />, []);

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <LottieView
          source={require('@/assets/animations/spinner.json')}
          autoPlay
          loop
          style={styles.footerSpinner}
        />
      </View>
    );
  }, [loadingMore]);

  const renderEmptyState = useCallback(() => {
    if (loading) return null; // Don't show empty state if still loading initially

    return (
      <View style={styles.emptyContainer}>
        <LottieView
          source={require('@/assets/animations/feed.json')}
          autoPlay
          loop
          style={styles.emptyAnimation}
        />
        <Text style={styles.emptyText}>No conversations yet</Text>
      </View>
    );
  }, [loading]);

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
      alignItems: 'center',
    },
    footerSpinner: {
      width: scale(30),
      height: scale(30),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    console.log('Notification pressed');
    // Handle notification press
  };

  // Calculate unread count for notification indicator
  const unreadCount = conversations.filter(conv => !conv.lastMessage.isRead).length;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Conversations"
        onNotificationPress={handleNotificationPress}
        hasNotification={unreadCount > 0}
      />
      <View style={styles.listContainer}>
        <FlashList
          data={loading ? Array(INITIAL_LOAD_COUNT).fill(null) : conversations}
          renderItem={loading ? renderSkeleton : renderConversationCard}
          keyExtractor={(item, index) => 
            loading ? `conversation-skeleton-${index}` : item.id
          }
          estimatedItemSize={80} // Estimate based on ConversationCard height
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
  );
}