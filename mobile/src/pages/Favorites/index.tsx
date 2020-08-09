import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import useFavoritedTeachers from '../../hooks/useFavoritedTeachers';

import styles from './styles';

function Favorites() {
  const { favoritedTeachers, isTeacherFavorited, toggleFavoriteTeacher, loadFavorites } = useFavoritedTeachers();

  // Reload favorites everytime focus on screen
  useFocusEffect(useCallback(() => {
    loadFavorites();
  }, []))

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24
        }}
      >
        {favoritedTeachers.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher}
            isFavorited={isTeacherFavorited(teacher.id)}
            toggleFavorite={toggleFavoriteTeacher}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;