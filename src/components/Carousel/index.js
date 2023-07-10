// Carrossel de filmes

import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Image, Text, Animated, TouchableWithoutFeedback, } from 'react-native';

import { useTheme } from '@react-navigation/native';

const imgUrl = 'https://image.tmdb.org/t/p/w500/';

// Props está trazendo dados de results de filmes vinda de Home no fetch da Database MovieDB
export default function Carousel({filmCard, isLargeCarousel}) {

  const { colors } = useTheme();

  const [animations, setAnimations] = useState({});

  // Vamos aumentar a escala somente do item clicado no carousel
  useEffect(() => {
    const newAnimations = {};
    filmCard.forEach(item => {
      newAnimations[item.id] = new Animated.Value(1);
    });
    setAnimations(newAnimations);
  }, [filmCard]);

  const handlePressIn = (id) => {
    Animated.spring(animations[id], {
      toValue: 1.06,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = (id) => {
    Animated.spring(animations[id], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const styles = StyleSheet.create({
    CarouselContainer: {
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    styleCard: {
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 5,
      width: 140,
      height: 220,
    },
    cardImg: {
      width: 130,
      height: 180,
      borderRadius: 20,
    },
    filmTitle: {
      marginTop: 3,
      fontSize: 8,  
      marginBottom: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.text
    },
    voteAverage: {
      fontSize: 7,
      color: '#979797',
      textAlign: 'center',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    isLargeCarouselContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -15,
    },
    isLargeStyleCard: {
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 5,
      width: 180,
      height: 290,
    },
    largeCardImage: {
      width: 167,
      height: 225,
      borderRadius: 20,
    },
    largeText: {
      marginTop: 3,
      fontSize: 10,  
      marginBottom: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.text
    },
    largeVoteAverage: {
      fontSize: 8,
      color: '#979797',
      textAlign: 'center',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  return (
    <View>
      <View style={ isLargeCarousel ? styles.isLargeCarouselContainer : styles.CarouselContainer}>
        {/* Flatlist trabalha com uma melhor performance do que o map no Native. */}
        <FlatList
          horizontal 
          showsHorizontalScrollIndicator={false}
          // filmCard é o estado que recebe os filmes lá na HomePage
          data={filmCard}
          renderItem={({ item }) => {
            if (!animations[item.id]) {
              // This item's animation has not been initialized yet, so we render
              // a plain View instead of an Animated.View.
              return <View />;
            }

            return (
              <TouchableWithoutFeedback 
                onPressIn={() => handlePressIn(item.id)} 
                onPressOut={() => handlePressOut(item.id)}
              >
                <Animated.View style={ [
                  isLargeCarousel ? styles.isLargeStyleCard : styles.styleCard, 
                  { transform: [{ scale: animations[item.id] }] }
                ]}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                      source={{ uri: imgUrl + item.poster_path }}
                      style={ isLargeCarousel? styles.largeCardImage : styles.cardImg }
                    />
                  </View>
                    <Text style={ isLargeCarousel? styles.largeText : styles.filmTitle}>{item.title}</Text>
                    <Text style={ isLargeCarousel ? styles.largeVoteAverage : styles.voteAverage}>
                      {'Nota: ' + item.vote_average}
                    </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          )
        }}
        />
      </View>
    </View>
  );
};