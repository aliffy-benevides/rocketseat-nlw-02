import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/AuthContext';
import { Text, Image, ImageBackground } from 'react-native';

import AuthButton from '../../components/AuthButton';

import giveClassesBackgroudImg from '../../assets/images/background.png';
import successCheckIcon from '../../assets/images/icons/success-check-icon.png';

import styles from './styles';

const RegisterCompleted: React.FC = () => {
  const { registeredUser, logIn } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!registeredUser)
      navigation.navigate('/');
  }, [registeredUser, navigation])

  function handleLogin() {
    if (!registeredUser) {
      return navigation.navigate('/');
    }

    const { email, password } = registeredUser;
    logIn(email, password)
      .catch(() => { })
  }

  return (
    <ImageBackground resizeMode="cover" source={giveClassesBackgroudImg} style={styles.container}>
      <Image source={successCheckIcon} style={styles.image} />
      <Text style={styles.title}>Cadastro {'\n'}concluído</Text>
      <Text style={styles.text}>Agora você faz parte da {'\n'}plataforma da Proffy</Text>

      <AuthButton label="Fazer login" enabled onPress={handleLogin} buttonStyle={styles.button} />
    </ImageBackground>
  );
}

export default RegisterCompleted;