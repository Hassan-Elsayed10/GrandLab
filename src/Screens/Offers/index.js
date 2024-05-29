import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import Offer from '../../Component/offer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
export default function OfferScreen() {
    const [offer, setOffer] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    useEffect(() => {
        setLoading(true)
        // Fetch data from the API
        if (currentLanguage === 'en') {
            const currentLanguage = 'eng'
            axios.get(`https://grandlabs-backend-patient.vercel.app/offers?lang=${currentLanguage}`)
                .then(response => {
                    setOffer(response.data.offers);
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (currentLanguage === 'ar') {
            const currentLanguage = 'arab'
            axios.get(`https://grandlabs-backend-patient.vercel.app/offers?lang=${currentLanguage}`)
                .then(response => {
                    setOffer(response.data.offers);
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

    }, []);
    return (
        <>
            <View style={styles.container}>
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
                    <Text style={styles.text}>{t('TabOffer')}</Text>
                </View>
                <View style={styles.package}>
                    {loading ? (
                        <ActivityIndicator
                            visible={loading}
                            size={50}
                            color={'#475AD7'}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                    ) :

                        (offer.length == 0 ?
                            <View style={styles.noOfferContainer}>
                                <Text style={styles.noOfferText}>{t('No offers')}</Text>
                            </View>
                            :
                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <FlatList
                                    data={offer}
                                    renderItem={({ item }) => <Offer item={item} />}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={false}
                                />
                            </ScrollView>
                        )}
                </View>
            </View>
        </>


    );
}