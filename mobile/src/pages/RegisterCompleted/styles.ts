import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },

  image: {
    marginBottom: 30
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10
  },
  
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#D4C2FF',
    textAlign: 'center',
    marginBottom: 100
  },

  button: {
    alignSelf: 'stretch'
  }
});

export default styles;