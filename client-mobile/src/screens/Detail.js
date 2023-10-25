import React from "react";
import { View, Image, Text, StyleSheet, Linking, Pressable, ScrollView, FlatList, ImageBackground, SafeAreaView } from "react-native";
import loader from "../assets/loader.gif";
import playButton from "../assets/play.png";
import blue_star from "../assets/blue_star.png";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  query GetMovies($slug: String) {
    getMovieBySlug(slug: $slug) {
      Genre {
        name
      }
      MovieCasts {
        id
        Cast {
          name
          profilePict
        }
      }
      User {
        username
      }
      id
      imgUrl
      imgCover
      rating
      slug
      synopsis
      title
      trailerUrl
    }
  }
`;

export default function Detail({ route }) {
  const { movieSlug } = route.params;
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: {
      slug: movieSlug,
    },
  });
  const openYoutubeLink = () => {
    Linking.openURL(`${movie.trailerUrl}`);
  };

  const RenderCast = React.memo(({ cast }) => {
    return (
      <View>
        <ImageBackground source={{ uri: cast ? `${cast.item.Cast.profilePict}` : "" }} style={{ width: 120, height: 180, margin: 2 }} />
        <Text style={{ color: "white", textAlign: "center" }}>{cast ? cast.item.Cast.name : ""}</Text>
      </View>
    );
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

  const movie = data.getMovieBySlug;
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        {/* header */}
        <View style={{ padding: 5 }}>
          <Text style={styles.headerTitle}> {movie ? movie.title : ""}</Text>
          <Text style={styles.headerGenre}> {movie ? movie.Genre.name : ""}</Text>
        </View>
        {/* end header */}

        {/* header cover */}
        <View style={{ position: "relative" }}>
          {movie.imgCover && <Image source={{ uri: movie ? `${movie.imgCover}` : "" }} style={styles.imageCover} />}
          <View style={styles.overlay}>
            <Pressable style={styles.playButton} onPress={openYoutubeLink}>
              <Image source={playButton} style={{ width: 50, height: 50 }} resizeMode="cover" />
            </Pressable>
          </View>
        </View>
        {/* end header cover */}

        {/* synopsis */}
        <View style={styles.detailContainer}>
          <View style={{ marginLeft: 20 }}>
            <Image source={{ uri: `${movie.imgUrl}` }} style={styles.imageUrl} />
          </View>
          <View style={{ flex: 1, padding: 10, marginLeft: 10, marginRight: 20 }}>
            <Text style={{ color: "gray", textAlign: "left", marginBottom: 5, fontSize: 17 }}>Synopsis</Text>
            <Text style={styles.synopsis}>{movie ? movie.synopsis : ""}</Text>
          </View>
        </View>
        {/* end synopsis */}

        {/* watchlist */}
        <View style={styles.watchlist}>
          <Pressable>
            <Text style={{ fontWeight: "bold" }}>Add to Watchlist</Text>
          </Pressable>
        </View>
        {/* end watchlist */}

        {/* rating */}
        <View style={styles.ratingContainer}>
          <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
            <Text>⭐</Text>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              {movie ? movie.rating : ""}
              <Text style={{ color: "gray", fontSize: 15 }}>/10</Text>
            </Text>
          </View>
          <View style={{ flex: 1, padding: 15, alignItems: "center" }}>
            <Image source={blue_star} style={{ width: 25, height: 20 }} />
            <Text style={{ color: "#5286ce", fontSize: 17, marginTop: 5 }}>Rate This</Text>
          </View>
          <View style={{ flex: 1, padding: 15, alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 17, marginTop: 5 }}>Critic</Text>
            <Text style={{ color: "white", fontSize: 17, marginTop: 5 }}>reviews</Text>
          </View>
        </View>
        {/* end rating */}

        {/* author */}
        <View style={styles.authorContainer}>
          <View style={styles.sectionChild}>
            <Text style={{ color: "white", fontSize: 17, color: "white", fontWeight: "bold" }}>
              Author : <Text style={{ color: "gray" }}>{movie ? movie.User.username : ""}</Text>
            </Text>
          </View>
        </View>
        {/* end author */}

        {/* author */}
        <View style={styles.castContainer}>
          <View style={styles.sectionChild}>
            <Text style={{ color: "white", fontSize: 17, color: "white", fontWeight: "bold" }}>Casts</Text>
          </View>
          <Text style={{ color: "yellow", marginTop: 20, marginBottom: 5 }}>Top Casts</Text>
          <FlatList data={movie.MovieCasts} renderItem={(cast) => <RenderCast cast={cast} />} keyExtractor={(cast) => cast.id} horizontal={true} />
        </View>
        {/* end author */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },

  headerGenre: {
    color: "white",
    fontSize: 15,
    marginBottom: 10,
  },
  imageCover: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    objectFit: "contain",
  },
  imageUrl: {
    width: 110,
    height: 190,
    objectFit: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  sectionChild: {
    marginTop: 20,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "yellow",
  },
  playButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  detailContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
  },
  synopsis: {
    color: "gray",
    textAlign: "justify",
  },

  watchlist: {
    backgroundColor: "#ffd40f",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    alignItems: "center",
    borderBottomColor: "#3e3e3e",
  },
  ratingContainer: {
    backgroundColor: "#050306",
    paddingHorizontal: 10,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#3e3e3e",
  },
  authorContainer: {
    backgroundColor: "#050306",
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#3e3e3e",
  },
  castContainer: {
    backgroundColor: "#050306",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#3e3e3e",
  },
});
