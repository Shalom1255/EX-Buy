// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Modal,
//   Dimensions,
//   ActivityIndicator,
//   Animated,
//   Vibration,
//   ActionSheetIOS,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
// import { Audio } from 'expo-av';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const Chat = ({ navigation, route }) => {
//   // Chat participant info (could come from route params)
//   const contact = route?.params?.contact || {
//     id: 'user_123',
//     name: 'Alex Johnson',
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
//     isOnline: true,
//     lastSeen: 'last seen today at 11:20',
//   };

//   // State management
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [recordingDuration, setRecordingDuration] = useState(0);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [replyToMessage, setReplyToMessage] = useState(null);
  
//   // Animation refs
//   const typingAnimation = useRef(new Animated.Value(0)).current;
//   const recordingAnimation = useRef(new Animated.Value(1)).current;
  
//   // Refs
//   const flatListRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const recordingIntervalRef = useRef(null);

//   // Load chat history on mount
//   useEffect(() => {
//     loadChatHistory();
//     requestPermissions();
    
//     // Simulate receiving messages (Dont Forget this???????)
//     const messageInterval = setInterval(() => {
//       if (Math.random() > 0.95) { // 5% chance every second
//         simulateIncomingMessage();
//       }
//     }, 1000);

//     return () => {
//       clearInterval(messageInterval);
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//       if (recordingIntervalRef.current) {
//         clearInterval(recordingIntervalRef.current);
//       }
//     };
//   }, []);

//   // Auto scroll to bottom when messages change
//   useEffect(() => {
//     if (flatListRef.current && messages.length > 0) {
//       setTimeout(() => {
//         flatListRef.current.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   }, [messages]);

//   // Typing animation effect
//   useEffect(() => {
//     if (isTyping) {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(typingAnimation, {
//             toValue: 1,
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(typingAnimation, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     } else {
//       typingAnimation.setValue(0);
//     }
//   }, [isTyping]);

//   // Request permissions
//   const requestPermissions = async () => {
//     try {
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//       await ImagePicker.requestCameraPermissionsAsync();
//       await Audio.requestPermissionsAsync();
//     } catch (error) {
//       console.log('Error requesting permissions:', error);
//     }
//   };

//   // Load chat history from storage
//   const loadChatHistory = async () => {
//     try {
//       setIsLoading(true);
//       const savedMessages = await AsyncStorage.getItem(`chat_${contact.id}`);
      
//       if (savedMessages) {
//         setMessages(JSON.parse(savedMessages));
//       } else {
//         // Initialize with sample messages
//         const initialMessages = [
//           {
//             id: '1',
//             text: 'Hey! How are you doing?',
//             time: '10:30',
//             timestamp: Date.now() - 7200000,
//             sent: false,
//             status: 'read',
//             type: 'text',
//           },
//           {
//             id: '2',
//             text: 'I\'m doing great! Just finished my workout 💪',
//             time: '10:32',
//             timestamp: Date.now() - 7080000,
//             sent: true,
//             status: 'read',
//             type: 'text',
//           },
//           {
//             id: '3',
//             text: 'That\'s awesome! What kind of workout?',
//             time: '10:33',
//             timestamp: Date.now() - 7020000,
//             sent: false,
//             status: 'read',
//             type: 'text',
//           },
//         ];
//         setMessages(initialMessages);
//         await saveChatHistory(initialMessages);
//       }
//     } catch (error) {
//       console.log('Error loading chat history:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Save chat history to storage
//   const saveChatHistory = async (messagesToSave) => {
//     try {
//       await AsyncStorage.setItem(`chat_${contact.id}`, JSON.stringify(messagesToSave));
//     } catch (error) {
//       console.log('Error saving chat history:', error);
//     }
//   };

//   // Send message function
//   const sendMessage = useCallback(async (messageText = null, messageType = 'text', mediaUri = null, replyTo = null) => {
//     const textToSend = messageText || message.trim();
//     if (!textToSend && !mediaUri) return;

//     const newMessage = {
//       id: Date.now().toString(),
//       text: textToSend,
//       time: new Date().toLocaleTimeString('en-US', { 
//         hour: 'numeric', 
//         minute: '2-digit',
//         hour12: false 
//       }),
//       timestamp: Date.now(),
//       sent: true,
//       status: 'sending',
//       type: messageType,
//       mediaUri: mediaUri,
//       replyTo: replyTo,
//     };
    
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     setMessage('');
//     setReplyToMessage(null);
    
//     // Save to storage
//     await saveChatHistory(updatedMessages);
    
//     // Simulate sending process
//     setTimeout(() => {
//       setMessages(prev => 
//         prev.map(msg => 
//           msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
//         )
//       );
//     }, 500);
    
//     setTimeout(() => {
//       setMessages(prev => 
//         prev.map(msg => 
//           msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
//         )
//       );
//     }, 1500);
    
//     setTimeout(() => {
//       setMessages(prev => {
//         const updated = prev.map(msg => 
//           msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
//         );
//         saveChatHistory(updated);
//         return updated;
//       });
//     }, 3000);

//     // Trigger haptic feedback
//     if (Platform.OS === 'ios') {
//       Vibration.vibrate(10);
//     }
//   }, [message, messages, contact.id]);

//   // Simulate incoming messages
//   const simulateIncomingMessage = () => {
//     const incomingMessages = [
//       "That sounds great!",
//       "What are you up to?",
//       "Let me know when you're free",
//       "Thanks for that!",
//       "See you later!",
//       "How was your day?",
//       "That's interesting 🤔",
//       "I agree with you",
//       "Let's catch up soon",
//       "Hope you're doing well!"
//     ];

//     const randomMessage = incomingMessages[Math.floor(Math.random() * incomingMessages.length)];
    
//     // Show typing indicator first
//     setIsTyping(true);
    
//     setTimeout(() => {
//       setIsTyping(false);
//       const newMessage = {
//         id: Date.now().toString(),
//         text: randomMessage,
//         time: new Date().toLocaleTimeString('en-US', { 
//           hour: 'numeric', 
//           minute: '2-digit',
//           hour12: false 
//         }),
//         timestamp: Date.now(),
//         sent: false,
//         status: 'read',
//         type: 'text',
//       };
      
//       setMessages(prev => {
//         const updated = [...prev, newMessage];
//         saveChatHistory(updated);
//         return updated;
//       });
      
//       // Trigger notification vibration
//       Vibration.vibrate([0, 250, 250, 250]);
//     }, Math.random() * 3000 + 1000); // 1-4 seconds typing time
//   };

//   // Handle typing indicator
//   const handleTextChange = (text) => {
//     setMessage(text);
    
//     // Clear existing timeout
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }
    
