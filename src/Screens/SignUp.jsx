import React, { useState, useCallback, useMemo } from 'react';
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
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Professional color scheme - matching LoginScreen
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

// Form validation rules
const VALIDATION_RULES = {
  fullName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
    pattern: /^[0-9+\-\s()]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  verificationCode: {
    minLength: 6,
    maxLength: 6,
    pattern: /^\d{6}$/,
  },
};

const ERROR_MESSAGES = {
  fullName: {
    required: 'Full name is required',
    invalid: 'Please enter a valid full name (letters and spaces only)',
    tooShort: 'Full name must be at least 2 characters',
    tooLong: 'Full name must be less than 50 characters',
  },
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
  },
  phone: {
    required: 'Phone number is required',
    invalid: 'Please enter a valid phone number',
    tooShort: 'Phone number is too short',
    tooLong: 'Phone number is too long',
  },
  password: {
    required: 'Password is required',
    tooShort: 'Password must be at least 8 characters',
    tooLong: 'Password must be less than 128 characters',
    weak: 'Password must contain uppercase, lowercase, number, and special character',
  },
  confirmPassword: {
    required: 'Please confirm your password',
    mismatch: 'Passwords do not match',
  },
  verificationCode: {
    required: 'Verification code is required',
    invalid: 'Please enter a valid 6-digit code',
  },
  terms: 'Please agree to the Terms and Conditions',
  general: 'An error occurred. Please try again.',
};

