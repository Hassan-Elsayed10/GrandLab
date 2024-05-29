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
        margin: '5@vs',
    },
    noOfferContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFF'
      },
      noOfferText: {
        fontSize: 28,
        color: '#475AD7',
        fontWeight:'900'
      },
});
export default styles;