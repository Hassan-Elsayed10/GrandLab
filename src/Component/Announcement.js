import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

export default function Announcement({ item }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.packageCart}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.textRow}>
                <Image
                    source={require('../../Assets/Icons/promotion.png')}
                    style={styles.img}
                />
                <Text
                    style={styles.subTextCart}
                    numberOfLines={2}
                    onPress={() => setModalVisible(true)}>
                    {item.description}
                </Text>
            </View>
            <Modal isVisible={isModalVisible} >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 20 }}>
                        <View style={styles.modal} >
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.textRow1}>
                                <Text style={styles.subTextCart1}>{item.description}</Text>
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
        width: '100%',
        marginTop: '10@vs',
        marginBottom: '20@vs',
        alignItems: 'flex-start',
        padding: '5@s',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#454242',
        marginLeft: '10@s',
        marginBottom: '5@s',
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    subTextCart: {
        fontSize: 17,
        fontWeight: '400',
        color: '#565656',
        marginLeft: '20@s',
        marginRight: '50@s',
        marginBottom: '5@vs'
    },
    img: {
        height: 50,
        width: 50,
        marginLeft: '5@s'
    },
    textRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10@s',
        marginTop: '5%'
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
    subTextCart1: {
        fontSize: 17,
        fontWeight: '400',
        color: '#565656',
    },
});