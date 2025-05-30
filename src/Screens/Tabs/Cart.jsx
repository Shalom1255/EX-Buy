// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Alert,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import { useCart } from '../../Components/CartContext';

// const Cart = () => {
//   const [promoCode, setPromoCode] = useState('');
  
//   const {
//     cartItems,
//     appliedPromo,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     applyPromoCode,
//     removePromoCode,
//     getCartItemsCount,
//     getSubtotal,
//     getSavings,
//     getShippingCost,
//     getTax,
//     getTotal,
//   } = useCart();

//   const handleApplyPromoCode = () => {
//     if (promoCode.trim()) {
//       const success = applyPromoCode(promoCode);
//       if (success) {
//         setPromoCode('');
//       }
//     } else {
//       Alert.alert('Error', 'Please enter a promo code');
//     }
//   };

//   const handleRemovePromoCode = () => {
//     removePromoCode();
//     setPromoCode('');
//   };

//   const proceedToCheckout = () => {
//     const outOfStockItems = cartItems.filter(item => !item.inStock);
//     if (outOfStockItems.length > 0) {
//       Alert.alert('Out of Stock', 'Some items in your cart are out of stock. Please remove them to continue.');
//       return;
//     }
//     if (cartItems.length === 0) {
//       Alert.alert('Empty Cart', 'Please add some items to your cart first.');
//       return;
//     }
//     Alert.alert('Checkout', 'Proceeding to checkout...');
//   };

//   const renderCartItem = ({ item }) => (
//     <View style={styles.cartItem}>
//       <Image source={{ uri: item.image }} style={styles.itemImage} />
      
//       <View style={styles.itemDetails}>
//         <View style={styles.itemHeader}>
//           <Text style={styles.itemBrand}>{item.brand}</Text>
//           {!item.inStock && (
//             <Text style={styles.outOfStockBadge}>Out of Stock</Text>
//           )}
//         </View>
        
//         <Text style={styles.itemName} numberOfLines={2}>
//           {item.name}
//         </Text>
        
//         <View style={styles.itemSpecs}>
//           {item.color && <Text style={styles.specText}>Color: {item.color}</Text>}
//           {item.storage && <Text style={styles.specText}>Storage: {item.storage}</Text>}
//         </View>
        
//         <View style={styles.priceRow}>
//           <View style={styles.priceContainer}>
//             <Text style={styles.currentPrice}>${item.price}</Text>
//             {item.originalPrice > item.price && (
//               <Text style={styles.originalPrice}>${item.originalPrice}</Text>
//             )}
//           </View>
          
//           <View style={styles.quantityControls}>
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => updateQuantity(item.id, item.quantity - 1)}
//             >
//               <Text style={styles.quantityButtonText}>−</Text>
//             </TouchableOpacity>
            
//             <Text style={styles.quantityText}>{item.quantity}</Text>
            
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => updateQuantity(item.id, item.quantity + 1)}
//             >
//               <Text style={styles.quantityButtonText}>+</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         <TouchableOpacity
//           style={styles.removeButton}
//           onPress={() => removeFromCart(item.id)}
//         >
//           <Text style={styles.removeButtonText}>🗑️ Remove</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderHeader = () => (
//     <View style={styles.header}>
//       <TouchableOpacity style={styles.backButton}>
//         <Text style={styles.backIcon}>←</Text>
//       </TouchableOpacity>
//       <Text style={styles.headerTitle}>Shopping Cart</Text>
//       <View style={styles.headerActions}>
//         <Text style={styles.itemCount}>({getCartItemsCount()} items)</Text>
//         {cartItems.length > 0 && (
//           <TouchableOpacity style={styles.clearAllButton} onPress={clearCart}>
//             <Text style={styles.clearAllText}>Clear All</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );

//   const renderEmptyCart = () => (
//     <View style={styles.emptyCart}>
//       <Text style={styles.emptyCartIcon}>🛒</Text>
//       <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
//       <Text style={styles.emptyCartText}>Add some items to get started</Text>
//       <TouchableOpacity style={styles.shopNowButton}>
//         <Text style={styles.shopNowText}>Start Shopping</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderPromoCodeSection = () => (
//     <View style={styles.promoSection}>
//       <Text style={styles.promoTitle}>Promo Code</Text>
//       {appliedPromo ? (
//         <View style={styles.appliedPromoContainer}>
//           <View style={styles.appliedPromoInfo}>
//             <Text style={styles.appliedPromoCode}>{appliedPromo.code}</Text>
//             <Text style={styles.appliedPromoDescription}>{appliedPromo.description}</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.removePromoButton}
//             onPress={handleRemovePromoCode}
//           >
//             <Text style={styles.removePromoText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.promoInputContainer}>
//           <TextInput
//             style={styles.promoInput}
//             placeholder="Enter promo code"
//             value={promoCode}
//             onChangeText={setPromoCode}
//             autoCapitalize="characters"
//           />
//           <TouchableOpacity
//             style={styles.applyPromoButton}
//             onPress={handleApplyPromoCode}
//           >
//             <Text style={styles.applyPromoText}>Apply</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );

//   const renderOrderSummary = () => (
//     <View style={styles.summaryContainer}>
//       <Text style={styles.summaryTitle}>Order Summary</Text>
      
//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Subtotal</Text>
//         <Text style={styles.summaryValue}>${getSubtotal().toFixed(2)}</Text>
//       </View>
      
