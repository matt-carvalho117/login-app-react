import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: 'red',
    margin: 5,
  },
  pressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  texto: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'white',
    alignSelf: 'center',
  },
  main: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  main1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
