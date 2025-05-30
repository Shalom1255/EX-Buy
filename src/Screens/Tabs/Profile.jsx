// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Alert,
//   Switch,
//   StatusBar,
//   Modal,
//   TextInput,
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import * as MediaLibrary from 'expo-media-library';

// const { width: screenWidth } = Dimensions.get('window');

// const Profile = ({ navigation, route }) => {
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [darkModeEnabled, setDarkModeEnabled] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(1));
  
//   // Get user data from navigation params or stored data
//   const userDataFromSignIn = route?.params?.userData || null;
  
//   // Editable profile data - initialize with SignIn data if available
//   const getInitialProfileData = () => {
//     if (userDataFromSignIn) {
//       return {
//         name: userDataFromSignIn.name || extractNameFromEmail(userDataFromSignIn.email) || 'User',
//         email: userDataFromSignIn.email || '',
//         phone: userDataFromSignIn.phone || '+1 (555) 123-4567',
//         location: userDataFromSignIn.location || 'San Francisco, CA',
//         joinDate: `Member since ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
//         profileImage: userDataFromSignIn.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=150&h=150&fit=crop&crop=face',
//         stats: {
//           orders: 0, // New user starts with 0 orders
//           rating: 5.0, // Default rating
//           points: 100 // Welcome bonus points
//         }
//       };
//     } else {
//       // Fallback to default data
//       return {
//         name: 'Sarah Johnson',
//         email: 'sarah.johnson@email.com',
//         phone: '+1 (555) 123-4567',
//         location: 'San Francisco, CA',
//         joinDate: 'Member since March 2023',
//         profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=150&h=150&fit=crop&crop=face',
//         stats: {
//           orders: 24,
//           rating: 4.8,
//           points: 2100
//         }
//       };
//     }
//   };

//   const [profileData, setProfileData] = useState(getInitialProfileData());

//   // Temporary state for editing
//   const [editData, setEditData] = useState({});

//   // Helper function to extract name from email
//   const extractNameFromEmail = (email) => {
//     if (!email) return '';
//     const namePart = email.split('@')[0];
//     // Convert email username to proper name format
//     return namePart
//       .split(/[._-]/) // Split by common separators
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(' ');
//   };

//   // Load settings and merge with SignIn data on component mount
//   useEffect(() => {
//     loadSettings();
//     requestPermissions();
    
//     // If user data from SignIn is available, save it and update profile
//     if (userDataFromSignIn) {
//       const initialProfile = getInitialProfileData();
//       setProfileData(initialProfile);
//       saveSettings('profileData', initialProfile);
//       saveSettings('currentUser', userDataFromSignIn);
//     }
//   }, [userDataFromSignIn]);

//   // Request camera and media library permissions
//   const requestPermissions = async () => {
//     try {
//       // Request camera permissions
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//       if (cameraStatus.status !== 'granted') {
//         console.log('Camera permission not granted');
//       }

//       // Request media library permissions
//       const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (mediaLibraryStatus.status !== 'granted') {
//         console.log('Media library permission not granted');
//       }
//     } catch (error) {
//       console.log('Error requesting permissions:', error);
//     }
//   };

//   // Save/load settings from AsyncStorage
//   const loadSettings = async () => {
//     try {
//       const notifications = await AsyncStorage.getItem('notifications');
//       const darkMode = await AsyncStorage.getItem('darkMode');
//       const savedProfile = await AsyncStorage.getItem('profileData');
//       const currentUser = await AsyncStorage.getItem('currentUser');
      
//       if (notifications !== null) setNotificationsEnabled(JSON.parse(notifications));
//       if (darkMode !== null) setDarkModeEnabled(JSON.parse(darkMode));
      
//       // Only load saved profile if no new SignIn data is available
//       if (savedProfile !== null && !userDataFromSignIn) {
//         const parsedProfile = JSON.parse(savedProfile);
//         setProfileData(parsedProfile);
//       }
      
//       // Store current user data for reference
//       if (currentUser !== null && !userDataFromSignIn) {
//         console.log('Loaded existing user:', JSON.parse(currentUser));
//       }
//     } catch (error) {
//       console.log('Error loading settings:', error);
//     }
//   };

