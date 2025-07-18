import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

interface ImagePickerSheetProps {
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export const ImagePickerSheet = forwardRef<BottomSheetModal, ImagePickerSheetProps>(
  ({ onCameraPress, onGalleryPress }, ref) => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: scale(20),
        paddingBottom: insets.bottom + verticalScale(20),
      },
      header: {
        alignItems: 'center',
        paddingVertical: verticalScale(16),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        marginBottom: verticalScale(16),
      },
      headerTitle: {
        fontSize: RFPercentage(2.4),
        fontWeight: '700',
        color: theme.colors.text,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(16),
        paddingHorizontal: scale(16),
        borderRadius: scale(theme.borderRadius.md),
        marginVertical: verticalScale(4),
        backgroundColor: theme.colors.background,
      },
      optionIcon: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(theme.borderRadius.full),
        backgroundColor: theme.colors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(16),
      },
      optionContent: {
        flex: 1,
      },
      optionTitle: {
        fontSize: RFPercentage(2.2),
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: verticalScale(2),
      },
      optionDescription: {
        fontSize: RFPercentage(1.9),
        color: theme.colors.textSecondary,
      },
    });

    const handleCameraPress = () => {
      onCameraPress();
      (ref as any)?.current?.dismiss();
    };

    const handleGalleryPress = () => {
      onGalleryPress();
      (ref as any)?.current?.dismiss();
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={[280]}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textMuted }}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Photo</Text>
          </View>

          <TouchableOpacity
            style={styles.option}
            onPress={handleCameraPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="camera"
                size={scale(20)}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Take Photo</Text>
              <Text style={styles.optionDescription}>
                Use your camera to take a new photo
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={handleGalleryPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="images"
                size={scale(20)}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Choose from Gallery</Text>
              <Text style={styles.optionDescription}>
                Select a photo from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

ImagePickerSheet.displayName = 'ImagePickerSheet';