// import React, { useState, useRef, useCallback } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Alert,
//   SafeAreaView,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useCart } from '../../Components/CartContext';
// import { useProducts } from '../../Components/ProductsContext';

// const { width } = Dimensions.get('window');

// const Create = ({ navigation }) => {
//   const { addToCart } = useCart();
//   const { addProduct } = useProducts();
  
//   // Form state with better structure
//   const initialFormData = {
//     name: '',
//     brand: '',
//     price: '',
//     originalPrice: '',
//     description: '',
//     category: '',
//     images: [],
//   };
  
//   const [formData, setFormData] = useState(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [errors, setErrors] = useState({});
//   const scrollViewRef = useRef(null);

//   // Categories for selection
//   const categories = [
//     { id: 'electronics', name: 'Electronics', icon: '📱' },
//     { id: 'fashion', name: 'Fashion', icon: '👕' },
//     { id: 'home', name: 'Home', icon: '🏡' },
//     { id: 'books', name: 'Books', icon: '📚' },
//     { id: 'sports', name: 'Sports', icon: '⚽' },
//     { id: 'beauty', name: 'Beauty', icon: '💄' },
//     { id: 'toys', name: 'Toys', icon: '🧸' },
//     { id: 'automotive', name: 'Automotive', icon: '🚗' },
//   ];

//   // Clear errors when user starts typing
//   const clearError = useCallback((field) => {
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: null }));
//     }
//   }, [errors]);

//   // Request permissions with better error handling
//   const requestPermissions = async () => {
//     try {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required', 
//           'We need access to your photo library to upload images. Please enable this in your device settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Settings', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() },
//           ]
//         );
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.error('Permission request error:', error);
//       Alert.alert('Error', 'Failed to request permissions. Please try again.');
//       return false;
//     }
//   };

//   // Pick image from gallery with better error handling
//   const pickImage = async () => {
//     try {
//       const hasPermission = await requestPermissions();
//       if (!hasPermission) return;

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//         allowsMultipleSelection: false,
//       });

//       if (!result.canceled && result.assets?.[0]?.uri) {
//         const newImages = [...formData.images, result.assets[0].uri];
//         setFormData(prev => ({ ...prev, images: newImages }));
//         setSelectedImageIndex(newImages.length - 1);
//         clearError('images');
//       }
//     } catch (error) {
//       console.error('Image picker error:', error);
//       Alert.alert('Error', 'Failed to pick image. Please try again.');
//     }
//   };

