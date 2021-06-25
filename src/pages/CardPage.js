import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import firebase from "../utils/firebase";

export default function CardPage(props) {
  const initalState = {
    title: "",
    price: "",
    description: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, title) => {
    setState({ ...state, [title]: value });
  };

  const saveNewBook = async () => {
    if (state.title === "") {
      alert("please provide a Title");
    } else {
      try {
        await firebase.firestore(firebase).collection("Libros").add({
          title: state.title,
          price: state.price,
          description: state.description,
        });

        props.navigation.navigate("ListItem");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          onChangeText={(value) => handleChangeText(value, "title")}
          value={state.title}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Precio"
          onChangeText={(value) => handleChangeText(value, "price")}
          value={state.price}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          onChangeText={(value) => handleChangeText(value, "description")}
          value={state.description}
        />
      </View>

      <TouchableOpacity style={styles.buttons} onPress={() => saveNewBook()}>
        <text>Guardar</text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    textAlign: "center",
    padding: 20,
  },
  input: {
    height: 35,
    width: "100%",
    color: "#fff",
    marginBottom: 25,
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 0,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#055E7F",
    color: "#055E7F",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
  inputGroup: {
    padding: 20,
  },
});
