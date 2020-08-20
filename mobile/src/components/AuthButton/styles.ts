import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: '#04D361',
    alignItems: 'center',
    borderRadius: 12
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF'
  },
  buttonDisabled: {
    backgroundColor: '#DCDCE5'
  },
  buttonTextDisabled: {
    color: '#9C98A6'
  }
});

export default styles;