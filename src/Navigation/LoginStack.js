import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../Screens/Splash";
import BoardingScreen from "../Screens/Boarding";
import Login from "../Screens/Auth/LoginScreen/Login";
import ForgetPassword from "../Screens/Auth/LoginScreen/ForgetPassword";
import Verification from "../Screens/Auth/LoginScreen/Verification";
import NewPassword from "../Screens/Auth/LoginScreen/NewPassword";
import SignUp from "../Screens/Auth/SignUp";
import DrawerStack from "./Drawer";
import HomeTabs from "./HomeTabs";
import PasswordSuccessful from "../Screens/Auth/LoginScreen/PasswordSuccessful";
import SuccessfulSign from "../Screens/Auth/SuccessSign";

const Stack = createStackNavigator();

const LoginStack = () => {

  return (
    <Stack.Navigator initialRouteName= {"DrawerStack"} screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="BoardingScreen" component={BoardingScreen} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="PasswordSuccessful" component={PasswordSuccessful} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SuccessfulSign" component={SuccessfulSign} />
          <Stack.Screen name="DrawerStack" component={DrawerStack} />
    </Stack.Navigator>
  );
};

export default LoginStack;
