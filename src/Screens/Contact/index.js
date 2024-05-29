import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import axios from 'axios';
import ArrowRIcon from '../../../Assets/Icons/ArrowRight';
import { useSelector, useDispatch } from 'react-redux';

const ContactScreen = () => {
  const { t, i18n } = useTranslation(); // Use the t function to translate text
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentLanguage = useSelector((state) => state.language);
  const [complaint, setComplaint] = useState('');

  // Function to open the specified social media link
  const openLink = (url) => {
    Linking.openURL(url);
  };
  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Complaint submitted:', complaint);
    // Optionally, you can clear the input after submission
    setComplaint('');
  };
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true)
    // Fetch data from the API
    axios.get('https://grandlabs-backend-patient.vercel.app/contact')
      .then(response => {
        setContact(response.data.contact);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);



  return (
    <View style={styles.container}>
      {/* Image at the top center */}
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
        <Text style={styles.text}>{t('HeaderContact')}</Text>
      </View>
      <View style={styles.contactOptions}>
        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => openLink(contact.web)}
        >
          <Icon3 name="web" size={50} style={{ color: '#475AD7', marginRight: '5%', }} />

          <Text style={styles.contactText}>{t("WebSite")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => openLink(contact.facebook)}
        >
          <Icon name="facebook" size={50} style={{ color: '#475AD7', marginRight: '5%', }} />

          <Text style={styles.contactText}>{t('Facebook')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => openLink(contact.instagram)}
        >
          <Icon name="instagram" size={50} style={{ color: '#475AD7', marginRight: '5%', }} />

          <Text style={styles.contactText}>{t('instagram')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => openLink(contact.whatsapp)}
        >
          <Icon name="whatsapp" size={50} style={{ color: '#475AD7', marginRight: '5%' }} />

          <Text style={styles.contactText}>{t('WhatsApp')} : {contact.phone}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => openLink('mailto:youremail@example.com')}
        >
          <Icon2 name="email" size={50} style={{ color: '#475AD7', marginRight: '5%' }} />

          <Text style={styles.contactText}>{t('E-mail')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <Text style={{fontSize:24,fontWeight:'500',color:'#7A7A7A',padding:5}}>Is there any complaint or Inquirty?</Text>

        </View>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity
         style={{ borderColor:'#475AD7',borderWidth:1,borderRadius:20,width:'100%'}}
         onPress={()=>navigation.navigate('ComplaintsScreen')}
        >
          <Text style={{fontSize:30,fontWeight:'bold',padding:10, textAlign:'center',color:'#475AD7'}}> Need Help ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding:5

  },
  contactOptions: {
    alignItems: 'flex-start',
    flex: 3,
    margin: 5,
    padding: 10,
  },
  contactOption: {
    flexDirection: 'row',
    marginBottom: '10%',
    alignItems: 'center'
  },
  contactIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10, // Adjust as needed
  },
  contactText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    color: '#7A7A7A'
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    color: '#475AD7',
    textAlign: 'center',
    flex: 1
  },
});

export default ContactScreen;
