// import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
// import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Storage keys
// const STORAGE_KEYS = {
//   PRODUCTS: '@products_storage',
//   USER_PRODUCTS: '@user_products_storage',
// };

// // Create Products Context
// const ProductsContext = createContext();

// // Products Actions
// const PRODUCTS_ACTIONS = {
//   ADD_PRODUCT: 'ADD_PRODUCT',
//   UPDATE_PRODUCT: 'UPDATE_PRODUCT',
//   DELETE_PRODUCT: 'DELETE_PRODUCT',
//   SET_PRODUCTS: 'SET_PRODUCTS',
//   SET_USER_PRODUCTS: 'SET_USER_PRODUCTS',
//   TOGGLE_STOCK: 'TOGGLE_STOCK',
//   UPDATE_RATING: 'UPDATE_RATING',
//   LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
//   CLEAR_USER_PRODUCTS: 'CLEAR_USER_PRODUCTS',
// };

// // Initial featured products (default catalog)
// const defaultProducts = [
//   {
//     id: 'default_1',
//     name: 'iPhone 15 Pro Max',
//     brand: 'Apple',
//     price: 1199,
//     originalPrice: 1299,
//     rating: 4.8,
//     reviews: 2543,
//     image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
//     images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop'],
//     category: 'electronics',
//     badge: 'Best Seller',
//     badgeColor: '#FF6B35',
//     description: 'The latest iPhone with titanium design and advanced camera system. Features the most advanced Pro camera system ever, Action button, and USB-C connectivity.',
//     inStock: true,
//     createdAt: '2024-01-01T00:00:00.000Z',
//     updatedAt: '2024-01-01T00:00:00.000Z',
//     seller: 'Apple Store',
//     isUserProduct: false,
//     tags: ['smartphone', 'premium', 'camera'],
//     specifications: {
//       storage: '256GB',
//       color: 'Natural Titanium',
//       warranty: '1 Year',
//     },
//   },
//   {
//     id: 'default_2',
//     name: 'Nike Air Max 270',
//     brand: 'Nike',
//     price: 150,
//     originalPrice: 180,
//     rating: 4.6,
//     reviews: 1234,
//     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
//     images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'],
//     category: 'fashion',
//     badge: 'New',
//     badgeColor: '#34C759',
//     description: 'Comfortable running shoes with Air Max technology. Perfect blend of style and performance for everyday wear.',
//     inStock: true,
//     createdAt: '2024-01-02T00:00:00.000Z',
//     updatedAt: '2024-01-02T00:00:00.000Z',
//     seller: 'Nike Store',
//     isUserProduct: false,
//     tags: ['shoes', 'running', 'comfortable'],
//     specifications: {
//       size: 'Multiple sizes available',
//       material: 'Synthetic leather and mesh',
//       sole: 'Air Max cushioning',
//     },
//   },
//   {
//     id: 'default_3',
//     name: 'MacBook Air M2',
//     brand: 'Apple',
//     price: 1099,
//     originalPrice: 1199,
//     rating: 4.9,
//     reviews: 892,
//     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
//     images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop'],
//     category: 'electronics',
//     badge: 'Sale',
//     badgeColor: '#FF3B30',
//     description: 'Powerful and lightweight laptop with M2 chip. Perfect for work, creativity, and everything in between.',
//     inStock: true,
//     createdAt: '2024-01-03T00:00:00.000Z',
//     updatedAt: '2024-01-03T00:00:00.000Z',
//     seller: 'Apple Store',
//     isUserProduct: false,
//     tags: ['laptop', 'productivity', 'portable'],
//     specifications: {
//       processor: 'Apple M2 chip',
//       memory: '8GB unified memory',
//       storage: '256GB SSD',
//     },
//   },
//   {
//     id: 'default_4',
//     name: 'Leather Sofa',
//     brand: 'IKEA',
//     price: 899,
//     originalPrice: 999,
//     rating: 4.4,
//     reviews: 456,
//     image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
//     images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop'],
//     category: 'home',
//     description: 'Comfortable leather sofa perfect for any living room. High-quality materials and modern design.',
//     inStock: true,
//     createdAt: '2024-01-04T00:00:00.000Z',
//     updatedAt: '2024-01-04T00:00:00.000Z',
//     seller: 'IKEA Store',
//     isUserProduct: false,
//     tags: ['furniture', 'living room', 'leather'],
//     specifications: {
//       material: 'Genuine leather',
//       dimensions: '220cm x 90cm x 85cm',
//       capacity: '3 seats',
//     },
//   },
//   {
//     id: 'default_5',
//     name: 'Adidas Running Shoes',
//     brand: 'Adidas',
//     price: 120,
//     originalPrice: 150,
//     rating: 4.3,
//     reviews: 678,
//     image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
//     images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop'],
//     category: 'sports',
//     description: 'High-performance running shoes for athletes. Designed for speed, comfort, and durability.',
//     inStock: true,
//     createdAt: '2024-01-05T00:00:00.000Z',
//     updatedAt: '2024-01-05T00:00:00.000Z',
//     seller: 'Adidas Store',
//     isUserProduct: false,
//     tags: ['shoes', 'running', 'sports'],
//     specifications: {
//       type: 'Running shoes',
//       technology: 'Boost cushioning',
//       weight: '290g',
//     },
//   },
//   {
//     id: 'default_6',
//     name: 'The Great Gatsby',
//     brand: 'Penguin Classics',
//     price: 15,
//     originalPrice: 20,
//     rating: 4.7,
//     reviews: 1245,
//     image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
//     images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop'],
//     category: 'books',
//     description: 'Classic American literature masterpiece by F. Scott Fitzgerald. A timeless tale of love, wealth, and the American Dream.',
//     inStock: true,
//     createdAt: '2024-01-06T00:00:00.000Z',
//     updatedAt: '2024-01-06T00:00:00.000Z',
//     seller: 'Book Store',
//     isUserProduct: false,
//     tags: ['classic', 'literature', 'american'],
//     specifications: {
//       author: 'F. Scott Fitzgerald',
//       pages: '180',
//       format: 'Paperback',
//     },
//   },
// ];

