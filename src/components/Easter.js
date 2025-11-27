import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import TypingEffect from './Type';

const Easter = ({ nav }) => {
  const [texto] = useState('A game by Carlos, Filipe V, Lázaro & Matheus');
  const [mostrarTexto, setMostrarTexto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarTexto(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  setTimeout(() => {
    nav('inicio');
  }, 25000);

  return (
    <View style={styles.msg}>
      {mostrarTexto ? (
        <TypingEffect texto="Wake up, Neo…                                           The matrix has you...                                 Follow the white rabbit.                               knock, knock, Neo." />
      ) : (
        <Text style={styles.texto}>{texto}</Text>
      )}
      }
    </View>
  );
};

const styles = StyleSheet.create({
  msg: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  texto: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 50,
  },
});

export default Easter;
