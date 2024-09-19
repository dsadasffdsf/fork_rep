import React, { createContext, useMemo } from 'react';

export const StoreContext = createContext(null);

export const StoreProvider = ({ store, children }) => {
  const storeValue = useMemo(() => store, [store]);
  

  return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>;
};
