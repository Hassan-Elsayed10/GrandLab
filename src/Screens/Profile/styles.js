import { ScaledSheet } from 'react-native-size-matters';

export const styles = ScaledSheet.create({
    container: {
        padding: '5@vs',
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
    container1: {
        flex: .7,
        alignItems: 'center'
    },
    text: {
        fontSize: '25@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },
    image: {
        width: '120@vs',
        height: '120@vs',
    },
    textInputContainer: {
        marginTop: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        justifyContent: 'flex-start',
        borderColor: '#F3F4F6',
        borderWidth: 2,
    },
    inputFocused: {
        borderColor: '#475AD7',
    },
    iconFocused: {
        tintColor: '#475AD7',
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginHorizontal: '10@vs',
        tintColor: '#7A7A7A',
    },
    textInput: {
        flex: 1,
        height: '35@vs',
        color: 'black',
        margin: '3%',
        fontSize: 16,
        flex:1

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
    button: {
        marginBottom: '10@vs',
        marginTop: '20@vs'
    },

    buttonText: {
        fontSize: 18,
        color: '#475AD7',
        textAlign: 'center',
        fontWeight: '700'
    },
    orText: {
        textAlign: 'center',
        marginTop: '10%',
        color: '#757575',
        fontWeight: '700',
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
        borderColor: '#D9D9D9',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    orButtonText: {
        fontSize: 16,
        color: '#565656',
        textAlign: 'center',
    },
    error: {
        color: '#FFF',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#757575',
        borderRadius: 20,
        padding: 10
      }
});

export default styles;