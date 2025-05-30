import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const StylistApp = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const categories = [
    { name: 'Beauty', icon: '💄', color: '#FFE4E6' },
    { name: 'Fashion', icon: '👗', color: '#E0F2FE' },
    { name: 'Kids', icon: '🧸', color: '#F0F9FF' },
    { name: 'Mens', icon: '👔', color: '#F0FDF4' },
    { name: 'Womens', icon: '👠', color: '#FEF3C7' },
  ];

  const dealProducts = [
    {
      id: 1,
      name: 'Women Printed Kurta',
      price: '$1500',
      originalPrice: '$2499',
      rating: 4.5,
      reviews: 344,
      image: 'https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Kurta',
    },
    {
      id: 2,
      name: 'HRX by Hrithik Roshan',
      price: '$2499',
      rating: 4.2,
      reviews: 344,
      image: 'https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=Shoes',
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      name: 'IWC Schaffhausen 2019 Pilot\'s Watch "SIHH 2019" 44mm',
      price: '$650',
      originalPrice: '$1599',
      image: 'https://via.placeholder.com/100x100/2C3E50/FFFFFF?text=Watch',
    },
    {
      id: 2,
      name: 'Labbin White Sneakers For Men and Female',
      price: '$650',
      originalPrice: '$1240',
      image: 'https://via.placeholder.com/100x100/E74C3C/FFFFFF?text=Sneakers',
    },
    {
      id: 3,
      name: 'Gamma Shoes (Set of 7)',
      price: '$750',
      image: 'https://via.placeholder.com/100x100/9B59B6/FFFFFF?text=Shoes',
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <Icon name="menu" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.brandName}>Stylish</Text>
      </View>

      <TouchableOpacity style={styles.profileIcon}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/32x32/E74C3C/FFFFFF?text=U' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search any Product..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
      />
      <TouchableOpacity>
        <Icon name="mic" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );

  const renderFilterSort = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.allFeatured}>All Featured</Text>
      <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Sort</Text>
          <Icon name="swap-vertical" size={16} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
          <Icon name="filter" size={16} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategories = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={[styles.categoryItem, { backgroundColor: category.color }]}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPromoBanner = () => (
    <View style={styles.promoBanner}>
      <View style={styles.promoContent}>
        <Text style={styles.promoDiscount}>50-40% OFF</Text>
        <Text style={styles.promoSubtext}>Now in (product)</Text>
        <Text style={styles.promoSubtext}>All colours</Text>
        <TouchableOpacity style={styles.shopNowButton}>
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
      <Image 
        source={{ uri: 'https://via.placeholder.com/120x160/FFFFFF/FF69B4?text=Model' }}
        style={styles.promoImage}
      />
    </View>
  );

  const renderDealOfDay = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Icon name="time" size={16} color="#4A90E2" />
          <Text style={styles.sectionTitle}>Deal of the Day</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all →</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.timeRemaining}>⏰ 22h 55m 20s remaining</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dealProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <TouchableOpacity style={styles.favoriteIcon}>
              <Icon name="heart-outline" size={16} color="#999" />
            </TouchableOpacity>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★★★★☆</Text>
              <Text style={styles.reviewCount}>({product.reviews})</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderSpecialOffers = () => (
    <View style={styles.specialOffersContainer}>
      <View style={styles.specialOffersHeader}>
        <View style={styles.specialOffersIcon}>
          <Text>🎁</Text>
        </View>
        <View>
          <Text style={styles.specialOffersTitle}>Special Offers</Text>
          <Text style={styles.specialOffersSubtitle}>We make sure you get the offer you need at best prices</Text>
        </View>
      </View>
    </View>
  );

  const renderFlatHeels = () => (
    <View style={styles.flatHeelsContainer}>
      <View style={styles.flatHeelsContent}>
        <Text style={styles.flatHeelsTitle}>Flat and Heels</Text>
        <Text style={styles.flatHeelsSubtitle}>Stand a chance to get rewarded</Text>
        <TouchableOpacity style={styles.visitNowButton}>
          <Text style={styles.visitNowText}>Visit now →</Text>
        </TouchableOpacity>
      </View>
      <Image 
        source={{ uri: 'https://via.placeholder.com/80x80/CCCCCC/FFFFFF?text=Heels' }}
        style={styles.flatHeelsImage}
      />
    </View>
  );

  const renderTrendingProducts = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.trendingTitle}>Trending Products</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all →</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.trendingSubtitle}>📈 Last Date 29/02/22</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {trendingProducts.map((product) => (
          <View key={product.id} style={styles.trendingProductCard}>
            <Image source={{ uri: product.image }} style={styles.trendingProductImage} />
            <Text style={styles.trendingProductName} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.trendingProductPrice}>{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.trendingOriginalPrice}>{product.originalPrice}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderSummerSale = () => (
    <View style={styles.summerSaleContainer}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/350x150/FF6B6B/FFFFFF?text=Hot+Summer+Sale' }}
        style={styles.summerSaleImage}
      />
    </View>
  );

  const renderNewArrivals = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all →</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.newArrivalsSubtitle}>Summer '25 Collections</Text>
    </View>
  );

  const renderSponsored = () => (
    <View style={styles.sponsoredContainer}>
      <Text style={styles.sponsoredTitle}>Sponsored</Text>
      <View style={styles.sponsoredBanner}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/350x200/8B4513/FFFFFF?text=UP+TO+50%25+OFF' }}
          style={styles.sponsoredImage}
        />
        <Text style={styles.sponsoredText}>up to 50% Off</Text>
      </View>
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      {[
        { name: 'Home', icon: 'home', isActive: true },
        { name: 'Wishlist', icon: 'heart-outline', isActive: false },
        { name: 'Cart', icon: 'bag-outline', isActive: false },
        { name: 'Search', icon: 'search', isActive: false },
        { name: 'Setting', icon: 'settings-outline', isActive: false },
      ].map((tab, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.bottomNavItem}
          onPress={() => setActiveTab(tab.name)}
        >
          <Icon 
            name={tab.icon} 
            size={24} 
            color={tab.isActive ? '#E74C3C' : '#999'} 
          />
          <Text style={[styles.bottomNavText, { color: tab.isActive ? '#E74C3C' : '#999' }]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {renderHeader()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSearchBar()}
        {renderFilterSort()}
        {renderCategories()}
        {renderPromoBanner()}
        {renderDealOfDay()}
        {renderSpecialOffers()}
        {renderFlatHeels()}
        {renderTrendingProducts()}
        {renderSummerSale()}
        {renderNewArrivals()}
        {renderSponsored()}
        
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  allFeatured: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    minWidth: 70,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  promoBanner: {
    backgroundColor: '#FF69B4',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  promoContent: {
    flex: 1,
  },
  promoDiscount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  promoSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  shopNowButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  shopNowText: {
    color: '#FF69B4',
    fontSize: 14,
    fontWeight: '600',
  },
  promoImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4A90E2',
  },
  timeRemaining: {
    fontSize: 12,
    color: '#4A90E2',
    marginBottom: 16,
  },
  productCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    lineHeight: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 11,
    color: '#666',
  },
  specialOffersContainer: {
    backgroundColor: '#FFF5F5',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  specialOffersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialOffersIcon: {
    marginRight: 12,
  },
  specialOffersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialOffersSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  flatHeelsContainer: {
    backgroundColor: '#FFF9E6',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  flatHeelsContent: {
    flex: 1,
  },
  flatHeelsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  flatHeelsSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  visitNowButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  visitNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  flatHeelsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  trendingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  trendingProductCard: {
    width: 120,
    marginRight: 16,
  },
  trendingProductImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  trendingProductName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    lineHeight: 16,
  },
  trendingProductPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  trendingOriginalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  summerSaleContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  summerSaleImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  newArrivalsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sponsoredContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sponsoredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sponsoredBanner: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  sponsoredImage: {
    width: '100%',
    height: 200,
  },
  sponsoredText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default StylistApp;