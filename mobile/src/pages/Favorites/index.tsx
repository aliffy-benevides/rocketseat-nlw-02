import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { useFavoriteTeachers } from '../../contexts/favoriteTeachersContext';

import styles from './styles';

function Favorites() {
  const { favoriteTeachers, isTeacherFavorited, toggleFavoriteTeacher } = useFavoriteTeachers();

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
        {favoriteTeachers.map(teacher => (
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