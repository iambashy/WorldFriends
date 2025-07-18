import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useTheme } from '@/contexts/ThemeContext';

interface AddImageSectionProps {
  images: string[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export const AddImageSection: React.FC<AddImageSectionProps> = ({
  images,
  onAddImage,
  onRemoveImage,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: scale(theme.borderRadius.lg),
      padding: scale(16),
      marginTop: verticalScale(16),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(12),
    },
    headerIcon: {
      marginRight: scale(8),
    },
    headerText: {
      fontSize: RFPercentage(2.2),
      fontWeight: '600',
      color: theme.colors.text,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary + '15',
      borderRadius: scale(theme.borderRadius.md),
      paddingVertical: verticalScale(12),
      borderWidth: 2,
      borderColor: theme.colors.primary + '30',
      borderStyle: 'dashed',
    },
    addButtonText: {
      fontSize: RFPercentage(2),
      fontWeight: '500',
      color: theme.colors.primary,
      marginLeft: scale(8),
    },
    imagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: scale(8),
      marginBottom: verticalScale(12),
    },
    imageContainer: {
      position: 'relative',
      width: scale(80),
      height: scale(80),
      borderRadius: scale(theme.borderRadius.md),
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    removeButton: {
      position: 'absolute',
      top: scale(4),
      right: scale(4),
      width: scale(24),
      height: scale(24),
      borderRadius: scale(theme.borderRadius.full),
      backgroundColor: theme.colors.error,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageLimit: {
      fontSize: RFPercentage(1.8),
      color: theme.colors.textMuted,
      textAlign: 'center',
      marginTop: verticalScale(8),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="images"
          size={scale(20)}
          color={theme.colors.primary}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Add Photos</Text>
      </View>

      {images.length > 0 && (
        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveImage(index)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close"
                  size={scale(16)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {images.length < 3 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddImage}
          activeOpacity={0.7}
        >
          <Ionicons
            name="add"
            size={scale(20)}
            color={theme.colors.primary}
          />
          <Text style={styles.addButtonText}>
            {images.length === 0 ? 'Add Photos' : 'Add More'}
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.imageLimit}>
        You can add up to 3 photos
      </Text>
    </View>
  );
};