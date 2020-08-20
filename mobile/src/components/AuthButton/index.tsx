import React from 'react';
import { Text, StyleProp, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

interface Props {
  enabled: boolean;
  onPress(): void;
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
}

const AuthButton: React.FC<Props> = ({ enabled, onPress, label, buttonStyle }) => {


  return (
    <RectButton style={[styles.button,
      !!buttonStyle ? buttonStyle : null,
      enabled ? null : styles.buttonDisabled
    ]}
      enabled={enabled}
      onPress={onPress}
    >
      <Text style={[styles.buttonText,
        enabled ? null : styles.buttonTextDisabled
      ]}>{label}</Text>
    </RectButton>
  );
}

export default AuthButton;