import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

export default function PackageComponent({ item }) {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    let name = item.title;
    const toggleBook = (name) => {
        navigation.navigate('BookTest', name)
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.packageCart} onPress={toggleModal}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.loginButton1}>
                        <Text style={styles.loginButtonText1}>{t('ButtonBook')}</Text>
                    </View>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.subTextCart}> {item.tests.length} {t('TestIncluded')}</Text>
                    <Text style={styles.price}>{t('Price')} {item.price} {t('EGP')}</Text>
                </View>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} >
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <FlatList
                        style={{ flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 20 }}
                        data={item.tests}
                        ListHeaderComponent={
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.packageTitle}>{t('OverView')}</Text>
                                    <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                        <Text style={styles.packageclose}>{t('Buttonclose')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.packageoverview}>{item.description}</Text>
                            </>
                        }
                        renderItem={({ item }) => (
                            <View style={styles.packagedetail}>
                                <Text style={styles.title}>{item}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <TouchableOpacity style={styles.loginButton} onPress={() => toggleBook(name)}>
                                <Text style={styles.loginButtonText}>{t('ButtonBook')}</Text>
                            </TouchableOpacity>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Modal>
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
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#454242',
        marginLeft: '10@s',
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
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
        
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

});