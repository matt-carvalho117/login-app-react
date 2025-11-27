import { View, StyleSheet, Image, Text, Alert, BackHandler } from 'react-native';
import Botao from './Botao';
import { useState, useEffect } from 'react';
import GameData from './GameData';
import { Audio } from 'expo-av';

const Dificuldade = ({ nav }) => {

  return (
    <View style={styles.msg}>
      {console.log(7)}
      <Text style={styles.msgs}>Dificuldade:</Text>
      <Botao label="Fácil" onPress={() => { nav('loading'); GameData.setDificuldade(0) }} />
      <Botao label="Normal" onPress={() => { nav('loading'); GameData.setDificuldade(1) }} />
      <Botao label="Díficil" onPress={() => { nav('loading'); GameData.setDificuldade(2) }} />
      <Botao label="Impossível" onPress={() => { nav('loading'); GameData.setDificuldade(3) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  msg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  msgs: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'monospace',
  },
});

export default Dificuldade;