//   // Take photo with camera
//   const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required', 
//           'We need camera access to take photos. Please enable this in your device settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Settings', onPress: () => ImagePicker.requestCameraPermissionsAsync() },
//           ]
//         );
//         return;
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets?.[0]?.uri) {
//         const newImages = [...formData.images, result.assets[0].uri];
//         setFormData(prev => ({ ...prev, images: newImages }));
//         setSelectedImageIndex(newImages.length - 1);
//         clearError('images');
//       }
//     } catch (error) {
//       console.error('Camera error:', error);
//       Alert.alert('Error', 'Failed to take photo. Please try again.');
//     }
//   };

//   // Remove image with confirmation
//   const removeImage = useCallback((index) => {
//     Alert.alert(
//       'Remove Image',
//       'Are you sure you want to remove this image?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => {
//             const newImages = formData.images.filter((_, i) => i !== index);
//             setFormData(prev => ({ ...prev, images: newImages }));
            
//             // Adjust selected index if necessary
//             if (selectedImageIndex >= newImages.length) {
//               setSelectedImageIndex(Math.max(0, newImages.length - 1));
//             } else if (selectedImageIndex > index) {
//               setSelectedImageIndex(selectedImageIndex - 1);
//             }
//           },
//         },
//       ]
//     );
//   }, [formData.images, selectedImageIndex]);

//   // Show image options
//   const showImageOptions = useCallback(() => {
//     if (formData.images.length >= 5) {
//       Alert.alert('Limit Reached', 'You can only add up to 5 images per product.');
//       return;
//     }

//     Alert.alert(
//       'Add Image',
//       'Choose an option',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Camera', onPress: takePhoto },
//         { text: 'Gallery', onPress: pickImage },
//       ]
//     );
//   }, [formData.images.length]);

//   // Enhanced form validation
//   const validateForm = () => {
//     const newErrors = {};
//     const { name, brand, price, description, category, images } = formData;
    
//     // Required field validations
//     if (!name.trim()) {
//       newErrors.name = 'Product name is required';
//     } else if (name.trim().length < 3) {
//       newErrors.name = 'Product name must be at least 3 characters';
//     }

//     if (!brand.trim()) {
//       newErrors.brand = 'Brand name is required';
//     }

//     if (!price.trim()) {
//       newErrors.price = 'Price is required';
//     } else {
//       const priceNum = parseFloat(price);
//       if (isNaN(priceNum) || priceNum <= 0) {
//         newErrors.price = 'Please enter a valid price greater than 0';
//       } else if (priceNum > 999999) {
//         newErrors.price = 'Price cannot exceed $999,999';
//       }
//     }

//     // Original price validation (optional but if provided should be valid)
//     if (formData.originalPrice.trim()) {
//       const originalPriceNum = parseFloat(formData.originalPrice);
//       if (isNaN(originalPriceNum) || originalPriceNum <= 0) {
//         newErrors.originalPrice = 'Please enter a valid original price';
//       } else if (originalPriceNum <= parseFloat(price)) {
//         newErrors.originalPrice = 'Original price should be higher than current price';
//       }
//     }

//     if (!description.trim()) {
//       newErrors.description = 'Product description is required';
//     } else if (description.trim().length < 10) {
//       newErrors.description = 'Description must be at least 10 characters';
//     }

//     if (!category) {
//       newErrors.category = 'Please select a category';
//     }

//     if (images.length === 0) {
//       newErrors.images = 'Please add at least one image';
//     }

//     setErrors(newErrors);
    
//     if (Object.keys(newErrors).length > 0) {
//       // Scroll to first error
//       scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//       return false;
//     }
    
//     return true;
//   };

//   // Generate unique ID with better randomness
//   const generateId = () => {
//     return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//   };

//   // Enhanced submit handler
//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       // Simulate API call with better error simulation
//       await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           // Simulate 5% chance of failure for testing
//           if (Math.random() < 0.05) {
//             reject(new Error('Network error'));
//           } else {
//             resolve();
//           }
//         }, 2000);
//       });

//       // Create product object with better structure
//       const newProduct = {
//         id: generateId(),
//         name: formData.name.trim(),
//         brand: formData.brand.trim(),
//         price: parseFloat(formData.price),
//         originalPrice: formData.originalPrice ? 
//           parseFloat(formData.originalPrice) : 
//           parseFloat(formData.price),
//         description: formData.description.trim(),
//         category: formData.category,
//         image: formData.images[0], // Main image
//         images: formData.images,
//         rating: 0,
//         reviews: 0,
//         badge: 'New',
//         badgeColor: '#34C759',
//         inStock: true,
//         createdAt: new Date().toISOString(),
//         seller: 'You',
//         isUserProduct: true, // Flag to identify user-created products
//       };

//       // Add to products context if available
//       if (addProduct) {
//         addProduct(newProduct);
//       }

//       Alert.alert(
//         'Success!',
//         'Your product has been created successfully!',
//         [
//           { 
//             text: 'View Products', 
//             onPress: () => navigation?.navigate('Home') 
//           },
//           { 
//             text: 'Add to Cart', 
//             onPress: () => {
//               addToCart(newProduct);
//               Alert.alert('Added!', 'Product added to cart successfully');
//             }
//           },
//           { text: 'Create Another', onPress: resetForm },
//         ]
//       );

//     } catch (error) {
//       console.error('Submit error:', error);
//       Alert.alert(
//         'Error', 
//         'Failed to create product. Please check your connection and try again.',
//         [{ text: 'OK' }]
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enhanced reset form
//   const resetForm = useCallback(() => {
//     Alert.alert(
//       'Reset Form',
//       'Are you sure you want to clear all fields?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reset',
//           style: 'destructive',
//           onPress: () => {
//             setFormData(initialFormData);
//             setSelectedImageIndex(0);
//             setErrors({});
//             scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//           },
//         },
//       ]
//     );
//   }, []);

//   // Handle input change with validation clearing
//   const handleInputChange = useCallback((field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     clearError(field);
//   }, [clearError]);

//   // Format price input
//   const formatPriceInput = (value, field) => {
//     // Remove non-numeric characters except decimal point
//     const cleanValue = value.replace(/[^0-9.]/g, '');
    
//     // Ensure only one decimal point
//     const parts = cleanValue.split('.');
//     const formattedValue = parts.length > 2 
//       ? `${parts[0]}.${parts.slice(1).join('')}` 
//       : cleanValue;
    
//     handleInputChange(field, formattedValue);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         <ScrollView 
//           ref={scrollViewRef}
//           showsVerticalScrollIndicator={false}
//           style={styles.scrollView}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Create Product</Text>
//             <Text style={styles.headerSubtitle}>
//               Share your amazing products with the community
//             </Text>
//           </View>

//           {/* Image Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>
//               Product Images {formData.images.length > 0 && `(${formData.images.length}/5)`}
//             </Text>
            
//             {formData.images.length > 0 ? (
//               <View style={styles.imageContainer}>
//                 <Image 
//                   source={{ uri: formData.images[selectedImageIndex] }} 
//                   style={styles.mainImage}
//                   resizeMode="cover"
//                 />
//                 <TouchableOpacity 
//                   style={styles.removeImageButton}
//                   onPress={() => removeImage(selectedImageIndex)}
//                   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                 >
//                   <Text style={styles.removeImageText}>✕</Text>
//                 </TouchableOpacity>
                
//                 {/* Image thumbnails */}
//                 {formData.images.length > 1 && (
//                   <ScrollView 
//                     horizontal 
//                     showsHorizontalScrollIndicator={false}
//                     style={styles.thumbnailContainer}
//                   >
//                     {formData.images.map((image, index) => (
//                       <TouchableOpacity
//                         key={index}
//                         onPress={() => setSelectedImageIndex(index)}
//                         style={[
//                           styles.thumbnail,
//                           selectedImageIndex === index && styles.selectedThumbnail
//                         ]}
//                       >
//                         <Image 
//                           source={{ uri: image }} 
//                           style={styles.thumbnailImage}
//                           resizeMode="cover"
//                         />
//                       </TouchableOpacity>
//                     ))}
//                   </ScrollView>
//                 )}
//               </View>
//             ) : (
//               <View style={styles.imagePlaceholder}>
//                 <Text style={styles.imagePlaceholderIcon}>📷</Text>
//                 <Text style={styles.imagePlaceholderText}>No images added</Text>
//                 <Text style={styles.imagePlaceholderSubtext}>
//                   Add up to 5 images to showcase your product
//                 </Text>
//               </View>
//             )}
            
//             <TouchableOpacity 
//               style={[
//                 styles.addImageButton,
//                 formData.images.length >= 5 && styles.addImageButtonDisabled
//               ]} 
//               onPress={showImageOptions}
//               disabled={formData.images.length >= 5}
//             >
//               <Text style={[
//                 styles.addImageText,
//                 formData.images.length >= 5 && styles.addImageTextDisabled
//               ]}>
//                 {formData.images.length >= 5 ? 'Maximum images reached' : '+ Add Image'}
//               </Text>
//             </TouchableOpacity>
            
//             {errors.images && (
//               <Text style={styles.errorText}>{errors.images}</Text>
//             )}
//           </View>

//           {/* Product Details */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Product Details</Text>
            
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Product Name *</Text>
//               <TextInput
//                 style={[
//                   styles.textInput,
//                   errors.name && styles.textInputError
//                 ]}
//                 placeholder="Enter product name"
//                 value={formData.name}
//                 onChangeText={(value) => handleInputChange('name', value)}
//                 maxLength={100}
//                 autoCapitalize="words"
//                 returnKeyType="next"
//               />
//               {errors.name && (
//                 <Text style={styles.errorText}>{errors.name}</Text>
//               )}
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Brand *</Text>
//               <TextInput
//                 style={[
//                   styles.textInput,
//                   errors.brand && styles.textInputError
//                 ]}
//                 placeholder="Enter brand name"
//                 value={formData.brand}
//                 onChangeText={(value) => handleInputChange('brand', value)}
//                 maxLength={50}
//                 autoCapitalize="words"
//                 returnKeyType="next"
//               />
//               {errors.brand && (
//                 <Text style={styles.errorText}>{errors.brand}</Text>
//               )}
//             </View>

//             <View style={styles.priceRow}>
//               <View style={[styles.inputGroup, styles.priceInput]}>
//                 <Text style={styles.inputLabel}>Price ($) *</Text>
//                 <TextInput
//                   style={[
//                     styles.textInput,
//                     errors.price && styles.textInputError
//                   ]}
//                   placeholder="0.00"
//                   value={formData.price}
//                   onChangeText={(value) => formatPriceInput(value, 'price')}
//                   keyboardType="decimal-pad"
//                   maxLength={10}
//                   returnKeyType="next"
//                 />
//                 {errors.price && (
//                   <Text style={styles.errorText}>{errors.price}</Text>
//                 )}
//               </View>
              
//               <View style={[styles.inputGroup, styles.priceInput]}>
//                 <Text style={styles.inputLabel}>Original Price ($)</Text>
//                 <TextInput
//                   style={[
//                     styles.textInput,
//                     errors.originalPrice && styles.textInputError
//                   ]}
//                   placeholder="0.00"
//                   value={formData.originalPrice}
//                   onChangeText={(value) => formatPriceInput(value, 'originalPrice')}
//                   keyboardType="decimal-pad"
//                   maxLength={10}
//                   returnKeyType="next"
//                 />
//                 {errors.originalPrice && (
//                   <Text style={styles.errorText}>{errors.originalPrice}</Text>
//                 )}
//               </View>
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Description *</Text>
//               <TextInput
//                 style={[
//                   styles.textInput, 
//                   styles.textArea,
//                   errors.description && styles.textInputError
//                 ]}
//                 placeholder="Describe your product in detail..."
//                 value={formData.description}
//                 onChangeText={(value) => handleInputChange('description', value)}
//                 multiline
//                 numberOfLines={4}
//                 textAlignVertical="top"
//                 maxLength={500}
//                 returnKeyType="done"
//               />
//               <View style={styles.characterRow}>
//                 <Text style={styles.characterCount}>
//                   {formData.description.length}/500
//                 </Text>
//               </View>
//               {errors.description && (
//                 <Text style={styles.errorText}>{errors.description}</Text>
//               )}
//             </View>
//           </View>

//           {/* Category Selection */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Category *</Text>
//             <View style={styles.categoryGrid}>
//               {categories.map((category) => (
//                 <TouchableOpacity
//                   key={category.id}
//                   style={[
//                     styles.categoryCard,
//                     formData.category === category.id && styles.selectedCategory,
//                     errors.category && !formData.category && styles.categoryCardError
//                   ]}
//                   onPress={() => handleInputChange('category', category.id)}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.categoryIcon}>{category.icon}</Text>
//                   <Text style={[
//                     styles.categoryName,
//                     formData.category === category.id && styles.selectedCategoryText
//                   ]}>
//                     {category.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             {errors.category && (
//               <Text style={styles.errorText}>{errors.category}</Text>
//             )}
//           </View>

//           {/* Action Buttons */}
//           <View style={styles.actionButtons}>
//             <TouchableOpacity 
//               style={[styles.resetButton, loading && styles.buttonDisabled]} 
//               onPress={resetForm}
//               disabled={loading}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.resetButtonText}>Reset</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[
//                 styles.submitButton, 
//                 loading && styles.submitButtonDisabled
//               ]} 
//               onPress={handleSubmit}
//               disabled={loading}
//               activeOpacity={0.7}
//             >
//               {loading ? (
//                 <View style={styles.loadingContainer}>
//                   <ActivityIndicator color="#FFFFFF" size="small" />
//                   <Text style={styles.loadingText}>Creating...</Text>
//                 </View>
//               ) : (
//                 <Text style={styles.submitButtonText}>Create Product</Text>
//               )}
//             </TouchableOpacity>
//           </View>

//           <View style={styles.bottomPadding} />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingVertical: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: '#666666',
//     lineHeight: 20,
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     marginTop: 12,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 16,
//   },
//   imageContainer: {
//     marginBottom: 16,
//   },
//   mainImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     backgroundColor: '#F0F0F0',
//   },
//   removeImageButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   removeImageText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   thumbnailContainer: {
//     marginTop: 12,
//   },
//   thumbnail: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 8,
//     borderWidth: 2,
//     borderColor: '#E5E5E5',
//     overflow: 'hidden',
//   },
//   selectedThumbnail: {
//     borderColor: '#007AFF',
//     borderWidth: 3,
//   },
//   thumbnailImage: {
//     width: '100%',
//     height: '100%',
//   },
//   imagePlaceholder: {
//     height: 200,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#E5E5E5',
//     borderStyle: 'dashed',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//     paddingHorizontal: 20,
//   },
//   imagePlaceholderIcon: {
//     fontSize: 48,
//     marginBottom: 8,
//   },
//   imagePlaceholderText: {
//     fontSize: 16,
//     color: '#666666',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   imagePlaceholderSubtext: {
//     fontSize: 12,
//     color: '#999999',
//     textAlign: 'center',
//   },
//   addImageButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   addImageButtonDisabled: {
//     backgroundColor: '#E5E5E5',
//   },
//   addImageText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   addImageTextDisabled: {
//     color: '#999999',
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#1A1A1A',
//     backgroundColor: '#FFFFFF',
//   },
//   textInputError: {
//     borderColor: '#FF3B30',
//     borderWidth: 1.5,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   characterRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 4,
//   },
//   characterCount: {
//     fontSize: 12,
//     color: '#666666',
//   },
//   errorText: {
//     fontSize: 12,
//     color: '#FF3B30',
//     marginTop: 4,
//     fontWeight: '500',
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: -6,
//   },
//   priceInput: {
//     flex: 1,
//     marginHorizontal: 6,
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   categoryCard: {
//     width: (width - 60) / 3,
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   categoryCardError: {
//     borderColor: '#FF3B30',
//   },
//   selectedCategory: {
//     backgroundColor: '#007AFF',
//     borderColor: '#007AFF',
//   },
//   categoryIcon: {
//     fontSize: 24,
//     marginBottom: 8,
//   },
//   categoryName: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#666666',
//     textAlign: 'center',
//   },
//   selectedCategoryText: {
//     color: '#FFFFFF',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     gap: 12,
//   },
//   resetButton: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   resetButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666666',
//   },
//   submitButton: {
//     flex: 2,
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#B0B0B0',
//   },
//   submitButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     marginLeft: 8,
//   },
//   bottomPadding: {
//     height: 40,
//   },
// });

// export default Create;