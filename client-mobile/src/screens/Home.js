import React from "react";
import { FlatList, StyleSheet, View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import CardMovie from "../components/CardMovie";
import CardUpNext from "../components/CardUpNext";
import loader from "../assets/loader.gif";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      rating
      title
      imgUrl
      imgCover
      slug
      id
    }
  }
`;

export default function Home({ navigation }) {
  const { data, loading, error } = useQuery(GET_MOVIES);

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

  const RenderIndonesianMovies = ({ movie }) => {
    return <CardMovie title={movie.item.title} imageUrl={movie.item.imgUrl} id={movie.item.id} rating={movie.item.rating} navigation={navigation} />;
  };

  const RenderMovies = React.memo(({ movie }) => {
    return <CardMovie title={movie.item.title} imageUrl={movie.item.imgUrl} slug={movie.item.slug} id={movie.item.id} rating={movie.item.rating} navigation={navigation} />;
  });

  const RenderUpNext = React.memo(({ movie }) => {
    return <CardUpNext title={movie.item.title} imageUrl={movie.item.imgUrl} imgCover={movie.item.imgCover} trailerUrl={movie.item.trailerUrl} />;
  });

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
        <Image source={loader} style={{ width: 50 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  const movies = data.getMovies;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.section}>
            {movies ? <FlatList data={movies} renderItem={(movie) => <RenderUpNext movie={movie} />} keyExtractor={(movie) => movie.id} horizontal={true} /> : ""}
            <View style={{ padding: 10 }}>
              <Text style={{ color: "white", fontSize: 15, marginVertical: 10 }}>Browse trailers and videos</Text>
            </View>
          </View>

          {/* movies */}
          <View>
            <View style={styles.section}>
              <Text style={{ color: "white", fontSize: 25, color: "yellow", fontWeight: "bold" }}>Playing</Text>
            </View>
            {movies ? <FlatList data={movies} renderItem={(movie) => <RenderMovies movie={movie} />} keyExtractor={(movie) => movie.id} horizontal={true} /> : ""}
          </View>

          {/* indonesian movies */}
          <View style={{ marginTop: 20, flex: 1 }}>
            <View style={styles.sectionChild}>
              <Text style={{ color: "white", fontSize: 20, color: "white", fontWeight: "bold" }}>Indonesian Movies</Text>
            </View>
            <FlatList style={{ marginTop: 10 }} data={indonesian} renderItem={(movie) => <RenderIndonesianMovies movie={movie} />} keyExtractor={(movie) => movie.id} horizontal={true} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  section: {
    padding: 10,
  },
  sectionChild: {
    paddingLeft: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "yellow",
  },
});
