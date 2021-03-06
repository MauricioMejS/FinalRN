import React from "react";
import { Image, StyleSheet } from "react-native";
import logo from "../img/Logo.png";

export default function Logo() {
  return <Image source={logo} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 6,
  },
});
