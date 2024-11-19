import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const cadastrarUsuario = () => {
    if (senha !== confirmarSenha) {
      setMensagemErro('As senhas não coincidem.');
      return;
    }

    setMensagemErro('');
    setMensagemSucesso('');

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setMensagemSucesso('Cadastro realizado com sucesso!');
        setTimeout(() => navigation.navigate('Login'), 1500);
      })
      .catch((erro) => {
        setMensagemErro('Erro ao cadastrar: ' + erro.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SkyTrack</Text>
      <Text style={styles.icon}>✈️</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      {mensagemErro ? <Text style={styles.error}>{mensagemErro}</Text> : null}
      {mensagemSucesso ? <Text style={styles.success}>{mensagemSucesso}</Text> : null}

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Cadastrar" onPress={cadastrarUsuario} />
        </View>
        <View style={styles.button}>
          <Button title="Voltar" onPress={() => navigation.navigate('Login')} />
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
  icon: {
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  success: {
    color: 'green',
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

export default CadastroScreen;
