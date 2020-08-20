import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80
  },
  headerLogo: {
    width: 160,
    height: 47,
    resizeMode: 'contain',
    marginBottom: 10
  },
  headerText: {
    color: '#D4C2FF'
  },

  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50
  },

  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  formTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#32264D'
  },
  formCreateAccountText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8257E5'
  },

  rememberMeForgotBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30
  },
  rememberMeForgotText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#9C98A6'
  },
  rememberMeBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;