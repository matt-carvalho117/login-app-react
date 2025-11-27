import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Botao from './Botao';
import { styles } from './estilos';
import FadeInView from './Fade';

const Inicio = ({ nav, sair }) => {
  
  const [clickCount, setClickCount] = useState(0);

  const handleTitleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount >= 4) {
      Alert.alert('Woop, Woop', 'Você nos achou');
      setClickCount(0);
      setTimeout(() => {
        nav('easter')
      }, 3000);
    }
  };

  return (
    <View style={styles.main}>
      <FadeInView style={styles.main1}>
        <Text style={styles.titulo} onPress={handleTitleClick}>
          Buckshot Roulette
        </Text>
        <Text style={styles.titulo}>Mobile</Text>
      </FadeInView>

      <FadeInView style={styles.main2}>
        <Botao
          label="Jogar"
          onPress={() => {
            console.log(1);
            nav('dificuldade');
          }}
        />
        <Botao label="Sair" onPress={sair} />
      </FadeInView>
    </View>
  );
};

export default Inicio;
