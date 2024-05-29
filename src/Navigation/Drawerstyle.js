import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../Store/authSlice';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { setLanguage } from '../Store/languageSlice'; // Import the setLanguage action
import RNRestart from 'react-native-restart';

export default function CustomDrawerContent() {
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state) => state.language);

    const { t, i18n } = useTranslation(); // Use the t function to translate text

    const toggleLanguage = () => {
        const newLang = currentLanguage === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        dispatch(setLanguage(newLang));
        if (newLang === 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
            RNRestart.Restart();
        } else {
            // Reset to LTR for other languages
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
            RNRestart.Restart();

        }        // Save the newLang to AsyncStorage for future use
        AsyncStorage.setItem('selectedLanguage', newLang).catch((error) => {
            console.error('Error saving language to AsyncStorage:', error);
        });
    };
    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            // Use the token or set it in your app's state as needed
            if (token) {
                const parsedToken = JSON.parse(token);
                setToken(parsedToken);
                dispatch(setAuthenticated(true));
            } else {
                // Token is not available
                dispatch(setAuthenticated(false));

            }
        } catch (error) {
            // Handle errors, such as AsyncStorage read errors
        }
    };

    useEffect(() => {
        getTokenFromStorage();
    }, []);

    const handleLoginLogout = () => {
        if (token) {
            // If authenticated, remove accessToken from AsyncStorage (logout)
            AsyncStorage.removeItem('accessToken')
                .then(() => {
                    navigation.navigate('Login');
                    dispatch(setAuthenticated(false));

                })
                .catch((error) => {
                    console.error('Error removing accessToken:', error);
                });
        } else {
            // If not authenticated, navigate to the Loginx screen (login)
            navigation.navigate('Login');
        }
    };

    return (
        <DrawerContentScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../Assets/Logo/Simple-Blue-Background.jpg')} style={styles.imgGround} />
            </View>
            {
                authenticated ?
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('PackageScreen')}>
                            <Image source={require('../../Assets/Icons/package.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderPackage')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('ShowResult')}>
                            <Image source={require('../../Assets/Icons/notepad.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderShowResult')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('Partners')}>
                            <Image source={require('../../Assets/Icons/handshake.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderPartners')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('AboutUsScreen')}>
                            <Image source={require('../../Assets/Icons/information.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderAbout')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('Contact')}>
                            <Image source={require('../../Assets/Icons/contact.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderContact')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={toggleLanguage}>
                            <Image source={require('../../Assets/Icons/translating.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderLang')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={handleLoginLogout}>
                            {authenticated ? (
                                <Image source={require('../../Assets/Icons/logout(2).png')} style={{ width: 40, height: 40 }} />
                            ) : (
                                <Image source={require('../../Assets/Icons/log-in1.png')} style={{ width: 40, height: 40 }} />
                            )}
                            <Text style={styles.text}>  {authenticated ? t('HeaderLogout') : t('HeaderLogin')}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.menuContainer} onPress={handleLoginLogout}>
                            {authenticated ? (
                                <Image source={require('../../Assets/Icons/logout(2).png')} style={{ width: 40, height: 40 }} />
                            ) : (
                                <Image source={require('../../Assets/Icons/log-in1.png')} style={{ width: 40, height: 40 }} />
                            )}
                            <Text style={styles.text}>  {authenticated ? t('HeaderLogout') : t('HeaderLogin')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('PackageScreen')}>
                            <Image source={require('../../Assets/Icons/package.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderPackage')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('ShowResult')}>
                            <Image source={require('../../Assets/Icons/notepad.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderShowResult')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('Partners')}>
                            <Image source={require('../../Assets/Icons/handshake.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderPartners')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('AboutUsScreen')}>
                            <Image source={require('../../Assets/Icons/information.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderAbout')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.navigate('Contact')}>
                            <Image source={require('../../Assets/Icons/contact.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderContact')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuContainer} onPress={toggleLanguage}>
                            <Image source={require('../../Assets/Icons/translating.png')} style={{ width: 40, height: 40 }} />
                            <Text style={styles.text}>{t('HeaderLang')}</Text>
                        </TouchableOpacity>


                    </View>
            }
            <View style={{}}>
                <Text style={styles.textVersion}>{t('HeaderVersion')}</Text>
            </View>
        </DrawerContentScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        marginBottom: '20%',
    },
    text: {
        fontWeight: '400',
        fontSize: 22,
        color: '#565656',
        marginLeft: 20,
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 40,
    },
    textVersion: {
        fontWeight: '700',
        fontSize: 22,
        color: '#475AD7',
        marginLeft: 20,
    },
    logoutText: {
        fontWeight: '400',
        fontSize: 14,
        color: '#222222',
        marginLeft: 20,
    },
    imgGround: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        marginTop: -4,
        resizeMode:'contain'
    },
});
