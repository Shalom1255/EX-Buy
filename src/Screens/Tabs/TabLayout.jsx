// src/Nav/TabLayout.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Correct import for Expo
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Alternative for react-native-vector-icons

// Import cart context and hook
import { useCart } from "../../Components/CartContext"; // Your cart context hook
// import { useSelector } from 'react-redux'; // If using Redux

import Home from "./Home";
import Cart from "./Cart";
import Chat from "./Chat";
import Profile from "./Profile";
import Create from "./Create";

const Tab = createMaterialBottomTabNavigator();

// Professional color scheme
const COLORS = {
  primary: "#2563EB", // Professional blue
  secondary: "#64748B", // Neutral gray
  background: "#FFFFFF", // Clean white
  surface: "#F8FAFC", // Light surface
  accent: "#0EA5E9", // Accent blue
};

// Professional tab configuration
const tabScreenOptions = {
  shifting: false,
  labeled: true,
  activeColor: COLORS.primary,
  inactiveColor: COLORS.secondary,
  barStyle: {
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
};

// Icon rendering function for consistency
const renderTabIcon = (iconName, focused, color) => (
  <MaterialCommunityIcons
    name={iconName}
    size={24}
    color={color}
    style={{
      marginBottom: focused ? 2 : 0,
    }}
  />
);

// Cart icon with badge
const renderCartIcon = (focused, color, cartCount) => (
  <View style={styles.cartIconContainer}>
    <MaterialCommunityIcons
      name="cart-outline"
      size={24}
      color={color}
      style={{
        marginBottom: focused ? 2 : 0,
      }}
    />
    {cartCount > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>
          {cartCount > 99 ? "99+" : cartCount}
        </Text>
      </View>
    )}
  </View>
);

const TabLayout = () => {
  // Using cart context hook
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Shop",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("home-outline", focused, color),
          tabBarAccessibilityLabel: "Navigate to Home",
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, color }) =>
            renderCartIcon(focused, color, cartCount),
          tabBarAccessibilityLabel: "Navigate to Shopping Cart",
        }}
      />

      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("plus-circle", focused, color),
          tabBarAccessibilityLabel: "Navigate to Create",
        }}
      />

      <Tab.Screen
        name="Messages"
        component={Chat}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("message-text-outline", focused, color),
          tabBarAccessibilityLabel: "Navigate to Messages",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("account-outline", focused, color),
          tabBarAccessibilityLabel: "Navigate to Profile",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -12,
    backgroundColor: "#EF4444", // Red color for badge
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TabLayout;
