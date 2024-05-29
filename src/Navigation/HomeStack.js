import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LabScreen from "../Screens/Labs";
import OfferScreen from "../Screens/Offers";
import AnnouncementScreen from "../Screens/Announcement";
import TestCondition from "../Screens/TestCondition.js";
import PackageScreen from "../Screens/PackageScreen/PackageScreen";
import HomeScreen from "../Screens/HomeScreen";
import PackageDetails from "../Screens/PackageScreen/PackageDetails";
import BookTest from "../Screens/BookTest";
import HomeVisit from "../Screens/Homevisit";
import ResultScreen from "../Screens/Result";
import SuccessfulResult from "../Screens/Result/SuccessResult";
import SuccessfulBook from "../Screens/BookTest/Success";
import ShowResult from "../Screens/Result/showResult";
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='LabScreen' component={LabScreen} options={{ headerShown: false }} />
            <Stack.Screen name='OfferScreen' component={OfferScreen} options={{ headerShown: false }} />
            <Stack.Screen name='AnnouncementScreen' component={AnnouncementScreen} options={{ headerShown: false }} />
            <Stack.Screen name='TestCondition' component={TestCondition} options={{ headerShown: false }} />
            <Stack.Screen name='PackageScreen' component={PackageScreen} options={{ headerShown: false }} />
            <Stack.Screen name='PackageDetails' component={PackageDetails} options={{ headerShown: false }} />
            <Stack.Screen name='BookTest' component={BookTest} options={{ headerShown: false }} />
            <Stack.Screen name='HomeVisit' component={HomeVisit} options={{ headerShown: false }} />
            <Stack.Screen name='SuccessfulBook' component={SuccessfulBook} options={{ headerShown: false }} />
            <Stack.Screen name='ResultScreen' component={ResultScreen} options={{ headerShown: false }} />
            <Stack.Screen name='SuccessfulResult' component={SuccessfulResult} options={{ headerShown: false }} />
            <Stack.Screen name='ShowResult' component={ShowResult} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export default HomeStack;