// // Initial state
// const initialState = {
//   products: [],
//   userProducts: [],
//   loading: false,
//   error: null,
//   initialized: false,
// };

// // Utility functions
// const createProductId = () => {
//   const timestamp = Date.now();
//   const random = Math.random().toString(36).substr(2, 9);
//   return `product_${timestamp}_${random}`;
// };

// const validateProduct = (product) => {
//   const required = ['name', 'brand', 'price', 'description', 'category'];
//   const missing = required.filter(field => !product[field]);
  
//   if (missing.length > 0) {
//     throw new Error(`Missing required fields: ${missing.join(', ')}`);
//   }

//   if (typeof product.price !== 'number' || product.price <= 0) {
//     throw new Error('Price must be a positive number');
//   }

//   if (product.originalPrice && product.originalPrice <= product.price) {
//     throw new Error('Original price must be higher than current price');
//   }

//   return true;
// };

// const sanitizeProduct = (product) => {
//   return {
//     ...product,
//     name: product.name?.trim() || '',
//     brand: product.brand?.trim() || '',
//     description: product.description?.trim() || '',
//     price: parseFloat(product.price) || 0,
//     originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : parseFloat(product.price) || 0,
//     rating: product.rating || 0,
//     reviews: product.reviews || 0,
//     inStock: product.inStock !== false, // Default to true
//     images: Array.isArray(product.images) ? product.images : (product.image ? [product.image] : []),
//     tags: Array.isArray(product.tags) ? product.tags : [],
//     specifications: product.specifications || {},
//   };
// };

// // Products Reducer
// const productsReducer = (state, action) => {
//   switch (action.type) {
//     case PRODUCTS_ACTIONS.LOAD_FROM_STORAGE:
//       return {
//         ...state,
//         products: action.payload.products || defaultProducts,
//         userProducts: action.payload.userProducts || [],
//         initialized: true,
//         loading: false,
//       };

//     case PRODUCTS_ACTIONS.ADD_PRODUCT:
//       try {
//         const sanitized = sanitizeProduct(action.payload);
//         validateProduct(sanitized);

//         const newProduct = {
//           ...sanitized,
//           id: sanitized.id || createProductId(),
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           rating: 0,
//           reviews: 0,
//           badge: sanitized.badge || 'New',
//           badgeColor: sanitized.badgeColor || '#34C759',
//           seller: sanitized.seller || 'You',
//           isUserProduct: true,
//           inStock: true,
//         };

//         const updatedProducts = [newProduct, ...state.products];
//         const updatedUserProducts = [newProduct, ...state.userProducts];

