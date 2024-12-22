import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import { useSelector, useDispatch } from 'react-redux';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const AboutUsScreen = () => {
  const [about, setAbout] = useState('');
  const { t, i18n } = useTranslation(); // Use the t function to translate text
  const navigation = useNavigation();
  const currentLanguage = useSelector((state) => state.language);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch data from the API
    setLoading(true)

    if (currentLanguage === 'en') {
      const currentLanguage = 'eng'
      axios.get(`https://grandlabs-backend-patient.vercel.app/about?lang=${currentLanguage}`)
        .then(response => {
          setAbout(response.data.about.description);
          setLoading(false)

        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else if (currentLanguage === 'ar') {
      const currentLanguage = 'arab'
      axios.get(`https://grandlabs-backend-patient.vercel.app/about?lang=${currentLanguage}`)
        .then(response => {
          setAbout(response.data.about.description);
          setLoading(false)

        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

  }, []);
  return (
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
        <Text style={styles.text}>{t('HeaderAbout')}</Text>
      </View>
      <View>
        <Image
          source={require('../../../Assets/Icons/information.png')}
          style={styles.logo}
        />
      </View>
      <ScrollView style={{}}>
        <Text style={styles.description}>
          {loading ?
            <ActivityIndicator visible={loading} size={50} color={'#475AD7'}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            />
            :
            about

          }
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    flex: 1,
    padding: '10@vs',
  },
  header: {
    fontSize: "30@vs",
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#475AD7'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  description: {
    textAlign: 'justify',
    fontSize: "10@vs",
    fontWeight: '700',
    color: '#7A7A7A',
  },
  row: {
    flexDirection: 'row',
    margin: '0@vs',
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
});

export default AboutUsScreen;
