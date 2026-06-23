import { create } from 'zustand';

const useDebugStore = create((set) => ({
  debugRenders: false,
  setDebugRenders: (value) => set({ debugRenders: value }),
}));

export default useDebugStore;