//         return {
//           ...state,
//           products: updatedProducts,
//           userProducts: updatedUserProducts,
//           error: null,
//         };
//       } catch (error) {
//         return {
//           ...state,
//           error: error.message,
//         };
//       }

//     case PRODUCTS_ACTIONS.UPDATE_PRODUCT:
//       try {
//         const { id, updates } = action.payload;
//         const sanitizedUpdates = sanitizeProduct(updates);
        
//         const updatedProduct = {
//           ...sanitizedUpdates,
//           id,
//           updatedAt: new Date().toISOString(),
//         };

//         return {
//           ...state,
//           products: state.products.map(product =>
//             product.id === id ? { ...product, ...updatedProduct } : product
//           ),
//           userProducts: state.userProducts.map(product =>
//             product.id === id ? { ...product, ...updatedProduct } : product
//           ),
//           error: null,
//         };
//       } catch (error) {
//         return {
//           ...state,
//           error: error.message,
//         };
//       }

//     case PRODUCTS_ACTIONS.DELETE_PRODUCT:
//       return {
//         ...state,
//         products: state.products.filter(product => product.id !== action.payload),
//         userProducts: state.userProducts.filter(product => product.id !== action.payload),
//         error: null,
//       };

//     case PRODUCTS_ACTIONS.TOGGLE_STOCK:
//       return {
//         ...state,
//         products: state.products.map(product =>
//           product.id === action.payload
//             ? { ...product, inStock: !product.inStock, updatedAt: new Date().toISOString() }
//             : product
//         ),
//         userProducts: state.userProducts.map(product =>
//           product.id === action.payload
//             ? { ...product, inStock: !product.inStock, updatedAt: new Date().toISOString() }
//             : product
//         ),
//       };

//     case PRODUCTS_ACTIONS.UPDATE_RATING:
//       const { productId, rating, increment = true } = action.payload;
//       return {
//         ...state,
//         products: state.products.map(product => {
//           if (product.id === productId) {
//             const newReviews = increment ? product.reviews + 1 : product.reviews;
//             const newRating = increment 
//               ? ((product.rating * product.reviews) + rating) / newReviews
//               : rating;
            
//             return {
//               ...product,
//               rating: Math.round(newRating * 10) / 10, // Round to 1 decimal
//               reviews: newReviews,
//               updatedAt: new Date().toISOString(),
//             };
//           }
//           return product;
//         }),
//       };

//     case PRODUCTS_ACTIONS.SET_PRODUCTS:
//       return {
//         ...state,
//         products: action.payload,
//         error: null,
//       };

//     case PRODUCTS_ACTIONS.SET_USER_PRODUCTS:
//       return {
//         ...state,
//         userProducts: action.payload,
//         error: null,
//       };

//     case PRODUCTS_ACTIONS.CLEAR_USER_PRODUCTS:
//       return {
//         ...state,
//         products: state.products.filter(product => !product.isUserProduct),
//         userProducts: [],
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

// // Products Provider Component
// export const ProductsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(productsReducer, initialState);

//   // Load data from AsyncStorage on mount
//   useEffect(() => {
//     loadFromStorage();
//   }, []);

//   // Save to storage whenever products or userProducts change
//   useEffect(() => {
//     if (state.initialized) {
//       saveToStorage();
//     }
//   }, [state.products, state.userProducts, state.initialized]);

//   // Storage functions
//   const loadFromStorage = async () => {
//     try {
//       const [productsData, userProductsData] = await Promise.all([
//         AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS),
//         AsyncStorage.getItem(STORAGE_KEYS.USER_PRODUCTS),
//       ]);

//       const products = productsData ? JSON.parse(productsData) : defaultProducts;
//       const userProducts = userProductsData ? JSON.parse(userProductsData) : [];

//       // Merge default products with user products, avoiding duplicates
//       const allProducts = [...defaultProducts];
//       userProducts.forEach(userProduct => {
//         if (!allProducts.some(p => p.id === userProduct.id)) {
//           allProducts.unshift(userProduct); // Add user products at the beginning
//         }
//       });

//       dispatch({
//         type: PRODUCTS_ACTIONS.LOAD_FROM_STORAGE,
//         payload: { products: allProducts, userProducts },
//       });
//     } catch (error) {
//       console.error('Error loading from storage:', error);
//       // Initialize with default products if loading fails
//       dispatch({
//         type: PRODUCTS_ACTIONS.LOAD_FROM_STORAGE,
//         payload: { products: defaultProducts, userProducts: [] },
//       });
//     }
//   };

