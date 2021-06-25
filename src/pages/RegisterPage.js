import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import image from "../img/Fondo.jpg";
import Logo from "../components/Logo";
import { validateEmail } from "../utils/validation";
import firebase from "../utils/firebase";

export default function RegisterPage(props) {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const register = () => {
    console.log("registrando...");
    let error = {};

    if (!formData.email || !formData.password || !formData.confirmPass) {
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
      if (!formData.confirmPass) error.confirmPass = true;
    } else if (!validateEmail(formData.email)) {
      error.email = true;
    } else if (formData.password !== formData.confirmPass) {
      error.password = true;
      error.confirmPass = true;
    } else if (formData.password.length < 6) {
      error.password = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("cuenta creada");
          props.navigation.navigate("ListItem");
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            confirmPass: true,
          });
        });
    }
    setFormError(error);
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
          onChange={(e) =>
            setFormData({ ...formData, email: e.nativeEvent.text })
          }
        />
        <TextInput
          style={[styles.input, formError.password && styles.errorInput]}
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) =>
            setFormData({ ...formData, password: e.nativeEvent.text })
          }
        />
        <TextInput
          style={[styles.input, formError.confirmPass && styles.errorInput]}
          placeholder="Repetir contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange={(e) =>
            setFormData({ ...formData, confirmPass: e.nativeEvent.text })
          }
        />

        <TouchableOpacity
          title="Ingresar"
          style={styles.buttons}
          onPress={register}
        >
          Registrarme
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
function defaultValue() {
  return {
    email: {},
    password: {},
    confirmPass: {},
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
    color: "#055E7F",
  },
  logo: {
    alignItems: "center",
    padding: 20,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#055E7F",
    fontSize: 20,
    borderRadius: 20,
    color: "#FFFFFF",
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
