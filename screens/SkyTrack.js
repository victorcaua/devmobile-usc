import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ref, push } from 'firebase/database';
import { realtimeDb } from '../firebase';

const SkyTrack = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!location) {
      setError('Por favor, insira uma localização.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b06765ec71742778244ddd5d111520c&units=metric`
      );

      setError(null);

      const historyRef = ref(realtimeDb, 'history');
      push(historyRef, {
        name: response.data.name,
        temperature: response.data.main.temp,
        timestamp: Date.now(),
      });

      setHistory((prevHistory) => {
        const newHistory = [...prevHistory, response.data];
        return newHistory.length > 5 ? newHistory.slice(1) : newHistory;
      });

      navigation.navigate('Detalhes', { locationData: response.data });

      setLocation('');
    } catch (err) {
      setError('Erro ao buscar a localização.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️ SkyTrack ✈️</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da localização"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.historyTitle}>Histórico Local:</Text>

      


      <FlatList
        data={history}
        keyExtractor={(item) => item.id || item.name}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text
              style={styles.historyText}
              onPress={() =>
                navigation.navigate('Detalhes', { locationData: item })
              }
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#004d40',
  },
  historyItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00796b',
  },
  historyText: {
    fontSize: 16,
    color: '#00796b',
  },
});

export default SkyTrack;
