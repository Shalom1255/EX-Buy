import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Code, Step 3: New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const COLORS = {
    primary: '#2563EB',
    text: '#1E293B',
    secondary: '#64748B',
    placeholder: '#94A3B8',
    bg: '#FFFFFF',
    border: '#E2E8F0',
    danger: '#EF4444',
  };

  const handleNext = () => {
    if (step === 1 && !email.includes('@')) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address');
    }
    if (step === 2 && code.length < 4) {
      return Alert.alert('Invalid Code', 'Enter the 4-digit reset code');
    }
    if (step === 3 && newPassword.length < 6) {
      return Alert.alert('Weak Password', 'Password must be at least 6 characters');
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (step === 3) {
        Alert.alert('Success', 'Password reset successful', [
          { text: 'Sign In', onPress: () => navigation.navigate('SignIn') },
        ]);
      } else {
        setStep(step + 1);
      }
    }, 1000);
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  const renderInputField = (label, value, onChange, iconName, placeholder, secureTextEntry = false) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ color: COLORS.text, fontWeight: '600', marginBottom: 8 }}>{label}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: COLORS.border,
          borderRadius: 12,
          paddingHorizontal: 16,
          backgroundColor: COLORS.bg,
          minHeight: 56,
        }}
      >
        <Ionicons name={iconName} size={20} color={COLORS.placeholder} style={{ marginRight: 10 }} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={secureTextEntry}
          style={{ flex: 1, fontSize: 16, color: COLORS.text }}
        />
      </View>
    </View>
  );

  const getTitleAndSubtitle = () => {
    switch (step) {
      case 1:
        return {
          title: 'Forgot Password?',
          subtitle: 'Enter the email address you used to register.',
        };
      case 2:
        return {
          title: 'Enter Code',
          subtitle: 'Check your email for a 4-digit reset code.',
        };
      case 3:
        return {
          title: 'Reset Password',
          subtitle: 'Enter your new password to complete the reset.',
        };
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} keyboardShouldPersistTaps="handled">
          {/* Back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#F1F5F9',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={{ fontSize: 28, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>{title}</Text>
          <Text style={{ fontSize: 16, color: COLORS.secondary, marginBottom: 32 }}>{subtitle}</Text>

          {/* Form Steps */}
          {step === 1 &&
            renderInputField('Email Address', email, setEmail, 'mail-outline', 'Enter your email')}
          {step === 2 &&
            renderInputField('Reset Code', code, setCode, 'key-outline', 'Enter the 4-digit code')}
          {step === 3 &&
            renderInputField('New Password', newPassword, setNewPassword, 'lock-closed-outline', 'Enter new password', true)}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={loading}
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 16,
              marginTop: 8,
              minHeight: 56,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                {step === 3 ? 'Reset Password' : 'Continue'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign in link (only on step 1) */}
          {step === 1 && (
            <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: COLORS.secondary }}>Remember password? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={{ color: COLORS.primary, fontWeight: '600' }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
