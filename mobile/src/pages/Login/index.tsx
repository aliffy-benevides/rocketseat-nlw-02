import React, { useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import AuthInput from '../../components/AuthInput';
import AuthInputsBlock from '../../components/AuthInputsBlock';

import { useAuth } from '../../contexts/AuthContext';

import backgroundImg from '../../assets/images/background.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';
import AuthButton from '../../components/AuthButton';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const { logIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function canSubmit() {
    return !!email && !!password;
  }

  function handleSubmitButtonPress() {
    logIn(email, password, rememberMe)
      .catch(() => {});
  }

  function handleNavigateToRegister() {
    navigation.navigate('Register1');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground resizeMode='contain' source={backgroundImg} style={styles.header}>
          <Image source={logoImg} style={styles.headerLogo} />
          <Text style={styles.headerText}>Sua plataforma de {'\n'}estudos online</Text>
        </ImageBackground>

        <View style={styles.main}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Fazer login</Text>
            <BorderlessButton
              onPress={handleNavigateToRegister}
            >
              <Text style={styles.formCreateAccountText} >Criar uma conta</Text>
            </BorderlessButton>
          </View>

          <AuthInputsBlock>
            <AuthInput name="email" label="E-mail" firstChild
              value={email} onChangeText={setEmail} 
            />
            <AuthInput name="password" label="Senha"
              value={password} onChangeText={setPassword} 
              secureTextEntry={!showPassword}
            >
              <BorderlessButton onPress={() => setShowPassword(!showPassword)}>
                <Feather size={20}
                  color={showPassword ? "#8257E5" : "#9C98A6"}
                  name={showPassword ? "eye-off" : "eye"}
                />
              </BorderlessButton>
            </AuthInput>
          </AuthInputsBlock>

          <View style={styles.rememberMeForgotBlock}>
            <View style={styles.rememberMeBlock}>
              <CheckBox value={rememberMe}
                onValueChange={setRememberMe}
              />
              <Text style={styles.rememberMeForgotText}>Lembrar-me</Text>
            </View>
            <Text style={styles.rememberMeForgotText}>Esqueci minha senha</Text>
          </View>

          <AuthButton enabled={canSubmit()} label="Entrar" onPress={handleSubmitButtonPress} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Login;