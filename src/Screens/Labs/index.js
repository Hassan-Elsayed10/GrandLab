import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import Brunches from '../../Component/map';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
export default function LabScreen() {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);

    useEffect(() => {
        setLoading(true)
        // Fetch data from the API
        if (currentLanguage === 'en') {
            const currentLanguage = 'eng'
            axios.get(`https://grandlabs-backend-patient.vercel.app/branches?lang=${currentLanguage}`)
                .then(response => {
                    setBranches(response.data.branches);
                    setLoading(false);

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (currentLanguage === 'ar') {
            const currentLanguage = 'arab'
            axios.get(`https://grandlabs-backend-patient.vercel.app/branches?lang=${currentLanguage}`)
                .then(response => {
                    setBranches(response.data.branches);
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
                <Text style={styles.text}>{t('HeaderBranches')}</Text>
            </View>
            <View style={styles.package}>
                {loading ?
                    (<ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} />)
                    : (
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <FlatList
                                data={branches}
                                renderItem={({ item }) => (
                                    <View style={styles.branchContainer}>
                                    <Brunches item={item} />
                                </View>
                                )}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                            />
                        </ScrollView>
                    )}
            </View>
        </View>
    );
}
const styles = ScaledSheet.create({
    container: {
        padding: '2@vs',
        backgroundColor: '#FFF',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        margin: '10@vs',
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
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        color: '#454242',
        marginBottom: '20@vs'

    },
    package: {
        flex: 1,
        margin: '5@vs',
    },
    closedText: {
        fontSize: 16,
        color: 'red', // You can choose a color that suits your design
        textAlign: 'center',
        marginTop: 5,
    },
    branchContainer: {

    }
    
});