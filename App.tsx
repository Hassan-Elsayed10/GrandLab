import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  I18nManager
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Router } from './src/Navigation';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from './src/Store/authSlice';
import { setLanguage } from './src/Store/languageSlice';
import PackageSet from './src/Component/packageset';
import Orientation from 'react-native-orientation-locker';
import i18n from './src/Lang/i18n';
import Pdfsscreen from './src/Screens/pdf';

function App(): JSX.Element {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      // Use the token or set it in your app's state as needed
      if (token) {
        const parsedToken = JSON.parse(token);
        setToken(parsedToken);
        dispatch(setAuthenticated(true))

      } else {
        // Token is not available
        dispatch(setAuthenticated(false))

      }
    } catch (error) {
      // Handle errors, such as AsyncStorage read errors
    }
  };
  useEffect(() => {
    // Lock screen orientation to portrait when the component mounts
    Orientation.lockToPortrait();

    // Remember to unlock orientation when component unmounts
  }, []);

  useEffect(() => {
    getTokenFromStorage();
    // AsyncStorage.clear()
  }, []);
  useEffect(() => {
    // Load the selected language from AsyncStorage and set it in Redux state
    const loadLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          dispatch(setLanguage(selectedLanguage));
          i18n.changeLanguage(selectedLanguage); // Set language for i18n
          if (selectedLanguage === 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
          } else {
            // Reset to LTR for other languages
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
          }
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };
  
    loadLanguage();
  }, []);

  return (
    <View style={styles.container}>
      <Router isAuthenticated={token} />
      {/* <UploadPdfToCloudinary/> */}
      {/* <PackageSet/> */} 
      {/* <Pdfsscreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  },
});

export default App;
