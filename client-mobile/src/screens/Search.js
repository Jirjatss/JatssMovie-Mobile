import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { SafeAreaView, Text, Image, StyleSheet, View, TextInput, FlatList, Pressable } from "react-native";
import loader from "../assets/loader.gif";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardSearch from "../components/CardSearch";

const GET_DATA = gql`
  query GetMovies {
    Genres {
      name
      id
    }
    getMovies {
      rating
      title
      imgUrl
      imgCover
      slug
      id
      Genre {
        name
        id
      }
      MovieCasts {
        Cast {
          name
        }
      }
      User {
        username
      }
    }
  }
`;

export default function Search({ navigation }) {
  const { loading, error, data } = useQuery(GET_DATA);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    setSelectedGenre(null);
  }, [search]);

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

  const genres = [{ name: "All", id: "all" }, ...data.Genres];
  const movies = data.getMovies;

  const searchMovies = (movies, keyword) => {
    return movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase()));
  };

  const filterMoviesByGenre = (genreId) => {
    setSelectedGenre(genreId === "all" ? null : genreId);
  };

  const filteredByGenreMovies = selectedGenre ? movies.filter((movie) => movie.Genre.id === selectedGenre) : movies;

  const RenderGenres = ({ genre }) => {
    const isSelected = genre.item.id === selectedGenre || (selectedGenre === null && genre.item.id === "all");

    return (
      <Pressable
        onPress={() => filterMoviesByGenre(genre.item.id)}
        style={{
          marginEnd: 3,
          height: 50,
          width: 70,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: isSelected ? "#ffd40f" : "transparent",
        }}
      >
        <Text style={{ color: "gray", fontSize: 17 }}>{genre.item.name}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search-sharp" style={styles.searchIcon} />
          <TextInput style={styles.input} value={search} onChangeText={(text) => setSearch(text)} placeholder="Search Movie by name.." />
        </View>
      </View>
      <View>
        <FlatList data={genres} keyExtractor={(genre) => genre.id} renderItem={(genre) => <RenderGenres genre={genre} />} horizontal={true} />

        <FlatList
          data={search === "" ? (selectedGenre ? filteredByGenreMovies : movies) : searchMovies(filteredByGenreMovies, search)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.movieItem}>
              <CardSearch title={item.title} imgUrl={item.imgUrl} author={item.User.username} genre={item.Genre.name} navigation={navigation} slug={item.slug} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "black",

    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    color: "black",
  },
});
