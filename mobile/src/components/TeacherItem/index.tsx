import React from 'react';
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import { Teacher } from '../../contexts/favoriteTeachersContext';

import api from '../../services/api';

import styles from './styles';

interface TeacherItemProps {
  teacher: Teacher;
  isFavorited: boolean;
  toggleFavorite(teacher: Teacher): void;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, isFavorited, toggleFavorite }) => {
  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id: teacher.id
    })

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar}
          source={{ uri: teacher.avatar }} 
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={() => toggleFavorite(teacher)}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {}
            ]}>
            { isFavorited 
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;