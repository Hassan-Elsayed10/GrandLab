import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
    I18nManager
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';
import PackageComponent from '../../Component/PackageDetailsComponent';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import PackageSet from '../../Component/packageset';
export default function PackageDetails() {

    const route = useRoute();
    const item = route.params;
    const navigation = useNavigation();
    // const [packageset, setPackageSet] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    const name = item.titleEnglish
    const toggleBook = (name) => {
        navigation.navigate('BookTest', name)
    }; 

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
                {
                    currentLanguage == 'en'?
                    <Text style={styles.text}>{item.titleEnglish ? item.titleEnglish.charAt(0).toUpperCase() + item.titleEnglish.slice(1) : ''}</Text>

                    :
                    
                    <Text style={styles.text}>{item.titleArabic ? item.titleArabic.charAt(0).toUpperCase() + item.titleArabic.slice(1) : ''}</Text>

                }
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={styles.subtitle}>{t('PackagesAvailable')}</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => toggleBook(name)}>
                    <Text style={styles.loginButtonText}>{t('ButtonBook')}</Text>
                </TouchableOpacity>
            </View>

            {loading ?
                (<ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} />)
                : (
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={item.packageSets}
                            renderItem={({ item, index }) => (
                                
                                <PackageSet item={item} index={index} />
                            )}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                        />
                    </ScrollView>
                )}
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
        fontSize: '20@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#454242',
        margin: '20@vs',

    },
    package: {
        flex: 1,
        alignItems: 'flex-start',
        margin: '5@vs',
    },
    packageCart: {
        backgroundColor: 'rgba(71, 90, 215, 0.15)',
        borderWidth: 1,
        borderColor: '#475AD7',
        borderStyle: 'dashed',
        borderRadius: 15,
        alignItems: 'center',
        width: '100%',
        height: '10%',
        marginTop: '10@vs',
        marginBottom: '20@vs',
        alignItems: 'flex-start',
        padding: '5@s'
    },
    packagedetail: {
        backgroundColor: 'rgba(71, 90, 215, 0.15)',
        borderWidth: 1,
        borderColor: '#475AD7',
        borderStyle: 'dashed',
        borderRadius: 15,
        width: '100%',
        height: '10%',
        marginTop: '10@vs',
        marginBottom: '20@vs',
        alignItems: 'flex-start',
        padding: '5@s',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#454242',
        marginLeft: '10@s',
    },
    textRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginLeft: '10@s',
    },
    subTextCart: {
        fontSize: 17,
        fontWeight: '700',
        color: '#565656',
        flex: 1,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        color: '#475AD7',
        marginRight: '10@vs'
    },
    packageTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#454242',
        marginBottom: '20@vs',
        textAlign: 'left'
    },
    packageoverview: {
        fontSize: 18,
        fontWeight: '400',
        color: '#454242',
        marginBottom: '20@vs',
        textAlign: 'left'
    },
    loginButton: {
        backgroundColor: '#475AD7',
        borderRadius: 20,
        paddingVertical: 10,
    },
    loginButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700',
        padding:'5@vs'
    },

});