import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
//comment
// Professional color scheme
const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  secondary: '#64748B',
  accent: '#0EA5E9',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceLight: '#F1F5F9',
  border: '#E2E8F0',
  borderFocus: '#3B82F6',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  input: {
    background: '#FFFFFF',
    border: '#E2E8F0',
    borderFocus: '#3B82F6',
    placeholder: '#94A3B8',
  },
};

// Input validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

// Helper function to extract name from email
const extractNameFromEmail = (email) => {
  if (!email) return '';
  const namePart = email.split('@')[0];
  // Convert email username to proper name format
  return namePart
    .split(/[._-]/) // Split by common separators
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formState, setFormState] = useState({
    showPassword: false,
    isLoading: false,
    errors: {},
  });

  // Input handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (formState.errors[field]) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: null }
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  // Create user data object from signin information
  const createUserDataFromSignIn = (email, additionalData = {}) => {
    const extractedName = extractNameFromEmail(email);
    
    return {
      email: email.toLowerCase().trim(),
      name: additionalData.name || extractedName || 'User',
      phone: additionalData.phone || '',
      location: additionalData.location || '',
      profileImage: additionalData.profileImage || null,
      signInMethod: 'email',
      signInDate: new Date().toISOString(),
      ...additionalData
    };
  };

  // Save user session data
  const saveUserSession = async (userData, authToken = null) => {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
      if (authToken) {
        await AsyncStorage.setItem('userToken', authToken);
      }
      console.log('User session saved:', userData);
    } catch (error) {
      console.log('Error saving user session:', error);
    }
  };

  // Login handler
  const handleLogin = async () => {
    if (!validateForm()) return;

    setFormState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call - replace with your actual authentication API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would get user data from your API response
      // For now, we'll create user data from the email input
      const userData = createUserDataFromSignIn(formData.email, {
        // You can add more user data here if returned from your API
        // name: apiResponse.user.name,
        // phone: apiResponse.user.phone,
        // location: apiResponse.user.location,
        // profileImage: apiResponse.user.profileImage,
      });

      // Save user session
      await saveUserSession(userData, 'fake_auth_token_123');
      
      // Navigate to main app with user data
      navigation.navigate('TabLayout', {
        screen: 'Profile', // Navigate directly to Profile tab
        params: {
          userData: userData
        }
      });

      // Alternative navigation if you want to go to a different initial screen:
      // navigation.navigate('TabLayout', { userData });
      
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Social login handler
  const handleSocialLogin = async (provider) => {
    try {
      setFormState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock social login data - replace with actual social login implementation
      let socialUserData;
      
      if (provider === 'Google') {
        socialUserData = createUserDataFromSignIn('user@gmail.com', {
          name: 'Google User',
          profileImage: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
          signInMethod: 'google'
        });
      } else if (provider === 'Apple') {
        socialUserData = createUserDataFromSignIn('user@icloud.com', {
          name: 'Apple User',
          signInMethod: 'apple'
        });
      }

      // Save user session
      await saveUserSession(socialUserData, `${provider.toLowerCase()}_token_123`);
      
      // Navigate to main app with social login data
      navigation.navigate('TabLayout', {
        screen: 'Profile',
        params: {
          userData: socialUserData
        }
      });
      
    } catch (error) {
      console.log(`${provider} login error:`, error);
      Alert.alert(`${provider} Login Failed`, 'Please try again.');
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const renderInputField = (field, placeholder, icon, options = {}) => {
    const hasError = formState.errors[field];
    const isPassword = field === 'password';
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </Text>
        <View style={[
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
        ]}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={hasError ? COLORS.error : COLORS.text.tertiary} 
            style={styles.inputIcon} 
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={COLORS.input.placeholder}
            value={formData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
            secureTextEntry={isPassword && !formState.showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            {...options}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={formState.showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={COLORS.text.tertiary}
              />
            </TouchableOpacity>
          )}
        </View>
        {hasError && (
          <Text style={styles.errorText}>{formState.errors[field]}</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign in to continue to your account
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {renderInputField(
                'email',
                'Enter your email address',
                'mail-outline',
                { keyboardType: 'email-address' }
              )}

              {renderInputField(
                'password',
                'Enter your password',
                'lock-closed-outline'
              )}

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => navigation.navigate('ForgotPassword')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  formState.isLoading && styles.loginButtonDisabled
                ]}
                onPress={handleLogin}
                disabled={formState.isLoading}
                activeOpacity={0.9}
              >
                {formState.isLoading ? (
                  <ActivityIndicator color={COLORS.text.inverse} size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                  activeOpacity={0.9}
                  disabled={formState.isLoading}
                >
                  <Image
                    source={require("../../assets/search.png")}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Apple')}
                  activeOpacity={0.9}
                  disabled={formState.isLoading}
                >
                  <Ionicons name="logo-apple" size={20} color={COLORS.text.primary} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('SignUp')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeSection: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.input.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.input.background,
    minHeight: 56,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
    marginLeft: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
    padding: 4,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 56,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.text.inverse,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: COLORS.text.tertiary,
    fontSize: 14,
    fontWeight: '500',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    minHeight: 56,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
  signUpText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});