import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function Results({ item }) {
    
    const url = item.resultURL
    const extractNameFromURL = (url) => {
        const parts = url.split("/");
        if (parts.length >= 4) {
            return parts[parts.length - 2];
        } else {
            return "PDF"; // Return a default name if the URL doesn't follow the expected pattern
        }
    };
    const name = extractNameFromURL(url);
    console.log(item._id)

    const Open = async () => {
        try {    
            const token = await AsyncStorage.getItem('accessToken');
            const accessToken = JSON.parse(token);
    
            // Make PUT request to update 'isOpened' variable
           const response = await axios.put(
                `https://grandlabs-backend-patient.vercel.app/results/${item._id}`,{
                isOpened: true
           },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
                );
                if (response.status === 200) {
                    console.log(`'isOpened' updated successfully for result with ID: ${item._id}`);
                     Linking.openURL(item.resultURL);

                }
            } catch (error) {
            console.error('Error opening URL or updating isOpened:', error);
        }

    };
    
    return (
        <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity style={styles.packageCart} onPress={Open}>
                <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>
        </View>


    );
}
const styles = ScaledSheet.create({
    packageCart: {
        backgroundColor: 'rgba(71, 90, 215, 0.15)',
        borderWidth: 1,
        borderColor: '#475AD7',
        borderStyle: 'dashed',
        borderRadius: 15,
        width: '100%',
        marginTop: '10@vs',
        marginBottom: '20@vs',
        alignItems: 'flex-start',
        padding: '10@s',
        flex: 1
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#454242',
        marginLeft: '10@s',
    }

});