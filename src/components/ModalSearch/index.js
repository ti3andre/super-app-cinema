import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { AppContext } from '../../context/AppContext';

const apiKey = "1c3e85d1944269d059aaa9889984c577";
const searchURL = "https://api.themoviedb.org/3/search/movie";

export default function ModalSearch({
  setIsVisibleModal,
  isVisibleModal,
  recommend,
}) {

  const { colors } = useTheme();
  const { setIsModalVisible, isDarkTheme } = useContext(AppContext);

  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState("");

  const [films, setFilms] = useState([]);

  async function getFilms() {
    const searchWithQueryURL = `${searchURL}?api_key=${apiKey}&language=pt-BR&region=BR&query=${searchTerm}&images`;

    const res = await fetch(searchWithQueryURL);
    const data = await res.json();

    setFilms(data.results);
  }

  useEffect(() => {
    getFilms();
  }, [searchTerm]);

  useEffect(() => {
    if (!isVisibleModal) {
        setSearchTerm('');
    }
}, [isVisibleModal]);


  const styles = StyleSheet.create({
    view: {},
    wrapperModal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    containerModal: {
      borderRadius: 11,
      padding: 20,
      alignItems: 'center',
      backgroundColor: isDarkTheme ? '#979797' : '#e6e6e6',
      width: "80%",
      height: 510,
      marginTop: 25,
    },
    filmsButton:{
      marginLeft: 15,
      marginTop: 1,
      backgroundColor: colors.background,
      borderRadius: 7,
      padding: 3,
    },
    filmsTextButton:{
      fontSize: 15,
      fontWeight: 'normal',
      color: colors.text,
    }
  });
  

  return (
    <Modal
      visible={isVisibleModal}
      transparent={true}
      onRequestClose={() => {
        setIsVisibleModal(false);
      }}
    >
      <View style={styles.wrapperModal} pointerEvents='box-none'>
        <Pressable
          style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={() => setIsVisibleModal(false)}
         />
          <View style={styles.containerModal}>
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                backgroundColor: "#fff",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  borderRadius: 5,
                  flex: 1,
                  paddingHorizontal: 10,
                  
                }}
                onChangeText={(txt) => setSearchTerm(txt)}
                value={searchTerm}
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Icon style={styles.iconLupa} name="search" size={40} />
              </TouchableOpacity>
            </View>
            {/* <Text style={{marginLeft: 5, marginTop: 3,}}>Digite o nome de um filme</Text> */}
            <FlatList
              data={films}
              renderItem={({ item }) => (
                <View style={{ zIndex: 1000 }}>
                  <TouchableOpacity
                    style={styles.filmsButton}
                    onPress={() => {
                      setIsVisibleModal(false);
                      navigation.navigate("Description", {
                        ...item,
                        recommend: recommend,
                      });
                    }}
                  >
                    <Text style={styles.filmsTextButton}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
    </Modal>
  );
}
