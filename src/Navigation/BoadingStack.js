import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BoardingScreen from "../Screens/Boarding";
import LangScreen from "../Screens/Boarding/LANG";

const Stack = createStackNavigator();

const BoardingStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LangScreen" component={LangScreen} />
            <Stack.Screen name="BoardingScreen" component={BoardingScreen} />
        </Stack.Navigator>
    );
};

export default BoardingStack;