export default function RegisterScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  // UI state
  const [formState, setFormState] = useState({
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
    agreeToTerms: false,
    errors: {},
  });
  
  // Verification state
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Input handlers
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (formState.errors[field]) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: null }
      }));
    }
  }, [formState.errors]);

  const togglePasswordVisibility = (field) => {
    setFormState(prev => ({ 
      ...prev, 
      [field]: !prev[field] 
    }));
  };

  const validateField = useCallback((field, value) => {
    const rules = VALIDATION_RULES[field];
    const messages = ERROR_MESSAGES[field];
    
    if (!value || !value.trim()) {
      return messages.required;
    }
    
    if (rules?.minLength && value.length < rules.minLength) {
      return messages.tooShort;
    }
    
    if (rules?.maxLength && value.length > rules.maxLength) {
      return messages.tooLong;
    }
    
    if (rules?.pattern && !rules.pattern.test(value)) {
      return messages.invalid || messages.weak;
    }
    
    return null;
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
      }
    });
    
    // Special validation for confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = ERROR_MESSAGES.confirmPassword.mismatch;
    }
    
    // Check terms agreement
    if (!formState.agreeToTerms) {
      errors.terms = ERROR_MESSAGES.terms;
    }
    
    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [formData, formState.agreeToTerms, validateField]);

  const handleRegister = useCallback(async () => {
    if (!validateForm()) return;

    setFormState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send verification email (simulate)
      setPendingVerification(true);
      Alert.alert(
        'Verification Required',
        `We've sent a verification code to ${formData.email}. Please check your email and enter the code below.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Registration Failed', ERROR_MESSAGES.general);
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  }, [validateForm, formData]);

  const handleVerifyEmail = useCallback(async () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', ERROR_MESSAGES.verificationCode.required);
      return;
    }

    const codeError = validateField('verificationCode', verificationCode);
    if (codeError) {
      Alert.alert('Error', codeError);
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode.length === 6 && /^\d{6}$/.test(verificationCode)) {
        Alert.alert(
          'Welcome!',
          'Your account has been created successfully. Welcome to our platform!',
          [{ text: 'Get Started', onPress: () => navigation.replace('TabLayout') }]
        );
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      Alert.alert('Verification Failed', 'Invalid verification code. Please try again.');
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  }, [verificationCode, navigation, validateField]);

  const handleResendCode = useCallback(async () => {
    if (resendCooldown > 0) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
      
      // Set cooldown timer
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.');
    }
  }, [resendCooldown]);

  const handleSocialSignUp = useCallback((provider) => {
    Alert.alert('Social Sign Up', `${provider} sign up will be implemented`);
  }, []);

  const handleTermsPress = useCallback(() => {
    Alert.alert('Terms & Conditions', 'Terms and Conditions screen would open here.');
  }, []);

  const renderInputField = (field, placeholder, icon, options = {}) => {
    const hasError = formState.errors[field];
    const isPassword = field === 'password' || field === 'confirmPassword';
    const showPasswordKey = field === 'confirmPassword' ? 'showConfirmPassword' : 'showPassword';
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
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
            secureTextEntry={isPassword && !formState[showPasswordKey]}
            autoCapitalize="none"
            autoCorrect={false}
            {...options}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() => togglePasswordVisibility(showPasswordKey)}
              style={styles.eyeIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={formState[showPasswordKey] ? "eye-outline" : "eye-off-outline"}
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
            {!pendingVerification ? (
              <>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                  <Text style={styles.welcomeTitle}>Create Account</Text>
                  <Text style={styles.welcomeSubtitle}>
                    Sign up to start your journey with us
                  </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                  {renderInputField(
                    'fullName',
                    'Enter your full name',
                    'person-outline',
                    { autoCapitalize: 'words' }
                  )}

                  {renderInputField(
                    'email',
                    'Enter your email address',
                    'mail-outline',
                    { keyboardType: 'email-address' }
                  )}

                  {renderInputField(
                    'phone',
                    'Enter your phone number',
                    'call-outline',
                    { keyboardType: 'phone-pad' }
                  )}

                  {renderInputField(
                    'password',
                    'Create a strong password',
                    'lock-closed-outline'
                  )}

                  {renderInputField(
                    'confirmPassword',
                    'Confirm your password',
                    'lock-closed-outline'
                  )}

                  {/* Terms and Conditions */}
                  <View style={styles.termsContainer}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => setFormState(prev => ({ 
                        ...prev, 
                        agreeToTerms: !prev.agreeToTerms 
                      }))}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={formState.agreeToTerms ? "checkbox" : "square-outline"}
                        size={20}
                        color={formState.agreeToTerms ? COLORS.primary : COLORS.text.tertiary}
                      />
                    </TouchableOpacity>
                    <View style={styles.termsTextContainer}>
                      <Text style={styles.termsText}>I agree to the </Text>
                      <TouchableOpacity onPress={handleTermsPress}>
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                      </TouchableOpacity>
                      <Text style={styles.termsText}> and </Text>
                      <TouchableOpacity onPress={handleTermsPress}>
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {formState.errors.terms && (
                    <Text style={styles.errorText}>{formState.errors.terms}</Text>
                  )}

                  {/* Register Button */}
                  <TouchableOpacity
                    style={[
                      styles.registerButton,
                      formState.isLoading && styles.registerButtonDisabled
                    ]}
                    onPress={handleRegister}
                    disabled={formState.isLoading}
                    activeOpacity={0.9}
                  >
                    {formState.isLoading ? (
                      <ActivityIndicator color={COLORS.text.inverse} size="small" />
                    ) : (
                      <Text style={styles.registerButtonText}>Create Account</Text>
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
                      onPress={() => handleSocialSignUp('Google')}
                      activeOpacity={0.9}
                    >
                      <Image
                        source={require("../../assets/search.png")}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.socialButton}
                      onPress={() => handleSocialSignUp('Apple')}
                      activeOpacity={0.9}
                    >
                      <Ionicons name="logo-apple" size={20} color={COLORS.text.primary} />
                      <Text style={styles.socialButtonText}>Apple</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sign In Link */}
                  <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Already have an account? </Text>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('SignIn')}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              // Email Verification Screen
              <>
                <View style={styles.welcomeSection}>
                  <Text style={styles.welcomeTitle}>Verify Email</Text>
                  <Text style={styles.welcomeSubtitle}>
                    We sent a 6-digit verification code to{'\n'}
                    <Text style={styles.emailHighlight}>{formData.email}</Text>
                  </Text>
                </View>

                <View style={styles.formSection}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Verification Code</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons 
                        name="shield-checkmark-outline" 
                        size={20} 
                        color={COLORS.text.tertiary} 
                        style={styles.inputIcon} 
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter 6-digit code"
                        placeholderTextColor={COLORS.input.placeholder}
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        keyboardType="number-pad"
                        maxLength={6}
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.registerButton,
                      (formState.isLoading || !verificationCode.trim()) && styles.registerButtonDisabled
                    ]}
                    onPress={handleVerifyEmail}
                    disabled={formState.isLoading || !verificationCode.trim()}
                    activeOpacity={0.9}
                  >
                    {formState.isLoading ? (
                      <ActivityIndicator color={COLORS.text.inverse} size="small" />
                    ) : (
                      <Text style={styles.registerButtonText}>Verify Email</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={handleResendCode} 
                    style={styles.resendButton}
                    disabled={resendCooldown > 0}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={[
                      styles.resendText,
                      resendCooldown > 0 && styles.resendTextDisabled
                    ]}>
                      {resendCooldown > 0 
                        ? `Resend code in ${resendCooldown}s`
                        : "Didn't receive the code? Tap to resend"
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
  emailHighlight: {
    fontWeight: '600',
    color: COLORS.primary,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  termsLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    lineHeight: 20,
  },
  registerButton: {
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
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
  signInText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  signInLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 4,
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  resendTextDisabled: {
    color: COLORS.text.tertiary,
  },
});