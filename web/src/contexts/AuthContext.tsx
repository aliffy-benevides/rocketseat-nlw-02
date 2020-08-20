import React, { createContext, useState, useContext, useEffect } from 'react';

import api from '../services/api';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface IAuthContextData {
  signed: boolean;
  registeredUser: IUser | null;
  user: IUser | null;
  token: string;
  register(user: IUser): Promise<void>;
  logIn(email: string, password: string, rememberMe?: boolean): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState<IUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('@Proffy:user');
    const tokenStr = localStorage.getItem('@Proffy:token');

    if (userStr && tokenStr) {
      api.defaults.headers['Authorization'] = `Bearer ${JSON.parse(tokenStr)}`;
      setUser(JSON.parse(userStr));
      setToken(JSON.parse(tokenStr));
    }
  }, []);

  function _clearUser() {
    localStorage.removeItem('@Proffy:user');
    localStorage.removeItem('@Proffy:token');

    api.defaults.headers['Authorization'] = null;
    setUser(null);
    setToken('');
  }

  function register(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      api.post('/register', user)
        .then(resp => {
          setRegisteredUser({ ...resp.data.user, password: user.password });
          return resolve();
        })
        .catch(error => {
          console.error(error);
          _clearUser();
          return reject(error);
        });
    })
  }

  function logIn(email: string, password: string, rememberMe: boolean | undefined = false): Promise<void> {
    return new Promise((resolve, reject) => {
      api.post('/login', { email, password })
        .then(resp => {
          const { user, token } = resp.data;
          
          if (rememberMe) {
            localStorage.setItem('@Proffy:user', JSON.stringify(user));
            localStorage.setItem('@Proffy:token', JSON.stringify(token));
          }

          api.defaults.headers['Authorization'] = `Bearer ${token}`;
          setUser(user);
          setToken(token);
          return resolve();
        })
        .catch(error => {
          console.error(error);
          _clearUser();
          return reject(error);
        });
    })
  }

  function logOut() {
    _clearUser();
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, registeredUser, user, token, register, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}