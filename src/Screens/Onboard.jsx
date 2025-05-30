import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Innovate Software Solutions',
    description: 'This is my first onboarding screen, which takes me to the next screen',
    image: require('../../assets/images/icon4.png'),
  },
  {
    id: '2',
    title: 'Tailored IT Services',
    description: 'This is my second onboarding screen, which takes me to the next screen',
    image: require('../../assets/images/icon3.png'),
  },
  {
    id: '3',
    title: 'Reliable IT Support',
    description: 'This is my third onboarding screen, which takes me to the next screen',
    image: require('../../assets/images/icon2.png'),
  },
];

const Onboard = () => {
  const navigation = useNavigation();
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
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('SignIn');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignIn');
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.skipbutton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="arrow-forward" size={20} color={'green'} />
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={styles.image} />
      <View style={styles.card}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                currentIndex === i && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Ionicons name="arrow-forward" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
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
    />
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  skipbutton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    color: 'green',
    fontSize: 16,
    marginRight: 5,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    marginTop: 20,
  },
  card: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: 'green',
    width: 12,
    height: 12,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
