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
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function RegisterScreen({ navigation }) {
  
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = React.useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
   // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
  };

 
  const validateForm = () => {
    const { fullName, email, phone, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!phone.trim() || phone.length < 11) {
      Alert.alert('Error', 'Please enter your 11digit phone number');
      return false;
    }

    if (!password || password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Conditions');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm() || !isLoaded) return;

    setIsLoading(true);
    
    try {
      // Create the user with Clerk
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.fullName.split(' ')[0],
        lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
        phoneNumber: formData.phone,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
      setPendingVerification(true);
      Alert.alert(
        'Verification Required',
        'We sent a verification code to your email address. Please check your email and enter the code below.'
      );
    } catch (err) {
      Alert.alert('Error', err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      
      Alert.alert(
        'Success',
        'Account created successfully! Welcome to the app.',
        [{ text: 'OK' }]
      );
    } catch (err) {
      Alert.alert('Error', err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      Alert.alert('Success', 'Verification code sent again!');
    } catch (err) {
      Alert.alert('Error', err.errors[0].message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {!pendingVerification ? (
              <>
                {/* Title */}
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Sign Up</Text>
                  <Text style={styles.subtitle}>Create your account to start selling/Buying</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                  {/* Full Name Input */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChangeText={(value) => handleInputChange('fullName', value)}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>

                  {/* Email Input */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {/* Phone Input */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChangeText={(value) => handleInputChange('phone', value)}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Create a password"
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                      >
                        <Ionicons
                          name={showPassword ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Confirm Password Input */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.eyeIcon}
                      >
                        <Ionicons
                          name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Terms and Conditions */}
                  <View style={styles.termsContainer}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => setAgreeToTerms(!agreeToTerms)}
                    >
                      <Ionicons
                        name={agreeToTerms ? "checkbox" : "square-outline"}
                        size={20}
                        color={agreeToTerms ? "#667eea" : "#666"}
                      />
                    </TouchableOpacity>
                    <View style={styles.termsTextContainer}>
                      <Text style={styles.termsText}>I agree to the </Text>
                      <TouchableOpacity>
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                      </TouchableOpacity>
                      <Text style={styles.termsText}> and </Text>
                      <TouchableOpacity>
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Register Button */}
                  <TouchableOpacity
                    style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.registerButtonText}>Create Account</Text>
                    )}
                  </TouchableOpacity>

                  {/* Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Social Register */}
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.socialButtonContainer}>
                      <Image
                        source={require("../../assets/search.png")}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialButtonText}> Sign up with Google</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Sign In Link */}
                  <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                      <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              // Email Verification Screen
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Verify Email</Text>
                  <Text style={styles.subtitle}>
                    We sent a verification code to {formData.email}
                  </Text>
                </View>

                <View style={styles.form}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Verification Code</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter verification code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                        maxLength={6}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                    onPress={handleVerifyEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.registerButtonText}>Verify Email</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={resendCode} style={styles.resendButton}>
                    <Text style={styles.resendText}>Didn't receive the code? Resend</Text>
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
    backgroundColor: '#BABDB6',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginTop:30,
  },
  headerTitle: {
    marginTop:30,
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  titleContainer: {
    top: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
},
inputWrapper: {
flexDirection: 'row',
alignItems: 'center',
borderWidth: 1,
borderColor: '#E1E5E9',
borderRadius: 12,
paddingHorizontal: 16,
backgroundColor: '#F8F9FA',
},
inputIcon: {
marginRight: 12,
},
textInput: {
flex: 1,
paddingVertical: 16,
fontSize: 16,
color: '#333',
},
eyeIcon: {
padding: 4,
},
termsContainer: {
flexDirection: 'row',
alignItems: 'flex-start',
marginBottom: 30,
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
color: '#666',
lineHeight: 20,
},
termsLink: {
fontSize: 14,
color: '#549216',
fontWeight: '600',
lineHeight: 20,
},
registerButton: {
backgroundColor: '#73D216',
paddingVertical: 16,
borderRadius: 12,
alignItems: 'center',
marginBottom: 20,
elevation: 2,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
},
registerButtonDisabled: {
opacity: 0.7,
},
registerButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: '600',
},
divider: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 20,
},
dividerLine: {
flex: 1,
height: 1,
backgroundColor: '#E1E5E9',
},
dividerText: {
marginHorizontal: 16,
color: '#666',
fontSize: 14,
},
socialButtonContainer:{
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
},
socialButton: {
borderWidth: 1,
borderColor: '#E1E5E9',
paddingVertical: 16,
borderRadius: 12,
alignItems: 'center',
marginBottom: 30,
},
 socialIcon: {
    width: 20,
    height: 20,
  },
socialButtonText: {
color: '#333',
fontSize: 16,
fontWeight: '500',
},
signInContainer: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
},
signInText: {
color: '#666',
fontSize: 14,
},
signInLink: {
color: '#549216',
fontSize: 14,
fontWeight: '600',
},
});