//     // Set new timeout to stop typing indicator
//     typingTimeoutRef.current = setTimeout(() => {
//       // In real app, you'd send typing stopped indicator to other user
//     }, 1000);
//   };

//   // Image picker functions
//   const pickImageFromCamera = async () => {
//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets && result.assets[0]) {
//         const imageUri = result.assets[0].uri;
//         await sendMessage('', 'image', imageUri);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to take photo');
//     }
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets && result.assets[0]) {
//         const imageUri = result.assets[0].uri;
//         await sendMessage('', 'image', imageUri);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to select image');
//     }
//   };

//   // Document picker
//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: '*/*',
//         copyToCacheDirectory: true,
//       });

//       if (!result.canceled && result.assets && result.assets[0]) {
//         const docUri = result.assets[0].uri;
//         const docName = result.assets[0].name;
//         await sendMessage(docName, 'document', docUri);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to select document');
//     }
//   };

//   // Voice recording functions
//   const startRecording = async () => {
//     try {
//       setIsRecording(true);
//       setRecordingDuration(0);
      
//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
      
//       setRecording(recording);
      
//       // Start duration counter
//       recordingIntervalRef.current = setInterval(() => {
//         setRecordingDuration(prev => prev + 1);
//       }, 1000);

//       // Start pulsing animation
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(recordingAnimation, {
//             toValue: 1.2,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//           Animated.timing(recordingAnimation, {
//             toValue: 1,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
      
//     } catch (error) {
//       Alert.alert('Error', 'Failed to start recording');
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       if (recording) {
//         await recording.stopAndUnloadAsync();
//         const uri = recording.getURI();
        
//         if (recordingDuration > 1) { // Only send if recording is longer than 1 second
//           await sendMessage(`Voice message (${recordingDuration}s)`, 'voice', uri);
//         }
        
//         setRecording(null);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to stop recording');
//     } finally {
//       setIsRecording(false);
//       setRecordingDuration(0);
//       recordingAnimation.setValue(1);
      
//       if (recordingIntervalRef.current) {
//         clearInterval(recordingIntervalRef.current);
//       }
//     }
//   };

//   // Attachment menu
//   const showAttachmentMenu = () => {
//     const options = ['Camera', 'Photo Library', 'Document', 'Cancel'];
//     const cancelButtonIndex = 3;

//     if (Platform.OS === 'ios') {
//       ActionSheetIOS.showActionSheetWithOptions(
//         {
//           options,
//           cancelButtonIndex,
//         },
//         (buttonIndex) => {
//           switch (buttonIndex) {
//             case 0:
//               pickImageFromCamera();
//               break;
//             case 1:
//               pickImageFromGallery();
//               break;
//             case 2:
//               pickDocument();
//               break;
//           }
//         }
//       );
//     } else {
//       Alert.alert(
//         'Send Attachment',
//         'Choose an option',
//         [
//           { text: 'Camera', onPress: pickImageFromCamera },
//           { text: 'Photo Library', onPress: pickImageFromGallery },
//           { text: 'Document', onPress: pickDocument },
//           { text: 'Cancel', style: 'cancel' },
//         ]
//       );
//     }
//   };

//   // Message long press actions
//   const handleMessageLongPress = (messageItem) => {
//     const options = ['Reply', 'Copy', 'Delete', 'Cancel'];
//     const destructiveButtonIndex = 2;
//     const cancelButtonIndex = 3;

//     if (Platform.OS === 'ios') {
//       ActionSheetIOS.showActionSheetWithOptions(
//         {
//           options,
//           destructiveButtonIndex,
//           cancelButtonIndex,
//         },
//         (buttonIndex) => {
//           switch (buttonIndex) {
//             case 0:
//               setReplyToMessage(messageItem);
//               break;
//             case 1:
//               // Copy to clipboard (would need @react-native-clipboard/clipboard)
//               Alert.alert('Copied', 'Message copied to clipboard');
//               break;
//             case 2:
//               deleteMessage(messageItem.id);
//               break;
//           }
//         }
//       );
//     } else {
//       Alert.alert(
//         'Message Options',
//         '',
//         [
//           { text: 'Reply', onPress: () => setReplyToMessage(messageItem) },
//           { text: 'Copy', onPress: () => Alert.alert('Copied', 'Message copied to clipboard') },
//           { text: 'Delete', onPress: () => deleteMessage(messageItem.id), style: 'destructive' },
//           { text: 'Cancel', style: 'cancel' },
//         ]
//       );
//     }
//   };

//   // Delete message
//   const deleteMessage = (messageId) => {
//     const updatedMessages = messages.filter(msg => msg.id !== messageId);
//     setMessages(updatedMessages);
//     saveChatHistory(updatedMessages);
//   };

//   // Status icons
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'sending':
//         return '⏳';
//       case 'sent':
//         return '✓';
//       case 'delivered':
//         return '✓✓';
//       case 'read':
//         return '✓✓';
//       default:
//         return '';
//     }
//   };

//   // Format duration
//   const formatDuration = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Render message component
//   const renderMessage = ({ item }) => (
//     <TouchableOpacity
//       onLongPress={() => handleMessageLongPress(item)}
//       style={[
//         styles.messageContainer,
//         item.sent ? styles.sentMessage : styles.receivedMessage
//       ]}
//     >
//       {item.replyTo && (
//         <View style={styles.replyContainer}>
//           <Text style={styles.replyText} numberOfLines={1}>
//             {item.replyTo.text}
//           </Text>
//         </View>
//       )}
      
//       <View style={[
//         styles.messageBubble,
//         item.sent ? styles.sentBubble : styles.receivedBubble
//       ]}>
//         {item.type === 'image' && (
//           <TouchableOpacity onPress={() => {
//             setSelectedImage(item.mediaUri);
//             setShowImageModal(true);
//           }}>
//             <Image source={{ uri: item.mediaUri }} style={styles.messageImage} />
//           </TouchableOpacity>
//         )}
        
//         {item.type === 'voice' && (
//           <View style={styles.voiceMessageContainer}>
//             <TouchableOpacity style={styles.playButton}>
//               <Text style={styles.playIcon}>▶️</Text>
//             </TouchableOpacity>
//             <View style={styles.voiceWaveform}>
//               <Text style={styles.voiceText}>{item.text}</Text>
//             </View>
//           </View>
//         )}
        
//         {item.type === 'document' && (
//           <View style={styles.documentContainer}>
//             <Text style={styles.documentIcon}>📄</Text>
//             <Text style={styles.documentName}>{item.text}</Text>
//           </View>
//         )}
        
//         {(item.type === 'text' || !item.type) && (
//           <Text style={[
//             styles.messageText,
//             item.sent ? styles.sentText : styles.receivedText
//           ]}>
//             {item.text}
//           </Text>
//         )}
        
//         <View style={styles.messageFooter}>
//           <Text style={[
//             styles.timeText,
//             item.sent ? styles.sentTimeText : styles.receivedTimeText
//           ]}>
//             {item.time}
//           </Text>
//           {item.sent && (
//             <Text style={[
//               styles.statusIcon,
//               item.status === 'read' ? styles.readStatus : styles.deliveredStatus
//             ]}>
//               {getStatusIcon(item.status)}
//             </Text>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   // Render header
//   const renderHeader = () => (
//     <View style={styles.header}>
//       <TouchableOpacity 
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.backIcon}>←</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.contactInfo}>
//         <Image source={{ uri: contact.avatar }} style={styles.avatar} />
//         <View style={styles.contactDetails}>
//           <Text style={styles.contactName}>{contact.name}</Text>
//           <Text style={styles.contactStatus}>
//             {isTyping ? 'typing...' : (contact.isOnline ? 'online' : contact.lastSeen)}
//           </Text>
//         </View>
//       </TouchableOpacity>
      
//       <View style={styles.headerActions}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionIcon}>📞</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionIcon}>📹</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionIcon}>⋮</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Loading state
//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor="#075E54" />
//         {renderHeader()}
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#075E54" />
//           <Text style={styles.loadingText}>Loading messages...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#075E54" />
      
//       {renderHeader()}
      
//       <KeyboardAvoidingView 
//         style={styles.chatContainer}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//       >
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           style={styles.messagesList}
//           contentContainerStyle={styles.messagesContainer}
//           showsVerticalScrollIndicator={false}
//           onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//         />
        
//         {isTyping && (
//           <Animated.View style={[styles.typingIndicator, { opacity: typingAnimation }]}>
//             <Text style={styles.typingText}>{contact.name} is typing...</Text>
//           </Animated.View>
//         )}
        
//         {replyToMessage && (
//           <View style={styles.replyPreview}>
//             <View style={styles.replyPreviewContent}>
//               <Text style={styles.replyPreviewTitle}>Replying to:</Text>
//               <Text style={styles.replyPreviewText} numberOfLines={1}>
//                 {replyToMessage.text}
//               </Text>
//             </View>
//             <TouchableOpacity 
//               style={styles.cancelReplyButton}
//               onPress={() => setReplyToMessage(null)}
//             >
//               <Text style={styles.cancelReplyText}>✕</Text>
//             </TouchableOpacity>
//           </View>
//         )}
        
//         <View style={styles.inputContainer}>
//           <TouchableOpacity style={styles.attachButton} onPress={showAttachmentMenu}>
//             <Text style={styles.attachIcon}>📎</Text>
//           </TouchableOpacity>
          
//           <TextInput
//             style={styles.textInput}
//             value={message}
//             onChangeText={handleTextChange}
//             placeholder="Type a message"
//             placeholderTextColor="#999999"
//             multiline
//             maxHeight={100}
//           />
          
//           {message.trim() ? (
//             <TouchableOpacity 
//               style={styles.sendButton} 
//               onPress={() => sendMessage(null, 'text', null, replyToMessage)}
//             >
//               <Text style={styles.sendIcon}>➤</Text>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.mediaButtons}>
//               <TouchableOpacity style={styles.mediaButton} onPress={pickImageFromCamera}>
//                 <Text style={styles.mediaIcon}>📷</Text>
//               </TouchableOpacity>
//               <Animated.View style={{ transform: [{ scale: recordingAnimation }] }}>
//                 <TouchableOpacity 
//                   style={[styles.mediaButton, isRecording && styles.recordingButton]} 
//                   onPressIn={startRecording}
//                   onPressOut={stopRecording}
//                 >
//                   <Text style={styles.mediaIcon}>
//                     {isRecording ? `🔴 ${formatDuration(recordingDuration)}` : '🎤'}
//                   </Text>
//                 </TouchableOpacity>
//               </Animated.View>
//             </View>
//           )}
//         </View>
//       </KeyboardAvoidingView>

//       {/* Image Modal */}
//       <Modal visible={showImageModal} transparent={true}>
//         <View style={styles.imageModalContainer}>
//           <TouchableOpacity 
//             style={styles.imageModalBackground}
//             onPress={() => setShowImageModal(false)}
//           >
//             <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
//             <TouchableOpacity 
//               style={styles.closeImageButton}
//               onPress={() => setShowImageModal(false)}
//             >
//               <Text style={styles.closeImageText}>✕</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ECE5DD',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#075E54',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     elevation: 4,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   backIcon: {
//     fontSize: 20,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   contactInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   contactDetails: {
//     flex: 1,
//   },
//   contactName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     marginBottom: 2,
//   },
//   contactStatus: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     opacity: 0.8,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     marginLeft: 20,
//   },
//   actionIcon: {
//     fontSize: 18,
//     color: '#FFFFFF',
//   },
//   loadingContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#666666',
//   },
//   chatContainer: {
//     flex: 1,
//   },
//   messagesList: {
//     flex: 1,
//   },
//   messagesContainer: {
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   messageContainer: {
//     marginVertical: 4,
//     maxWidth: '80%',
//   },
//   sentMessage: {
//     alignSelf: 'flex-end',
//   },
//   receivedMessage: {
//     alignSelf: 'flex-start',
//   },
//   replyContainer: {
//     backgroundColor: 'rgba(0,0,0,0.1)',
//     padding: 8,
//     borderRadius: 8,
//     marginBottom: 4,
//     borderLeftWidth: 3,
//     borderLeftColor: '#075E54',
//   },
//   replyText: {
//     fontSize: 12,
//     color: '#666666',
//     fontStyle: 'italic',
//   },
//   messageBubble: {
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     elevation: 1,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   sentBubble: {
//     backgroundColor: '#DCF8C6',
//     borderBottomRightRadius: 4,
//   },
//   receivedBubble: {
//     backgroundColor: '#FFFFFF',
//     borderBottomLeftRadius: 4,
//   },
//   messageImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   voiceMessageContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minWidth: 150,
//   },
//   playButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#075E54',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   playIcon: {
//     color: '#FFFFFF',
//     fontSize: 12,
//   },
//   voiceWaveform: {
//     flex: 1,
//   },
//   voiceText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   documentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minWidth: 150,
//   },
//   documentIcon: {
//     fontSize: 24,
//     marginRight: 12,
//   },
//   documentName: {
//     fontSize: 14,
//     color: '#000000',
//     flex: 1,
//   },
//   messageText: {
//     fontSize: 16,
//     lineHeight: 20,
//     marginBottom: 4,
//   },
//   sentText: {
//     color: '#000000',
//   },
//   receivedText: {
//     color: '#000000',
//   },
//   messageFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     marginTop: 4,
//   },
//   timeText: {
//     fontSize: 11,
//     marginRight: 4,
//   },
//   sentTimeText: {
//     color: '#666666',
//   },
//   receivedTimeText: {
//     color: '#999999',
//   },
//   statusIcon: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   deliveredStatus: {
//     color: '#999999',
//   },
//   readStatus: {
//     color: '#4FC3F7',
//   },
//   typingIndicator: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   typingText: {
//     fontSize: 14,
//     color: '#666666',
//     fontStyle: 'italic',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E5E5',
//   },
//   attachButton: {
//     padding: 8,
//     marginRight: 8,
//   },
//   attachIcon: {
//     fontSize: 20,
//     color: '#666666',
//   },
//   textInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     maxHeight: 100,
//     backgroundColor: '#FFFFFF',
//   },
//   sendButton: {
//     backgroundColor: '#075E54',
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 8,
//   },
//   sendIcon: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   mediaButtons: {
//     flexDirection: 'row',
//     marginLeft: 8,
//   },
//   mediaButton: {
//     padding: 8,
//     marginLeft: 4,
//   },
//   mediaIcon: {
//     fontSize: 20,
//     color: '#666666',
//   },
// });

// export default Chat;