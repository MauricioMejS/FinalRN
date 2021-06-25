import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import firebase from "../utils/firebase.js";

export default function ItemList(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase
      .firestore(firebase)
      .collection("Libros")
      .onSnapshot((querySnapshot) => {
        const books = [];
        querySnapshot.docs.forEach((doc) => {
          const { title, price, description } = doc.data();
          books.push({
            id: doc.id,
            title,
            price,
            description,
          });
        });
        console.log(books);
        setBooks(books);
      });
  }, []);

  return (
    <View style={styles.container}>
      {books.map((books) => (
        <ListItem
          key={books.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("AddItem", {
              bookId: books.id,
            });
          }}
        >
          <Avatar
            source={{
              uri: "https://www.xlsemanal.com/wp-content/uploads/sites/3/2020/03/todo-lo-que-un-libro-de-papel-puede-hacer-por-tu-cerebro-abrelo.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Titulo: {books.title}</ListItem.Title>
            <ListItem.Subtitle>Precio: {books.price}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={styles.containerFooter}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            props.navigation.navigate("LoginPage"), firebase.auth().signOut();
          }}
        >
          <text>Cerrar Sesión</text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("CardPage");
          }}
          style={styles.buttons}
        >
          <text>Vender</text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerFooter: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: "25%",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  buttons: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#055E7F",
    fontSize: 20,
    color: "#FFFFFF",
    width: "100%",
  },
});
