import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Botao from './Botao';
import GameData from './GameData';

const Loading = ({ nav }) => {
  const [balasVivas, setBalasVivas] = useState(0);
  const [escopeta, setEscopeta] = useState([]);

  useEffect(() => {
    console.log(4);
    GameData.inicializar();
    console.log(5);
    setBalasVivas(GameData.getBalasVivas());
    setEscopeta(GameData.getEscopeta());
  }, []);

  return (
    <View style={styles.msg}>
      {console.log(7)}
      <Text style={styles.msgs}>Informações</Text>
      <Text style={styles.msgs}>Tamanho do carregador: {escopeta.length}</Text>
      <Text style={styles.msgs}>Balas que podem matar: {balasVivas}</Text>
      <Botao label="Próximo" onPress={() => nav('jogo')} />
      <Botao label="Voltar" onPress={() => nav('inicio')} />
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

export default Loading;
