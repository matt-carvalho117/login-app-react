import { View, StyleSheet, Image, Alert, BackHandler } from 'react-native';
import { useEffect, useRef } from 'react';
import Botao from './Botao';
import { Audio } from 'expo-av';

const Perdeu = ({ nav }) => {
   const soundRef = useRef(null); // Para manter o objeto de som

  const emitirSom = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/cat.mp3'),
        { isLooping: true } // Configurando para repetir em loop
      );
      soundRef.current = sound; // Guardar referência ao som
      await sound.playAsync();
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

emitirSom();

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
      <Image source={require('../assets/perdeu.png')} />
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
});

export default Perdeu;
