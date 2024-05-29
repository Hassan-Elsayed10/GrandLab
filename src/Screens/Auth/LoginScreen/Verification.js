import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const Verification = () => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const { t, i18n } = useTranslation(); // Use the t function to translate text

  const navigation = useNavigation();

  const handleNextPress = () => {
    const code = inputs.join('');
    navigation.navigate('NewPassword', code);
  };

  const handleSendAgain = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleInputChange = (index, text) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);

    // Move focus to the next input when a digit is entered
    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{t('Verification')} ✅</Text>
          <Text style={styles.subtitle}>{t('subVerification')}</Text>
        </View>
        <View style={styles.textInputContainer}>
          {inputs.map((value, index) => (
            <View
              key={index}
              style={[
                styles.inputWrapper,
                value.length > 0 && styles.inputFocused,
              ]}>
              <TextInput
                ref={inputRefs[index]}
                style={[
                  styles.textInput,
                  value.length > 0 && styles.wrraperFocused,
                ]}
                placeholder="-"
                placeholderTextColor="#7C82A1"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleInputChange(index, text)}
                onBlur={() => inputRefs[index].current.blur()}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.NextButton} onPress={handleNextPress}>
          <Text style={styles.NextButtonText}>{t('Next')}</Text>
        </TouchableOpacity>
        <View style={styles.EndContainer}>
          <Text style={styles.EndText}>{t('noReceve')}</Text>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendAgain}>
            <Text style={styles.sendButtonText}> {t('sendAgain')} </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF'
  },
  headerContainer: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#454242',
    fontWeight: '400'
  },
  textInputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    margin: '1%',
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    margin: '2%',
    flex: 1,
    alignItems: 'center',
  },
  inputFocused: {
    marginBottom: 20,
    borderRadius: 12,
    borderColor: '#475AD7',
    margin: '2%',
    flex: 1,
    alignItems: 'center',
    borderWidth: 1
  },
  textInput: {
    color: '#000000',
    margin: "2%",
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18
  },
  wrraperFocused: {
    color: '#475AD7',
    margin: "2%",
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18
  },

  NextButton: {
    backgroundColor: '#475AD7',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
  },
  NextButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700'

  },

  EndContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '110%',
  },
  EndText: {
    fontSize: 16,
    color: '#7A7A7A',
    fontWeight: '700'
  },
  sendButton: {
    marginLeft: 0,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#475AD7',
    fontWeight: '700'

  },
});

export default Verification;
