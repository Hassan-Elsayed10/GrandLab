import React, { useEffect } from 'react';
import { View, Image, AppState, BackHandler, ImageBackground,Dimensions } from 'react-native'; // Import BackHandler
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setSplashShown, selectSplashShown, setShouldExit } from '../../Store/splashSlice';

export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hasShownSplash = useSelector(selectSplashShown);


  useEffect(()=>{
    setTimeout(() => {
      dispatch(setSplashShown(false));
    }, 1000);
  },[])
  
  useEffect(() => {
  }, [dispatch, hasShownSplash, navigation]);
  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../Assets/Logo/resized-image-Promo.jpeg")}
        style={{ width: width, height: height }}
        resizeMode='stretch'
        
      />
    </View>
  );
};
