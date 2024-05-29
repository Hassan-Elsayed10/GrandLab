import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Results from '../../Component/Results';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import { ScaledSheet } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIdAndData } from '../../Store/resultSlice';
export default function ShowResult() {
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.data);
    const sortedData = data.slice().sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)) ;

    useEffect(() => {
        // Dispatch the fetchData action when the component mounts
        dispatch(fetchIdAndData());
      }, [dispatch]); // Only dispatch fetchData when component mounts

    return (
        <View style={styles.package}>
            <View style={styles.row} >
                {
                    currentLanguage == 'ar' ?
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
                <Text style={styles.text}>{t('HeaderResult1')}</Text>

            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {loading ? (
                    <ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} />
                ) : (
                    data && data.length > 0 ? (
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <FlatList
                                data={sortedData}
                                renderItem={({ item }) => <Results item={item} />}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                            />
                        </ScrollView>
                    ) : (
                        <Text style={styles.title1}> No Result Yet</Text>
                    )
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    package: {
        flex: 1,
        margin: '5@vs',
        backgroundColor:'#FFF'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#475AD7',
    },
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
    text: {
        fontSize: '25@vs',
        fontWeight: '700',
        color: '#475AD7',
        textAlign: 'center',
        flex: 1
    },
    title1: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#475AD7',
    },
});
