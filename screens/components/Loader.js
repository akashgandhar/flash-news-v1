
import LottieView from 'lottie-react-native';

export default function Loader() {
  return (
    <LottieView
        autoPlay loop
        // style={{
        //   width: 200,
        //   height: 200,
        //   backgroundColor: '#eee',
        // }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/loader.json')}
      />
  )
}
