
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export interface DataState {
  data: ExcalidrawElement[];
  setData: (data: ExcalidrawElement[]) => void;
  setSingleData: (idx: number, el: ExcalidrawElement) => void;
  appendSingleData: (el: ExcalidrawElement) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      data: [],
      setData: (data) => set({ data }),
      setSingleData: (idx, el) => set(prev => {
        const newData = [...prev.data];
        newData[idx] = el;
        return { data: newData };
      }),
      appendSingleData: (el) => set({ data: [...get().data, el] }),
      // removeData: () => set({ data: [] }),
    }), { name: 'elements' }));
// export const type = ReturnType<useDataStore>;