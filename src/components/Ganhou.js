import {
  View,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
  Text,
} from 'react-native';
import { useEffect, useRef } from 'react';
import GameData from './GameData';
import Botao from './Botao';
import { Audio } from 'expo-av';

const Ganhou = ({ nav }) => {
  const soundRef = useRef(null); 

  const emitirSom = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/parabains.mp3'),
        { isLooping: true } 
      );
      soundRef.current = sound; 
      await sound.playAsync();
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

  emitirSom();
  const pontuacao = GameData.getPontuacao();
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Voltar', 'Tem certeza?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => nav('inicio') },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [nav]);

  return (
    <View style={styles.msg}>
      <Text style={styles.msgs}>Sua pontuação : {pontuacao} </Text>
      <Image source={require('../assets/ganhou.gif')} />
      <Botao
        label="Reiniciar"
        onPress={async () => {
          if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
          }

          nav('inicio');
        }}
      />
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
    fontSize: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'monospace',
    marginHorizontal: 10,
    marginTop: 20,
  },
});

export default Ganhou;
