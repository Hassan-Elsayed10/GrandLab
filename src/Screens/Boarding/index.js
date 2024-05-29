import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBoardingShown } from '../../Store/splashSlice';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
const images = [
    require('../../../Assets/Boarding/board1.png'),
    require('../../../Assets/Boarding/board2.png'),
    require('../../../Assets/Boarding/board3.png'),
    require('../../../Assets/Boarding/board4.png')
];

export default function BoardingScreen() {
    const { width, height } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const isFirstImage = currentIndex === 0;
    const isLastImage = currentIndex === images.length - 1;
    const dispatch = useDispatch()
    const {t} = useTranslation(); // Use the t function to translate text


    const texts = [
        {
            header: t('Boardheader1'),
            sub: t('Boardsub1'),
        },
        {
            header: t('Boardheader2'),
            sub: t('Boardsub2'),
        },
        {
            header: t('Boardheader3'),
            sub: t('Boardsub3'),
        },
        {
            header: t('Boardheader4'),
            sub: t('Boardsub4'),
        },
    ];

    const skip = () => {
        setCurrentIndex(images.length - 1);

    }

    const previous = () => {
        setCurrentIndex(images.length - 2);

    }

    const goToNextImage = () => {
        if (isLastImage) {
            setIsLoading(true)
            AsyncStorage.setItem("boarding_screen_shown", "true").then(() => {
                dispatch(setBoardingShown(false))
            }).finally(() => {
                setIsLoading(false)
            })
        }
        const nextIndex = currentIndex + 1 < images.length ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
    };

    const goToPreviousImage = () => {
        const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1;
        setCurrentIndex(previousIndex);
    };

    if (isLoading) {
        return (
            <ActivityIndicator size={'large'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.skipContainer}>
                <TouchableOpacity onPress={isLastImage ? previous : skip}>
                    {isLastImage ?
                        <View style={styles.iconcontainer}>
                            <Icon name="arrow-back" size={30} color="#000000" />
                            <Text style={styles.textskip}>{isLastImage ? t('previous') : t('Skip')}</Text>
                        </View> : <Text style={styles.textskip}>{isLastImage ? t('previous') : t('Skip')}</Text>

                    }
                </TouchableOpacity>
            </View>
            <View style={styles.carouselContainer}>
                <Image style={[styles.image, { width, height: height * 0.46 }]} source={images[currentIndex]} />
                <View style={styles.textContainer}>
                    <Text style={styles.textheader}>{texts[currentIndex].header}</Text>
                    <Text style={styles.textsub}>{texts[currentIndex].sub}</Text>
                </View>

                <View style={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
                        />
                    ))}
                </View>
            </View>

            <View style={isLastImage ? styles.getstarted : styles.buttonsContainer}>
                <View style={isLastImage ? null : styles.previous}>
                    {!isLastImage && (
                        <TouchableOpacity
                            style={[styles.button, isFirstImage ? styles.disabledButton : null]}
                            onPress={goToPreviousImage}
                            disabled={isFirstImage}
                        >
                            <View style={styles.iconcontainer}>
                                <Icon name="arrow-back" size={30} color="#000000" />

                                <Text style={[styles.buttonText, isFirstImage ? styles.disabledButtonText : null]}>
                                    {t('previous')}
                                </Text>
                            </View>


                        </TouchableOpacity>
                    )}
                </View>
                <View style={isLastImage ? styles.getbutton : styles.next}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            isLastImage ? styles.centerButton : null,
                        ]}
                        hitSlop={{ top: 100, bottom: 100, left: 200, right: 200 }}
                        onPress={goToNextImage}
                    >
                        {isLastImage ?
                            <Text style={isLastImage ? styles.getstartedtext : styles.buttonnext}>{isLastImage ? t('GetStarted') : t('Next')}</Text>
                            :
                            <View style={styles.iconcontainer}>
                                <Text style={isLastImage ? styles.getstartedtext : styles.buttonnext}>{isLastImage ? t('GetStarted') : t('Next')}</Text>
                                <Icon name="arrow-forward" size={30} color="#000000" />
                            </View>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
