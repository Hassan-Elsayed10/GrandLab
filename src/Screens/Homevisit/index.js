import { useEffect, useState } from 'react'; // Import useEffect and useState
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowIcon from "../../../Assets/Icons/Arrow";
import axios from 'axios'; // Import Axios for HTTP requests
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../../Store/authSlice';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function HomeVisit() {
    const navigation = useNavigation();
    const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [locationLink, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [isAddress, setIsAddress] = useState(false);
    const [isAge, setIsAge] = useState(false);
    const [isLocation, setIsLocation] = useState(false);
    const [requestName, setTest] = useState('');
    const [isFirstName, setFirstName] = useState(false);
    const [isTest, setIsTest] = useState(false);
    const [isLastName, setLastName] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingphoto, setLoadingphoto] = useState(false);
    const [status, setStatus] = useState('');
    const [isModalVisible, setModalVisible] = useState(true);
    const [isAllFieldsFilled, setAllFieldsFilled] = useState(true);
    const [prescription, setImageURL] = useState('');
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);

    const openImagePicker = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, async (response) => {
            // Check if there are assets in the response and if the first asset has a URI
            if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                const selectedImage = response.assets[0];
                // If the file size is within the limit (10 MB), upload it to Cloudinary
                uploadToCloudinary(selectedImage.uri);

            }
        });

    };

    const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/drtx3ul9r/image/upload";
    const uploadToCloudinary = async (imageUri) => {
        try {
            setLoadingphoto(true)

            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg', // Adjust this based on the image type
                name: 'image.jpg',  // Adjust the file name as needed
            });
            formData.append('upload_preset', 'grandApp'); // Replace with your Cloudinary upload preset

            const response = await axios.post(cloudinaryUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.secure_url) {
                setImageURL(response.data.secure_url);
                // You can use imageUrl as needed (e.g., store it in your database, display it, etc.)
            } else {
                console.log('Error uploading image to Cloudinary:', response.data);
            }
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error.response?.data || error.message);
        }
        setLoadingphoto(false)

    };

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
    const handleLogin = () => {
        setModalVisible(false);

        navigation.navigate('Loginx')
    }
    const handlegeust = () => {
        setModalVisible(false);
        navigation.navigate('HomeScreen')
    }
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
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            age.trim() !== '' &&
            address.trim() !== '' &&
            phone.trim() !== '' &&
            prescription !== '' || requestName.trim() !== ''
        );
    }, [firstName, lastName, phone, requestName, prescription, address, age]);
    const postDataToApi = async () => {
        setLoading(true);
        try {
            const Token = await AsyncStorage.getItem('accessToken');
            const accessToken = JSON.parse(Token);

            const requestData = {
                firstName,
                lastName,
                phone,
                address,
                requestName,
                age,
                ...(locationLink && locationLink.trim() !== '' && { locationLink }), // Add locationLink conditionally
            };

            if (requestName && requestName.trim() !== '') {
                requestData.requestName = requestName;
            }

            if (prescription && prescription.trim() !== '') {
                requestData.prescription = prescription;
            }

            const response = await axios.post(
                "https://grandlabs-backend-patient.vercel.app/homeVisitRequests",
                requestData,
                {
                    headers: {
                        Authorization: accessToken,
                    },
                }
            );

            if (response.status === 200) {
                navigation.navigate('SuccessfulBook');
            } else {
                setStatus('Failed to Book.');
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const errorMessage =
                    error.response.data.Reason && error.response.data.Reason[0]
                        ? error.response.data.Reason[0].msg
                        : 'Age is required.';

                switch (status) {
                    default:
                        setStatus(`Server Error: ${errorMessage}`);
                        break;
                }
            } else if (error.request) {
                // Handle request-related errors (e.g., no response received)
                setStatus('Network Error: Unable to connect to the server.');
            } else {
                // Handle other unexpected errors
                setStatus('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
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
                        <Text style={styles.text}>{t('HeaderHomeVisit')}</Text>
                    </View>
                    {status !== '' && <Text style={styles.error}>{status}</Text>}

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
                                isAge && styles.inputFocused,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/user.png')}
                                style={[
                                    styles.inputIcon,
                                    isAge && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder={t("Age")}
                                placeholderTextColor="#565656"
                                onFocus={() => setIsAge(true)}
                                onBlur={() => setIsAge(false)}
                                value={age}
                                onChangeText={setAge}
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
                        <View
                            style={[
                                styles.inputWrapper,
                                isAddress && styles.inputFocused,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/address.png')}
                                style={[
                                    styles.inputIcon,
                                    isAddress && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder={t("Address")}
                                placeholderTextColor="#565656"
                                onFocus={() => setIsAddress(true)}
                                onBlur={() => setIsAddress(false)}
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>
                        <View
                            style={[
                                styles.inputWrapper,
                                isLocation && styles.inputFocused,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/address.png')}
                                style={[
                                    styles.inputIcon,
                                    isLocation && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder={t("Location")}
                                placeholderTextColor="#565656"
                                onFocus={() => setIsLocation(true)}
                                onBlur={() => setIsLocation(false)}
                                value={locationLink}
                                onChangeText={setLocation}
                            />
                        </View>

                        <View
                            style={[
                                styles.inputWrapper,
                                isTest && styles.inputFocused,
                            ]}
                        >
                            <Image
                                source={require('../../../Assets/Icons/test.png')}
                                style={[
                                    styles.inputIcon,
                                    isTest && styles.iconFocused,
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder={t("TestName")}
                                placeholderTextColor="#565656"
                                onFocus={() => setIsTest(true)}
                                onBlur={() => setIsTest(false)}
                                value={requestName}
                                onChangeText={setTest}
                            />
                        </View>
                        {loadingphoto ?
                            (
                                <ActivityIndicator visible={loading} size={20} />
                            )
                            :
                            (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={openImagePicker}
                                >
                                    <Text
                                        style={
                                            [prescription.trim() !== '' ? styles.buttonupbload : styles.buttonText]
                                        }>
                                        {prescription.trim() !== '' ? t('Uploaded') : t('Upload')}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
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
                                    <Text style={styles.buttonText1}>{t('Book')}</Text>
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

