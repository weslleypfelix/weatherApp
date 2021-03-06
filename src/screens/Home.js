import React, { useState, useEffect } from 'react';
import { Card, Title } from 'react-native-paper';
import { View, Image } from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = (props) => {

    const [info, setInfo] = useState({
        name:"carregando..",
        temp:"carregando..",
        humidity:"carregando..",
        desc:"carregando..",
        icon:"carregando.."
    })

    const getWeather = async () => {

        let MyCity = await AsyncStorage.getItem("novacidade")
        if(MyCity === null) {
            //Se ainda não tiver registro algum pra ser capturado no AsyncStorage, então 
            //Carregue o que tiver passado como props no index.js
            const {city} = props.route.params 
            MyCity = city 
        } 
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=63a9f40d6daf932f918b6ce35cdc5161&units=metric`)
        .then(data=>data.json())
        .then(results=>{
            // O que vem neste 'results' ? 
            // {"base": "stations", "clouds": {"all": 3}, "cod": 200, "coord": {"lat": 51.5085, "lon": -0.1257}, "dt": 1628293522, "id": 2643743, "main": {"feels_like": 13.57, "humidity": 88, "pressure": 1001, "temp": 13.83, "temp_max": 15.2, "temp_min": 12.85}, "name": "London", "sys": {"country": "GB", "id": 2019646, "sunrise": 1628310815, "sunset": 1628365139, "type": 2}, "timezone": 3600, "visibility": 10000, "weather": [{"description": "clear sky", "icon": "01n", "id": 800, "main": "Clear"}], "wind": {"deg": 220, "speed": 3.09}}
            console.log(`======================= x ======================= ${results}`)
            setInfo({
                name: results.name,
                temp: results.main.temp,
                humidity: results.main.humidity,
                desc: results.weather[0].description,
                icon:results.weather[0].icon
            })
        })
        .catch((error) => {
            console.log(`${error}: Não foi possível trazer os resultados sobre o clima`)
        })
        .catch((error) => {
            console.log(`${error}: Erro ao estabelecer conexão com a api`)
        })
    }

    //O método de pegar descrição das temperaturas estará disponível apenas uma única vez
   
    {props.route.params.city === 'sao paulo' ? useEffect(()=>{ 
        getWeather()
    },[props.route.params.city]) : null}

    {props.route.params.city !== 'sao paulo' ? useEffect(()=>{
        getWeather()
    },[props.route.params.city]) : null}

    return(
        <View style={{flex: 1}}>
            <Header name="Climatempo do Weslley"/>
            <View style={{alignItems: 'center'}}>
                <Title
                style={{color:"#00aaff", marginTop:30, fontSize: 30}}>
                    {info.name}
                </Title>
                <Image
                style={{width: 120, height: 120}} source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}} />
            </View>

            <Card style={{margin:5, padding:12}}>
                <Title style={{color: "#00aaff"}}> Temperatura: {info.temp} </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title style={{color: "#00aaff"}}> Umidade: {info.humidity} </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title style={{color: "#00aaff"}}> Descrição: {info.desc} </Title>
            </Card>
        </View>
    )
}

export default Home