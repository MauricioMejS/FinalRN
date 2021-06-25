import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import firebase from "./src/utils/firebase";
import "firebase/auth/";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddItem from "./src/pages/AddItem";
import ListItem from "./src/pages/ItemList";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import CardPage from "./src/pages/CardPage";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{ title: "Add Item" }}
      />
      <Stack.Screen
        name="ListItem"
        component={ListItem}
        options={{ title: "ListItem" }}
      />
      <Stack.Screen
        name="CardPage"
        component={CardPage}
        options={{ title: "CardPage" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.background}>
          <MyStack />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  },
});
