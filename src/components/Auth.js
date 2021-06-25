import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import LoginForm from "../pages/LoginPage";
import image from "../img/Fondo.jpg";
import RegisterForm from "../pages/RegisterPage";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
      <ImageBackground source={image} style={styles.image}>
        {isLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
  },
});
