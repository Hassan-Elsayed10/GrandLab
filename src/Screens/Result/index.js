import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowIcon from "../../../Assets/Icons/Arrow";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../../Store/authSlice';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements'; // Import CheckBox component from react-native-elements
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function ResultScreen() {
    const navigation = useNavigation();
    const [visitNumber, setVisit] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sendingOption, setSendingOption] = useState([]); // State for selected options as an array
    const [isVisit, setIsVisit] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(true);
    const [isAllFieldsFilled, setAllFieldsFilled] = useState(true);
    const { t, i18n } = useTranslation();
    const currentLanguage = useSelector((state) => state.language);

    useEffect(() => {
        async function fetchData() {
            try {
                const Token = await AsyncStorage.getItem('accessToken');
                const accessToken = JSON.parse(Token);
                if (Token) {
                    dispatch(setAuthenticated(true));
                    const response = await axios.get('https://grandlabs-backend-patient.vercel.app/profile', {
                        headers: {
                            Authorization: accessToken
                        }
                    });
                    const profileData = response.data.user;
                    setEmail(profileData.email);
                    setPhone(profileData.phone);
                } else {
                    dispatch(setAuthenticated(false));
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }

        fetchData();
    }, [dispatch]);

    const handleLogin = () => {
        setModalVisible(false);
        navigation.navigate('Loginx');
    };

    const handlegeust = () => {
        setModalVisible(false);
        navigation.navigate('HomeScreen');
    };

    useFocusEffect(() => {
        if (!authenticated) {
            setModalVisible(true);
        }
    });

    const NoAuth = () => {
        return (
            <Modal isVisible={isModalVisible} >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 20 }}>
                        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
                            <Text style={styles.buttonText1}>{t('LoginFirst')}</Text>
                        </TouchableOpacity>
                        <Text style={styles.orText}>{t('or')}</Text>
                        <View style={styles.orButtonContainer}>
                            <TouchableOpacity style={styles.orButton} onPress={handlegeust}>
                                <Text style={styles.orButtonText}>{t('Buttonclose')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    useEffect(() => {
        setAllFieldsFilled(
            visitNumber.trim() !== '' &&
            email.trim() !== '' &&
            phone.trim() !== '' &&
            sendingOption.length > 0
        );
    }, [visitNumber, email, phone, sendingOption]);

    const postDataToApi = async () => {
        setLoading(true);
        try {
            const Token = await AsyncStorage.getItem('accessToken');
            const accessToken = JSON.parse(Token);

            const requestData = {
                visitNumber,
                email,
                phone,
                sendingOption
            };

            const response = await axios.post(
                "https://grandlabs-backend-patient.vercel.app/resultRequests",
                requestData,
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            );

            if (response.status === 200) {
                navigation.navigate('SuccessfulResult');
            } else {
                setStatus('Failed to Book.');
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.Message;

                switch (status) {
                    case 422:
                        if (errorMessage === 'Validation faild') {
                            setStatus('Enter all data');
                        }
                    default:
                        setStatus('Other Error: An unexpected error occurred.');
                        break;
                }
            } else {
                setStatus('Network Error: Unable to connect to the server.');
            }
        }
        setLoading(false);
    };

    const toggleOption = (option) => {
        setSendingOption(prevOptions => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter(opt => opt !== option);
            } else {
                return [...prevOptions, option];
            }
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {authenticated ? (
                <ScrollView>
                    <View style={styles.row} >
                        {
                            currentLanguage === 'ar' ?
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
                        <Text style={styles.text}>{t('HeaderResult')}</Text>
                    </View>
                    {status !== '' && <Text style={styles.error}>{status}</Text>}

                    <View style={styles.textInputContainer}>
                        <View
                            style={[
                                styles.inputWrapper,
                                isVisit && styles.inputFocused,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/user.png')}
                                style={[
                                    styles.inputIcon,
                                    isVisit && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder={t("VisitNumber")}
                                placeholderTextColor="#565656"
                                onFocus={() => setIsVisit(true)}
                                onBlur={() => setIsVisit(false)}
                                value={visitNumber}
                                onChangeText={setVisit}
                            />
                        </View>
                        <View
                            style={[
                                styles.inputWrapper,
                                isEmail && styles.inputFocused,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/sms.png')}
                                style={[
                                    styles.inputIcon,
                                    isEmail && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder={t("Email")}
                                placeholderTextColor="#565656"
                                onFocus={() => setIsEmail(true)}
                                onBlur={() => setIsEmail(false)}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                            />
                        </View>
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
                        <View style={styles.checkboxContainer}>
                            <Text style={styles.label}>{t("SelectsendingOption")}</Text>
                            <CheckBox
                                title={t("Email")}
                                checked={sendingOption.includes('email')}
                                onPress={() => toggleOption('email')}
                                checkedColor="#475AD7"
                                containerStyle={styles.checkbox}
                            />
                            <CheckBox
                                title={t("PhoneNumber")}
                                checked={sendingOption.includes('phone')}
                                onPress={() => toggleOption('phone')}
                                checkedColor="#475AD7"
                                containerStyle={styles.checkbox}
                            />
                            <CheckBox
                                title={t("app")}
                                checked={sendingOption.includes('app')}
                                onPress={() => toggleOption('app')}
                                checkedColor="#475AD7"
                                containerStyle={styles.checkbox}
                            />
                        </View>
                    </View>
                    {
                        isAllFieldsFilled ? (
                            loading ? (
                                <ActivityIndicator visible={loading} size={20} />
                            ) : (
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={postDataToApi}
                                >
                                    <Text style={styles.buttonText1}>Send</Text>
                                </TouchableOpacity>
                            )
                        ) : null
                    }

                </ScrollView>
            ) : (
                <NoAuth />
            )}
        </KeyboardAvoidingView>
    );
}

