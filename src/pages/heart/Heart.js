import React, { useEffect, useState, useContext } from 'react';
import { Image, Pressable, Text, TextInput, View, StyleSheet, ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import ModalSearch from '../../components/ModalSearch';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';
import { MovieContext } from '../../context/MovieContext';


export default function Heart() {

  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

  const { savedMovies } = useContext(MovieContext);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [recommend, setRecommend] = useState([]);

  const [pressedIndex, setPressedIndex] = useState(null);

  const scaleValue = new Animated.Value(1);

  async function getMoviesRecommended() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=pt-BR&region=BR&api_key=1c3e85d1944269d059aaa9889984c577`
    );
    const result = await response.json();

    setRecommend(result.results);
  }

  useEffect(() => {
    getMoviesRecommended();
  }, []);

  const scale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1.05]
  });

  const onPressInAnimation = (index) => {
    setPressedIndex(index);
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOutAnimation = () => {
    setPressedIndex(null);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };


  const styles = StyleSheet.create({
    search: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    searchInputStyle:{
      marginHorizontal: 15,
      marginVertical: 35,
      marginBottom: 20,
      flexDirection: 'row',
      borderWidth: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
      borderRadius: 25,
      backgroundColor: '#fff',
      borderColor: '#fff',
    },
  
    movieContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 20,
      width: '40%',
      height: 220,
    },
  
    moviePoster: {
      width: 140,
      height: 199,
      marginHorizontal: 20,
      borderRadius: 10
    },
  
    titleImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10
    },
  
    movieTitle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 10,
      flexWrap: 'wrap',
      width: 135,
      fontWeight: 'bold',
      marginTop: 3,
      color: colors.text
    },
  });
  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={styles.searchInputStyle}
      >
        <TextInput
          style={{ 
            flex: 1,
            height: 50,
            backgroundColor: '#fff',
            color: '#fff',
            borderRadius: 20,
            fontSize: 16,
            marginLeft: 15,
          }}
          onPressIn={() => setIsVisibleModal(true)}
          placeholder='Pesquisar'
          placeholderTextColor={'#979797'}
        />
        <Pressable onPress={() => navigate('')}>
          <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </Pressable>
      </View>
      
      {/* Modal para abertura de filtro de busca de filmes */}
      <ModalSearch
        recommend={recommend}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
      
      <View style={{ backgroundColor: "#00A24D" }}>
        <Text
          style={{
            marginBottom: 15,
            marginTop: 8,
            fontSize: 22,
            marginLeft: 15,
            color: '#fff',
            fontWeight: '200'
          }}
        >
          Filmes salvos:
        </Text>
      </View>
      <View style={{ height: 30 }}></View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {savedMovies && savedMovies.map((movie, index) => (
          <View key={index} style={styles.movieContainer}>
            <TouchableWithoutFeedback
              onPressIn={() => onPressInAnimation(index)}
              onPressOut={onPressOutAnimation}
            >
              <Animated.View 
                style={[
                  styles.movieCard,
                  {
                    transform: [{ scale: index === pressedIndex ? scale : 1 }],
                  }
                ]}
              >
                <View style={styles.titleImageContainer}>
                  <Image 
                    style={styles.moviePoster}
                    source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                  />
                
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
        </View>
        ))}
      </View>
      <View style={{ height: 70, backgroundColor: colors.background }}></View>
      <ModalSearch
        recommend={recommend}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />   
    </ScrollView>
  );
}