//   const saveToStorage = async () => {
//     try {
//       await Promise.all([
//         AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products)),
//         AsyncStorage.setItem(STORAGE_KEYS.USER_PRODUCTS, JSON.stringify(state.userProducts)),
//       ]);
//     } catch (error) {
//       console.error('Error saving to storage:', error);
//     }
//   };

//   // Add new product
//   const addProduct = useCallback((productData) => {
//     try {
//       dispatch({ type: PRODUCTS_ACTIONS.ADD_PRODUCT, payload: productData });
//       return { success: true, error: null };
//     } catch (error) {
//       console.error('Error adding product:', error);
//       return { success: false, error: error.message };
//     }
//   }, []);

//   // Update product
//   const updateProduct = useCallback((productId, updates) => {
//     try {
//       dispatch({ 
//         type: PRODUCTS_ACTIONS.UPDATE_PRODUCT, 
//         payload: { id: productId, updates } 
//       });
//       return { success: true, error: null };
//     } catch (error) {
//       console.error('Error updating product:', error);
//       return { success: false, error: error.message };
//     }
//   }, []);

//   // Delete product with confirmation
//   const deleteProduct = useCallback((productId, skipConfirmation = false) => {
//     const performDelete = () => {
//       dispatch({ type: PRODUCTS_ACTIONS.DELETE_PRODUCT, payload: productId });
//     };

//     if (skipConfirmation) {
//       performDelete();
//       return;
//     }

//     Alert.alert(
//       'Delete Product',
//       'Are you sure you want to delete this product? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: performDelete,
//         },
//       ]
//     );
//   }, []);

//   // Toggle product stock status
//   const toggleProductStock = useCallback((productId) => {
//     dispatch({ type: PRODUCTS_ACTIONS.TOGGLE_STOCK, payload: productId });
//   }, []);

//   // Update product rating
//   const updateProductRating = useCallback((productId, rating, increment = true) => {
//     if (rating < 1 || rating > 5) {
//       console.warn('Rating must be between 1 and 5');
//       return;
//     }
//     dispatch({ 
//       type: PRODUCTS_ACTIONS.UPDATE_RATING, 
//       payload: { productId, rating, increment } 
//     });
//   }, []);

//   // Get products by category
//   const getProductsByCategory = useCallback((category) => {
//     if (category === 'all' || !category) return state.products;
//     return state.products.filter(product => 
//       product.category?.toLowerCase() === category.toLowerCase()
//     );
//   }, [state.products]);

//   // Search products with advanced filtering
//   const searchProducts = useCallback((query, filters = {}) => {
//     let filtered = [...state.products];
    
//     // Category filter
//     if (filters.category && filters.category !== 'all') {
//       filtered = filtered.filter(product => 
//         product.category?.toLowerCase() === filters.category.toLowerCase()
//       );
//     }

//     // Price range filter
//     if (filters.minPrice !== undefined) {
//       filtered = filtered.filter(product => product.price >= filters.minPrice);
//     }
//     if (filters.maxPrice !== undefined) {
//       filtered = filtered.filter(product => product.price <= filters.maxPrice);
//     }

//     // Rating filter
//     if (filters.minRating !== undefined) {
//       filtered = filtered.filter(product => product.rating >= filters.minRating);
//     }

//     // Stock filter
//     if (filters.inStock !== undefined) {
//       filtered = filtered.filter(product => product.inStock === filters.inStock);
//     }

//     // User products filter
//     if (filters.userProductsOnly) {
//       filtered = filtered.filter(product => product.isUserProduct);
//     }

//     // Text search
//     if (query && query.trim() !== '') {
//       const searchQuery = query.toLowerCase().trim();
//       filtered = filtered.filter(product =>
//         product.name?.toLowerCase().includes(searchQuery) ||
//         product.brand?.toLowerCase().includes(searchQuery) ||
//         product.category?.toLowerCase().includes(searchQuery) ||
//         product.description?.toLowerCase().includes(searchQuery) ||
//         product.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
//       );
//     }

