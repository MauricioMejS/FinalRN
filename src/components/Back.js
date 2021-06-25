import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import image from "../img/Flecha.png";

class Back extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigation.navigate("Home")}
      >
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 4,
  },
  image: {
    width: 50,
    height: 24,
  },
});

export default Back;
