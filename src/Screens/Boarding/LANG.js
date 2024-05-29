import React, { useEffect } from 'react';
import { View, ImageBackground, Dimensions, Text, TouchableOpacity,I18nManager } from 'react-native'; // Import BackHandler
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import { setLanguage } from '../../Store/languageSlice'; // Import the setLanguage action
import RNRestart from 'react-native-restart';
import i18n from '../../Lang/i18n';
export default function LangScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toggleLanguage = (newLang) => {
        i18n.changeLanguage(newLang);
        dispatch(setLanguage(newLang));
        if (newLang === 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);

        } else {
            // Reset to LTR for other languages
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);

        }
        AsyncStorage.setItem('selectedLanguage', newLang).catch((error) => {
            console.error('Error saving language to AsyncStorage:', error);
        });
        navigation.navigate('BoardingScreen'); // Navigate to the next screen
    };
    const { width, height } = Dimensions.get('window');
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}> Choose the language </Text>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => toggleLanguage('ar')}
                >
                    <Text style={styles.buttonText1}>العربيه</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => toggleLanguage('en')}
                >
                    <Text style={styles.buttonText1}>English</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button1: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        marginBottom: '10@vs',
        paddingVertical: '15@vs',
        marginTop: '20@vs'
    },

    buttonText1: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500'
    },
    text: {
        fontSize: 24,
        fontWeight: '800',
        color: '#475AD7'
    }
})