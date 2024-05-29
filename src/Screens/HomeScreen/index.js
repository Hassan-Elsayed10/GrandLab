import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import MenuIcon from '../../../Assets/Icons/menu';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Package from '../../Component/Package';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchIdAndData } from '../../Store/resultSlice';
const img1 = require('../../../Assets/Images/BookTest.png')
const img2 = require('../../../Assets/Images/BOOK.png')
const img3 = require('../../../Assets/Images/Branch.png')
const img4 = require('../../../Assets/Images/Result.png')
const img5 = require('../../../Assets/Images/AnnAr.png')
const img6 = require('../../../Assets/Images/test.png')
const img7 = require('../../../Assets/Images/BookTestAr.png')
const img8 = require('../../../Assets/Images/HomeVisitAr.png')
const img9 = require('../../../Assets/Images/BranchAr.png')
const img10 = require('../../../Assets/Images/ResultAr.png')
const img11 = require('../../../Assets/Images/Ann.png')
const img12 = require('../../../Assets/Images/testAr.png')

export default function HomeScreen() {
    const navigation = useNavigation();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentLanguage = useSelector((state) => state.language);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const { width, height } = Dimensions.get('window');
    const imageWidth = width * 0.3; // Adjust the percentage as needed
    const imageHeight = height * 0.2; // Adjust the percentage as needed
    const result = useSelector((state) => state.data.data);
    const notificationCount = useSelector((state) => {
        const results = state.data.data || [];
        const unopenedResults = results.filter((item) => !item.isOpened);
        return unopenedResults.length;
    });

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchIdAndData())
    },[])
    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchIdAndData());
        }, [dispatch])
    );
    const  open = ()=>{
        navigation.navigate('ShowResult');
    }

    useEffect(() => {
        // Fetch data from the API
        setLoading(true);
        if (currentLanguage === 'en') {
            const currentLanguage = 'eng'

            axios.get(`https://grandlabs-backend-patient.vercel.app/packages?lang=${currentLanguage}`)
                .then(response => {
                    const firstFourPackages = response.data.packages.slice(0, 4); // Slice the first 4 items

                    setPackages(firstFourPackages);
                    setLoading(false)

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (currentLanguage === 'ar') {
            const currentLanguage = 'arab'
            axios.get(`https://grandlabs-backend-patient.vercel.app/packages?lang=${currentLanguage}`)
                .then(response => {
                    const firstFourPackages = response.data.packages.slice(0, 4); // Slice the first 4 items

                    setPackages(firstFourPackages);
                    setLoading(false)

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    onPress={() => navigation.openDrawer()}>
                    <MenuIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={open}>
                    <Icon name="bell" size={35} color="#457AD7" />
                    {notificationCount > 0 && (
                        <View style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            backgroundColor: 'red',
                            borderRadius: 10,
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ color: 'white' }}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('BookTest')}>
                    {currentLanguage == 'ar' ?
                        <Image
                            source={img7}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode="center"
                        />
                        :
                        <Image
                            source={img1}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('HomeVisit')}>
                    {currentLanguage == 'ar' ?
                        <Image
                            source={img8}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            source={img2}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('LabScreen')}>
                    {currentLanguage == 'ar' ?

                        <Image
                            source={img9}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            source={img3}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('ResultScreen')}>
                    {currentLanguage == 'ar' ?

                        <Image
                            source={img10}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            source={img4}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('AnnouncementScreen')} >
                    {currentLanguage == 'ar' ?
                        <Image
                            source={img11}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                        :
                        <Image
                            source={img5}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('TestCondition')}>
                    {currentLanguage == 'ar' ?

                        <Image
                            source={img12}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            source={img6}
                            style={{ height: imageHeight, width: imageWidth, borderRadius: 20, margin: 5, borderColor: '#F4EEEE', borderWidth: 2 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
            </View>

            <View style={{ flex: .5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginRight: 20 }}>
                <Text style={styles.title}>{t('PackageHome')}</Text>
                <Text style={styles.subtitle}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    onPress={() => navigation.navigate('PackageScreen')}>{t('View')}</Text>
            </View>
            {loading ? (
                <ActivityIndicator
                    visible={loading}
                    size={50}
                    color={'#475AD7'}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                />
            ) : (
                currentLanguage === 'en' ? (
                    <ScrollView
                        style={{ flexDirection: 'row', backgroundColor: 'red', flex: 1 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    >
                        <FlatList
                            data={packages}
                            renderItem={({ item }) => <Package item={item} />}
                            scrollEnabled={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                ) : (
                    <ScrollView
                        style={{ flex: 1, flexDirection: 'row' }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    >
                        <FlatList
                            data={packages}
                            renderItem={({ item }) => <Package item={item} />}
                            scrollEnabled={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                )
            )}

        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin:"5@s"
    },
    headerimg: {
        width: '35@vs',
        height: '35@vs',
        marginLeft: '20@vs'
    },
    offer: {
        width: '100%',
        height: '100%',
        borderRadius: 25
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: '#565656'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#475AD7',
    },
    text: {
        fontSize: '25@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },

})