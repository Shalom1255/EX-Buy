// import React, { useState, useRef, useMemo } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   TextInput,
//   Alert,
//   Dimensions,
// } from 'react-native';
// import { useCart } from '../../Components/CartContext';

// const { width } = Dimensions.get('window');

// const Shop = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   // Use cart context
//   const { addToCart, getCartItemsCount, isItemInCart, getItemQuantity } = useCart();
//   const cartCount = getCartItemsCount();

//   const bannerRef = useRef(null);
//   const [currentBanner, setCurrentBanner] = useState(0);

//   // Sample data
//   const banners = [
//     {
//       id: '1',
//       image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop',
//       title: 'Summer Sale',
//       subtitle: 'Up to 50% off on electronics',
//       color: '#FF6B35',
//     },
//     {
//       id: '2',
//       image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop',
//       title: 'New Arrivals',
//       subtitle: 'Latest fashion trends',
//       color: '#4ECDC4',
//     },
//     {
//       id: '3',
//       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
//       title: 'Free Shipping',
//       subtitle: 'On orders over $100',
//       color: '#45B7D1',
//     },
//   ];

//   const categories = [
//     { id: 'all', name: 'All', icon: '🏠' },
//     { id: 'electronics', name: 'Electronics', icon: '📱' },
//     { id: 'fashion', name: 'Fashion', icon: '👕' },
//     { id: 'home', name: 'Home', icon: '🏡' },
//     { id: 'books', name: 'Books', icon: '📚' },
//     { id: 'sports', name: 'Sports', icon: '⚽' },
//   ];

//   const featuredProducts = [
//     {
//       id: '1',
//       name: 'iPhone 15 Pro Max',
//       brand: 'Apple',
//       price: 1199,
//       originalPrice: 1299,
//       rating: 4.8,
//       reviews: 2543,
//       image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
//       category: 'electronics',
//       badge: 'Best Seller',
//       badgeColor: '#FF6B35',
//     },
//     {
//       id: '2',
//       name: 'Nike Air Max 270',
//       brand: 'Nike',
//       price: 150,
//       originalPrice: 180,
//       rating: 4.6,
//       reviews: 1234,
//       image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
//       category: 'fashion',
//       badge: 'New',
//       badgeColor: '#34C759',
//     },
//     {
//       id: '3',
//       name: 'MacBook Air M2',
//       brand: 'Apple',
//       price: 1099,
//       originalPrice: 1199,
//       rating: 4.9,
//       reviews: 892,
//       image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
//       category: 'electronics',
//       badge: 'Sale',
//       badgeColor: '#FF3B30',
//     },
//     {
//       id: '4',
//       name: 'Leather Sofa',
//       brand: 'IKEA',
//       price: 899,
//       originalPrice: 999,
//       rating: 4.4,
//       reviews: 456,
//       image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
//       category: 'home',
//     },
//     {
//       id: '5',
//       name: 'Adidas Running Shoes',
//       brand: 'Adidas',
//       price: 120,
//       originalPrice: 150,
//       rating: 4.3,
//       reviews: 678,
//       image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
//       category: 'sports',
//     },
//     {
//       id: '6',
//       name: 'The Great Gatsby',
//       brand: 'Penguin Classics',
//       price: 15,
//       originalPrice: 20,
//       rating: 4.7,
//       reviews: 1245,
//       image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
//       category: 'books',
//     },
//     {
//       id: '7',
//       name: 'Samsung Galaxy S24',
//       brand: 'Samsung',
//       price: 899,
//       originalPrice: 999,
//       rating: 4.5,
//       reviews: 2156,
//       image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
//       category: 'electronics',
//     },
//     {
//       id: '8',
//       name: 'Cotton T-Shirt',
//       brand: 'H&M',
//       price: 25,
//       originalPrice: 35,
//       rating: 4.2,
//       reviews: 543,
//       image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
//       category: 'fashion',
//     },
//   ];

//   const deals = [
//     {
//       id: '1',
//       name: 'AirPods Pro',
//       price: 199,
//       originalPrice: 249,
//       image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200&h=200&fit=crop',
//       discount: '20% OFF',
//     },
//     {
//       id: '2',
//       name: 'Samsung Galaxy Watch',
//       price: 279,
//       originalPrice: 329,
//       image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
//       discount: '15% OFF',
//     },
//     {
//       id: '3',
//       name: 'Sony Headphones',
//       price: 149,
//       originalPrice: 199,
//       image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
//       discount: '25% OFF',
//     },
//   ];

