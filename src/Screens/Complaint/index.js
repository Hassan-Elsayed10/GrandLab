import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
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
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state) => state.language);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    // const [userID, setId] = useState('');
    const [name, setfirstName] = useState('');
    // const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isFirstName, setFirstName] = useState(false);
    // const [isLastName, setLastName] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isAllFieldsFilled, setAllFieldsFilled] = useState(true);


    useEffect(() => {
        async function fetchData() {
            try {
                const Token = await AsyncStorage.getItem('accessToken');
                const accessToken = JSON.parse(Token);
                if (Token) {
                    // User is authenticated
                    const response = await axios.get('https://grandlabs-backend-patient.vercel.app/profile', {
                        headers: {
                            Authorization: accessToken
                        }
                    });
                    const profileData = response.data.user;
                    console.log(profileData)
                    setfirstName(profileData.firstName)
                    setEmail(profileData.email)
                    setPhone(profileData.phone)
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }

        fetchData(); // Call the async function immediately

    }, [dispatch]);

    const handleSubmit = async () => {
        try {

            setLoading(true);
            // const Token = await AsyncStorage.getItem('accessToken');
            // const accessToken = JSON.parse(Token);
            // Make the POST request to the API with the requestData object
            const response = await axios.post(
                "https://grandlabs-backend-patient.vercel.app/complains", { message,name,phone,email },
                // {
                //     headers: {
                //         Authorization: accessToken,
                //     },
                // }

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
        <KeyboardAvoidingView
            style={styles.container}
        >
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
                <Text style={styles.text}>{t("needhelp")}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.textInputContainer}>
                    <View
                        style={[
                            styles.inputWrapper,
                            isFirstName && styles.inputFocused,
                        ]}
                    >
                        <Image
                            source={require('../../../Assets/Icons/user.png')}
                            style={[
                                styles.inputIcon,
                                isFirstName && styles.iconFocused,
                            ]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={t("FirstName")}
                            placeholderTextColor="#565656"
                            onFocus={() => setFirstName(true)}
                            onBlur={() => setFirstName(false)}
                            value={name}
                            onChangeText={setfirstName}
                        />
                    </View>
                    {/* <View
                        style={[
                            styles.inputWrapper,
                            isLastName && styles.inputFocused,
                        ]}
                    >
                        <Image
                            source={require('../../../Assets/Icons/user.png')}
                            style={[
                                styles.inputIcon,
                                isLastName && styles.iconFocused,
                            ]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={t("LastName")}
                            placeholderTextColor="#565656"
                            onFocus={() => setLastName(true)}
                            onBlur={() => setLastName(false)}
                            value={lastName}
                            onChangeText={setlastName}
                        />
                    </View> */}

                    <View
                        style={[
                            styles.inputWrapper,
                            isPhoneFocused && styles.inputFocused,
                        ]}
                    >
                        <Image
                            source={require('../../../Assets/Icons/call.png')}
                            style={[
                                styles.inputIcon,
                                isPhoneFocused && styles.iconFocused,
                            ]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={t("PhoneNumber")}
                            placeholderTextColor="#565656"
                            onFocus={() => setPhoneFocused(true)}
                            onBlur={() => setPhoneFocused(false)}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType='phone-pad'
                        />
                    </View>

                    <View
                        style={[
                            styles.inputWrapper,
                            isEmailFocused && styles.inputFocused,
                        ]}
                    >
                        <Image
                            source={require('../../../Assets/Icons/call.png')}
                            style={[
                                styles.inputIcon,
                                isEmailFocused && styles.iconFocused,
                            ]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={t("Email")}
                            placeholderTextColor="#565656"
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                        />
                    </View>
                </View>
                <View style={styles.msgCart}>
                    {status !== '' && <Text style={styles.error}>{status}</Text>}

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.title}>{t("write to us")}!</Text>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder={t("msgfeedback")}
                            value={message}
                            onChangeText={setComplaint}
                            placeholderTextColor={'#7D7D7D'}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            !message.trim() || !name.trim()?
                                null
                                :
                                loading ? (
                                    <ActivityIndicator visible={loading} size={20} />
                                ) : (
                                    <TouchableOpacity
                                        style={{ borderColor: '#475AD7', borderWidth: 1, borderRadius: 20, width: '100%', marginTop: "10%" }}
                                        onPress={handleSubmit}
                                    >
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 10, textAlign: 'center', color: '#475AD7' }}>{t("submit")}</Text>
                                    </TouchableOpacity>
                                )

                        }

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginTop: '10%'


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
    image: {
        width: '120@vs',
        height: '120@vs',
    },
    textInputContainer: {
        marginTop: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        justifyContent: 'flex-start',
        borderColor: '#F3F4F6',
        borderWidth: 2,
    },
    inputFocused: {
        borderColor: '#475AD7',
    },
    iconFocused: {
        tintColor: '#475AD7',
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginHorizontal: '10@vs',
        tintColor: '#7A7A7A',
    },
    textInput: {
        flex: 1,
        height: '30@vs',
        color: 'black',
        margin: '3%',
        fontSize: 16,

    },
});

export default ComplaintsScreen;
