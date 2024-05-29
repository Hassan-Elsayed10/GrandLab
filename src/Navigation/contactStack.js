import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ContactScreen from "../Screens/Contact";
import ComplaintsScreen from "../Screens/Complaint";
const Stack = createStackNavigator();

const ContactStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ContactScreen' component={ContactScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ComplaintsScreen' component={ComplaintsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default ContactStack;