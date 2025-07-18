import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useTheme } from '@/contexts/ThemeContext';

const COMMUNITY_PROMPTS = [
  { text: 'Share some drawings with friends today', emoji: '🎨' },
  { text: 'Tell us about your favorite book', emoji: '📚' },
  { text: 'Show us your cooking adventures', emoji: '🍳' },
  { text: 'Share a photo from your walk today', emoji: '🚶‍♀️' },
  { text: 'What new language are you learning?', emoji: '🗣️' },
  { text: 'Share your favorite music discovery', emoji: '🎵' },
  { text: 'Tell us about your hometown', emoji: '🏠' },
  { text: 'Share a moment that made you smile', emoji: '😊' },
];

interface GreetingsProps {
  userName: string;
  onPromptPress: () => void;
}

export const Greetings: React.FC<GreetingsProps> = ({ userName, onPromptPress }) => {
  const { theme } = useTheme();

  const { greeting, timeEmoji } = useMemo(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return { greeting: 'Good morning', timeEmoji: '🌄' };
    } else if (hour >= 12 && hour < 17) {
      return { greeting: 'Good afternoon', timeEmoji: '☀️' };
    } else if (hour >= 17 && hour < 21) {
      return { greeting: 'Good evening', timeEmoji: '🌅' };
    } else {
      return { greeting: 'Good night', timeEmoji: '🌙' };
    }
  }, []);

  const randomPrompt = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * COMMUNITY_PROMPTS.length);
    return COMMUNITY_PROMPTS[randomIndex];
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: scale(16),
      marginVertical: verticalScale(12),
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(16),
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    greetingText: {
      fontSize: RFPercentage(2.8),
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: verticalScale(8),
    },
    promptContainer: {
      backgroundColor: theme.colors.primary + '15',
      borderRadius: scale(theme.borderRadius.md),
      padding: scale(12),
      borderLeftWidth: scale(3),
      borderLeftColor: theme.colors.primary,
    },
    promptText: {
      fontSize: RFPercentage(2.2),
      color: theme.colors.text,
      fontWeight: '500',
      lineHeight: RFPercentage(2.8),
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        {greeting}, {userName} {timeEmoji}
      </Text>
      <TouchableOpacity
        style={styles.promptContainer}
        onPress={onPromptPress}
        activeOpacity={0.8}
      >
        <Text style={styles.promptText}>
          {randomPrompt.text} {randomPrompt.emoji}
        </Text>
      </TouchableOpacity>
    </View>
  );
};