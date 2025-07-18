import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { TabHeader } from '@/components/TabHeader';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();

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
      marginBottom: verticalScale(20),
    },
    themeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(12),
      borderRadius: scale(25),
    },
    themeButtonText: {
      color: theme.colors.white,
      fontSize: RFPercentage(2),
      fontWeight: '600',
      marginLeft: scale(8),
    },
  });

  const handleNotificationPress = () => {
    // Handle notification press
    console.log('Notification pressed');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TabHeader
        title="Profile"
        onNotificationPress={handleNotificationPress}
        hasNotification={false}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Profile Screen</Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={toggleTheme}
          activeOpacity={0.8}
        >
          <Ionicons
            name={theme.isDark ? 'sunny' : 'moon'}
            size={scale(20)}
            color={theme.colors.white}
          />
          <Text style={styles.themeButtonText}>
            Switch to {theme.isDark ? 'Light' : 'Dark'} Theme
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}