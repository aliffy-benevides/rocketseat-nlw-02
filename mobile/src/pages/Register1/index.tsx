import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import PaginationDot from 'react-native-animated-pagination-dot';

import backIcon from '../../assets/images/icons/back.png';

import AuthInputsBlock from '../../components/AuthInputsBlock';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';

import styles from './styles';

const Register1: React.FC = () => {
  const navigation = useNavigation();
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');

  function canContinue() {
    return !!first_name && !!last_name;
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleContinue() {
    navigation.navigate('Register2', { first_name, last_name });
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
          <PaginationDot maxPage={2} curPage={0} activeDotColor={'#C1BCCC'} />
        </View>

        { !canContinue() &&
          <View style={styles.instructionsBlock}>
            <Text style={styles.instructionsTitle}>Crie sua {'\n'}conta gratuíta</Text>
            <Text style={styles.instructionsText}>Basta preencher esses dados e você estará conosco.</Text>
          </View>
        }

        <View style={styles.main}>
          <Text style={styles.mainTitle}>01. Quem é você?</Text>
          <AuthInputsBlock>
            <AuthInput name="first_name" label="Nome" firstChild 
              value={first_name} onChangeText={setFirst_name}
            />
            <AuthInput name="last_name" label="Sobrenome" 
              value={last_name} onChangeText={setLast_name}
            />
          </AuthInputsBlock>

          <AuthButton enabled={canContinue()} onPress={handleContinue} label="Próximo" buttonStyle={{
            backgroundColor: '#8257E5',
            marginTop: 30
          }} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Register1;