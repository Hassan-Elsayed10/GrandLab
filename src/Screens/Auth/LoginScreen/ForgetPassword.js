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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const ForgetPassword = () => {
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [Emailerror, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text


    const handelEmailInput = (inputText) => {
        setEmail(inputText);
        setEmailError(''); // Clear any previous error messages
    };
    const navigation = useNavigation();

    const handleTryAgain = () => {
        navigation.navigate('Login')
    };
    const handleNextPress = async () => {
        if (!email) {
            setEmailError('Please enter the Email.');
            return; // Exit the function early if email is missing
        }
        setLoading(true);

        try {
            // Make the POST request to the API
            const response = await axios.post('https://grandlabs-backend-patient.vercel.app/forgotPassword', { email });
            if (response.status === 200) {
                // Handle successful response
                setSuccessMessage('Data successfully posted to the API');
                const ResetToken = JSON.stringify(response.data.ResetToken);
                await AsyncStorage.setItem('ResetToken', ResetToken);
                navigation.navigate('Verification');
            } else {
                // Handle other response status codes
                setErrorMessage(`Failed to post data to the API: ${response.statusText}`);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setErrorMessage('Invalid email address');
                } else if (error.response.status === 404) {
                    setErrorMessage('No user found with that email');
                } else {
                    setErrorMessage('Other error occurred');
                }
            } else {
                setErrorMessage('Network error');
            }
        }
        setLoading(false);

    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{t("ForgotPassword")} 🤔</Text>
                    <Text style={styles.subtitle}>{t("Forgetsub")}</Text>
                </View>
                {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

                <View style={styles.textInputContainer}>
                    <View
                        style={[
                            styles.inputWrapper,
                            isEmailFocused && styles.inputFocused,
                        ]}
                    >
                        <Icon
                            name="envelope"
                            size={30}
                            color='#7A7A7A'
                            style={[isEmailFocused && styles.iconFocused]}
                        />
                        {Emailerror ? <Text style={{ color: 'red', marginLeft: 5 }}>{Emailerror}</Text> : null}

                        <TextInput
                            style={styles.textInput}
                            placeholder={t("Email")}
                            placeholderTextColor="#565656"
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            value={email}
                            onChangeText={handelEmailInput}
                        />
                    </View>
                </View>
                {loading ?
                    (<ActivityIndicator visible={loading} size={20} />)
                    : (
                        <TouchableOpacity
                            style={styles.NextButton}
                            onPress={handleNextPress}
                        >
                            <Text style={styles.NextButtonText}>{t("Next")}</Text>
                        </TouchableOpacity>
                    )}
                <View style={styles.RemeberContainer}>
                    <Text style={styles.RememberText}>{t("Remember")}</Text>
                    <TouchableOpacity
                        style={styles.TryButton}
                        onPress={handleTryAgain}
                    >
                        <Text style={styles.TryButtonText}>{t("Try")}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:"#FFF"
    },
    headerContainer: {
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginRight: 10,
        color: '#000000',
    },
    subtitle: {
        fontSize: 16,
        color: '#454242',
        fontWeight: '400'
    },
    textInputContainer: {
        marginTop: 20,
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
        color: '#7A7A7A',
    },
    textInput: {
        height: 40,
        color: 'black',
        margin: "3%",
        width: '30%',
        flex:1
    },

    NextButton: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: 20,
    },
    NextButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'

    },

    RemeberContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%'
    },
    RememberText: {
        fontSize: 16,
        color: '#7A7A7A',
        fontWeight: '700'
    },
    TryButton: {
        marginLeft: 0,
    },
    TryButtonText: {
        fontSize: 16,
        color: '#475AD7',
        fontWeight: '700'

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

export default ForgetPassword;
