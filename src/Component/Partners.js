import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector} from 'react-redux';

export default function Partner({ item }) {
    return (
        <View style={styles.container}>
            <View style={styles.cart} >
                <Image
                    source={{ uri: item.logoURL }}
                    style={styles.img}
                />
            </View>
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
        margin: '2@vs',
        resizeMode:'center'



    }
});