//   // Filter products based on search query and selected category
//   const filteredProducts = useMemo(() => {
//     let filtered = featuredProducts;

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(product => product.category === selectedCategory);
//     }

//     // Filter by search query
//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase().trim();
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(query) ||
//         product.brand.toLowerCase().includes(query) ||
//         product.category.toLowerCase().includes(query)
//       );
//     }

//     return filtered;
//   }, [searchQuery, selectedCategory]);

//   // Clear search function
//   const clearSearch = () => {
//     setSearchQuery('');
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };

//   const renderHeader = () => (
//     <View style={styles.header}>
//       <View style={styles.headerTop}>
//         <View style={styles.locationContainer}>
//           <Text style={styles.locationLabel}>Deliver to</Text>
//           <Text style={styles.locationText}>📍 New York, NY</Text>
//         </View>
        
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <Text style={styles.headerIcon}>🔔</Text>
//             <View style={styles.notificationBadge}>
//               <Text style={styles.badgeText}>2</Text>
//             </View>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.headerButton}>
//             <Text style={styles.headerIcon}>🛒</Text>
//             {cartCount > 0 && (
//               <View style={styles.cartBadge}>
//                 <Text style={styles.badgeText}>{cartCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       <View style={styles.searchContainer}>
//         <Text style={styles.searchIcon}>🔍</Text>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search products, brands..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholderTextColor="#999999"
//           returnKeyType="search"
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
//             <Text style={styles.clearButtonText}>✕</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity style={styles.filterButton}>
//           <Text style={styles.filterIcon}>⚙️</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderBanner = ({ item }) => (
//     <View style={[styles.bannerItem, { backgroundColor: item.color }]}>
//       <Image source={{ uri: item.image }} style={styles.bannerImage} />
//       <View style={styles.bannerOverlay}>
//         <Text style={styles.bannerTitle}>{item.title}</Text>
//         <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
//         <TouchableOpacity style={styles.bannerButton}>
//           <Text style={styles.bannerButtonText}>Shop Now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.categoryItem,
//         selectedCategory === item.id && styles.selectedCategory
//       ]}
//       onPress={() => setSelectedCategory(item.id)}
//     >
//       <Text style={styles.categoryIcon}>{item.icon}</Text>
//       <Text style={[
//         styles.categoryName,
//         selectedCategory === item.id && styles.selectedCategoryText
//       ]}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderProduct = ({ item }) => {
//     const itemInCart = isItemInCart(item.id);
//     const itemQuantity = getItemQuantity(item.id);
    
//     return (
//       <TouchableOpacity style={styles.productCard}>
//         <View style={styles.productImageContainer}>
//           <Image source={{ uri: item.image }} style={styles.productImage} />
//           {item.badge && (
//             <View style={[styles.productBadge, { backgroundColor: item.badgeColor }]}>
//               <Text style={styles.badgeText}>{item.badge}</Text>
//             </View>
//           )}
//           <TouchableOpacity style={styles.favoriteButton}>
//             <Text style={styles.favoriteIcon}>🤍</Text>
//           </TouchableOpacity>
//           {itemInCart && (
//             <View style={styles.inCartIndicator}>
//               <Text style={styles.inCartText}>{itemQuantity}</Text>
//             </View>
//           )}
//         </View>
        
//         <View style={styles.productInfo}>
//           <Text style={styles.productBrand}>{item.brand}</Text>
//           <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          
//           <View style={styles.ratingRow}>
//             <Text style={styles.rating}>⭐ {item.rating}</Text>
//             <Text style={styles.reviews}>({item.reviews})</Text>
//           </View>
          
//           <View style={styles.priceRow}>
//             <View style={styles.priceContainer}>
//               <Text style={styles.currentPrice}>${item.price}</Text>
//               {item.originalPrice > item.price && (
//                 <Text style={styles.originalPrice}>${item.originalPrice}</Text>
//               )}
//             </View>
            
