import { ScaledSheet } from 'react-native-size-matters';

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
        fontSize: '25@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        color: '#454242',
        marginBottom: '20@vs'

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
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: '100%',
    },
    loginButtonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    },

});
export default styles;