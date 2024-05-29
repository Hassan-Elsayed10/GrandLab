import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const PasswordSuccessful = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation(); // Use the t function to translate text

  const handleButtonPress = () => {
      navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../../../Assets/Icons/Group_181.png")} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{t('Successful')}</Text>
        <Text style={styles.subtitle}>{t('subPassSuccess')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button1}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText1}>{t('ButtonLogin')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#FFF"

  },
  logoContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
  logo: {
    width: 145,
    height: 145,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color:'#000000'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#454242',
    fontWeight:'400'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  button1: {
    backgroundColor: '#475AD7',
    borderRadius: 12,
    marginBottom: 10,
    paddingVertical: 15,
  },
  buttonText1: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },

});

export default PasswordSuccessful;
