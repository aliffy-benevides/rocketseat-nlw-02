import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { Teacher } from '../components/TeacherItem';

function useFavoritedTeachers() {
  const [favoritedTeachers, setFavoritedTeachers] = useState<Teacher[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(favorites => {
        if (favorites) {
          setFavoritedTeachers(JSON.parse(favorites));
        } else {
          setFavoritedTeachers([]);
        }
      })
  }

  function isTeacherFavorited(teacherId: number): boolean {
    return !!favoritedTeachers.find(teacher => teacher.id === teacherId);
  }

  function toggleFavoriteTeacher(teacher: Teacher) {
    let newFavoritedTeachers: Teacher[] = [];

    if (isTeacherFavorited(teacher.id)) {
      // Unfavorite teacher
      newFavoritedTeachers = favoritedTeachers.filter(actualTeacher => actualTeacher.id !== teacher.id);
    } else {
      // Favorite teacher
      newFavoritedTeachers = [ ...favoritedTeachers, teacher ];
    }

    setFavoritedTeachers(newFavoritedTeachers);
    return AsyncStorage.setItem('favorites', JSON.stringify(newFavoritedTeachers));
  }

  return {
    favoritedTeachers,
    isTeacherFavorited,
    toggleFavoriteTeacher,
    loadFavorites
  };
}

export default useFavoritedTeachers;