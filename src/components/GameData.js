let balasVivas = 0;
let pontuacao = 0;
let escopeta = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0];
let dificuldade = 0;

function inicializar() {
  console.log('inicializando o jogo...');
  switch (dificuldade) {
    case 1:
      balasVivas = 7;
      break;
    case 2:
      balasVivas = 9;
      break;
    case 3:
      balasVivas = 12;
      break;
    default:
      balasVivas = 6;
  }
  console.log('Balas que podem matar: ' + balasVivas);
  escopeta = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0];
  for (let i = balasVivas; i >= 0; i--) {
    console.log('Colocando bala viva na escopeta...', i);
    let posicaoViva = Math.floor(Math.random() * 15);
    while (escopeta[posicaoViva] == 1) {
      posicaoViva = Math.floor(Math.random() * 15);
    }

    escopeta[posicaoViva] = 1;
  }
  console.log('Escopeta inicializada: ' + escopeta);
}

function getDificuldade() {
  return dificuldade;
}

function getBalasVivas() {
  return balasVivas;
}

function getEscopeta() {
  return escopeta;
}

function getPontuacao() {
  return pontuacao;
}

function setDificuldade(valor) {
  dificuldade = valor;
}

function setBalasVivas(valor) {
  balasVivas = valor;
}

function setEscopeta(array) {
  escopeta = array;
}

function setPontuacao(valor) {
  pontuacao = valor;
}

export default {
  inicializar,
  getDificuldade,
  getBalasVivas,
  getEscopeta,
  getPontuacao,
  setDificuldade,
  setBalasVivas,
  setEscopeta,
  setPontuacao,
};
