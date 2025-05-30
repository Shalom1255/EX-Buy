import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Professional color scheme
const COLORS = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  secondary: '#64748B',
  accent: '#0EA5E9',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
  },
  indicator: {
    active: '#2563EB',
    inactive: '#CBD5E1',
  },
};

// Professional slide content
const slides = [
  {
    id: '1',
    title: 'Innovative Software Solutions',
    description: 'Cutting-edge technology solutions designed to transform your business operations and drive digital excellence.',
    image: require('../../assets/images/icon4.png'),
  },
  {
    id: '2',
    title: 'Tailored IT Services',
    description: 'Customized IT services that align perfectly with your business goals and operational requirements.',
    image: require('../../assets/images/icon3.png'),
  },
  {
    id: '3',
    title: 'Reliable IT Support',
    description: '24/7 professional IT support ensuring your systems run smoothly and your business never stops.',
    image: require('../../assets/images/icon2.png'),
  },
];

const Onboard = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ 
        index: currentIndex + 1,
        animated: true 
      });
    } else {
      navigation.navigate('SignIn');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignIn');
  };

  const handleGetStarted = () => {
    navigation.navigate('SignIn');
  };

  const isLastSlide = currentIndex === slides.length - 1;

  const renderItem = ({ item, index }) => (
    <View style={styles.slideContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header with Skip Button */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        {!isLastSlide && (
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>

        {/* Text Content */}
        <View style={styles.textSection}>
          {/* Page Indicators */}
          <View style={styles.indicatorContainer}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  currentIndex === i ? styles.activeIndicator : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>

          {/* Title and Description */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Action Area */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 30 }]}>
        {isLastSlide ? (
          <TouchableOpacity 
            style={styles.getStartedButton} 
            onPress={handleGetStarted}
            activeOpacity={0.9}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
            activeOpacity={0.9}
          >
            <Ionicons name="arrow-forward" size={24} color={COLORS.background} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ref={flatListRef}
        bounces={false}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slideContainer: {
    flex: 1,
    width,
    backgroundColor: COLORS.background,
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'flex-end',
    height: 60,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
  },
  skipText: {
    color: COLORS.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  image: {
    width: width * 0.65,
    height: width * 0.65,
    resizeMode: 'contain',
  },
  textSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    transition: 'all 0.3s ease',
  },
  activeIndicator: {
    width: 32,
    backgroundColor: COLORS.indicator.active,
  },
  inactiveIndicator: {
    width: 8,
    backgroundColor: COLORS.indicator.inactive,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    letterSpacing: 0.2,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 16,
    width: width * 0.8,
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  getStartedText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});