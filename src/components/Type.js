import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TypingEffect = ({ texto }) => {
  const [textoAtual, setTextoAtual] = useState(''); 
  const [indice, setIndice] = useState(0); 
  const velocidade = 80; 

  useEffect(() => {
    if (indice < texto.length) {
      const timeout = setTimeout(() => {
        setTextoAtual((prevTexto) => prevTexto + texto[indice]); 
        setIndice((prevIndice) => prevIndice + 1); 
      }, velocidade);
      
      return () => clearTimeout(timeout); 
    }
  }, [indice, texto]); 

  return (
      <Text style={styles.texto}>{textoAtual}</Text>  
  );
};

const styles = StyleSheet.create({
  
  texto: {
    fontSize: 24,
    color: '#50fa7b',
    marginTop: 40,
    marginLeft: 10,
    fontFamily: 'monospace'
  },
});

export default TypingEffect;
