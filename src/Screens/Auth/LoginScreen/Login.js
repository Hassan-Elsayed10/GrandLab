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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../../../Store/authSlice';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const Login = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Passworderror, setPasswordError] = useState('');
    const [Emailerror, setEmailError] = useState('');
    const [status, setStatus] = useState(''); // Initialize with an empty status
    const { t } = useTranslation(); // Use the t function to translate text

    const dispatch = useDispatch();

    const handelEmailInput = (inputText) => {
        setemail(inputText);
        setEmailError(''); // Clear any previous error messages
    };

    const handleLoginPress = async () => {
        if (!email) {
            setEmailError('Please enter the Email.');
            return; // Exit the function early if email is missing
        }

        if (!password) {
            setPasswordError('Please enter the Password.');
            return; // Exit the function early if password is missing
        }
        setLoading(true);

        try {
            const response = await axios.post('https://grandlabs-backend-patient.vercel.app/login', { email, password });
            if (response.status === 200) {
                // Handle successful login for different user types here
                dispatch(setAuthenticated(true));
                const responseData = response.data.result;
                const accessToken = JSON.stringify(responseData.accessToken);
                await AsyncStorage.setItem('accessToken', accessToken);
                navigation.navigate('DrawerStack');
                setStatus('');
            } else {
                dispatch(setAuthenticated(false));
                setStatus(`Failed to Log In: ${response.statusText}`);
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.Message; // Assuming error message is in this format

                switch (status) {
                    case 422:
                        setStatus('Please check your details.');
                        break;
                    case 401:
                        if (errorMessage === 'Unauthorized') {
                            setStatus('InValied Email or Password.');
                        } else if (errorMessage === 'Password wrong') {
                            setStatus('Password is incorrect.');
                        } else {
                            setStatus('An unknown authentication error occurred.');
                        }
                        break;
                    case 404:
                        setStatus('Please enter the correct email.');
                        break;
                    default:
                        setStatus('An unexpected error occurred.');
                        break;
                }
                setTimeout(() => {
                    setStatus('');
                    // Additional actions or state changes if needed
                }, 5000);
            } else {
                setStatus('Network Error: Unable to connect to the server.');
            }
        }
        finally {
            // Set loading back to false when the request is complete
            setPassword('')
            setemail('')
            setEmailError('')
            setPasswordError('')
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordVisible(text !== '');
        setPasswordError('');
    };

    const handleForgotPasswordPress = () => {
        navigation.navigate('ForgetPassword')

    };

    const handleSignUpPress = () => {
        navigation.navigate('SignUp')

    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{t('headerLogin')} 👋</Text>
                    <Text style={styles.subtitle}>{t('subLogin')}</Text>
                    {status !== '' && <Text style={styles.error}>{status}</Text>}
                </View>
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
                            value={email}
                            onChangeText={handelEmailInput}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            keyboardType='email-address'
                        />
                    </View>
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
                            style={styles.textInput1}
                            placeholder={t("pass")}
                            secureTextEntry={passwordVisible}
                            placeholderTextColor="#565656"
                            onChangeText={handlePasswordChange}
                            value={password}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                        <View style={styles.eyecontainer}>
                            {passwordVisible ?
                                (
                                    <TouchableOpacity
                                        onPress={togglePasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon
                                            name="eye-slash"
                                            size={30}
                                            color='#7A7A7A'
                                            style={[isPasswordFocused && styles.iconFocused,]}
                                        />
                                    </TouchableOpacity>
                                ) :
                                (
                                    <TouchableOpacity
                                        onPress={togglePasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon
                                            name="eye"
                                            size={30}
                                            color='#7A7A7A'
                                            style={[isPasswordFocused && styles.iconFocused,]}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={handleForgotPasswordPress}
                >
                    <Text style={styles.forgotPasswordText}>{t('ForgetPass')}</Text>
                </TouchableOpacity>
                {loading ?
                    (<ActivityIndicator visible={loading} size={20} />)
                    : (
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLoginPress}
                        >
                            <Text style={styles.loginButtonText}>{t('ButtonLogin')}</Text>
                        </TouchableOpacity>
                    )}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>{t('noAccount')} </Text>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSignUpPress}
                    >
                        <Text style={styles.signUpButtonText}>{t('ButtonSignUp')}</Text>
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
        backgroundColor: '#FFFF',
    },
    headerContainer: {
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 15,
        color: '#000000',
    },
    subtitle: {
        fontSize: 16,
        color: '#454242',
        fontWeight: '400',
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
    eyecontainer: {
        marginLeft: '0%',
    },
    textInput: {
        height: 40,
        color: 'black',
        margin: '3%',
        width: '100%',
        fontSize: 16,
        flex: 1
    },
    textInput1: {
        height: 40,
        color: 'black',
        margin: '3%',
        width: '100%',
        fontSize: 16,
        flex: 1,
    },
    eyeIcon: {
        flex: 1,
        justifyContent: 'center',
    },
    eyeImage: {
        width: '100%',
        height: '100%',
        color: '#7A7A7A',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    forgotPasswordText: {
        color: '#565656',
        fontSize: 16,
        fontWeight: '400',
    },
    loginButton: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: 20,
        flex: 1
    },
    loginButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    },

    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%'
    },
    signUpText: {
        fontSize: 16,
        color: '#7A7A7A',
        fontWeight: '500',
    },
    signUpButton: {
        marginLeft: 0,
    },
    signUpButtonText: {
        fontSize: 16,
        color: '#475AD7',
        fontWeight: '500',

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
    orText: {
        textAlign: 'center',
        marginTop: '10%',
        color: '#757575',
        fontWeight: '700',
    },
    orButtonContainer: {
        alignItems: 'center',
        marginTop: '5%',
    },
    orButton: {
        backgroundColor: '#FFFF',
        borderRadius: 12,
        paddingVertical: 15,
        width: '100%',
        marginBottom: 10,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    orButtonText: {
        fontSize: 16,
        color: '#565656',
        textAlign: 'center',
    },
});

export default Login;
