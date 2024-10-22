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
    // <View style={styles.container}>
    //   <View>
    //     <MapView
    //       ref={mapRef}
    //       style={{width: '100%', height: '100%'}}
    //       initialRegion={{
    //         latitude: 37.541,
    //         longitude: 126.986,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       }}
    //       // initialCamera={{
    //       //   center: {
    //       //     latitude: LATITUDE,
    //       //     longitude: LONGITUDE,
    //       //   },
    //       //   pitch: 45,
    //       //   heading: 90,
    //       //   altitude: 1000,
    //       //   zoom: 10,
    //       // }}
    //     />
    //   </View>
    // </View>

    <React.Fragment>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home"
          screenOptions={{
            headerShown: false, // 헤더를 표시하지 않음
            // tabBarActiveTintColor: '#fb8c00', // 활성화된 탭의 색상
            // tabBarInactiveTintColor: '#000', // 비활성화된 탭의 색상
            // tabBarStyle: { // 탭바의 스타일
            //   backgroundColor: '#fff',
            //   borderTopColor: '#eee',
            //   height: 60,
            // },
            // tabBarShowLabel: false, // 라벨을 표시하지 않음
            // tabBarLabelStyle: { // 라벨의 스타일
            //   fontSize: 12,
            // },
            tabBarBadgeStyle: { // 배지의 스타일
              backgroundColor: '#ff6f00',
              color: '#fff',
            },
            tabBarBadge: 3, // 배지의 숫자
            // tabBarActiveBackgroundColor: '#eee', // 활성화된 탭의 배경색
            // tabBarInactiveBackgroundColor: '#fff', // 비활성화된 탭의 배경색
            // tabBarPosition: 'bottom', // 탭바의 위치
            // tabBarHideOnKeyboard: true, // 키보드가 나타나면 탭바를 숨김
            // tabBarVisible: false, // 탭바를 숨김
            unmountOnBlur: true, // 화면을 벗어나면 컴포넌트를 언마운트
            lazy: true, // 탭을 선택할 때 컴포넌트를 렌더링

          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '홈',
              tabBarIcon: ({color, size}) => (
                <Icon name="delete" color={color} size={size} />
                // <View><Text>dd</Text></View>
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              title: '알림',
              tabBarIcon: ({color, size}) => (
                <Icon name="notifications" color={color} size={size} />
              ),
            }}
          />          
        </Tab.Navigator>
      </NavigationContainer>
    </React.Fragment>
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