//   const saveSettings = async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.log('Error saving settings:', error);
//     }
//   };

//   // Handle toggle switches with animation
//   const handleNotificationToggle = (value) => {
//     Animated.sequence([
//       Animated.timing(fadeAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
//       Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true })
//     ]).start();
    
//     setNotificationsEnabled(value);
//     saveSettings('notifications', value);
    
//     // Show feedback
//     Alert.alert(
//       'Notifications',
//       value ? 'Notifications enabled' : 'Notifications disabled',
//       [{ text: 'OK' }]
//     );
//   };

//   const handleDarkModeToggle = (value) => {
//     setDarkModeEnabled(value);
//     saveSettings('darkMode', value);
    
//     Alert.alert(
//       'Dark Mode',
//       value ? 'Dark mode enabled (restart app to apply)' : 'Dark mode disabled',
//       [{ text: 'OK' }]
//     );
//   };

//   // Navigation handlers for different menu items
//   const navigationHandlers = {
//     'Edit Profile': () => {
//       setEditData({
//         name: profileData.name,
//         email: profileData.email,
//         phone: profileData.phone,
//         location: profileData.location
//       });
//       setIsEditModalVisible(true);
//     },
//     'Privacy Settings': () => {
//       Alert.alert(
//         'Privacy Settings',
//         'Choose your privacy options',
//         [
//           { text: 'Profile Visibility', onPress: () => showPrivacyOption('Profile Visibility') },
//           { text: 'Data Sharing', onPress: () => showPrivacyOption('Data Sharing') },
//           { text: 'Location Access', onPress: () => showPrivacyOption('Location Access') },
//           { text: 'Cancel', style: 'cancel' }
//         ]
//       );
//     },
//     'Payment Methods': () => {
//       Alert.alert(
//         'Payment Methods',
//         'Manage your payment options',
//         [
//           { text: 'Add Card', onPress: () => showPaymentOption('Add Card') },
//           { text: 'View Saved Cards', onPress: () => showPaymentOption('View Cards') },
//           { text: 'Payment History', onPress: () => showPaymentOption('Payment History') },
//           { text: 'Cancel', style: 'cancel' }
//         ]
//       );
//     },
//     'Order History': () => {
//       showOrderHistory();
//     },
//     'Help & Support': () => {
//       Alert.alert(
//         'Help & Support',
//         'How can we help you?',
//         [
//           { text: 'FAQ', onPress: () => showHelpOption('FAQ') },
//           { text: 'Contact Support', onPress: () => showHelpOption('Contact') },
//           { text: 'Report Issue', onPress: () => showHelpOption('Report') },
//           { text: 'Cancel', style: 'cancel' }
//         ]
//       );
//     },
//     'About': () => {
//       Alert.alert(
//         'About',
//         'App Version: 2.1.0\nBuild: 2024.01.15\n\nDeveloped with ❤️ by Your Team',
//         [{ text: 'OK' }]
//       );
//     }
//   };

//   const handleMenuPress = (item) => {
//     const handler = navigationHandlers[item];
//     if (handler) {
//       handler();
//     } else {
//       // Fallback for navigation
//       if (navigation) {
//         navigation.navigate(item);
//       } else {
//         Alert.alert('Navigation', `Navigate to ${item}`);
//       }
//     }
//   };

//   // Helper functions for different menu options
//   const showPrivacyOption = (option) => {
//     Alert.alert('Privacy', `Configure ${option} settings`);
//   };

//   const showPaymentOption = (option) => {
//     Alert.alert('Payment', `${option} functionality`);
//   };

//   const showHelpOption = (option) => {
//     switch(option) {
//       case 'FAQ':
//         Alert.alert('FAQ', 'Frequently Asked Questions will be displayed here');
//         break;
//       case 'Contact':
//         Alert.alert('Contact Support', 'Email: support@yourapp.com\nPhone: +1 (800) 123-4567');
//         break;
//       case 'Report':
//         Alert.alert('Report Issue', 'Issue reporting form will be displayed here');
//         break;
//     }
//   };

