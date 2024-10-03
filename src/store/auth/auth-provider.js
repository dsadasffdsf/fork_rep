import React, { createContext, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const store = useStore();

  useEffect(() => {
    // console.log('AuthProvider');
    // console.log(store.actions.auth.fetchAuthByToken);

    // У подобных контекст отваливается  const fetchAuthByToken = store.actions.auth.fetchAuthByToken;
    const fetchAuthByToken = () => store.actions.auth.fetchAuthByToken();

    const token = localStorage.getItem('X-Token');
    if (token) {
      fetchAuthByToken();
    }
  }, []);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
