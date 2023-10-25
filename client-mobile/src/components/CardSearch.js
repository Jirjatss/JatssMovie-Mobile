import React from "react";
import { Image, Text, View, Pressable } from "react-native";

export default function CardSearch({ author, imgUrl, title, genre, navigation, slug }) {
  const handlePress = () => {
    if (slug) {
      navigation.push("Details", {
        movieSlug: slug,
        name: title,
      });
    }
  };
  return (
    <Pressable onPress={handlePress} disabled={!slug}>
      <View style={{ flexDirection: "row", paddingVertical: 5, borderBottomWidth: 0.3, borderBottomColor: "hsla(0,0%,100%,.2)" }}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: `${imgUrl}` }} style={{ width: 75, height: 80, objectFit: "contain" }} />
        </View>
        <View style={{ flex: 5, justifyContent: "center", gap: 3 }}>
          <Text style={{ color: "white" }}>{title}</Text>
          <Text style={{ color: "gray" }}>{genre}</Text>
          <Text style={{ color: "gray" }}>{author}</Text>
        </View>
      </View>
    </Pressable>
  );
}