//             <TouchableOpacity
//               style={[
//                 styles.addToCartButton,
//                 itemInCart && styles.addToCartButtonActive
//               ]}
//               onPress={() => handleAddToCart(item)}
//             >
//               <Text style={[
//                 styles.addToCartText,
//                 itemInCart && styles.addToCartTextActive
//               ]}>
//                 {itemInCart ? '✓' : '+'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderDealItem = ({ item }) => (
//     <TouchableOpacity style={styles.dealCard}>
//       <Image source={{ uri: item.image }} style={styles.dealImage} />
//       <View style={styles.dealBadge}>
//         <Text style={styles.dealBadgeText}>{item.discount}</Text>
//       </View>
//       <Text style={styles.dealName} numberOfLines={1}>{item.name}</Text>
//       <View style={styles.dealPriceRow}>
//         <Text style={styles.dealPrice}>${item.price}</Text>
//         <Text style={styles.dealOriginalPrice}>${item.originalPrice}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // Render search results info
//   const renderSearchInfo = () => {
//     if (searchQuery.trim() !== '' || selectedCategory !== 'all') {
//       return (
//         <View style={styles.searchInfoContainer}>
//           <Text style={styles.searchInfoText}>
//             {filteredProducts.length} results found
//             {searchQuery.trim() !== '' && ` for "${searchQuery}"`}
//             {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//           </Text>
//           {(searchQuery.trim() !== '' || selectedCategory !== 'all') && (
//             <TouchableOpacity 
//               style={styles.clearFiltersButton}
//               onPress={() => {
//                 setSearchQuery('');
//                 setSelectedCategory('all');
//               }}
//             >
//               <Text style={styles.clearFiltersText}>Clear all</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       );
//     }
//     return null;
//   };

//   // Render no results message
//   const renderNoResults = () => {
//     if (filteredProducts.length === 0 && (searchQuery.trim() !== '' || selectedCategory !== 'all')) {
//       return (
//         <View style={styles.noResultsContainer}>
//           <Text style={styles.noResultsIcon}>🔍</Text>
//           <Text style={styles.noResultsTitle}>No products found</Text>
//           <Text style={styles.noResultsText}>
//             Try adjusting your search or filter criteria
//           </Text>
//           <TouchableOpacity 
//             style={styles.clearSearchButton}
//             onPress={() => {
//               setSearchQuery('');
//               setSelectedCategory('all');
//             }}
//           >
//             <Text style={styles.clearSearchText}>Clear Search</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }
//     return null;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {renderHeader()}
        
//         {/* Show banners only when not searching */}
//         {searchQuery.trim() === '' && selectedCategory === 'all' && (
//           <>
//             {/* Banner Carousel */}
//             <FlatList
//               ref={bannerRef}
//               data={banners}
//               renderItem={renderBanner}
//               keyExtractor={(item) => item.id}
//               horizontal
//               pagingEnabled
//               showsHorizontalScrollIndicator={false}
//               style={styles.bannerCarousel}
//               onMomentumScrollEnd={(e) => {
//                 const index = Math.round(e.nativeEvent.contentOffset.x / width);
//                 setCurrentBanner(index);
//               }}
//             />
            
//             {/* Banner Indicators */}
//             <View style={styles.bannerIndicators}>
//               {banners.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.indicator,
//                     currentBanner === index && styles.activeIndicator
//                   ]}
//                 />
//               ))}
//             </View>
//           </>
//         )}
        
//         {/* Categories */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>   Categories</Text>
//           <FlatList
//             data={categories}
//             renderItem={renderCategory}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.categoriesList}
//           />
//         </View>
        
//         {/* Show deals only when not searching */}
//         {searchQuery.trim() === '' && selectedCategory === 'all' && (
//           <View style={styles.sectionContainer}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>⚡ Flash Deals</Text>
//               <TouchableOpacity>
//                 <Text style={styles.seeAllText}>See All</Text>
//               </TouchableOpacity>
//             </View>
            
//             <FlatList
//               data={deals}
//               renderItem={renderDealItem}
//               keyExtractor={(item) => item.id}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.dealsList}
//             />
//           </View>
//         )}
        
//         {/* Search Info */}
//         {renderSearchInfo()}
        
//         {/* Featured Products / Search Results */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>
//               {searchQuery.trim() !== '' || selectedCategory !== 'all' 
//                 ? 'Search Results' 
//                 : 'Featured Products'
//               }
//             </Text>
//             {searchQuery.trim() === '' && selectedCategory === 'all' && (
//               <TouchableOpacity>
//                 <Text style={styles.seeAllText}>See All</Text>
//               </TouchableOpacity>
//             )}
//           </View>
          
//           {filteredProducts.length > 0 ? (
//             <FlatList
//               data={filteredProducts}
//               renderItem={renderProduct}
//               keyExtractor={(item) => item.id}
//               numColumns={2}
//               scrollEnabled={false}
//               ItemSeparatorComponent={() => <View style={styles.productSeparator} />}
//               columnWrapperStyle={styles.productRow}
//             />
//           ) : (
//             renderNoResults()
//           )}
//         </View>
        
