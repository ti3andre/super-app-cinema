import React, { useEffect, useState, } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Icon, } from 'react-native-elements';
import Carousel from '../../components/Carousel';
import ModalSearch from '../../components/ModalSearch';
import { useNavigation } from '@react-navigation/native';
import ColorChangingButton from '../../components/HomeButtons';

import { useTheme } from '@react-navigation/native';

const apiKey = '1c3e85d1944269d059aaa9889984c577';

const filmsURL =
  `https://api.themoviedb.org/3/movie/popular?language=pt-BR&region=BR&api_key=${apiKey}`;

export default function Home() {

  const { colors } = useTheme();

  const { navigate } = useNavigation();

  const [pressedButton, setPressedButton] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  // Estado de filmes do Carousel maior a ser exibido
  const [filmCard, setFilmCard] = useState([]);

  const [recommend, setRecommend] = useState([]);

  // Funcao da mudança de cores dos Botões (em cartaz, em breve, etc)
  const handlePress = (buttonNumber) => {
    requestAnimationFrame(() => {
      setPressedButton(buttonNumber);
    });
  };

  // Fetch do Carousel maior
  useEffect(() => {
    const fetchFilm = async () => {
      const response = await fetch(filmsURL);
      const data = await response.json();
      setFilmCard(data.results);
    };
      fetchFilm(filmCard);
  }, []);


  // Fetcth dos filmes recomendados (em tese seria outro endpoint)
  useEffect(() => {
  async function getMoviesRecommended() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=pt-BR&region=BR&api_key=${apiKey}`
    );
    const result = await response.json();

    setRecommend(result.results);
  } getMoviesRecommended();
  }, []);

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    circleImage: {
      marginBottom: 10,
      marginTop: 5,
      marginRight: 5,
      width: 40,
      height: 40,
      borderRadius: 50,
    },
    centerImage:{
      marginBottom: 10,
      marginTop: 5,
      marginRight: 5,
      width: 60,
      height: 40,
    },
    circleHamburguer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 50,
      width: 40,
      height: 40,
      marginBottom: 5,
      marginLeft: 5,
    },
    placeholderText: {
      flex: 1,
      height: 50,
      backgroundColor: '#00A24D',
      color: colors.text,
      borderRadius: 20,
      fontSize: 16,
      marginLeft: 15,
    },
    search: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    searchInputStyle:{
      marginHorizontal: 10,
      marginVertical: 15,
      marginBottom: 10,
      flexDirection: 'row',
      borderWidth: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
      borderRadius: 25,
      backgroundColor: '#00A24D',
      borderColor: colors.border
    },
  
    filmStatus: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 5,
    },
    suggestText: {
      marginLeft:12,
      marginBottom: 15,
      marginTop: 10,
      fontSize: 17,
      fontWeight: 'bold',
      color: colors.text
    }
  });

  return (
    <ScrollView style={styles.view}>

      <View style={{ height: 40, backgroundColor: colors.background }}></View>

      {/* Container que engloba menu, logo da empresa e foto do user */}

      <View style={styles.headerContainer}>
      <View style={styles.circleHamburguer}>
        <Icon
          name="menu"
          type="material"
          color={colors.text}
          underlayColor="transparent"
          onPress={() => navigate('Profile')}
        />
      </View>

        <Image
          style={styles.centerImage}
          source={require('../../../assets/cine-logo.png')}
        />

        <Image
          style={styles.circleImage}
          source={require('../../../assets/andre.jpg')}
        />   
      </View>

      {/* Componente de search */}

      <View
        style={styles.searchInputStyle}
      >
        <TextInput
          style={styles.placeholderText}
          onPressIn={() => setIsVisibleModal(true)}
          placeholder='Pesquisar'
          placeholderTextColor={'#fff'}
        />
        <Pressable onPress={() => navigate('')}>
          <Feather name="search" size={30}  style={{color: '#fff'}}/>
        </Pressable>
      </View>

      {/* Modal para abertura de filtro de busca de filmes */}

      <ModalSearch
        recommend={recommend}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />

      {/* Botões abaixo do Search Input: de 'Em cartaz', 'Em breve', etc */}

      <View style={styles.filmStatus}>
        <ColorChangingButton buttonText="Em cartaz" isPressed={pressedButton === 1} onPress={() => handlePress(1)} />
        <ColorChangingButton buttonText="Populares" isPressed={pressedButton === 2} onPress={() => handlePress(2)} />
        <ColorChangingButton buttonText="Estreias" isPressed={pressedButton === 3} onPress={() => handlePress(3)} />
        <ColorChangingButton buttonText="Em breve" isPressed={pressedButton === 4} onPress={() => handlePress(4)} />      
      </View>

      {/* Carrosel grande e menor */}

      <Carousel isLargeCarousel filmCard={filmCard} />

      <Text style={styles.suggestText}>
        Nossas sugestões
      </Text>

      <Carousel filmCard={recommend}/>
      <View style={{marginBottom: 70,}}></View>
    </ScrollView>
  );
}
