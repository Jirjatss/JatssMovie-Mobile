import * as React from "react";
import { Image, Pressable, StyleSheet, View, Linking } from "react-native";
import { Card, Text } from "react-native-paper";
import playButton from "../assets/play.png";
export default CardUpNext = ({ title, trailerUrl, imageUrl, imgCover }) => {
  const openYoutubeLink = () => {
    Linking.openURL(`${trailerUrl}`);
  };
  return (
    <View style={styles.container}>
      {imgCover ? <Image source={{ uri: `${imgCover}` }} style={styles.backgroundImage} resizeMode="cover" /> : ""}
      <View style={styles.overlay}>
        <Pressable style={styles.playButton} onPress={openYoutubeLink}>
          <Image source={playButton} style={{ width: 50, height: 50 }} resizeMode="cover" />
        </Pressable>
      </View>

      <View style={styles.card}>
        {imageUrl ? <Card.Cover source={{ uri: `${imageUrl}` }} style={styles.image} /> : ""}
        <View style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.text}>
            {title}
          </Text>
          <Text style={styles.textTrailer}>Watch The Trailer</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 400,
    height: 350,
    overflow: "hidden",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // Hitam dengan transparansi 50%
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
    padding: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: "32%",
    position: "absolute",
    bottom: 16,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    borderRadius: 0,
  },
  text: {
    color: "white",
  },
  textTrailer: {
    color: "white",
    fontSize: 10,
  },
  playButton: {
    padding: 10,
    borderRadius: 5,
  },
});
