import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { StyleSheet, RefreshControl, SafeAreaView, FlatList } from "react-native";
import Article from "./components/Article";
import {
  BannerAd,
  BannerAdSize,
  MobileAds,
} from "react-native-google-mobile-ads";
import Loader from "./components/Loader";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Technology() {
  const [articles, setArticles] = useState([]);
  const adUnitId = 'ca-app-pub-8729155062978089/8991864431';

  const getNews = () => {
    axios
      .get("https://inshorts.deta.dev/news?category=technology", {
        params: {
          country: "in",
        },
      })
      .then(function (response) {
        // handle success
        setArticles(response.data.data);
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

  useEffect(() => {
    getNews();
    MobileAds()
      .initialize()
      .then((adapterStatuses) => {
        // Initialization complete!
      });
  }, [refreshing]);

  return (
    <>
      <Loader />
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={articles.sort((a, b) => a.time < b.time)}
          renderItem={({ item }) => (
            <Article
              urlToImage={item.imageUrl}
              title={item.title}
              description={item.content}
              author={item.author}
              publishedAt={item.date}
              time={item.time}
              url={item.readMoreUrl}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Technology;
