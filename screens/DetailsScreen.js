import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const weatherDescriptionsPT = {
  "clear sky": "Céu limpo",
  "few clouds": "Poucas nuvens",
  "scattered clouds": "Nuvens dispersas",
  "broken clouds": "Parcialmente nublado",
  "shower rain": "Chuva leve",
  "rain": "Chuva",
  "thunderstorm": "Trovoada",
  "snow": "Neve",
  "mist": "Névoa",
  "overcast clouds": "Nublado",
  "light rain": "Chuva leve",
};

const DetailsScreen = ({ route }) => {
  const { locationData } = route.params;
  const [localTime, setLocalTime] = useState(null);

  const updateLocalTime = () => {
    const timezoneOffset = locationData.timezone / 3600; 
    const nowUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
    const localDate = new Date(nowUTC.getTime() + timezoneOffset * 3600 * 1000);
    setLocalTime(localDate.toLocaleTimeString('pt-BR'));
  };

  useEffect(() => {
    updateLocalTime();
    const intervalId = setInterval(updateLocalTime, 1000); 
    return () => clearInterval(intervalId); 
  }, []);

  const weatherDescription = weatherDescriptionsPT[locationData.weather[0].description] || locationData.weather[0].description;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Detalhes da Localização 📍</Text>
      <Text style={styles.info}>Cidade: {locationData.name}</Text>
      <Text style={styles.info}>Temperatura: {locationData.main.temp}°C</Text>
      <Text style={styles.info}>Clima: {weatherDescription}</Text>
      <Text style={styles.info}>Velocidade do Vento: {locationData.wind.speed} m/s</Text>
      <Text style={styles.info}>Horário Local: {localTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004d40',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#00796b',
  },
});

export default DetailsScreen;
