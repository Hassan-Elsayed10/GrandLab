import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconperson from 'react-native-vector-icons/Ionicons';
import HomeStack from "./HomeStack";
import OfferScreen from "../Screens/Offers";
import { View, Image, Text } from "react-native";
import ProfileStack from "./profileStack";
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const { t, i18n } = useTranslation(); // Use the t function to translate text

  return (
    <View style={{ flex: 1}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#475AD7",
          tabBarInactiveTintColor: "#abc4ff",
          tabBarStyle: { height: 70,width:'100%',borderTopRightRadius:10,borderTopLeftRadius:10},
          // Adjust the height as per your requirement
        }}
      >
        <Tab.Screen
          component={HomeStack}
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{alignItems:'center',flex:1}}>
                <Entypo name="home" color={color} size={35} width={'100%'} />
                <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', color,width:'100%' }}>{t('TabHome')}</Text>
              </View>),
            // tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <Tab.Screen
          component={OfferScreen}
          name="Offer"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{alignItems:'center',flex:1}}>
                <Icon name="local-offer" color={color} size={35} width={'100%'} />
                <Text style={{ fontSize:18, fontWeight: '700', color,width:'100%',flex:1}}>{t('TabOffer')}</Text>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          component={ProfileStack}
          name="ProfileStack"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{alignItems:'center',flex:1}}>
                <Iconperson name="person-sharp" color={color} size={35} width={'100%'} />
                <Text style={{ fontSize:18, fontWeight: '700', color,width:'100%',}}>{t('TabProfile')}</Text>
              </View>
            ),
            headerShown: false,
          }}
        />

      </Tab.Navigator>
    </View>
  );
}

export default HomeTabs;