//   const showOrderHistory = () => {
//     Alert.alert(
//       'Order History',
//       `Recent Orders:\n\n• Order #1234 - $45.99 (Delivered)\n• Order #1235 - $32.50 (In Transit)\n• Order #1236 - $78.25 (Processing)\n\nTotal Orders: ${profileData.stats.orders}`,
//       [{ text: 'View All Orders', onPress: () => console.log('Navigate to full order history') }, { text: 'OK' }]
//     );
//   };

//   // Profile image change handler
//   const handleImagePress = () => {
//     Alert.alert(
//       'Change Profile Picture',
//       'Choose an option',
//       [
//         { text: 'Camera', onPress: () => pickImageFromCamera() },
//         { text: 'Photo Library', onPress: () => pickImageFromGallery() },
//         { text: 'Remove Photo', onPress: () => removeProfileImage(), style: 'destructive' },
//         { text: 'Cancel', style: 'cancel' }
//       ]
//     );
//   };

//   const pickImageFromCamera = async () => {
//     try {
//       // Check camera permissions
//       const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
//       if (!cameraPermission.granted) {
//         const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//         if (!permissionResult.granted) {
//           Alert.alert(
//             'Permission Required',
//             'Camera access is required to take photos. Please enable it in your device settings.',
//             [{ text: 'OK' }]
//           );
//           return;
//         }
//       }

