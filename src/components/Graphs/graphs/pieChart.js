import React, { useState, useContext } from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { AppContext } from '../../../context/AppContext';

function GenrePieChart() {

    const { colors } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

    // State to control the active slice
    const [activeSlice, setActiveSlice] = useState(null);

    const data = [
        {
            key: "animation",
            label: "Animação",
            value: 2,
            color: "#FF0000",
        },
        {
            key: "comedy",
            label: "Comédia",
            value: 4,
            color: "#05A842",
        },
        {
            key: "drama",
            label: "Drama",
            value: 5,
            color: "#0000FF",
        },
        {
            key: "horror",
            label: "Terror",
            value: 6,
            color: "#FF6C10",
        },
        {
            key: "action",
            label: "Ação",
            value: 6,
            color: "#FFBF00",
        },
    ];

    const pieData = data.map((entry, index) => ({
        value: entry.value,
        svg: { 
            fill: entry.color,
            onPressIn: () => setActiveSlice(index),
            onPressOut: () => setActiveSlice(null),  
        },
        key: `pie-${index}`,
        arc: { outerRadius: (activeSlice === index ? '110%' : '100%') },
    }));

    return (
        <View style={{ marginTop: 20, }}>
            <View
                style={{
                    alignItems: 'center',
                    backgroundColor: colors.background,
                    height: 200,
                    width: '100%',
                    padding: 0,
                    borderTopWidth: 1,
                    borderTopColor: '#979797',
                    borderBottomWidth: 1,
                    borderBottomColor: '#979797',
                    
                  }}>
                <Text
                  style={{
                    color: colors.text,
                    marginBottom: 30,
                    marginTop: 25,
                    fontSize: 15,
                    marginRight: 165,
                    fontWeight: '300'
                    }}
                >
                    Gêneros favoritados:
                </Text>
                <View style={{ flexDirection: 'row', flex: 1, }}> 
                    <View style={{ width: '50%', }}>
                        <PieChart
                            style={{ height: 100 }}
                            data={pieData}
                            innerRadius={'45%'}
                        />
                    </View>
                        
                    <View style={{ flexDirection: 'column', width: '50%', marginTop: 10 }}>
                        {/* Renderização das legendas */}
                        {data.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View
                                  style={{
                                    width: 35,
                                    height: 10,
                                    borderRadius: 15,
                                    backgroundColor: item.color,
                                    marginRight: 5,
                                    marginLeft: 15
                                  }}
                                />
                                <Text style={{ color: colors.text, }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default GenrePieChart;
