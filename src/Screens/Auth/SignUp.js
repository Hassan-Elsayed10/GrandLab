import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import ArrowIcon from '../../../Assets/Icons/Arrow';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SignUp() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phone, setphone] = useState('');
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isFirstName, setIsFirstName] = useState(false);
  const [isLastName, setIsLastName] = useState(false);
  const [gender, setSelectedGender] = useState(''); // Initially no gender is selected
  const [isPhoneFocused, setPhoneFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isAllFieldsFilled, setAllFieldsFilled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { t, i18n } = useTranslation(); // Use the t function to translate text

  useEffect(() => {
    setAllFieldsFilled(
      password !== '' &&
      email &&
      firstName &&
      lastName &&
      phone &&
      gender
    );
  }, [password, email, firstName, lastName, phone, gender]);


  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordVisible(text !== '');
  };



  // Create a function to post the data to the API
  const postDataToApi = async () => {
    setLoading(true)
    try {

      // Make the POST request to the API
      const response = await axios.post('https://grandlabs-backend-patient.vercel.app/signup', { email, firstName, lastName, password, phone, gender, type: 'patient', status: 'true' });
      // Handle the response
      // Check the response status code
      if (response.status === 200) {
        // Request was successful, navigate to 'Login' screen
        navigation.navigate('SuccessfulSign');
      } else {
        // Request was not successful, set an error message
        setErrorMessage('Failed to sign up. Please try again later.');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Unprocessable Entity Error
        try {
          const errorResponse = error.response.data; // Assuming error.response.data contains the JSON response
          if (errorResponse && errorResponse.Reason && errorResponse.Reason[0].msg) {
            setErrorMessage(errorResponse.Reason[0].msg);
          } else {
            setErrorMessage('Invalid input data. Please check your details.');
          }
        } catch (innerError) {
          setErrorMessage('Invalid input data. Please check your details.');
        }
      } else if (error.response && error.response.status === 403) {
        // User already exists, use another email
        setErrorMessage('User already exists. Please use another email.');
      } else {
        // Other error occurred, set a generic error message
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
    setLoading(false)

  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('ButtonSignUp')}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              {t('subSign')}
            </Text>
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <View
            style={[
              styles.inputWrapper,
              isFirstName && styles.inputFocused,
            ]}
          >
            <Image
              source={require('../../../Assets/Icons/user.png')}
              style={[
                styles.inputIcon,
                isFirstName && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput}
              placeholder={t("FirstName")}
              placeholderTextColor="#565656"
              onFocus={() => setIsFirstName(true)}
              onBlur={() => setIsFirstName(false)}
              value={firstName}
              onChangeText={setfirstName}
            />
          </View>
          <View
            style={[
              styles.inputWrapper,
              isLastName && styles.inputFocused,
            ]}
          >
            <Image
              source={require('../../../Assets/Icons/user.png')}
              style={[
                styles.inputIcon,
                isLastName && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput}
              placeholder={t("LastName")}
              placeholderTextColor="#565656"
              onFocus={() => setIsLastName(true)}
              onBlur={() => setIsLastName(false)}
              value={lastName}
              onChangeText={setlastName}
            />
          </View>
          <View
            style={[
              styles.inputWrapper,
              isPhoneFocused && styles.inputFocused,
            ]}
          >
            <Image
              source={require('../../../Assets/Icons/call.png')}
              style={[
                styles.inputIcon,
                isPhoneFocused && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput}
              placeholder={t("PhoneNumber")}
              placeholderTextColor="#565656"
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              keyboardType='phone-pad'
              value={phone}
              onChangeText={setphone}
            />
          </View>
          <View
            style={[
              styles.inputWrapper,
              isEmailFocused && styles.inputFocused,
            ]}
          >
            <Image
              source={require('../../../Assets/Icons/sms.png')}
              style={[
                styles.inputIcon,
                isEmailFocused && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput}
              placeholder={t("Email")}
              placeholderTextColor="#565656"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View
            style={[
              styles.inputWrapper,
              isPasswordFocused && styles.inputFocused,
            ]}
          >
            <Image
              source={require('../../../Assets/Icons/password-check.png')}
              style={[
                styles.inputIcon,
                isPasswordFocused && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInput1}
              placeholder={t("pass")}
              secureTextEntry={passwordVisible}
              placeholderTextColor="#565656"
              onChangeText={handlePasswordChange}
              value={password}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <View style={styles.eyecontainer}>
              {passwordVisible ?
                (
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name="eye-slash"
                      size={30}
                      color='#7A7A7A'
                    />
                  </TouchableOpacity>
                ) :
                (
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name="eye"
                      size={30}
                      color='#7A7A7A'
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <View
            style={[
              styles.inputWrapper,
            ]}
          >
            <Image
              source={require('../../../Assets/Icons/gender.png')}
              style={[
                styles.inputIcon,
                gender && styles.iconFocused,
              ]}
              resizeMode="contain"
            />
            <Picker
              selectedValue={gender}
              onValueChange={handleGenderChange}
              style={{ flex: 1 }}
            >
              <Picker.Item style={{ color: '#565656' }} label={t("SelectGender")} value="" />
              <Picker.Item style={{ color: '#565656' }} label={t("Male")} value="male" />
              <Picker.Item style={{ color: '#565656' }} label={t("Female")} value="female" />
            </Picker>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>{t('haveAccount')} </Text>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.signUpButtonText}>{t('ButtonLogin')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        {loading && isAllFieldsFilled ?
          (<ActivityIndicator visible={loading} size={20} />)
          : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={postDataToApi}
            >
              <Text style={styles.loginButtonText}>{t('ButtonSignUp')}</Text>
            </TouchableOpacity>)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    alignItems: 'stretch',
  },
  subtitleContainer: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nextButtonText: {
    fontSize: 16,
    color: '#475AD7',
    textAlign: 'center',
    padding: 5
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#454242',
    fontWeight: '400',
    textAlign: 'center',

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
    marginHorizontal: 10,
    tintColor: '#7A7A7A',
  },

  textInput: {
    flex: 1,
    height: 40,
    color: 'black',
    margin: '3%',
    fontSize: 16,
    fontWeight: '400',

  },
  textInput1: {
    flex: 1,
    height: 40,
    color: 'black',
    margin: '3%',
    fontSize: 16,
    fontWeight: '400',
  },
  loginButton: {
    backgroundColor: '#475AD7',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 50,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',

  },
  inputWrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@vs',
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'space-between',
    borderColor: '#F3F4F6',
    borderWidth: 2,
    padding: 5,
    width: '100%'
  },
  stakedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ACACAC',
    marginLeft: 5

  },
  searchInput: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  error: {
    color: '#FFF',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%'
  },
  signUpText: {
    fontSize: 16,
    color: '#7A7A7A',
    fontWeight: '500',
  },
  signUpButton: {
    marginLeft: 0,
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#475AD7',
    fontWeight: '500',

  },
  eyecontainer: {
    marginLeft: '45%',
  },
  eyeIcon: {
    flex: 1,
    justifyContent: 'center',
  },
});