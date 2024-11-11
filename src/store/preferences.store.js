import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const usePreferencesStore = create(
  persist(
    (set) => ({
      isRtl: false,
      setIsRtl: (isRtl) => set({ isRtl }),
      isDarkMode: false,
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
      codeType: 'html',
      setCodeType: (codeType) => set({ codeType }),
      previewWidth: '100%',
      setPreviewWidth: (previewWidth) => set({ previewWidth }),
    }),
    {
      name: 'hyperui/preferences-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default usePreferencesStore
