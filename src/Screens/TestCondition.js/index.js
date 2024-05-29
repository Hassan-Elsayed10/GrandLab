import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import TestCart from '../../Component/Cart';
import styles from './styles';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function TestCondition() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [testData, setTestData] = useState([]);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);

    useEffect(() => {
        // Fetch data from the API
        setLoading(true);
        if (currentLanguage === 'en') {
            const currentLanguage = 'eng'
            axios.get(`https://grandlabs-backend-patient.vercel.app/testConditions?lang=${currentLanguage}`)
                .then(response => {
                    setTestData(response.data.testConditions);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (currentLanguage === 'ar') {
            const currentLanguage = 'arab'
            axios.get(`https://grandlabs-backend-patient.vercel.app/testConditions?lang=${currentLanguage}`)
                .then(response => {
                    setTestData(response.data.testConditions);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    return (
        <View style={styles.container}>
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
                <Text style={styles.text}>{t('HeaderTest')}</Text>
            </View>
            <View style={styles.package}>
                <Text style={styles.subtitle}>{t("subTest")}</Text>
                {loading ?
                    (<ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} />)
                    : (
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <FlatList
                                data={testData}
                                renderItem={({ item }) => <TestCart item={item} />}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                            />
                        </ScrollView>
                    )}
            </View>
        </View>
    );
}