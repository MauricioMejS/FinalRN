import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Logo from "../components/Logo";
import { validateEmail } from "../utils/validation";
import firebase from "../utils/firebase.js";

const image = {
  uri: "https://images.pexels.com/photos/256453/pexels-photo-256453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export default function LoginPage(props) {
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const login = () => {
    let error = {};
    if (!formData.email || !formData.password) {
      console.log("Error 1");
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
    } else if (!validateEmail(formData.email)) {
      console.log("Error 2");
      error.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("ok");
          props.navigation.navigate("ListItem");
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(error);
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <TextInput
          style={[styles.input, formError.email && styles.errorInput]}
          placeholder="Correo electrónico"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, "email")}
        />
        <TextInput
          style={[styles.input, formError.password && styles.errorInput]}
          placeholder="Contraseña"
          secureTextEntry={true}
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, "password")}
        />

        <TouchableOpacity
          title="Ingresar"
          style={styles.buttons}
          onPress={login}
        >
          <text>Ingresar</text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("RegisterPage");
          }}
        >
          <text style={{ textAlign: "center" }}>
            ¿No tienes cuenta?{" "}
            <span style={{ color: "#055E7F" }}>Registrate</span>
          </text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "25px",
    display: "block",
    top: "15%",
    textAlign: "center",
  },
  input: {
    height: 35,
    width: "100%",
    color: "#fff",
    marginBottom: 25,
    width: "90%",
    paddingHorizontal: 20,
    borderRadius: 0,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#055E7F",
    color: "#055E7F"
  },
  logo: {
    alignItems: "center",
    padding: 20,
  },
  buttons: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#055E7F",
    fontSize: 20,
    borderRadius: 20,
    color: "#FFFFFF",
    marginmarginHorizontal: 16,
  },
  background: {
    width: "100%",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column",
  },
  errorInput: {
    color: "#940c0c",
    borderColor: "940c0c",
  },
});
