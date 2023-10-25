import React from "react";
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextComponent, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardAccount from "../components/CardAccount";
import CardMovie from "../components/CardMovie";
export default function Account() {
  const infoCard = [
    {
      id: 1,
      title: "Ratings",
      desc: "Rate and Get Recommendations",
    },
    {
      id: 2,
      title: "Lists",
      desc: "Add to Lists",
    },
    {
      id: 3,
      title: "Reviews",
      desc: "No Reviews Yet",
    },
  ];

  const indonesian = [
    {
      id: 1,
      title: "The Big 4",
      rating: 6.1,
      imgUrl: "https://upload.wikimedia.org/wikipedia/id/8/88/Poster_film_The_Big_4.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=sQQJEiESrK0",
    },
    {
      id: 2,
      title: "The Night Comes for Us",
      rating: 6.9,
      imgUrl: "https://i0.wp.com/storage.waploaded.com/images/dcfa77a8814d717a851a668d39d25db4.jpg?w=900&ulb=true&ssl=1",
      trailerUrl: "https://www.youtube.com/watch?v=HfSisHrUTLM",
    },
    {
      id: 3,
      title: "Headshot",
      rating: 6.3,
      imgUrl: "https://thumbor.prod.vidiocdn.com/Tx0keCDZVRPfC5HYnOtlUPY8IYs=/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/832/headshot-d17638.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=yXhoytk0Hfw",
    },
    {
      id: 4,
      title: "Warkop DKI Reborn: Jangkrik Boss! Part 1",
      rating: 7.4,
      imgUrl: "https://upload.wikimedia.org/wikipedia/id/5/55/WDKI_reborn.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=lmuNabammwk",
    },
    {
      id: 5,
      title: "Warkop DKI Reborn: Jangkrik Boss! Part 2",
      rating: 7.5,
      imgUrl: "https://www.bukukita.com/babacms/displaybuku/101909_f.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=RqG20t70PP4",
    },
    {
      id: 6,
      title: "99 Cahaya di Langit Eropa",
      rating: 5.6,
      imgUrl: "https://upload.wikimedia.org/wikipedia/id/3/32/99_Cahaya_di_Langit_Eropa.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=OUPQ4kMD620",
    },
    {
      id: 7,
      title: "KKN di Desa Penari",
      rating: 5.9,
      imgUrl: "https://cdn.cgv.id/uploads/movie/compressed/22024900.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=01BPk6M37qs",
    },
    {
      id: 8,
      title: "Bukan Pocong Biasa",
      rating: 7.5,
      imgUrl: "https://upload.wikimedia.org/wikipedia/id/d/de/Poster_Bukan_Pocong_Biasa.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=hzmmTAC_sPo",
    },
  ];

  const RenderCard = ({ el }) => {
    const { desc, title } = el.item;
    return <CardAccount desc={desc} title={title} />;
  };

  const RenderMovies = React.memo(({ movie }) => {
    return <CardMovie title={movie.item.title} imageUrl={movie.item.imgUrl} slug={movie.item.slug} id={movie.item.id} rating={movie.item.rating} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingVertical: 10 }}>
        {/* top */}
        <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center", flex: 1 }}>
            <Ionicons name="person-circle-sharp" size={23} color="#ffd40f" />
            <Text style={styles.text}>Sajad</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Ionicons name="settings-outline" color="white" size={23} />
          </View>
        </View>
        {/* end top */}

        <View style={{ marginTop: 20, paddingVertical: 20, backgroundColor: "hsla(0,0%,100%,.08)" }}>
          <FlatList data={infoCard} renderItem={(el) => <RenderCard el={el} />} keyExtractor={(el) => el.id} horizontal={true}></FlatList>
        </View>

        <View style={{ marginTop: 20, paddingVertical: 20, backgroundColor: "hsla(0,0%,100%,.08)" }}>
          <View style={styles.sectionChild}>
            <Text style={{ color: "white", fontSize: 20, color: "white", fontWeight: "bold" }}>Watchlist</Text>
          </View>
          <Text style={{ color: "white", marginLeft: 10 }}>Create a Watchlist and never miss a movie or TV show</Text>
          <View style={styles.watchlist}>
            <Pressable>
              <Text style={{ fontWeight: "bold" }}>Add to Watchlist</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 20, paddingVertical: 20, backgroundColor: "hsla(0,0%,100%,.08)" }}>
          <View style={styles.sectionChild}>
            <Text style={{ color: "white", fontSize: 20, color: "white", fontWeight: "bold" }}>Recently viewed</Text>
          </View>
          <FlatList data={indonesian} renderItem={(movie) => <RenderMovies movie={movie} />} keyExtractor={(movie) => movie.id} horizontal={true}></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  sectionChild: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "yellow",
  },
  watchlist: {
    marginTop: 40,
    backgroundColor: "#ffd40f",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    alignItems: "center",
    borderRadius: 10,
  },
});
