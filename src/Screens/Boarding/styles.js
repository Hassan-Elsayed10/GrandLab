import { ScaledSheet } from 'react-native-size-matters';
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#FFF'
    },
    skipContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 0.1,
        alignItems: 'center',
        marginRight: 20,
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        marginBottom: '10%',
    },
    textContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:'5@vs'
    },
    textheader: {
        fontSize: '16@vs',
        textAlign: 'center',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '5%',
    },
    textsub: {
        fontSize: '15@vs',
        textAlign: 'center',
        fontWeight: '400',
        color: '#454242',
        marginBottom: '10%',
    },
    textskip: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
        color: '#000000',
    },
    dotsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#475AD7',
        width: 30
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: .24,
        // backgroundColor:'red',

    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    buttonnext: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    disabledButton: {
        opacity: 0.5,
    },
    disabledButtonText: {
        color: 'gray',
    },
    next: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor:'blue',
        marginRight: 20
    },
    previous: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor:'blue',
        marginLeft: 20
    },
    getstarted: {
        flex: .15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'


    },
    getbutton: {
        backgroundColor: '#475AD7',
        borderWidth: 0,
        flex: 1,
        marginLeft: '10%',
        padding: 15,
        marginRight: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    getstartedtext: {
        color: '#FFFFFF'
    },
    iconcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // button:{
    //     backgroundColor: '#475AD7',
    //     borderRadius: 12,
    //     marginBottom: '10@vs',
    //     paddingVertical: '15@vs',
    //     marginTop: '20@vs'
    // }


});
export default styles;