//       setIsLoading(true);

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets && result.assets[0]) {
//         const imageUri = result.assets[0].uri;
//         await updateProfileImage(imageUri);
//         Alert.alert('Success', 'Profile picture updated from camera!');
//       }
//     } catch (error) {
//       console.log('Error picking image from camera:', error);
//       Alert.alert('Error', 'Failed to take photo. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       // Check media library permissions
//       const mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
//       if (!mediaPermission.granted) {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (!permissionResult.granted) {
//           Alert.alert(
//             'Permission Required',
//             'Photo library access is required to select photos. Please enable it in your device settings.',
//             [{ text: 'OK' }]
//           );
//           return;
//         }
//       }

//       setIsLoading(true);

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets && result.assets[0]) {
//         const imageUri = result.assets[0].uri;
//         await updateProfileImage(imageUri);
//         Alert.alert('Success', 'Profile picture updated from gallery!');
//       }
//     } catch (error) {
//       console.log('Error picking image from gallery:', error);
//       Alert.alert('Error', 'Failed to select photo. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeProfileImage = async () => {
//     try {
//       setIsLoading(true);
      
//       // Set to default placeholder image
//       const defaultImageUrl = 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=No+Image';
//       await updateProfileImage(defaultImageUrl);
      
//       Alert.alert('Success', 'Profile picture removed!');
//     } catch (error) {
//       console.log('Error removing profile image:', error);
//       Alert.alert('Error', 'Failed to remove profile picture. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateProfileImage = async (imageUri) => {
//     try {
//       const updatedProfile = { ...profileData, profileImage: imageUri };
//       setProfileData(updatedProfile);
//       await saveSettings('profileData', updatedProfile);
//     } catch (error) {
//       console.log('Error updating profile image:', error);
//       throw error;
//     }
//   };

//   // Edit profile handlers
//   const handleSaveProfile = async () => {
//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       const updatedProfile = { ...profileData, ...editData };
//       setProfileData(updatedProfile);
//       saveSettings('profileData', updatedProfile);
//       setIsEditModalVisible(false);
//       setIsLoading(false);
      
//       Alert.alert('Success', 'Profile updated successfully!');
//     }, 1000);
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Logout', 
//           style: 'destructive', 
//           onPress: async () => {
//             try {
//               setIsLoading(true);
              
//               // Clear stored data including user session
//               await AsyncStorage.multiRemove([
//                 'notifications', 
//                 'darkMode', 
//                 'profileData',
//                 'currentUser',
//                 'userToken',
//                 'authToken',
//                 'refreshToken'
//               ]);
              
//               // Clear any authentication tokens or user session data
//               // You might also want to call your API logout endpoint here
//               // await logoutAPI();
              
//               // Reset component state to default
//               setProfileData({
//                 name: 'Guest User',
//                 email: 'guest@email.com',
//                 phone: '+1 (555) 000-0000',
//                 location: 'Unknown',
//                 joinDate: 'New User',
//                 profileImage: 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=Guest',
//                 stats: { orders: 0, rating: 0, points: 0 }
//               });
//               setNotificationsEnabled(true);
//               setDarkModeEnabled(false);
              
//               setIsLoading(false);
              
//               // Navigate to SignIn screen
//               if (navigation) {
//                 // For stack navigation - replace current screen with SignIn
//                 navigation.reset({
//                   index: 0,
//                   routes: [{ name: 'SignIn' }],
//                 });
                
//                 // Alternative navigation methods depending on your navigation structure:
//                 // navigation.navigate('SignIn');
//                 // navigation.replace('SignIn');
//                 // navigation.popToTop(); navigation.navigate('Auth', { screen: 'SignIn' });
//               } else {
//                 Alert.alert('Logged Out', 'You have been logged out successfully');
//               }
              
//             } catch (error) {
//               setIsLoading(false);
//               console.error('Error during logout:', error);
//               Alert.alert('Error', 'An error occurred during logout. Please try again.');
//             }
//           }
//         },
//       ]
//     );
//   };

//   const menuItems = [
//     { id: 1, title: 'Edit Profile', icon: '✏️', action: () => handleMenuPress('Edit Profile') },
//     { id: 2, title: 'Privacy Settings', icon: '🔒', action: () => handleMenuPress('Privacy Settings') },
//     { id: 3, title: 'Payment Methods', icon: '💳', action: () => handleMenuPress('Payment Methods') },
//     { id: 4, title: 'Order History', icon: '📦', action: () => handleMenuPress('Order History') },
//     { id: 5, title: 'Help & Support', icon: '❓', action: () => handleMenuPress('Help & Support') },
//     { id: 6, title: 'About', icon: 'ℹ️', action: () => handleMenuPress('About') },
//   ];

//   const renderProfileHeader = () => (
//     <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
//       <View style={styles.profileImageContainer}>
//         <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
//           <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
//           {isLoading && (
//             <View style={styles.loadingOverlay}>
//               <ActivityIndicator size="small" color="#007AFF" />
//             </View>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.editImageButton} onPress={handleImagePress}>
//           <Text style={styles.editImageText}>📷</Text>
//         </TouchableOpacity>
//       </View>
      
//       <Text style={styles.name}>{profileData.name}</Text>
//       <Text style={styles.email}>{profileData.email}</Text>
//       <Text style={styles.joinDate}>{profileData.joinDate}</Text>
      
//       <View style={styles.statsContainer}>
//         <TouchableOpacity style={styles.statItem} onPress={() => showOrderHistory()}>
//           <Text style={styles.statNumber}>{profileData.stats.orders}</Text>
//           <Text style={styles.statLabel}>Orders</Text>
//         </TouchableOpacity>
//         <View style={styles.statDivider} />
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{profileData.stats.rating}</Text>
//           <Text style={styles.statLabel}>Rating</Text>
//         </View>
//         <View style={styles.statDivider} />
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{(profileData.stats.points / 1000).toFixed(1)}k</Text>
//           <Text style={styles.statLabel}>Points</Text>
//         </View>
//       </View>
//     </Animated.View>
//   );

//   const renderMenuItem = (item) => (
//     <TouchableOpacity
//       key={item.id}
//       style={styles.menuItem}
//       onPress={item.action}
//       activeOpacity={0.7}
//     >
//       <View style={styles.menuItemLeft}>
//         <Text style={styles.menuIcon}>{item.icon}</Text>
//         <Text style={styles.menuTitle}>{item.title}</Text>
//       </View>
//       <Text style={styles.menuArrow}>›</Text>
//     </TouchableOpacity>
//   );

//   const renderToggleItem = (title, icon, value, onValueChange) => (
//     <View style={styles.menuItem}>
//       <View style={styles.menuItemLeft}>
//         <Text style={styles.menuIcon}>{icon}</Text>
//         <Text style={styles.menuTitle}>{title}</Text>
//       </View>
//       <Switch
//         value={value}
//         onValueChange={onValueChange}
//         trackColor={{ false: '#E5E5E5', true: '#007AFF' }}
//         thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
//       />
//     </View>
//   );

//   const renderEditModal = () => (
//     <Modal
//       visible={isEditModalVisible}
//       animationType="slide"
//       presentationStyle="pageSheet"
//     >
//       <SafeAreaView style={styles.modalContainer}>
//         <View style={styles.modalHeader}>
//           <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
//             <Text style={styles.modalCancelText}>Cancel</Text>
//           </TouchableOpacity>
//           <Text style={styles.modalTitle}>Edit Profile</Text>
//           <TouchableOpacity onPress={handleSaveProfile} disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator size="small" color="#007AFF" />
//             ) : (
//               <Text style={styles.modalSaveText}>Save</Text>
//             )}
//           </TouchableOpacity>
//         </View>
        
//         <ScrollView style={styles.modalContent}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Name</Text>
//             <TextInput
//               style={styles.textInput}
//               value={editData.name}
//               onChangeText={(text) => setEditData({...editData, name: text})}
//               placeholder="Enter your name"
//             />
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Email</Text>
//             <TextInput
//               style={styles.textInput}
//               value={editData.email}
//               onChangeText={(text) => setEditData({...editData, email: text})}
//               placeholder="Enter your email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Phone</Text>
//             <TextInput
//               style={styles.textInput}
//               value={editData.phone}
//               onChangeText={(text) => setEditData({...editData, phone: text})}
//               placeholder="Enter your phone number"
//               keyboardType="phone-pad"
//             />
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Location</Text>
//             <TextInput
//               style={styles.textInput}
//               value={editData.location}
//               onChangeText={(text) => setEditData({...editData, location: text})}
//               placeholder="Enter your location"
//             />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Modal>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
//         {renderProfileHeader()}
        
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Account Settings</Text>
//           {menuItems.slice(0, 2).map(renderMenuItem)}
          
//           {renderToggleItem('Notifications', '🔔', notificationsEnabled, handleNotificationToggle)}
//           {renderToggleItem('Dark Mode', '🌙', darkModeEnabled, handleDarkModeToggle)}
//         </View>

//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>More</Text>
//           {menuItems.slice(2).map(renderMenuItem)}
//         </View>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <View style={styles.bottomPadding} />
//       </ScrollView>
      
//       {renderEditModal()}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   headerContainer: {
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   profileImageContainer: {
//     position: 'relative',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: '#E5E5E5',
//   },
//   loadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editImageButton: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#007AFF',
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   editImageText: {
//     fontSize: 12,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 16,
//     color: '#666666',
//     marginBottom: 8,
//   },
//   joinDate: {
//     fontSize: 14,
//     color: '#999999',
//     marginBottom: 20,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//     width: '100%',
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   statDivider: {
//     width: 1,
//     height: 30,
//     backgroundColor: '#E5E5E5',
//     marginHorizontal: 20,
//   },
//   sectionContainer: {
//     backgroundColor: '#FFFFFF',
//     marginBottom: 20,
//     paddingVertical: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     backgroundColor: '#F8F9FA',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: '#E5E5E5',
//   },
//   menuItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   menuIcon: {
//     fontSize: 20,
//     marginRight: 16,
//     width: 24,
//     textAlign: 'center',
//   },
//   menuTitle: {
//     fontSize: 16,
//     color: '#1A1A1A',
//     fontWeight: '500',
//   },
//   menuArrow: {
//     fontSize: 18,
//     color: '#C7C7CC',
//     fontWeight: '600',
//   },
//   logoutButton: {
//     backgroundColor: '#FF3B30',
//     marginHorizontal: 20,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   logoutText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   bottomPadding: {
//     height: 40,
//   },
//   // Modal styles
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: '#E5E5E5',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   modalCancelText: {
//     fontSize: 16,
//     color: '#FF3B30',
//   },
//   modalSaveText: {
//     fontSize: 16,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   modalContent: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   inputGroup: {
//     marginTop: 20,
//   },
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   textInput: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#1A1A1A',
//   },
// });

// export default Profile;