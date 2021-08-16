import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ navigation }) => {

    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const fetchCities = (text) => {
        setCity(text)
        fetch("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=" + text + "&locationType=city&format=json")
            .then(item => item.json())
            .then(resultado => { 
                setCities(resultado.location.address.slice(0, 9))
            })
            .catch((erro) => {
                // console.warn("Falha ao procurar cidade!..")
                console.log(`${erro} Erro durante a pesquisa das cidades.`)
            })
            .catch((erro) => {
                // console.warn("Falha ao fazer requisição à api!..")
                console.log(`${erro} Erro ao buscar comunicação com a API`)
            })
        // A api irá retornar uma promise. E a forma como lidamos com promises é com .then() e .catch()!
    }

    const btnClick = async () => { // Clique a partir do botão
        await AsyncStorage.setItem("novacidade", city)
        navigation.navigate("home", { city: city })
    }

    const listClick = async (cityname) => { //Clique a partir da lista 
        setCity(cityname)
        await AsyncStorage.setItem("novacidade", cityname)
        navigation.navigate("home", { city: cityname })
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Header name="Clima Tempo do Wesz!" />
                {/* Esse TextInput vem desse react-native-paper que é uma uma coleção de componentes com o design do google material design
            guidelines
             */}
                <TextInput
                    label="Nome da cidade"
                    placeholder="Digite o nome da cidade"
                    theme={{ colors: { primary: "#00aaff", accent: "black" } }}
                    value={city}
                    onChangeText={(text) => fetchCities(text)}
                // Esse fetchCities é uma função qu e vai receber o valor que for passado no textInput.
                />
                <Button icon="content-save" mode="contained"
                    theme={{ colors: { primary: "#00aaff", } }
                    }
                    style={{ margin: 20 }}
                    onPress={() => btnClick()}>
                    <Text style={{ color: "white" }}> Press me </Text>
                </Button>

                <FlatList
                    data={cities}
                    renderItem={({ item }) => {
                        
                        return (
                            <Card
                                style={{ margin: 2, padding: 12 }}
                                onPress={() => listClick(item)}
                            >
                                <Text>{item}</Text>
                            </Card>
                        )
                    }}
                    keyExtractor={item => item}
                />

            </View>
        </>
    );
};

export default Search;