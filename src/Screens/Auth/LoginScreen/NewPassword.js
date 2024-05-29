
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const NewPassword = () => {
    const [newPassword, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [Passworderror, setPasswordError] = useState('');
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [error, setError] = useState(''); // State variable for error message
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const navigation = useNavigation();
    const { params } = useRoute();
    let code = params;
    const handleConfirmPress = async () => {

        if (!newPassword) {
            setPasswordError('Please enter the Password.');
            return; // Exit the function early if password is missing
        }
        setLoading(true);
        try {
            const Token = await AsyncStorage.getItem('ResetToken');
            const ResetToken = JSON.parse(Token);
            // Make the POST request to the API
            const response = await axios.post('https://grandlabs-backend-patient.vercel.app/resetPassword', { code, newPassword },
                {
                    headers: {
                        Authorization: ResetToken
                    }
                }
            );
            // Handle the response
            if (response.status === 200) {
                // You can also dispatch a Redux action or update your local state here if needed.
                navigation.navigate('PasswordSuccessful');
            }
            if (response.status === 400 && response.data.error === 'InvalidPassword') {
                setError('Password must be at least 6 characters long');
            }
            else {
                // Log the entire API response for more details
                setError('An error occurred. Please try again.'); // Set the error message
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid code'); // Set the error message for invalid code
                } else if (error.response.status === 422) {
                    setError('Password must be at least 6 characters long');

                } else if (error.response.status === 500) {
                    navigation.navigate('ForgetPassword'); // Navigate to the appropriate screen
                } else {
                    console.error('Other error occurred:', error);
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request error:', error.message);
            }
        } finally {
            // Set loading back to false when the request is complete
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{t('CreatNewPass')} 🔒</Text>
                    <Text style={styles.subtitle}>{t('Subpass')}</Text>
                </View>
                {error !== '' && <Text style={styles.error}>{error}</Text>}

                <View
                    style={[
                        styles.inputWrapper,
                        isPasswordFocused && styles.inputFocused,
                    ]}
                >
                    <Icon
                        name="lock"
                        size={30}
                        color='#7A7A7A'
                        style={[isPasswordFocused && styles.iconFocused,]}
                    />
                    {Passworderror ? <Text style={{ color: 'red', marginLeft: 5 }}>{Passworderror}</Text> : null}

                    <TextInput
                        style={styles.textInput}
                        placeholder={t('newPass')}
                        placeholderTextColor="#565656"
                        onChangeText={setPassword}
                        value={newPassword}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />
                </View>
                {loading ?
                    (<ActivityIndicator visible={loading} size={20} />)
                    :
                    (
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleConfirmPress}
                        >
                            <Text style={styles.confirmButtonText}>{t('ButtonConfirm')}</Text>
                        </TouchableOpacity>
                    )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: '2%',
        margin: '1%',
        backgroundColor: '#FFF'
    },
    headerContainer: {
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 15,
        color: '#000000'
    },
    subtitle: {
        fontSize: 16,
        color: '#454242',
        fontWeight: '400',
        marginBottom: '15%'
    },
    textInputContainer: {
        marginTop: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        margin: '1%',
        flex: 1,
        justifyContent: 'flex-start',
        borderColor: '#F3F4F6',
        borderWidth: 2,
        padding: 5
    },
    inputFocused: {
        borderColor: '#475AD7',
    },
    iconFocused: {
        color: '#475AD7',
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
        color: '#7A7A7A',
    },
    textInput: {
        height: 40,
        color: 'black',
        margin: "3%",
        width: '60%',
        flex:1

    },

    confirmButton: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: 20,
    },
    confirmButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
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
    }
});

export default NewPassword;
