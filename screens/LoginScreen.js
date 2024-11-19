import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.navigate('SkyTrack');
      })
      .catch((error) => {
        setErro('Falha ao fazer login: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SkyTrack</Text>
      <Text style={styles.icone}>✈️</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Entrar" onPress={handleLogin} />
        </View>
        <View style={styles.button}>
          <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  icone: {
    fontSize: 45,
    textAlign: 'center',
    padding: 5,
    marginBottom: 20  
  },
  input: {
    height: 40,
    borderColor: '#00796b',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default LoginScreen;
