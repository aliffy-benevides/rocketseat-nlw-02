import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
    paddingHorizontal: 20,
    paddingVertical: 40
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 70
  },

  instructionsBlock: {
    marginBottom: 70
  },
  instructionsTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    color: '#32264D'
  },
  instructionsText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#6A6180'
  },

  main: {
  },
  mainTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#32264D',
    marginBottom: 10
  }
});

export default styles;