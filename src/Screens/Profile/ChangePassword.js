import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function ChangePassword() {
    const navigation = useNavigation();
    const route = useRoute();
    let emailx = route.params;
    const { t, i18n } = useTranslation(); // Use the t function to translate text

    useEffect(() => {
        // Check AsyncStorage to see if the boarding screen has been shown before
        setemail(emailx)
    }, []);
    const [email, setemail] = useState('');
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isOLdPasswordFocused, setOldPasswordFocused] = useState(false);
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [isNewPasswordFocused, setNewPasswordFocused] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const currentLanguage = useSelector((state) => state.language);

    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    };
    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };
    const handleOldPasswordChange = (text) => {
        setOldPassword(text);
        setOldPasswordVisible(text !== '');
    };
    const handleNewPasswordChange = (text) => {
        setNewPassword(text);
        setNewPasswordVisible(text !== '');
    };
    
    const postDataToApi = async () => {
        setLoading(true)
        try {
            const Token = await AsyncStorage.getItem('accessToken');
            const accessToken = JSON.parse(Token);
            // Make the POST request to the API
            const response = await axios.post("https://grandlabs-backend-patient.vercel.app/changePassword",
                { email, newPassword, oldPassword },
                {
                    headers: {
                        Authorization: accessToken
                    }
                });
            // Handle the response
            // Check the response status code
            if (response.status === 200) {
                navigation.goBack();
                navigation.navigate('SuccessfulUpdate')
                setStatus('')
                setNewPassword('')
                setOldPassword('')
            } else {
                // Request was not successful, set an error message
                setErrorMessage('Failed to sign up. Please try again later.');
            }
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data && error.response.data.Message) {
              // If the error message is present in the API response
              setStatus(error.response.data.Message);
              setNewPassword('')
              setOldPassword('')
              setTimeout(() => {
                setStatus('');
                // Additional actions or state changes if needed
              }, 2000); // 1 minute in milliseconds
            }
        }finally {
            setLoading(false);
        }

    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Text style={styles.text}>{t('HeaderChangePass')}</Text>
                </View>
                {status !== '' && <Text style={styles.error}>{status}</Text>}

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

                        <TextInput
                            style={styles.textInput}
                            placeholder={t("Email")}
                            placeholderTextColor="#565656"
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            value={email}
                            onChangeText={setemail}
                            keyboardType='email-address'
                        />
                    </View>
                    <View
                        style={[
                            styles.inputWrapper,
                            isOLdPasswordFocused && styles.inputFocused,
                        ]}
                    >
                        <Icon
                            name="lock"
                            size={30}
                            color='#7A7A7A'
                            style={[isOLdPasswordFocused && styles.iconFocused,]}
                        />
                        <TextInput
                            style={styles.textInput1}
                            placeholder={t("oldPass")}
                            secureTextEntry={oldPasswordVisible}
                            placeholderTextColor="#565656"
                            onChangeText={handleOldPasswordChange}
                            value={oldPassword}
                            onFocus={() => setOldPasswordFocused(true)}
                            onBlur={() => setOldPasswordFocused(false)}
                        />
                        <View style={styles.eyecontainer}>
                            {oldPasswordVisible ?
                                (
                                    <TouchableOpacity
                                        onPress={toggleOldPasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon
                                            name="eye-slash"
                                            size={30}
                                            color='#7A7A7A'
                                            style={[isOLdPasswordFocused && styles.iconFocused,]}
                                        />
                                    </TouchableOpacity>
                                ) :
                                (
                                    <TouchableOpacity
                                        onPress={toggleOldPasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon
                                            name="eye"
                                            size={30}
                                            color='#7A7A7A'
                                            style={[isOLdPasswordFocused && styles.iconFocused,]}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                    <View
                        style={[
                            styles.inputWrapper,
                            isNewPasswordFocused && styles.inputFocused,
                        ]}
                    >
                        <Icon
                            name="lock"
                            size={30}
                            color='#7A7A7A'
                            style={[isNewPasswordFocused && styles.iconFocused,]}
                        />
                        <TextInput
                            style={styles.textInput1}
                            placeholder={t("newPass")}
                            secureTextEntry={newPasswordVisible}
                            placeholderTextColor="#565656"
                            onChangeText={handleNewPasswordChange}
                            value={newPassword}
                            onFocus={() => setNewPasswordFocused(true)}
                            onBlur={() => setNewPasswordFocused(false)}
                        />
                        <View style={styles.eyecontainer}>
                            {newPasswordVisible ?
                                (
                                    <TouchableOpacity
                                        onPress={toggleNewPasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon
                                            name="eye-slash"
                                            size={30}
                                            color='#7A7A7A'
                                            style={[isNewPasswordFocused && styles.iconFocused,]}
                                        />
                                    </TouchableOpacity>
                                ) :
                                (
                                    <TouchableOpacity
                                        onPress={toggleNewPasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon
                                            name="eye"
                                            size={30}
                                            color='#7A7A7A'
                                            style={[isNewPasswordFocused && styles.iconFocused,]}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            {loading ?
                (<ActivityIndicator visible={loading} size={20} />)
                : (
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={postDataToApi}
                    >
                        <Text style={styles.buttonText1}>{t('ButtonChange')}</Text>
                    </TouchableOpacity>)}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#FFF"

    },
    row: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
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
        padding: 5,
        paddingRight: 20
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
    eyecontainer: {
        marginLeft: '45%',
    },
    textInput: {
        height: 40,
        color: 'black',
        margin: '3%',
        width: '50%',
        fontSize: 16,
        flex: 1

    },
    textInput1: {
        height: 40,
        color: 'black',
        margin: '3%',
        width: '35%',
        fontSize: 16,
        flex: 1

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
    button1: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        marginBottom: 10,
        paddingVertical: 15,
        marginTop: 20
    },

    buttonText1: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500'
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

