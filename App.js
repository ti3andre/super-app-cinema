// Navbar com suas renderizações
import { useState, useMemo } from "react";
import "react-native-gesture-handler";

import Home from "./src/pages/home/Home";
import Description from "./src/pages/home/Description";
import Search from "./src/pages/search/Search";
import ProfileScreen from "./src/pages/home/ProfileScreen";
import InfoPage from "./src/pages/home/Info";
import Voucher from "./src/pages/voucher/Voucher";
import CitiesCinema from "./src/pages/voucher/CitiesCinema";
import ShoppingCart from "./src/pages/voucher/ShoppingCart";
import BuyHistory from "./src/pages/history/BuyHistory";
import Heart from "./src/pages/heart/Heart";
import ComboCategory from "./src/pages/voucher/ComboCategory";
import VoucherCategory from "./src/pages/voucher/VoucherCategory";
import TotalPay from "./src/pages/voucher/TotalPay";
import ModalSearch from "./src/components/ModalSearch";

import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { NavigationContainer, } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


import DarkTheme from "./src/theme/DarkTheme";
import DefaultTheme from "./src/theme/DefaultTheme";
import { AppContext } from './src/context/AppContext';
import { MovieContext, MovieProvider } from "./src/context/MovieContext";

// import { useTheme } from '@react-navigation/native';


const Bottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Initial" component={Home} />
      <Stack.Screen name="Description" component={Description} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Info" component={InfoPage} />
    </Stack.Navigator>
  );
}

function StackToVoucher() {

  return (
    <Stack.Navigator
      initialRouteName="VoucherStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="VoucherStack" component={Voucher} />
      <Stack.Screen name="CitiesCinema" component={CitiesCinema} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
      <Stack.Screen name="VoucherCategory" component={VoucherCategory} />
      <Stack.Screen name="ComboCategory" component={ComboCategory} />
      <Stack.Screen name="TotalPay" component={TotalPay} />      
    </Stack.Navigator>
  );
  
};

export default function App() {

  // const { colors } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme
    }
  });

  const styles = StyleSheet.create({
    navIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkTheme ? '#fff' : '#fff',
      borderRadius: 50,
      width: 55,
      height: 55,
      marginBottom: 5,
      marginLeft: 5,
    },
  
    navIconGreen: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00A24D",
      borderRadius: 50,
      width: 55,
      height: 55,
      marginBottom: 5,
      marginLeft: 5,
    },
  });
  

  return (
    <SafeAreaProvider style={{ flex: 1,  }}>
        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
          <MovieProvider>
            <AppContext.Provider value={appContext}>
              <Bottom.Navigator
                screenOptions={{
                  headerShown: false,
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                  tabBarStyle: {
                    height: 70,
                    backgroundColor: isDarkTheme? '#979797' : '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: "absolute",
                  },
                }}
              >
                <Bottom.Screen
                  name="Home"
                  component={StackNavigator}
                  options={{
                    tabBarIcon: ({ focused }) => {
                      return (
                        <View
                          style={!focused ? styles.navIcon : styles.navIconGreen}
                        >
                          <Entypo
                            name="home"
                            size={33}
                            color={!focused ? "#979797" : "#fff"}
                          />
                        </View>
                      );
                    },
                    tabBarLabel: () => null,
                  }}
                />
                <Bottom.Screen
                  name="Search"
                  component={Search}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                        <Feather name="search" size={33} color={!focused ? "#979797" : "#fff"} />
                      </View>
                    ),
                    tabBarLabel: () => null,
                  }}
                />

                <Bottom.Screen
                  name="Voucher"
                  component={StackToVoucher}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                        <FontAwesome5 name="ticket-alt" size={33} color={!focused ? "#979797" : "#fff"} />
                      </View>
                    ),
                    tabBarLabel: () => null,
                  }}
                />
                <Bottom.Screen
                  name="Heart"
                  component={Heart}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                        <Feather name="heart" size={33} color={!focused ? "#979797" : "#fff"} />
                      </View>
                    ),
                    tabBarLabel: () => null,
                  }}
                />
                <Bottom.Screen
                  name="BuyHistory"
                  component={BuyHistory}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                        <Feather name="file-text" size={33} color={!focused ? "#979797" : "#fff"} />
                      </View>
                    ),
                    tabBarLabel: () => null,
                  }}
                />
              </Bottom.Navigator>
              <ModalSearch
                isVisibleModal={isModalVisible}
                setIsVisibleModal={setIsModalVisible}
              />           
            </AppContext.Provider>
          </MovieProvider>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
