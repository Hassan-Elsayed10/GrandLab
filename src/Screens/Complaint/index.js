import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import axios from 'axios';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ComplaintsScreen = () => {
    const [message, setComplaint] = useState('');
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // Make the POST request to the API with the requestData object
            const response = await axios.post(
                "https://grandlabs-backend-patient.vercel.app/complains",
                { message }

            );
            if (response.status === 200) {
                navigation.navigate('ContactScreen');
            } else {
                setStatus('Failed to add Complaint.');
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                let errorMessage = 'Unknown error occurred';

                if (error.response.data && error.response.data.Reason && error.response.data.Reason.length > 0) {
                    errorMessage = error.response.data.Reason[0].msg || errorMessage;
                }

                switch (status) {
                    default:
                        setStatus(`${errorMessage}`);
                        break;
                }
                setTimeout(() => {
                    setStatus('');
                    // Additional actions or state changes if needed
                }, 5000);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.row} >
                {
                    currentLanguage == 'ar' ?
                        <TouchableOpacity
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                            onPress={() => navigation.goBack()} >
                            <ArrowRIcon />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                            onPress={() => navigation.goBack()} >
                            <ArrowIcon />
                        </TouchableOpacity>

                }
                <Text style={styles.text}>Need Help?</Text>
            </View>
            <View style={styles.msgCart}>
                {status !== '' && <Text style={styles.error}>{status}</Text>}

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title}>Write to us !</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder="Type your Feedback here..."
                        value={message}
                        onChangeText={setComplaint}
                        placeholderTextColor={'#7D7D7D'}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        !message.trim() ?
                            null
                            :
                            loading ? (
                                <ActivityIndicator visible={loading} size={20} />
                            ) : (
                                <TouchableOpacity
                                    style={{ borderColor: '#475AD7', borderWidth: 1, borderRadius: 20, width: '100%' }}
                                    onPress={handleSubmit}
                                >
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 10, textAlign: 'center', color: '#475AD7' }}>Submit</Text>
                                </TouchableOpacity>
                            )

                    }

                </View>
            </View>

        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        padding: '10@vs',
    },
    row: {
        flexDirection: 'row',
        margin: '0@vs',
        padding: '10@vs',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#475AD7'
    },
    input: {
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        textAlignVertical: 'top', // Align text at the top vertically
        color: 'black'
    },
    text: {
        fontSize: '25@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },
    msgCart: {
        flex: 1,
        justifyContent: 'center',

    },
    error: {
        color: '#FFF',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10
    },
});

export default ComplaintsScreen;
