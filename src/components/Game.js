import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  BackHandler,
} from 'react-native';
import Botao from './Botao';
import { useState, useEffect } from 'react';
import GameData from './GameData';
import { Audio } from 'expo-av';

export default function Game({ nav }) {
  const dificuldade = GameData.getDificuldade();
  const [vidaDoJogador, setVidaDoJogador] = useState(3);
  const [vidaDoInimigo, setVidaInimigo] = useState(3);
  const [vidaMaximaInimigo, setVidaMaximaInimigo] = useState(3);
  const [turnoDoJogador, setTurnoDoJogador] = useState(true);
  const [rodadaAtual, setRodadaAtual] = useState(0);
  const [balasVivas, setBalasVivas] = useState(0);
  const [escopeta, setEscopeta] = useState([0, 0, 0, 0, 0]);
  const [mostrarExplosao, setMostrarExplosao] = useState(false);
  const [pontuacao, setPontuacao] = useState(GameData.getPontuacao);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Voltar', 'Tem certeza?', [
        { text: 'Cancelar', onPress: () => null, style: 'cancel' },
        { text: 'Sim', onPress: () => nav('inicio') },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setBalasVivas(GameData.getBalasVivas());
    setEscopeta(GameData.getEscopeta());
    switch (dificuldade) {
      case 1:
        setVidaMaximaInimigo(4);
        setVidaInimigo(4);
        break;
      case 2:
        setVidaMaximaInimigo(6);
        setVidaInimigo(6);
        break;
      case 3:
        setVidaMaximaInimigo(9);
        setVidaInimigo(9);
        break;
    }
  }, [dificuldade]);

  useEffect(() => {
    if (vidaDoJogador === 0) {
      setTimeout(() => nav('perdeu'), 2000);
    } else if (vidaDoInimigo === 0) {
      setPontuacao(pontuacao + 1000);
      GameData.setPontuacao(pontuacao);
      nav('ganhou');
    }
  }, [vidaDoJogador, vidaDoInimigo, pontuacao, nav]);

  const emitirSomTiro = async () => {
    try {
      setMostrarExplosao(true);
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/tiro.mp3')
      );
      await sound.playAsync();
      setTimeout(() => setMostrarExplosao(false));
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
      setMostrarExplosao(false);
    }
  };

  function atirarNoInimigo() {
    if (escopeta[rodadaAtual] === 1) {
      emitirSomTiro();
      setPontuacao(pontuacao + 150);
      setVidaInimigo(vidaDoInimigo - 1);
    }
    setTurnoDoJogador(false);
    setRodadaAtual(rodadaAtual + 1);
  }

  function atirarEmSiMesmo() {
    if (escopeta[rodadaAtual] === 1) {
      emitirSomTiro();
      setVidaDoJogador(vidaDoJogador - 1);
    } else {
      setPontuacao(pontuacao + 300);
    }
    setTurnoDoJogador(false);
    setRodadaAtual(rodadaAtual + 1);
  }

  useEffect(() => {
    function inimigoAtirar() {
      if (escopeta[rodadaAtual] === 1) {
        emitirSomTiro();
        setVidaDoJogador(vidaDoJogador - 1);
      }
      setTurnoDoJogador(true);
      setRodadaAtual(rodadaAtual + 1);
    }

    function inimigoAtirarEmSiMesmo() {
      if (escopeta[rodadaAtual] === 1) {
        setVidaInimigo(vidaDoInimigo - 1);
      }
      setTurnoDoJogador(true);
      setRodadaAtual(rodadaAtual + 1);
    }

    if (!turnoDoJogador) {
      const timer = setTimeout(() => {
        const n = Math.round(Math.random());
        if (n === 1) {
          inimigoAtirar();
        } else {
          inimigoAtirarEmSiMesmo();
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [
    turnoDoJogador,
    balasVivas,
    escopeta,
    rodadaAtual,
    vidaDoInimigo,
    vidaDoJogador,
  ]);

  const getHealthBarColor = (vida) => {
    if (vida > 2) return 'green';
    if (vida > 1) return 'yellow';
    return 'red';
  };

  return (
    <View style={styles.main}>
      <View style={styles.enemySection}>
        <View style={styles.enemyDiv}>
          <Text style={styles.msgs}>Score: {pontuacao}</Text>
          <Text></Text>
          <Text style={styles.msgs}>Round: {rodadaAtual + 1}</Text>
        </View>
        <View style={styles.enemyDiv1}>
          <Text style={styles.msgs}>Inimigo:</Text>
          <View style={styles.health}>
            <View
              style={[
                styles.healthBar,
                {
                  width: `${(vidaDoInimigo / vidaMaximaInimigo) * 100}%`,
                  backgroundColor: getHealthBarColor(vidaDoInimigo),
                },
              ]}
            />
          </View>
          <Text style={styles.msgs}>Você:</Text>
          <View style={styles.health}>
            <View
              style={[
                styles.healthBar,
                {
                  width: `${vidaDoJogador * 33.33}%`,
                  backgroundColor: getHealthBarColor(vidaDoJogador),
                },
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.gunSection}>
        {turnoDoJogador ? (
          mostrarExplosao ? (
            <Image
              source={require('../assets/explosion-12681_128.gif')}
              style={styles.explosaoImagem}
            />
          ) : (
            <Image source={require('../assets/turnoJ.png')} style={styles.gun} />
          )
        ) : (
          <Image source={require('../assets/enemy.png')} style={styles.enemy} />
        )}
      </View>

      <View style={styles.btns}>
        <Botao
          label="Atirar em si mesmo"
          onPress={() => atirarEmSiMesmo()}
          disabled={!turnoDoJogador}
        />
        <Botao
          label="Atirar no inimigo"
          onPress={() => atirarNoInimigo()}
          disabled={!turnoDoJogador}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  health: {
    width: 120,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
  },
  healthBar: {
    height: '100%',
    transition: 'width 0.5s ease',
  },
  msgs: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace',
    marginHorizontal: 10,
    marginTop: 20,
  },
  enemySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  gunSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gun: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  enemy: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  explosaoImagem: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});
