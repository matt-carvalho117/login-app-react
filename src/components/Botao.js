import { Text, Pressable} from 'react-native';
import { styles } from './estilos';

function Botao({ label, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.botao,
        disabled && styles.botaoDesabilitado,
        pressed && !disabled && styles.pressionado,
      ]}>
      <Text style={styles.texto}>{label}</Text>
    </Pressable>
  );
}

export default Botao;
