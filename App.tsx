import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LATITUDE = 37.541;
const LONGITUDE = 126.986;


const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
      <Text>Home!</Text>
  );
}

function SearchScreen() {
  return <Text>Search</Text>;
}


const App = (): React.JSX.Element => {
  const mapRef = useRef<MapView>(null);

  const getCamera = async () => {
    const camera = await mapRef.current?.getCamera();
    Alert.alert('Current camera', JSON.stringify(camera), [{text: 'OK'}], {
      cancelable: true,
    });
  };

  const setCamera = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      mapRef.current?.setCamera({
        heading: camera.heading + 10,
      });
    }
  };

  const animateCamera = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      // 카메라의 각 속성이 undefined일 경우 기본값을 설정
      camera.heading = (camera.heading ?? 0) + 40;
      camera.pitch = (camera.pitch ?? 0) + 10;
      camera.altitude = (camera.altitude ?? 1000) + 1000; // 기본값을 1000으로 설정
      camera.zoom = (camera.zoom ?? 10) - 1;
      camera.center.latitude = (camera.center.latitude ?? LATITUDE) + 0.5;
      mapRef.current?.animateCamera(camera, {duration: 2000});
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <MapView
          ref={mapRef}
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: 37.541,
            longitude: 126.986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          initialCamera={{
            center: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
            },
            pitch: 45,
            heading: 90,
            altitude: 1000,
            zoom: 10,
          }}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default App;
