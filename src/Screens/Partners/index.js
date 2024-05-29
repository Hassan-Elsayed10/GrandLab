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
import { useNavigation } from '@react-navigation/native';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import Partner from '../../Component/Partners';
export default function Partners() {
    const navigation = useNavigation();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    useEffect(() => {
        setLoading(true);
    
        axios.get("https://grandlabs-backend-patient.vercel.app/medicalPartner")
            .then(response => {
                setPartners(response.data.medicalPartners);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false even if there's an error
                // You can also set an error state and display a message to the user
            });
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
                <Text style={styles.text}>{t('HeaderPartners')}</Text>
            </View>
            {loading ?
                (<ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} />)
                : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={partners}
                            renderItem={({ item }) => <Partner item={item} />}
                            showsVerticalScrollIndicator={false}
                            numColumns={4}
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
