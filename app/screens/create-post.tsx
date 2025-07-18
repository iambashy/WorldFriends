import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useTheme } from '@/contexts/ThemeContext';
import { ScreenHeader } from '@/components/ScreenHeader';
import { AddImageSection } from '@/components/feed/AddImageSection';
import { ImagePickerSheet } from '@/components/common/ImagePickerSheet';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { router } from 'expo-router';

export default function CreatePostScreen() {
  const { theme } = useTheme();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const imagePickerRef = useRef<BottomSheetModal>(null);

  const characterCount = content.length;
  const canPost = characterCount >= 10;
  const hasChanges = content.trim().length > 0 || images.length > 0;

  const handleBack = useCallback(() => {
    if (hasChanges) {
      setShowDiscardModal(true);
    } else {
      router.back();
    }
  }, [hasChanges]);

  const handlePost = useCallback(() => {
    setShowPostModal(true);
  }, []);

  const confirmPost = useCallback(() => {
    // Here you would implement the actual post creation logic
    console.log('Creating post:', { content, images });
    setShowPostModal(false);
    router.back();
  }, [content, images]);

  const confirmDiscard = useCallback(() => {
    setShowDiscardModal(false);
    router.back();
  }, []);

  const handleAddImage = useCallback(() => {
    imagePickerRef.current?.present();
  }, []);

  const handleCameraPress = useCallback(() => {
    // Implement camera functionality
    console.log('Open camera');
    // For demo, add a placeholder image
    const demoImage = 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800';
    setImages(prev => [...prev, demoImage]);
  }, []);

  const handleGalleryPress = useCallback(() => {
    // Implement gallery functionality
    console.log('Open gallery');
    // For demo, add a placeholder image
    const demoImage = 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800';
    setImages(prev => [...prev, demoImage]);
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const getCounterColor = () => {
    if (characterCount >= 10) {
      return theme.colors.success;
    }
    return theme.colors.textMuted;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: scale(16),
      paddingTop: verticalScale(16),
    },
    textInputContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(16),
      minHeight: verticalScale(200),
      position: 'relative',
    },
    textInput: {
      fontSize: RFPercentage(2.2),
      color: theme.colors.text,
      lineHeight: RFPercentage(3),
      textAlignVertical: 'top',
      flex: 1,
    },
    characterCounter: {
      position: 'absolute',
      bottom: scale(12),
      right: scale(12),
      fontSize: RFPercentage(1.8),
      fontWeight: '500',
    },
    placeholder: {
      fontSize: RFPercentage(2.2),
      color: theme.colors.textMuted,
      position: 'absolute',
      top: scale(20),
      left: scale(16),
      pointerEvents: 'none',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScreenHeader
        title="Create Post"
        onBack={handleBack}
        rightComponent="button"
        onRightPress={handlePost}
        rightButtonEnabled={canPost}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.textInputContainer}>
          {content.length === 0 && (
            <Text style={styles.placeholder}>
              What's on your mind? Share your thoughts with friends...
            </Text>
          )}
          <TextInput
            style={styles.textInput}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={2000}
            placeholder=""
            placeholderTextColor={theme.colors.textMuted}
            selectionColor={theme.colors.primary}
          />
          <Text style={[styles.characterCounter, { color: getCounterColor() }]}>
            {characterCount}/2000
          </Text>
        </View>

        <AddImageSection
          images={images}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
        />
      </ScrollView>

      <ImagePickerSheet
        ref={imagePickerRef}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
      />

      <ConfirmationModal
        visible={showDiscardModal}
        icon="warning-outline"
        title="Discard Post"
        description="Are you sure you want to discard this post? Your changes will be lost."
        confirmLabel="Discard"
        cancelLabel="Keep Editing"
        onConfirm={confirmDiscard}
        onCancel={() => setShowDiscardModal(false)}
      />

      <ConfirmationModal
        visible={showPostModal}
        icon="checkmark-circle-outline"
        title="Create Post"
        description="Are you ready to share this post with your friends?"
        confirmLabel="Post"
        cancelLabel="Cancel"
        onConfirm={confirmPost}
        onCancel={() => setShowPostModal(false)}
      />
    </SafeAreaView>
  );
}