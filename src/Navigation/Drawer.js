
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import PackageScreen from "../Screens/PackageScreen/PackageScreen";
import CustomDrawerContent from "./Drawerstyle";
import PackageDetails from "../Screens/PackageScreen/PackageDetails";
import HomeTabs from "./HomeTabs";
import LoginStack from "./LoginStack";
import Login from "../Screens/Auth/LoginScreen/Login";
import ContactScreen from "../Screens/Contact";
import ContactStack from "./contactStack";
import ShowResult from "../Screens/Result/showResult";
import AboutUsScreen from "../Screens/AboutUs";
import Partners from "../Screens/Partners";
const Drawer = createDrawerNavigator();
const DrawerStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeTabs"
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: '85%',
                    borderRadius: 20,
                    marginTop: 10,
                    marginBottom: 10
                },
            }}
        >
            <Drawer.Screen
                name="HomeTabs"
                component={HomeTabs}
            />
            <Drawer.Screen
                name="PackageScreen"
                component={PackageScreen}
            />
            <Drawer.Screen
                name="ShowResult"
                component={ShowResult}
            />
            <Drawer.Screen
                name="PackageDetails"
                component={PackageDetails}
            />
            <Drawer.Screen
                name="Login"
                component={Login}
            />
            <Drawer.Screen
                name="Partners"
                component={Partners}
            />
            <Drawer.Screen
                name="Contact"
                component={ContactStack}
            />
            <Drawer.Screen
                name="AboutUsScreen"
                component={AboutUsScreen}
            />

        </Drawer.Navigator>

    );
};

export default DrawerStack;