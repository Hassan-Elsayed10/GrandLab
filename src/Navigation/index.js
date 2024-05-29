import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";
import DrawerStack from "./Drawer";
import { useEffect, useState } from 'react'; // Import useEffect and useState
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Login from "../Screens/Auth/LoginScreen/Login";
import HomeTabs from "./HomeTabs";
import HomeStack from "./HomeStack";
import GuestStack from "./GuestStack";
import SplashScreen from "../Screens/Splash";
import BoardingScreen from "../Screens/Boarding";
import { setBoardingShown } from "../Store/splashSlice";
import BoardingStack from "./BoadingStack";
export function Router(props) {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const { splashShown, boardingShown } = useSelector((state) => state.splash);
  // const [ showBoarding, setShowBoarding ] = useState()
  const dispatch = useDispatch()
  // console.log(authenticated)

  useEffect(()=>{
    AsyncStorage.getItem("boarding_screen_shown")
    .then((value) => {
        if (value !== "true") {
            // // Boarding screen has not been shown, so set showBoarding to true
            // setShowBoarding(true);
            // // After showing the boarding screen, set the flag to true
            // AsyncStorage.setItem("boarding_screen_shown", "true");
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