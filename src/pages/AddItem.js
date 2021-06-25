import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import firebase from "../utils/firebase";

import "firebase/firestore";

export default function AddItem(props) {
  const initialState = {
    id: "",
    title: "",
    price: "",
    description: "",
  };
  const [book, setBook] = useState(initialState);
  console.log(book);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setBook({ ...book, [prop]: value });
    console.log(book);
  };

  const getBookById = async (id) => {
    const dbRef = firebase.firestore(firebase).collection("Libros").doc(id);
    console.log(dbRef);
    const doc = await dbRef.get();
    const book = doc.data();
    setBook({ ...book, id: doc.id });
    setLoading(false);
    console.log(book);
  };

  const updateBook = async () => {
    const bookRef = firebase
      .firestore(firebase)
      .collection("Libros")
      .doc(book.id);
    await bookRef.set({
      title: book.title,
      price: book.price,
      description: book.description,
    });
    setBook(initialState);
    props.navigation.navigate("ListItem");
  };

  const deleteBook = async () => {
    setLoading(true);
    const dbRef = firebase
      .firestore(firebase)
      .collection("Libros")
      .doc(props.route.params.bookId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("ListItem");
  };

  useEffect(() => {
    getBookById(props.route.params.bookId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <>
      <Title>
        Titulo:{" "}
        <TextInput
          style={[styles.input && { borderColor: "#940c0c" }]}
          placeholder="Titulo"
          placeholderTextColor="#969696"
          value={book.title}
          onChangeText={(value) => handleTextChange(value, "title")}
        />
      </Title>

      <Title>
        Precio:{" "}
        <TextInput
          style={[styles.input && { borderColor: "#940c0c" }]}
          placeholder="Precio"
          placeholderTextColor="#969696"
          value={book.price}
          onChangeText={(value) => handleTextChange(value, "price")}
        />
      </Title>

      <Card>
        <Card.Content>
          <Card.Cover
            source={{
              uri: "https://www.xlsemanal.com/wp-content/uploads/sites/3/2020/03/todo-lo-que-un-libro-de-papel-puede-hacer-por-tu-cerebro-abrelo.jpg",
            }}
          />
          <Paragraph>
            <text>Descripción: </text>
            {book.description}
          </Paragraph>
        </Card.Content>

        <Card.Actions>
          <View style={styles.btn}>
            <Button
              title="Eliminar"
              onPress={() => deleteBook()}
              color="#055E7F"
            />
          </View>
          <View>
            <Button
              title="Actualizar"
              onPress={() => updateBook()}
              color="#055E7F"
            />
          </View>
        </Card.Actions>
      </Card>
      <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});
