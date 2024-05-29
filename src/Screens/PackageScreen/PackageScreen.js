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
import { ScaledSheet } from 'react-native-size-matters';
import Package from '../../Component/Package';
import { useNavigation } from '@react-navigation/native';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function PackageScreen() {
    const navigation = useNavigation();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    useEffect(() => {
        setLoading(true)
        if (currentLanguage === 'en') {
            const currentLanguage = 'eng'

            axios.get(`https://grandlabs-backend-patient.vercel.app/packages?lang=${currentLanguage}`)
                .then(response => {
                    setPackages(response.data.packages);
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (currentLanguage === 'ar') {
            const currentLanguage = 'arab'
            axios.get(`https://grandlabs-backend-patient.vercel.app/packages?lang=${currentLanguage}`)
                .then(response => {
                    setPackages(response.data.packages);
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);
    return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center',}}>
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
                <Text style={styles.text}>{t('HeaderPackage')}</Text>
            </View>
            {loading ?
                (<ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} />)
                : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={packages}
                            renderItem={({ item }) => <Package item={item} />}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            scrollEnabled={false}
                        />
                    </View>
                )}
        </ScrollView>
    );
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        padding:'10@vs',
    },
    row: {
        flexDirection: 'row',
        margin: '0@vs',
        padding: '10@vs',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: '25@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },
    columnWrapper: {
        alignItems: 'center',
    },
});
