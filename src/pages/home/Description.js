import React, { useEffect, useState, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from '../../components/Carousel';
import { useTheme } from '@react-navigation/native';
import { MovieContext } from '../../context/MovieContext';

export default function Description() {

  const { colors } = useTheme();

  const { params } = useRoute();
  const { goBack } = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [film, setFilme] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = "1c3e85d1944269d059aaa9889984c577";

  async function getMovieData() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?&append_to_response=videos&language=pt-BR&region=BR&api_key=${apiKey}`
    );
    const filme = await response.json();

    const responseImages = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/images?api_key=${apiKey}`
    );
    const images = await responseImages.json();

    // Remove imagens duplicadas
  const uniqueImages = images.backdrops.reduce((acc, current) => {
    const x = acc.find(item => item.file_path === current.file_path);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

    // Filme recebe dados do endpoint com descricoes do filme e também das imagens
    setFilme({ ...filme, images: uniqueImages });

    setIsLoading(false);
  }

  useEffect(() => {
    getMovieData();
  }, []);

  // Estado dos icons =>  favoritados ou não

  const { savedMovies, saveMovie, removeMovie } = useContext(MovieContext);
  const [hasFavorite, setHasFavorite] = useState(false);
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    const found = savedMovies.find(movie => movie.id === params.id);
    setHasFavorite(found ? true : false);
  }, [savedMovies, params.id]);

  const handleFavoriteClick = () => {
    if (hasFavorite) {
      removeMovie(params.id);
      setHasFavorite(false);
    } else {
      saveMovie(film);
      setHasFavorite(true);
    }
  };

  if (isLoading) {
    return <ActivityIndicator style={StyleSheet.absoluteFill} />;
  };

  // Funcao que abre modal ao clicar em imagem da galeria de fotos
  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };


  const styles = StyleSheet.create({
    headerContainer: {
      marginTop: -45,
      marginBottom: 86,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    backButton: {
      width: 50,
      height: 50,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      position: 'absolute',
      zIndex: 100,
      top: 50,
      marginBottom: 12,
      marginLeft: 5,
    },
    galleryText: {
      marginLeft: 7,
      marginBottom: 8,
      marginTop: 5,
      fontSize: 20,
      fontWeight: 'normal',
      color: colors.text
    },
    galleryImage: {
      width: 100,
      height: 58,
      borderRadius: 8,
      marginLeft: 4
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 7,
      marginBottom: 5,
      marginTop: -2
    },
    voteContainer: {
      backgroundColor: '#00A24D',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 20,      
    },
    titleText: {
      fontSize: 25,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 10,
      color: colors.text
    },
    descriptiontext: {
      marginTop: 15,
      marginLeft: 17,
      marginRight: 22,
      marginBottom: 14
    },
    otherFilmsText: {
      marginLeft: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalImage: {
      width: 350,
      aspectRatio: 16 / 9,
      resizeMode: 'contain',
      borderRadius: 20
    },
  });
  
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background,}}> 
      <View style={{ height: 25, backgroundColor: colors.background }}></View>
        <View style={styles.headerContainer}>
        
          {/* Ícone de goBack */}
          
          <Pressable
            onPress={goBack}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={35} color="#00A24D" />
          </Pressable>
        </View>
      
      {/* Fotos do filme */}
      
      <Text style={styles.galleryText}>
          Galeria de fotos
      </Text>

      <FlatList
        style={{ marginLeft: 3, }}
        horizontal
        data={film.images}
        renderItem={({ item }) => (
          <View style={{ padding: 3 }}>
            <Pressable onPress={() => openImageModal(item)}>
              <Image
                source={{uri: `https://image.tmdb.org/t/p/original${item.file_path}`}}
                style={styles.galleryImage}
              />
            </Pressable>         
          </View>
        )}
        keyExtractor={(item) => item.file_path}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible && selectedImage !== null}
      >
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modalView}>
            {selectedImage && (
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${selectedImage.file_path}` }}
                style={styles.modalImage}
              />
            )}
          </TouchableOpacity>
        </Pressable>
      </Modal>

      {/* Video do filme */}

      <View style={{marginTop: 12, marginBottom: 0, }}>
        <YoutubePlayer height={222} videoId={film?.videos?.results[0]?.key} />
      </View>

      {/* Info abaixo do filme e icons */}

      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={styles.voteContainer}>
            <Text style={{ fontSize: 10, color: colors.text }}>IMDB {params?.vote_average} / 10</Text>
          </View>
          <Text style={{ fontSize: 10, color: colors.text }}> | {params?.release_date}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable onPress={handleFavoriteClick}>
            <AntDesign
              name="heart"
              color={hasFavorite ? 'red' : '#979797'}
              size={27}
            />
          </Pressable>
          <Feather name="share-2" color="#979797" size={27} />
          <Pressable onPress={() => setHasSave(!hasSave)}>
            <Ionicons
              name="bookmark-sharp"
              color={hasSave ? colors.text : '#979797' }
              size={27}
            />
          </Pressable>
        </View>
      </View>

      {/* Título do filme */}

      <Text style={styles.titleText}>
        {params?.title ?? '-'}
      </Text>
      
      {/* Gêneros do filme */}

      <View style={{ flexDirection: 'row', marginLeft: 9 }}>
        {film.genres.map((genre) => (
          <Text style={{ marginLeft: 9, color: colors.text }} key={genre.id}>{genre.name} | </Text>
        ))}
      </View>
      
      {/* Descrição do filme */}

      <View style={styles.descriptiontext}>
        <Text style={{ color: colors.text }}>{film.overview}</Text>
      </View>

      {/* O que mais assistir */}

      <View style={{ marginTop: 20, marginBottom: 10, }}>
        <Text style={styles.otherFilmsText}>
          O que mais assistir
        </Text>
      </View>

      {/* Carrossel final */}

      <Carousel filmCard={params.recommend}/>
      <View style={{marginBottom: 70,}}></View>
    </ScrollView>
  );
}
