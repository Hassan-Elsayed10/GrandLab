import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ScrollView,
    I18nManager
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
export default function PackageSet({ item, index }) {
    // const navigation = useNavigation();
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);

    return (
        <View style={styles.container}>
            {
                currentLanguage == 'en' ?
                    <View style={styles.packageCart}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}> {item.titleEnglish}</Text>
                            <Text style={styles.title}>{item.titleArabic}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                            <FlatList
                                style={{ flex: 1, padding: 16, borderRadius: 20 }}
                                data={item.tests}
                                renderItem={({ item, index }) => (
                                    <View style={styles.packagedetail}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={styles.subtitle}>{index + 1}- {item.nameEnglish}</Text>
                                            <Text style={styles.subtitle}>{item.nameArabic}</Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    :
                    <View style={styles.packageCart}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}>{item.titleArabic}</Text>
                            <Text style={styles.title}>{item.titleEnglish}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                            <FlatList
                                style={{ flex: 1, padding: 16, borderRadius: 20 }}
                                data={item.tests}
                                renderItem={({ item, index }) => (
                                    <View style={styles.packagedetail}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {item.nameArabic ? (
                                                <Text style={styles.subtitle}>{index + 1}- {item.nameArabic}</Text>
                                            ) : (
                                                <Text style={styles.subtitle}></Text>
                                            )}
                                            <Text style={styles.subtitle}>{item.nameEnglish}</Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
            }

        </View>
    );
}
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: '5@vs'
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
        padding: '5@s',
        flex: 1
    },
    packagedetail: {
        backgroundColor: 'rgba(71, 90, 215, 0.15)',
        borderWidth: 1,
        borderColor: '#475AD7',
        borderStyle: 'dashed',
        borderRadius: 15,
        width: '100%',
        marginTop: '10@vs',
        marginBottom: '20@vs',
        alignItems: 'flex-start',
        padding: '10@s',
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '900',
        color: '#475AD7',
        flex: 1
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#565656',
        flex: 1
    },
    textRow: {
        flexDirection: 'row',
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
        textAlign: 'center'
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
        borderRadius: 12,
        paddingVertical: 15,
        marginBottom: '15%',
        marginTop: '50%'
    },
    loginButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton1: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '700',
        flex: 1,
        justifyContent: 'flex-end'

    },
    loginButtonText1: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        fontWeight: '700'
    },
    packageclose: {
        color: '#457AD7',
        fontSize: 22,
        fontWeight: "700",
        textAlign: 'center',
        marginBottom: '20@vs',

    }
})