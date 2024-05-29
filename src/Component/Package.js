import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useSelector} from 'react-redux';

export default function Package({ item }) {
    const navigation = useNavigation();
    const currentLanguage = useSelector((state) => state.language);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('PackageDetails', item)} >
                <Image
                    source={{ uri: item.logo }}
                    style={styles.img}
                />
                {
                    currentLanguage == 'en' ?
                        <Text style={styles.text}>{item.titleEnglish ? item.titleEnglish.charAt(0).toUpperCase() + item.titleEnglish.slice(1) : ''}</Text>

                        :

                        <Text style={styles.text}>{item.titleArabic ? item.titleArabic.charAt(0).toUpperCase() + item.titleArabic.slice(1) : ''}</Text>

                }
            </TouchableOpacity>
        </View>
    );
}
const styles = ScaledSheet.create({
    container: {
        padding: '5@vs',
        backgroundColor: '#FFF',
        flex:1,
        alignItems:'center'
    },
    cart: {
        backgroundColor: '#F0F0F0',
        width: '105@vs',
        height: '120@vs',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#475AD7',
        fontWeight: '900',
        textAlign: 'center',
        margin: '2@vs'
    },
    img: {
        height: '60@vs',
        width: '60@vs',
        margin: '2@vs'


    }
});