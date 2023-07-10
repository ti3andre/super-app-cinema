import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import ModalSearch from '../../components/ModalSearch';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
// import { AppContext } from '../../context/AppContext';


export default function Search() {

  const { colors } = useTheme();
  // const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [recommend, setRecommend] = useState([]);
  const [genres, setGenres] = useState([]);

  async function getMoviesRecommended() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=pt-BR&region=BR&api_key=1c3e85d1944269d059aaa9889984c577`
    );
    const result = await response.json();

    setRecommend(result.results);
  }

  async function getGenres() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=1c3e85d1944269d059aaa9889984c577&language=pt-BR`
    );
    const result = await response.json();

    setGenres(result.genres);
  }

  useEffect(() => {
    getGenres();
    getMoviesRecommended();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
      <View style={{
        height: 2,
        width: '100%',
        backgroundColor: colors.background,
        alignItems: 'center', 
        justifyContent: 'center'
        }}
      />
      
      {/* Modal para abertura de filtro de busca de filmes */}
      <ModalSearch
        recommend={recommend}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
      
      <View>
        <Text
          style={{
            marginBottom: 8,
            marginTop: 8,
            fontSize: 22,
            marginLeft: 15,
            color: colors.text
          }}
        >
          Categorias:
        </Text>
      </View>
      
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#F7F1F1', }}>
          <FlatList
            style={{ backgroundColor: colors.background }}
            data={genres}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <View style={{ marginVertical: 6, marginHorizontal: 15 }}>
              <Text style={{ color: colors.text, marginBottom: 4, }}>{item.name}</Text>
              <View style={{ height: 1, backgroundColor: '#e6e6e6' }}></View>
            </View>}
          /> 
        </View>
        
      </View>
      <View style={{ height: 70, backgroundColor: colors.background }}></View>
      <ModalSearch
        recommend={recommend}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />   
    </View>
  );
}

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
});
