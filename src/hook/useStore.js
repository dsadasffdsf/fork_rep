import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../hoc/StoreContext';

export const useStore = () => {
  const context = useContext(StoreContext);
  // context теряет методы из-за спреда
  if (context === null) {
    throw new Error('Store context is not available');
  }

  const [state, setState] = useState(context.getState());

  useEffect(() => {
    const unsubscribe = context.subscribe(() => {
      setState(context.getState());
    });

    return () => {
      unsubscribe();
    };
  }, [context]);

  return { state, reducers: { addBasket: context.addBasket, deleteItem: context.deleteItem } };
};
