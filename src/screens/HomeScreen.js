import { useState } from 'react';
import { Platform, Alert, BackHandler, View } from 'react-native';
import { styles } from '../components/estilos';
import Inicio from '../components/Inicio';
import Game from '../components/Game';
import Loading from '../components/Loading';
import Perdeu from '../components/Perdeu';
import Ganhou from '../components/Ganhou';
import Easter from '../components/Easter';
import Dificuldade from '../components/Dificuldade';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
export default function App() {

  const [tela, setTela] = useState('login');

  const goTo = (nomeTela) => {
    console.log(2);
    setTela(nomeTela);
  };
  const sair = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert('Sair', 'Esta opção não está disponivel para iOS', [
        { text: 'OK' },
      ]);
    }
  };
  return (
    <View style={styles.container}>

      {tela === 'inicio' && <Inicio nav={goTo} sair={sair} />}
      {tela === 'jogo' && <Game nav={goTo} />}
      {tela === 'dificuldade' && <Dificuldade nav={goTo} />}
      {tela === 'loading' && <Loading nav={goTo} />}
      {tela === 'perdeu' && <Perdeu nav={goTo} />}
      {tela === 'ganhou' && <Ganhou nav={goTo} />}
      {tela === 'easter' && <Easter nav={goTo} />}
      {tela === 'login' && <LoginScreen nav={goTo} />}
      {tela === 'register' && <RegisterScreen nav={goTo} />}
    </View>
  );
}
