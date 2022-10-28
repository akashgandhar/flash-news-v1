import React, { useState, useEffect } from "react";
import { RefreshControl, StyleSheet, FlatList, SafeAreaView } from "react-native";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import Article from "./components/Article";
import {
  BannerAd,
  BannerAdSize,
  MobileAds
} from "react-native-google-mobile-ads";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState([]);
  const adUnitId = 'ca-app-pub-8729155062978089/1559316721'

  const searchArticles = () => {
    axios
      .get(
        "https://gnews.io/api/v4/search?token=d86fc03eb5317b50f46e5e25e77ae9e3",
        {
          params: {
            q: searchText,
            country: 'in',
            // keywords: searchText
          },
        }
      )
      .then(function (response) {
        // handle success
        // console.log(response.data.articles)
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {
        // always executed
      });

    // Optionally the request above could also be done as
    axios
      .get("/user", {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {})
      .catch(function (error) {})
      .then(function () {
        // always executed
      });
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //

  useEffect(() => {
    MobileAds()
      .initialize()
      .then((adapterStatuses) => {
        // Initialization complete!
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={searchArticles}
      />
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={articles}
        renderItem={({ item }) => (
          <Article
            urlToImage={item.image}
            title={item.title}
            // description={item.description}
            author={item.source.name}
            // publishedAt={item.publishedAt}
            // sourceName={item.source.name}
            url={item.url}
          />
        )}
        keyExtractor={(item) => item.title}
      />
      <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    color: "#000",
  },
});

export default SearchScreen;
