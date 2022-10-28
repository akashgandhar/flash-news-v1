import React, { useEffect } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useRewardedAd } from 'react-native-google-mobile-ads';


function Article(props) {
  const adUnitId = "ca-app-pub-8729155062978089/9306411390";

    const { isLoaded, isClosed, load, show } = useRewardedAd(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });
    
      useEffect(() => {
        // Start loading the interstitial straight away
        load();
      }, [load]);
    
      useEffect(() => {
        if (isClosed) {
          // Action after the ad is closed
          WebBrowser.openBrowserAsync(props.url);
        }
      }, [isClosed,WebBrowser]);
  
  // const goToSource = () => {
  //   WebBrowser.openBrowserAsync(props.url);
  // };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (isLoaded) {
          show();
        } else {
          // No advert ready to show yet
          WebBrowser.openBrowserAsync(props.url);
        }
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: props.urlToImage,
        }}
      />

      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{props.title}</Text>

        <Text style={styles.discription}>{props.description}</Text>

        <View style={styles.data}>
          <Text style={styles.heading}>
            By: <Text style={styles.author}>{props.author}</Text>
          </Text>
          <Text style={styles.date}>{props.publishedAt}</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.source}>{props.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Article;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    shadowRadius: 2,
    width: "90%",
    alignSelf: "center",
    borderRadius: 40,
    shadowOpacity: 0.5,
    shadowColor: "#f3b61f",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#f3b61f",
    margin: 15,
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  discription: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  heading: {},
  author: {
    fontWeight: "bold",
    fontSize: 15,
  },
  date: {
    fontWeight: "bold",
    Color: "red",
    fontSize: 15,
  },
  source: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
});
