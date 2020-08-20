import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface FavoriteTeachersData {
  favoriteTeachers: Teacher[],
  isTeacherFavorited(teacherId: number): boolean,
  toggleFavoriteTeacher(teacher: Teacher): void
}

const FavoriteTeachersContext = createContext<FavoriteTeachersData>({} as FavoriteTeachersData);

export const FavoriteTeachersProvider: React.FC = ({ children }) => {
  const [favoriteTeachers, setFavoriteTeacher] = useState<Teacher[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('@Proffy:favorites')
      .then(favorites => {
        if (favorites) {
          setFavoriteTeacher(JSON.parse(favorites));
        } else {
          setFavoriteTeacher([]);
        }
      })
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  function isTeacherFavorited(teacherId: number): boolean {
    return !!favoriteTeachers.find(teacher => teacher.id === teacherId);
  }

  function toggleFavoriteTeacher(teacher: Teacher) {
    let newFavoriteTeachers: Teacher[] = [];

    if (isTeacherFavorited(teacher.id)) {
      // Unfavorite teacher
      newFavoriteTeachers = favoriteTeachers.filter(actualTeacher => actualTeacher.id !== teacher.id);
    } else {
      // Favorite teacher
      newFavoriteTeachers = [ ...favoriteTeachers, teacher ];
    }

    setFavoriteTeacher(newFavoriteTeachers);
    return AsyncStorage.setItem('@Proffy:favorites', JSON.stringify(newFavoriteTeachers));
  }

  return (
    <FavoriteTeachersContext.Provider value={{ favoriteTeachers, isTeacherFavorited, toggleFavoriteTeacher }}>
      {children}
    </FavoriteTeachersContext.Provider>
  );
}

export function useFavoriteTeachers() {
  return useContext(FavoriteTeachersContext);
}