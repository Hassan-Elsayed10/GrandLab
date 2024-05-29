import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "../Screens/Profile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import SuccessfulUpdate from "../Screens/Profile/SuccessUpdate";
const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name='SuccessfulUpdate' component={SuccessfulUpdate} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export default ProfileStack;