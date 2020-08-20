import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import PaginationDot from 'react-native-animated-pagination-dot';
import { Feather } from '@expo/vector-icons';

import backIcon from '../../assets/images/icons/back.png';

import { IUser, useAuth } from '../../contexts/AuthContext';

import AuthInputsBlock from '../../components/AuthInputsBlock';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';

import styles from './styles';

const Register2: React.FC = () => {
  const navigation = useNavigation();
  const params: any = useRoute().params || {};
  const { first_name, last_name } = params;

  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!first_name || !last_name) {
      return navigation.goBack();
    }
  }, [first_name, last_name])

  function canSubmit() {
    return !!email && !!password && !!confirm_password;
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSubmit() {
    const user: IUser = {
      first_name, last_name,
      email, password, confirm_password
    }
    
    register(user)
      .then(() => navigation.navigate('RegiterCompleted'))
      .catch(() => {})
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <BorderlessButton
            onPress={handleGoBack}
          >
            <Image source={backIcon} />
          </BorderlessButton>
          <PaginationDot maxPage={2} curPage={1} activeDotColor={'#C1BCCC'} />
        </View>

        <View style={styles.main}>
          <Text style={styles.mainTitle}>02. Email e Senha?</Text>
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
            <AuthInput name="confirm_password" label="Confirme a senha" 
              value={confirm_password} onChangeText={setConfirm_password}
              secureTextEntry={!showPassword}
            />
          </AuthInputsBlock>

          <AuthButton enabled={canSubmit()} onPress={handleSubmit} label="Concluir cadastro" buttonStyle={{
            marginTop: 30
          }} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Register2;