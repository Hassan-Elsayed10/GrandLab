import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import Announcement from '../../Component/Announcement';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';

export default function AnnouncementScreen() {
    const navigation = useNavigation();
    const [adds, setAdds] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation(); // Use the t function to translate text
    const currentLanguage = useSelector((state) => state.language);
    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
          setLoading(true);
    
          try {
            const langParam = currentLanguage === 'ar' ? 'arab' : 'eng';
            const response = await axios.get(`https://grandlabs-backend-patient.vercel.app/announcements?lang=${langParam}`);
            setAdds(response.data.announcements);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [currentLanguage]);

    return (
        <>
                <View style={styles.container}>
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
                        <Text style={styles.text}>{t('HeaderAnnu')}</Text>
                    </View>
                    <View style={styles.package}>
                        {loading ?
                            (<ActivityIndicator visible={loading} size={50} color={'#475AD7'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} />)
                            :
                           ( adds.length === 0 ? 
                                <View style={styles.noOfferContainer}>
                                  <Text style={styles.noOfferText}>{t('No Announcement')}</Text>
                                </View>
                             :                            
                                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                    <FlatList
                                        data={adds}
                                        renderItem={({ item }) => <Announcement item={item} />}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                    />
                                </ScrollView>
                            )
                        }
                    </View>
                </View>
        </>
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