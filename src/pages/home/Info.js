import React from "react";

import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet
  } from "react-native";
  import { Feather } from '@expo/vector-icons';
  import { Entypo } from '@expo/vector-icons';

  import GenrePieChart from "../../components/Graphs/graphs/pieChart";
  import BarGraph from '../../components/Graphs/graphs/barChart';
  import LineGraph from '../../components/Graphs/graphs/lineChart';
  import { barData } from "../../components/Graphs/mock/graphMock";

  import { useNavigation, useTheme } from '@react-navigation/native';
  import { AppContext } from '../../context/AppContext';
  
  

  export default function InfoPage() {

    const navigation = useNavigation();
    const { goBack } = useNavigation();

    const { colors } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    
    let date = new Date();

    // Formata a data no formato 'DD/MM/YYYY'
    let formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
    
        // Garante que o dia e o mês tenham sempre dois dígitos
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
    
        return `${day}/${month}/${year}`;
    }
    
    let currentDate = formatDate(date);


    const styles = StyleSheet.create({
      scrollView: {
        flex: 1,
        backgroundColor: colors.background,
      },
      view: {
        marginBottom: -15,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        justifyContent: 'space-between',
      },
      backButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      topText: {
        color: colors.text,
        marginRight: 100,
        fontSize: 23
      },
      econoView: {
        height: 155,
        marginTop: 25,
        borderTopWidth: 1,
        borderTopColor: '#979797',
      },
      econoText: {
        color: colors.text,
        marginTop: 30,
        marginLeft: 30,
        fontSize: 12,
        fontWeight: '300'
      },
      econoValue: {
        fontSize: 50,
        marginLeft: 150,
        marginTop: 35,
        color: colors.text,
        fontWeight: '600'
      },
      curDate: {
        marginLeft: 299,
        marginTop: 14,
        fontSize: 12,
        color: colors.text
      }

    });
    
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.view}>
                <Pressable
                    onPress={goBack}
                    style={styles.backButton}
                >
                    <Feather name="arrow-left" size={35} color="#00A24D" />
                </Pressable>
                <Entypo name="bar-graph" size={24} style={{ color: "#00A24D", marginRight: -30 }} />
                <Text style={styles.topText}>Clube Informa</Text>
            </View>

            <View style={styles.econoView}>
                <Text style={styles.econoText}>
                    Resumo mensal de sua economia
                </Text>
                <Text style={styles.econoValue}>
                    R$ {barData[5].combo + barData[5].voucher}
                </Text>
                <Text style={styles.curDate}>{currentDate}</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>   
                <GenrePieChart />
                <BarGraph />
                <LineGraph />
            </View>
            
            <View style={{ height: 75 }}></View>
        </ScrollView>
    );
}   