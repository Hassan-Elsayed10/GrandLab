import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Modal
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import PackageSet from '../../Component/packageset';
import Icon from 'react-native-vector-icons/Ionicons';
export default function PackageDetails() {

    const route = useRoute();
    const item = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    const name = item.titleEnglish;
    const [isModalVisible, setModalVisible] = useState(false); // Initially false

    const toggleModal = () => {
        setModalVisible(!isModalVisible); // Toggle the modal visibility
    }
    const Homepress = (name) => {
        navigation.navigate('HomeVisit', name);
        setModalVisible(false);
    }
    const Bookpress = (name) => {
        navigation.navigate('BookTest', name);
        setModalVisible(false);
    }


    return (
        <View style={styles.container}>
            <View style={styles.row} >
                {currentLanguage === 'ar' ?
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
                {currentLanguage === 'en' ?
                    <Text style={styles.text}>{item.titleEnglish ? item.titleEnglish.charAt(0).toUpperCase() + item.titleEnglish.slice(1) : ''}</Text>
                    :
                    <Text style={styles.text}>{item.titleArabic ? item.titleArabic.charAt(0).toUpperCase() + item.titleArabic.slice(1) : ''}</Text>
                }
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.subtitle}>{t('PackagesAvailable')}</Text>
                <TouchableOpacity style={styles.loginButton} onPress={toggleModal}>
                    <Text style={styles.loginButtonText}>{t('ButtonBook')}</Text>
                </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={toggleModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 20, width: '80%' }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Icon name="close-circle-outline" size={30} color="#475AD7" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button1} onPress={() => Homepress(name)}>
                                <Text style={styles.buttonText1}>{t('HeaderHomeVisit')}</Text>
                            </TouchableOpacity>
                            <Text style={styles.orText}>{t('or')}</Text>
                            <View style={styles.orButtonContainer}>
                                <TouchableOpacity style={styles.orButton} onPress={() => Bookpress(name)}>
                                    <Text style={styles.orButtonText}>{t('HeaderBookTest')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
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
        padding: '5@vs'
    },
    button1: {
        backgroundColor: '#475AD7',
        borderRadius: 12,
        marginBottom: '10@vs',
        paddingVertical: '15@vs',
        marginTop: '20@vs'
    },
    buttonText1: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500'
    },
    orText: {
        textAlign: 'center',
        // marginTop: '10%',
        color: '#757575',
        fontWeight: '700',
        fontSize: 20
    },
    orButtonContainer: {
        alignItems: 'center',
        marginTop: '5%',
    },
    orButton: {
        backgroundColor: '#FFFF',
        borderRadius: 12,
        paddingVertical: 15,
        width: '100%',
        marginBottom: 10,
        borderColor: '#475AD7',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    orButtonText: {
        fontSize: 16,
        color: '#475AD7',
        textAlign: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end'
    },
    buttonText55: {
        fontSize: 30,
        color: '#475AD7'
    }
});
