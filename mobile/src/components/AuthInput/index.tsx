import React from 'react';
import { View, Text, TextInputProps } from 'react-native';

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';

interface AuthInputProps extends TextInputProps {
  name: string;
  label: string;
  firstChild?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, name, children, firstChild, ...inputProps }) => {
  // const {value} = inputProps;
  // const blockClass = (value || value === undefined) ? 'auth-input-block with-content' : 'auth-input-block';
  
  return (
    <View style={[styles.container, 
      firstChild ? null : styles.containerWithBorder
    ]}>
      <View style={styles.block}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} {...inputProps} />
      </View>
      { children }
    </View>
  );
}

export default AuthInput;