//       {getSavings() > 0 && (
//         <View style={styles.summaryRow}>
//           <Text style={styles.savingsLabel}>You Save</Text>
//           <Text style={styles.savingsValue}>-${getSavings().toFixed(2)}</Text>
//         </View>
//       )}
      
//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>
//           Shipping {getShippingCost() === 0 && '(Free)'}
//         </Text>
//         <Text style={styles.summaryValue}>
//           {getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}
//         </Text>
//       </View>
      
//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Tax</Text>
//         <Text style={styles.summaryValue}>${getTax().toFixed(2)}</Text>
//       </View>
      
//       {appliedPromo && appliedPromo.discount > 0 && (
//         <View style={styles.summaryRow}>
//           <Text style={styles.promoLabel}>Promo ({appliedPromo.code})</Text>
//           <Text style={styles.promoValue}>
//             -${(getSubtotal() * appliedPromo.discount).toFixed(2)}
//           </Text>
//         </View>
//       )}
      
//       <View style={styles.divider} />
      
//       <View style={styles.totalRow}>
//         <Text style={styles.totalLabel}>Total</Text>
//         <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
//       </View>
      
//       {getShippingCost() > 0 && getSubtotal() < 500 && (
//         <Text style={styles.freeShippingText}>
//           Add ${(500 - getSubtotal()).toFixed(2)} more for free shipping
//         </Text>
//       )}
//     </View>
//   );

//   if (cartItems.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//         {renderHeader()}
//         {renderEmptyCart()}
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       {renderHeader()}
      
//       <FlatList
//         data={cartItems}
//         renderItem={renderCartItem}
//         keyExtractor={(item) => item.id}
//         style={styles.cartList}
//         showsVerticalScrollIndicator={false}
//         ListFooterComponent={
//           <View>
//             {renderPromoCodeSection()}
//             {renderOrderSummary()}
//           </View>
//         }
//       />
      
//       <View style={styles.checkoutContainer}>
//         <TouchableOpacity
//           style={[
//             styles.checkoutButton,
//             cartItems.some(item => !item.inStock) && styles.disabledButton
//           ]}
//           onPress={proceedToCheckout}
//           disabled={cartItems.some(item => !item.inStock)}
//         >
//           <Text style={styles.checkoutText}>
//             Proceed to Checkout • ${getTotal().toFixed(2)}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   backIcon: {
//     fontSize: 20,
//     color: '#1A1A1A',
//     fontWeight: '600',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     flex: 1,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemCount: {
//     fontSize: 14,
//     color: '#666666',
//     marginRight: 12,
//   },
//   clearAllButton: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   clearAllText: {
//     fontSize: 12,
//     color: '#FF3B30',
//     fontWeight: '500',
//   },
//   cartList: {
//     flex: 1,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 16,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   itemBrand: {
//     fontSize: 12,
//     color: '#666666',
//     fontWeight: '500',
//   },
//   outOfStockBadge: {
//     fontSize: 10,
//     color: '#FF3B30',
//     backgroundColor: '#FFE5E5',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     fontWeight: '600',
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   itemSpecs: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   specText: {
//     fontSize: 12,
//     color: '#666666',
//     marginRight: 16,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   currentPrice: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 14,
//     color: '#999999',
//     textDecorationLine: 'line-through',
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     borderRadius: 6,
//   },
//   quantityButton: {
//     width: 32,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#007AFF',
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     paddingHorizontal: 16,
//   },
//   removeButton: {
//     alignSelf: 'flex-start',
//   },
//   removeButtonText: {
//     fontSize: 12,
//     color: '#FF3B30',
//     fontWeight: '500',
//   },
//   promoSection: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   promoTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 12,
//   },
//   promoInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   promoInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 14,
//     marginRight: 12,
//   },
//   applyPromoButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   applyPromoText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   appliedPromoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#E8F5E8',
//     borderRadius: 8,
//     padding: 12,
//   },
//   appliedPromoInfo: {
//     flex: 1,
//   },
//   appliedPromoCode: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#34C759',
//     marginBottom: 2,
//   },
//   appliedPromoDescription: {
//     fontSize: 12,
//     color: '#666666',
//   },
//   removePromoButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   removePromoText: {
//     fontSize: 12,
//     color: '#FF3B30',
//     fontWeight: '500',
//   },
//   summaryContainer: {
//     backgroundColor: '#FFFFFF',
//     margin: 16,
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   summaryValue: {
//     fontSize: 14,
//     color: '#1A1A1A',
//     fontWeight: '500',
//   },
//   savingsLabel: {
//     fontSize: 14,
//     color: '#34C759',
//     fontWeight: '500',
//   },
//   savingsValue: {
//     fontSize: 14,
//     color: '#34C759',
//     fontWeight: '600',
//   },
//   promoLabel: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '500',
//   },
//   promoValue: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E5E5',
//     marginVertical: 16,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalLabel: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   totalValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   freeShippingText: {
//     fontSize: 12,
//     color: '#34C759',
//     textAlign: 'center',
//     marginTop: 12,
//     fontWeight: '500',
//   },
//   checkoutContainer: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E5E5',
//   },
//   checkoutButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#CCCCCC',
//   },
//   checkoutText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   emptyCart: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 40,
//   },
//   emptyCartIcon: {
//     fontSize: 80,
//     marginBottom: 20,
//   },
//   emptyCartTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 12,
//   },
//   emptyCartText: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   shopNowButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 32,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   shopNowText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });

// export default Cart;