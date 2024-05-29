import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../Screens/Splash";
import BoardingScreen from "../Screens/Boarding";
import LoginStack from "./LoginStack";
import DrawerStack from "./Drawer";
import Login from "../Screens/Auth/LoginScreen/Login";
import ForgetPassword from "../Screens/Auth/LoginScreen/ForgetPassword";
import Verification from "../Screens/Auth/LoginScreen/Verification";
import NewPassword from "../Screens/Auth/LoginScreen/NewPassword";
import SignUp from "../Screens/Auth/SignUp";
import PasswordSuccessful from "../Screens/Auth/LoginScreen/PasswordSuccessful";
import SuccessfulSign from "../Screens/Auth/SuccessSign";

const Stack = createStackNavigator();

const GuestStack = () => {
    const [showBoarding, setShowBoarding] = useState(true);

    useEffect(() => {
        // Check AsyncStorage to see if the boarding screen has been shown before
        // AsyncStorage.getItem("boarding_screen_shown")
        //     .then((value) => {
        //         if (value !== "true") {
        //             // Boarding screen has not been shown, so set showBoarding to true
        //             setShowBoarding(true);
        //             // After showing the boarding screen, set the flag to true
        //             AsyncStorage.setItem("boarding_screen_shown", "true");
        //         } else {
        //             // Boarding screen has been shown before, so set showBoarding to false
        //             setShowBoarding(false);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error accessing AsyncStorage:", error);
        //     });
    }, []);

    return (
        <Stack.Navigator initialRouteName={"DrawerStack"} screenOptions={{ headerShown: false }}>
      
            <Stack.Screen name='DrawerStack' component={DrawerStack} options={{ headerShown: false }} />
            <Stack.Screen name="Loginx" component={Login} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="PasswordSuccessful" component={PasswordSuccessful} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SuccessfulSign" component={SuccessfulSign} />
        </Stack.Navigator>
    );
}

export default GuestStack;