//     // Sort by relevance or date
//     if (filters.sortBy) {
//       switch (filters.sortBy) {
//         case 'price_asc':
//           filtered.sort((a, b) => a.price - b.price);
//           break;
//         case 'price_desc':
//           filtered.sort((a, b) => b.price - a.price);
//           break;
//         case 'rating':
//           filtered.sort((a, b) => b.rating - a.rating);
//           break;
//         case 'newest':
//           filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           break;
//         case 'oldest':
//           filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//           break;
//         case 'name':
//           filtered.sort((a, b) => a.name.localeCompare(b.name));
//           break;
//         default:
//           break;
//       }
//     }
    
//     return filtered;
//   }, [state.products]);

//   // Get user's products
//   const getUserProducts = useCallback(() => {
//     return state.userProducts;
//   }, [state.userProducts]);

//   // Get product by ID
//   const getProductById = useCallback((productId) => {
//     return state.products.find(product => product.id === productId);
//   }, [state.products]);

//   // Get featured products
//   const getFeaturedProducts = useCallback((limit = 8) => {
//     return state.products
//       .filter(product => product.badge === 'Best Seller' || product.rating >= 4.5)
//       .slice(0, limit);
//   }, [state.products]);

//   // Get newest products
//   const getNewestProducts = useCallback((limit = 6) => {
//     return [...state.products]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, limit);
//   }, [state.products]);

//   // Get products on sale
//   const getSaleProducts = useCallback((limit = 10) => {
//     return state.products
//       .filter(product => product.originalPrice > product.price)
//       .slice(0, limit);
//   }, [state.products]);

//   // Get recommended products based on category
//   const getRecommendedProducts = useCallback((productId, limit = 4) => {
//     const product = getProductById(productId);
//     if (!product) return [];

//     return state.products
//       .filter(p => p.id !== productId && p.category === product.category)
//       .sort((a, b) => b.rating - a.rating)
//       .slice(0, limit);
//   }, [state.products, getProductById]);

//   // Clear all user products
//   const clearUserProducts = useCallback(() => {
//     Alert.alert(
//       'Clear All Products',
//       'Are you sure you want to delete all your products? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Clear All',
//           style: 'destructive',
//           onPress: () => {
//             dispatch({ type: PRODUCTS_ACTIONS.CLEAR_USER_PRODUCTS });
//           },
//         },
//       ]
//     );
//   }, []);

//   // Get product statistics
//   const getProductStats = useCallback(() => {
//     const totalProducts = state.products.length;
//     const userProducts = state.userProducts.length;
//     const defaultProducts = totalProducts - userProducts;
//     const inStockProducts = state.products.filter(p => p.inStock).length;
//     const outOfStockProducts = totalProducts - inStockProducts;
//     const averagePrice = state.products.reduce((sum, p) => sum + p.price, 0) / totalProducts || 0;
//     const averageRating = state.products.reduce((sum, p) => sum + p.rating, 0) / totalProducts || 0;

//     return {
//       totalProducts,
//       userProducts,
//       defaultProducts,
//       inStockProducts,
//       outOfStockProducts,
//       averagePrice: Math.round(averagePrice * 100) / 100,
//       averageRating: Math.round(averageRating * 10) / 10,
//     };
//   }, [state.products, state.userProducts]);

//   const value = {
//     // State
//     products: state.products,
//     userProducts: state.userProducts,
//     loading: state.loading,
//     error: state.error,
//     initialized: state.initialized,
    
//     // Actions
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     toggleProductStock,
//     updateProductRating,
//     clearUserProducts,
    
//     // Helpers
//     getProductsByCategory,
//     searchProducts,
//     getUserProducts,
//     getProductById,
//     getFeaturedProducts,
//     getNewestProducts,
//     getSaleProducts,
//     getRecommendedProducts,
//     getProductStats,
    
//     // Storage
//     loadFromStorage,
//     saveToStorage,
//   };

//   return (
//     <ProductsContext.Provider value={value}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };

// // Custom hook to use products context
// export const useProducts = () => {
//   const context = useContext(ProductsContext);
//   if (!context) {
//     throw new Error('useProducts must be used within a ProductsProvider');
//   }
//   return context;
// };

// // HOC for components that need products
// export const withProducts = (Component) => {
//   return function ProductsComponent(props) {
//     const productsContext = useProducts();
//     return <Component {...props} products={productsContext} />;
//   };
// };

// // Product validation utilities
// export const ProductValidation = {
//   validateProduct,
//   sanitizeProduct,
//   createProductId,
// };

// // Export action types for external use
// export { PRODUCTS_ACTIONS };

// export default ProductsContext;