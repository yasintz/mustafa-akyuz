import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import _debounce from 'lodash/debounce';
import _orderBy from 'lodash/orderBy';
import { StoreType } from '../types';
import {
  gSheetStorage,
  handleStoreLoadingState,
} from '@/utils/zustand/gsheet-storage';

type StateType = {
  isLoading: boolean;
  store: StoreType;
  setStore: (store: StoreType) => void;
};

export const useStore = create(
  persist<StateType>(
    (set) => ({
      isLoading: true,
      store: {
        metadata: [],
        person: [],
        relation: [],
      },
      setStore: (store) => set({ store }),
    }),
    {
      name: 'family_tree_store_1',
      storage: createJSONStorage(() =>
        gSheetStorage('1BiqlwaBsUdyQIZU2wy0dMv7HkA7E0WpOZjyR3rWTr6E')
      ),
    }
  )
);

handleStoreLoadingState(useStore, 'isLoading');
