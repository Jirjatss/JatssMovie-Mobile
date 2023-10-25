import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default CardMovie = ({ title, rating, imageUrl, navigation, slug }) => {
  const maxLength = 4;
  const truncateTitle = (title) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const handlePress = () => {
    if (slug) {
      navigation.navigate("Details", {
        movieSlug: slug,
        name: title,
      });
    }
  };

  return (
    <Pressable onPress={handlePress} disabled={!slug}>
      <View style={styles.card}>
        <Card.Cover source={{ uri: imageUrl ? `${imageUrl}` : "" }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text variant="bodySmall" style={styles.textRating}>
            ⭐ {rating}
          </Text>
          <Text variant="titleMedium" style={styles.text}>
            {truncateTitle(title)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 260,
    borderRadius: 0,
    margin: 5,
    position: "relative",
    backgroundColor: "hsla(0,0%,100%,.10)",
    overflow: "hidden",
  },
  cardContent: {
    padding: 10,
  },
  image: {
    borderRadius: 0,
  },
  text: {
    color: "white",
  },
  textRating: {
    color: "white",
    fontSize: 12,
  },
});
