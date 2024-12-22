import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowIcon from "../../../Assets/Icons/Arrow";
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../../Store/authSlice';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import RNPickerSelect from 'react-native-picker-select';

export default function BookTest() {
    const navigation = useNavigation();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const [requestName, setTest] = useState('');
    const [age, setAge] = useState('');
    const [isFirstName, setFirstName] = useState(false);
    const [isTest, setIsTest] = useState(false);
    const [isLastName, setLastName] = useState(false);
    const [isAge, setIsAge] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingBranch, setLoadingBranch] = useState(false);
    const [loadingphoto, setLoadingphoto] = useState(false);
    const [status, setStatus] = useState('');
    const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(true);
    const [isAllFieldsFilled, setAllFieldsFilled] = useState(true);
    const [prescription, setImageURL] = useState('');
    const { t } = useTranslation();
    const currentLanguage = useSelector((state) => state.language);
    const [branches, setBranches] = useState([]);
    const [branchID, setSelectedBranch] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoadingBranch(true);
            try {
                const lang = currentLanguage === 'en' ? 'eng' : 'arab';
                const response = await axios.get(`https://grandlabs-backend-patient.vercel.app/branches?lang=${lang}`);

                if (response.data && response.data.branches) {
                    const fetchedBranches = response.data.branches
                        .map(branch => {
                            return {
                                label: branch.name,
                                value: branch._id // Make sure 'id' is the correct field
                            };
                        })
                        .filter(branch => {
                            if (!branch.label || !branch.value) {
                                console.warn('Branch missing label or value:', branch);
                                return false;
                            }
                            return true;
                        });
                    console.log('Filtered branches:', fetchedBranches); // Log filtered branches
                    setBranches(fetchedBranches);
                } else {
                    console.log('No branches found in response data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        setLoadingBranch(false);

        fetchData();
    }, [currentLanguage]);


    const handleBranchChange = (value) => {
        setSelectedBranch(value);
    };
    const route = useRoute();
    const openImagePicker = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, async (response) => {
            if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                const selectedImage = response.assets[0];
                uploadToCloudinary(selectedImage.uri);
            }
        });
    };

    const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/drtx3ul9r/image/upload";
    const uploadToCloudinary = async (imageUri) => {
        setLoadingphoto(true);
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });
            formData.append('upload_preset', 'grandApp');

            const response = await axios.post(cloudinaryUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.secure_url) {
                setImageURL(response.data.secure_url);
            } else {
                console.log('Error uploading image to Cloudinary:', response.data);
            }
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error.response?.data || error.message);
        }
        setLoadingphoto(false);
    };

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
                    setfirstName(profileData.firstName);
                    setlastName(profileData.lastName);
                    setPhone(profileData.phone);
                    if (route.params?.requestName) {
                        setTest(route.params.requestName);
                    }
                } else {
                    dispatch(setAuthenticated(false));
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchData();
    }, [dispatch, route.params]);

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
            <Modal isVisible={isModalVisible}>
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
        const fieldsToCheck = [prescription, requestName];
        const atLeastOneFieldFilled = fieldsToCheck.some(field => (field || '').trim() !== '');
        setAllFieldsFilled(
            (firstName || '').trim() !== '' &&
            (lastName || '').trim() !== '' &&
            (phone || '').trim() !== '' &&
            (age || '').trim() !== '' &&
            (branchID || '').trim() !== '' &&
            atLeastOneFieldFilled
        );
    }, [firstName, lastName, phone, prescription, requestName, age, branchID]);

    const postDataToApi = async () => {
        setLoading(true);
        try {
            const Token = await AsyncStorage.getItem('accessToken');
            const accessToken = JSON.parse(Token);
            const requestData = {
                firstName,
                lastName,
                phone,
                age,
                ...(requestName.trim() !== '' && { requestName }),
                ...(prescription.trim() !== '' && { prescription }),
                ...(branchID && { branchID: branchID }),
            };
            console.log(requestData)
            const response = await axios.post(
                "https://grandlabs-backend-patient.vercel.app/labVisitRequests",
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
                const errorMessage = error.response.data.Message;
                if (status === 422 && errorMessage === 'Validation faild') {
                    setStatus('Enter all data');
                } else {
                    setStatus('Other Error: An unexpected error occurred.');
                }
            } else {
                setStatus('Network Error: Unable to connect to the server.');
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
                    <View style={styles.row}>
                        {currentLanguage == 'ar' ? (
                            <TouchableOpacity
                                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowRIcon />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowIcon />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.text}>{t("HeaderBookTest")}</Text>
                    </View>
                    {status !== '' && <Text style={styles.error}>{status}</Text>}

                    <View style={styles.textInputContainer}>
                        <View style={[styles.inputWrapper, isFirstName && styles.inputFocused]}>
                            <Image
                                source={require('../../../Assets/Icons/user.png')}
                                style={[styles.inputIcon, isFirstName && styles.iconFocused]}
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
                        <View style={[styles.inputWrapper, isLastName && styles.inputFocused]}>
                            <Image
                                source={require('../../../Assets/Icons/user.png')}
                                style={[styles.inputIcon, isLastName && styles.iconFocused]}
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
                        <View style={[styles.inputWrapper, isAge && styles.inputFocused]}>
                            <Image
                                source={require('../../../Assets/Icons/user.png')}
                                style={[styles.inputIcon, isAge && styles.iconFocused]}
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
                                keyboardType="numeric"

                            />
                        </View>
                        <View style={[styles.inputWrapper, isPhoneFocused && styles.inputFocused]}>
                            <Image
                                source={require('../../../Assets/Icons/call.png')}
                                style={[styles.inputIcon, isPhoneFocused && styles.iconFocused]}
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
                        <View style={[styles.inputWrapper, isTest && styles.inputFocused]}>
                            <Image
                                source={require('../../../Assets/Icons/test.png')}
                                style={[styles.inputIcon, isTest && styles.iconFocused]}
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
                        <Text style={styles.selectbranch}>Please choose the branch where you want to do the test.</Text>
                        {loadingBranch ?
                            (<RNPickerSelect
                                onValueChange={handleBranchChange}
                                items={branches}
                                value={branchID}
                                placeholder={{ label: t('LabelBr'), value: null }}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />)
                            :
                            (
                                <ActivityIndicator visible={loading} size={20} />
                            )
                        }

                        {loadingphoto ? (
                            <ActivityIndicator visible={loading} size={20} />
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={openImagePicker}>
                                <Text style={prescription.trim() !== '' ? styles.buttonupbload : styles.buttonText}>
                                    {prescription.trim() !== '' ? t('Uploaded') : t('Upload')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {isAllFieldsFilled && (
                        loading ? (
                            <ActivityIndicator visible={loading} size={20} />
                        ) : (
                            <TouchableOpacity style={styles.button1} onPress={postDataToApi}>
                                <Text style={styles.buttonText1}>{t('Book')}</Text>
                            </TouchableOpacity>
                        )
                    )}
                </ScrollView>
            ) : (
                NoAuth()
            )}
        </KeyboardAvoidingView>
    );
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#475AD7',
        borderRadius: 4,
        color: '#475AD7',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#475AD7',
        borderRadius: 8,
        color: '#475AD7',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: 'gray',
    }
});