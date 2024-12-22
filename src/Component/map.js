import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    ImageBackground
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import CallIcon from '../../Assets/Icons/call';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

export default function Brunches({ item }) {
    const { t, i18n } = useTranslation(); // Use the t function to translate text

    return (
        <>
            {!item.status ?
                (
                    <View style={styles.closedContainer}>
                        <TouchableOpacity style={styles.packageCart} onPress={() => Linking.openURL(item.map)}>
                                <View style={styles.closedContainer}>
                                    <Text style={styles.closedText}>{t('Closed')}</Text>
                                </View>
                            <View style={{ opacity: item.status ? 1 : 0.5 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <View style={styles.loginButton1}>
                                        <Text style={styles.loginButtonText1}>{t('SeeLocation')}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textRow}>
                                        <Image source={require('../../Assets/Icons/map.png')} style={styles.img} />
                                        <Text style={styles.subTextCart}>{item.address}</Text>
                                    </View>
                                    <View style={styles.textRow}>
                                        <View style={{ width: 40, height: 35 }}>
                                            <CallIcon />
                                        </View>
                                        <Text style={styles.subTextCart}>{item.phones.join('/ ')}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>


                    </View>

                ) :
                (
                    <TouchableOpacity style={styles.packageCart} onPress={() => { Linking.openURL(item.map) }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>

                            <Text style={styles.title}>{item.name}</Text>
                            <View style={styles.loginButton1}>
                                <Text style={styles.loginButtonText1}>{t('SeeLocation')}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, }}>

                            <View style={styles.textRow}>
                                <Image
                                    source={require('../../Assets/Icons/map.png')}
                                    style={styles.img}
                                />
                                <Text style={styles.subTextCart}>{item.address}</Text>
                            </View>
                            <View style={styles.textRow}>
                                <View style={{ width: 40, height: 35, }}>
                                    <CallIcon />
                                </View>
                                <Text style={styles.subTextCart}>{item.phones.join('/ ')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                )}
        </>

    );
}
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    packageCart: {
        backgroundColor: 'rgba(71, 90, 215, 0.15)',
        borderWidth: 1,
        borderColor: '#475AD7',
        borderStyle: 'dashed',
        borderRadius: 15,
        marginTop: '10@vs',
        marginBottom: '20@vs',
        padding: '5@s',
        flex: 1,
    },
    packageCartf: {
        backgroundColor: 'rgba(71, 90, 215, 0.15)',
        borderWidth: 1,
        borderColor: '#475AD7',
        borderStyle: 'dashed',
        borderRadius: 15,
        marginTop: '10@vs',
        marginBottom: '20@vs',
        padding: '5@s',
        flex: 1,
        opacity: .56
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#454242',
        marginBottom: '5@s',
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    subTextCart: {
        fontSize: 17,
        fontWeight: '400',
        color: '#565656',
        marginLeft: 20,
        flex: 1
    },
    img: {
        height: 35,
        width: 35
    },
    loginButton1: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '700',
    },
    loginButtonText1: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        fontWeight: '700'
    },
    closedContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      closedText: {
        fontSize: 25,
        color: 'red', // You can choose a color that suits your design
        textAlign: 'center',
        fontWeight:'800'
      },

});