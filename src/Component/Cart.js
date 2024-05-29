import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

export default function TestCart({ item }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
            <View style={styles.packageCart} >
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.textRow}>
                    <Text numberOfLines={2} style={styles.subTextCart}>{item.description}</Text>
                </View>
                <View style={styles.showButton}>
                    <TouchableOpacity style={styles.showmoreButton} onPress={() => setModalVisible(true)} >
                        <Text style={styles.showButtonText}>{t('Showmore')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal isVisible={isModalVisible} >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 20 }}>
                        <View style={styles.modal} >
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.textRow1}>
                                <Text style={styles.subTextCart}>{item.description}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={toggleModal}>
                            <Text style={styles.loginButtonText}>{t('Buttonclose')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = ScaledSheet.create({
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#454242',
        marginLeft: '10@s',
        marginBottom: '5@s'
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10@s',
    },
    textRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10@s',
        marginTop: '5%'
    },
    subTextCart: {
        fontSize: 17,
        fontWeight: '400',
        color: '#565656',
        marginRight: '5@s'
    },
    showmoreButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '100%',
        borderColor: '#475AD7',
        borderWidth: 1,
        padding: '10@s'
    },
    showButtonText: {
        fontSize: 16,
        color: '#475AD7',
        textAlign: 'center',
    },
    showButton: {
        flexDirection: 'row',
        marginTop: '10@s',
        marginRight: '30@s',
        marginLeft: '30@s',
        marginBottom: '10@s'
    },
    closeButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '100%',
        borderColor: '#475AD7',
        borderWidth: 1,
        padding: '10@s',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#475AD7',
        textAlign: 'center',
    },
    containerButton: {
        flexDirection: 'row',
        marginTop: '10@s',
        marginRight: '30@s',
        marginLeft: '30@s',
        marginBottom: '10@s',
        justifyContent: 'flex-end',
        backgroundColor: 'red'
    },


    loginButton: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: '50%',
    },
    loginButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    },
});