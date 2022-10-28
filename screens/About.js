import { StyleSheet, Text, View, Image } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export default function About() {
  const adUnitId = 'ca-app-pub-8729155062978089/4497407039';
  return (
    <>
      <View style={styles.contain}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/flash-news-93e4b.appspot.com/o/296305589_150016097689965_814504524111061392_n.jpeg?alt=media&token=5263bdd2-7f83-414e-968b-b0349378d802',
        }}
      />

        <Text style={styles.heading}>developer Information</Text>

        <Text style={{fontSize:14,fontWeight:'bold'}}>developer Name   : <Text style={{fontSize:15,fontWeight:'400'}}>  Akash Gandhar</Text></Text>
        <Text style={{fontSize:14,fontWeight:'bold'}}><Text style={{fontSize:15,fontWeight:'400'}}></Text></Text>
        <Text style={{fontSize:14,fontWeight:'bold'}}>developer Mobile : <Text style={{fontSize:15,fontWeight:'400'}}>  +91 7060996626</Text></Text>
        <Text style={{fontSize:14,fontWeight:'bold'}}><Text style={{fontSize:15,fontWeight:'400'}}></Text></Text>
        <Text style={{fontSize:14,fontWeight:'bold'}}>developer E-Mail  : <Text style={{fontSize:14,fontWeight:'400'}}>  akashgandhar007@gmail.com</Text></Text>
        <Text style={{fontSize:14,fontWeight:'bold'}}><Text style={{fontSize:15,fontWeight:'400'}}></Text></Text>
        <Text style={{fontSize:14,fontWeight:'bold'}}>Credits                  : <Text style={{fontSize:15,fontWeight:'400'}}>  In-Short News</Text></Text>
      </View>
      <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
    </>
  );
}

const styles = StyleSheet.create({
  contain: {
    alignSelf: "center",
    top: "5%",
    paddingBottom: 50,
    padding:20  },
  heading: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    padding: 25,
  },
  logo: {
    alignSelf:'center',
    width: 160,
    height: 200,
    borderRadius:15
  },
});
