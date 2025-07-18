import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useTheme } from '@/contexts/ThemeContext';
import { TabHeader } from '@/components/TabHeader';

export default function ConversationsScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(20),
      paddingBottom: verticalScale(100), // Account for custom tab bar
    },
    text: {
      fontSize: RFPercentage(2.5),
      color: theme.colors.text,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  const handleNotificationPress = () => {
    // Handle notification press
    console.log('Notification pressed');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Conversations"
        onNotificationPress={handleNotificationPress}
        hasNotification={false}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Conversations Screen</Text>
      </View>
    </SafeAreaView>
  );
}