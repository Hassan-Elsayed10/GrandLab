import axios from 'axios'; // Import Axios for HTTP requests
import { useEffect, useState } from 'react'; // Import useEffect and useState
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Alert
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../../Store/authSlice';
import ArrowIcon from "../../../Assets/Icons/Arrow";
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function Profile() {
    const navigation = useNavigation();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isFirstName, setFirstName] = useState(false);
    const [isLastName, setLastName] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);
    const [isAllFieldsFilled, setAllFieldsFilled] = useState(true);
    const [gender, setSelectedGender] = useState(''); // Initially no gender is selected
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [_id, setId] = useState('');
    const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(true);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);


    useEffect(() => {
        async function fetchData() {
            try {
                const Token = await AsyncStorage.getItem('accessToken');
                const accessToken = JSON.parse(Token);
                if (Token) {
                    // User is authenticated
                    dispatch(setAuthenticated(true));
                    const response = await axios.get('https://grandlabs-backend-patient.vercel.app/profile', {
                        headers: {
                            Authorization: accessToken
                        }
                    });
                    const profileData = response.data.user;
                    setfirstName(profileData.firstName);
                    setlastName(profileData.lastName);
                    setPhone(profileData.phone);
                    setSelectedGender(profileData.gender);
                    setId(profileData._id)
                    setEmail(profileData.email);
                }
                else {
                    dispatch(setAuthenticated(false));
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }

        fetchData(); // Call the async function immediately

    }, [dispatch]);
    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };
    useFocusEffect(() => {
        if (!authenticated) {
            setModalVisible(true);
        }
    });

    const handleLogin = () => {
        setModalVisible(false);
        navigation.navigate('Loginx')
    }
    const handlegeust = () => {
        setModalVisible(false);
        navigation.navigate('HomeScreen')
    }
    const NoAuth = () => {
        // You can navigate to the login screen or perform any other action for unauthenticated users here
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
            email.trim() !== '' &&
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            phone.trim() !== '' &&
            gender.trim() !== ''
        );
    }, [email, firstName, lastName, phone, gender]);
    const postDataToApi = async () => {
        setLoading(true);
        try {
            const Token = await AsyncStorage.getItem('accessToken');
            const accessToken = JSON.parse(Token);
            // Make the POST request to the API
            const response = await axios.put(
                `https://grandlabs-backend-patient.vercel.app/users/${_id}`,
                { firstName, lastName, phone, gender, type: 'patient', status: 'true' },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            );
            if (response.status === 200) {
                navigation.navigate('SuccessfulUpdate')
            } else {
                // Request was not successful, set an error message
                setErrorMessage('Failed to update profile. Please try again later.');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Unprocessable Entity Error
                try {
                    const errorResponse = error.response.data; // Assuming error.response.data contains the JSON response
                    if (errorResponse && errorResponse.Reason && errorResponse.Reason[0].msg) {
                        setErrorMessage(errorResponse.Reason[0].msg);
                    } else {
                        setErrorMessage('Invalid input data. Please check your details.');
                    }
                } catch (innerError) {
                    setErrorMessage('Invalid input data. Please check your details.');
                }
            } else if (error.response && error.response.status === 403) {
                // User already exists, use another email
                setErrorMessage('User already exists. Please use another email.');
            } else if (error.response && error.response.status === 500) {
                navigation.navigate('SuccessfulUpdate')
            }
            else {
                // Other error occurred, set a generic error message
                setErrorMessage('An error occurred. Please try again later.');
            }
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {authenticated ? (
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
                        <Text style={styles.text}>{t('HeaderProfile')}</Text>
                    </View>
                    <View style={styles.container1}>
                        <Image source={require('../../../Assets/Icons/person.png')} style={styles.image} />
                    </View>
                    {errorMessage ? (
                        <Text style={styles.error}>{errorMessage}</Text>
                    ) : null}
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
                                value={firstName}
                                onChangeText={setfirstName}
                            />
                        </View>
                        <View
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
                            />
                        </View>
                        <View
                            style={[
                                styles.inputWrapper,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/gender.png')}
                                style={[
                                    styles.inputIcon,
                                    gender && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <Picker
                                selectedValue={gender}
                                onValueChange={handleGenderChange}
                                style={{ flex: 1, }}
                            >
                                <Picker.Item style={{ color: '#565656' }} label={t("SelectGender")} value="" />
                                <Picker.Item style={{ color: '#565656' }} label={t("Male")} value="male" />
                                <Picker.Item style={{ color: '#565656' }} label={t("Female")} value="female" />
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangePassword', email)}>
                        <Text style={styles.buttonText}>{t('HeaderChangePass')}</Text>
                    </TouchableOpacity>

                    {
                        isAllFieldsFilled ? (
                            loading ? (
                                <ActivityIndicator visible={loading} size={20} />
                            ) : (
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={postDataToApi}
                                >
                                    <Text style={styles.buttonText1}>{t('ButtonSave')}</Text>
                                </TouchableOpacity>
                            )
                        ) : null
                    }



                </ScrollView>
            )
                :
                NoAuth()
            }
        </KeyboardAvoidingView>
    );
}
