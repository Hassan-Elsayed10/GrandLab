import { NavigationContainer } from "@react-navigation/native";
import DrawerStack from "./Drawer";
import { useEffect, useState } from 'react'; // Import useEffect and useState
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import GuestStack from "./GuestStack";
import SplashScreen from "../Screens/Splash";
import { setBoardingShown } from "../Store/splashSlice";
import BoardingStack from "./BoadingStack";
export function Router(props) {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const { splashShown, boardingShown } = useSelector((state) => state.splash);
  const dispatch = useDispatch()

  useEffect(()=>{
    AsyncStorage.getItem("boarding_screen_shown")
    .then((value) => {
        if (value !== "true") {
        } else {
            // Boarding screen has been shown before, so set showBoarding to false
            dispatch(setBoardingShown(false));
        }
    })
    .catch((error) => {
        console.error("Error accessing AsyncStorage:", error);
    });
  },[splashShown, boardingShown])

  return (
    <NavigationContainer>
      {splashShown? <SplashScreen /> : 
      boardingShown ? <BoardingStack />:
      authenticated ? <DrawerStack/> : <GuestStack/> }
    </NavigationContainer>
  );
}