//         <View style={styles.bottomPadding} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   locationContainer: {
//     flex: 1,
//   },
//   locationLabel: {
//     fontSize: 12,
//     color: '#666666',
//     marginBottom: 2,
//   },
//   locationText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerButton: {
//     position: 'relative',
//     marginLeft: 16,
//   },
//   headerIcon: {
//     fontSize: 20,
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#FF3B30',
//     borderRadius: 8,
//     minWidth: 16,
//     height: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cartBadge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#007AFF',
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   badgeText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//   },
//   searchIcon: {
//     fontSize: 16,
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#1A1A1A',
//   },
//   clearButton: {
//     marginLeft: 8,
//     paddingHorizontal: 8,
//   },
//   clearButtonText: {
//     fontSize: 16,
//     color: '#666666',
//   },
//   filterButton: {
//     marginLeft: 12,
//   },
//   filterIcon: {
//     fontSize: 16,
//   },
//   searchInfoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#F0F9FF',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 8,
//   },
//   searchInfoText: {
//     fontSize: 14,
//     color: '#1A1A1A',
//     flex: 1,
//   },
//   clearFiltersButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: '#007AFF',
//     borderRadius: 6,
//   },
//   clearFiltersText: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     fontWeight: '500',
//   },
//   noResultsContainer: {
//     alignItems: 'center',
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//   },
//   noResultsIcon: {
//     fontSize: 48,
//     marginBottom: 16,
//   },
//   noResultsTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   noResultsText: {
//     fontSize: 14,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   clearSearchButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   clearSearchText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   bannerCarousel: {
//     marginTop: 16,
//   },
//   bannerItem: {
//     width: width,
//     height: 180,
//     position: 'relative',
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//     opacity: 0.8,
//   },
//   bannerOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   bannerTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 8,
//   },
//   bannerSubtitle: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     marginBottom: 20,
//   },
//   bannerButton: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   bannerButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   bannerIndicators: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 12,
//     marginBottom: 16,
//   },
//   indicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#E5E5E5',
//     marginHorizontal: 4,
//   },
//   activeIndicator: {
//     backgroundColor: '#007AFF',
//   },
//   sectionContainer: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   seeAllText: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '500',
//   },
//   categoriesList: {
//     paddingHorizontal: 16,
//   },
//   categoryItem: {
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginRight: 12,
//     minWidth: 80,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   selectedCategory: {
//     backgroundColor: '#007AFF',
//     borderColor: '#007AFF',
//   },
//   categoryIcon: {
//     fontSize: 24,
//     marginBottom: 4,
//   },
//   categoryName: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#666666',
//   },
//   selectedCategoryText: {
//     color: '#FFFFFF',
//   },
//   dealsList: {
//     paddingHorizontal: 16,
//   },
//   dealCard: {
//     width: 120,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 12,
//     marginRight: 12,
//     position: 'relative',
//   },
//   dealImage: {
//     width: '100%',
//     height: 80,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   dealBadge: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#FF3B30',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   dealBadgeText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   dealName: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   dealPriceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dealPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginRight: 4,
//   },
//   dealOriginalPrice: {
//     fontSize: 12,
//     color: '#999999',
//     textDecorationLine: 'line-through',
//   },
//   productRow: {
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   },
//   productCard: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 12,
//     marginHorizontal: 4,
//   },
//   productImageContainer: {
//     position: 'relative',
//     marginBottom: 12,
//   },
//   productImage: {
//     width: '100%',
//     height: 120,
//     borderRadius: 8,
//   },
//   productBadge: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   favoriteButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   favoriteIcon: {
//     fontSize: 14,
//   },
//   inCartIndicator: {
//     position: 'absolute',
//     bottom: 8,
//     right: 8,
//     backgroundColor: '#34C759',
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inCartText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productBrand: {
//     fontSize: 12,
//     color: '#666666',
//     marginBottom: 4,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 6,
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   rating: {
//     fontSize: 12,
//     color: '#FFA500',
//     marginRight: 4,
//   },
//   reviews: {
//     fontSize: 12,
//     color: '#666666',
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   priceContainer: {
//     flex: 1,
//   },
//   currentPrice: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   originalPrice: {
//     fontSize: 12,
//     color: '#999999',
//     textDecorationLine: 'line-through',
//   },
//   addToCartButton: {
//     backgroundColor: '#007AFF',
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addToCartButtonActive: {
//     backgroundColor: '#34C759',
//   },
//   addToCartText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   addToCartTextActive: {
//     fontSize: 14,
//   },
//   productSeparator: {
//     height: 16,
//   },
//   bottomPadding: {
//     height: 40,
//   },
// });

// export default Shop;