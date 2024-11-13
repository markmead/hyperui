import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const usePreferencesStore = create(
  persist(
    (stateSet) => ({
      isRtl: false,
      setIsRtl: (isRtl) => stateSet({ isRtl }),
      isDarkMode: false,
      setIsDarkMode: (isDarkMode) => stateSet({ isDarkMode }),
      isInteractive: false,
      setIsInteractive: (isInteractive) => stateSet({ isInteractive }),
      codeType: 'html',
      setCodeType: (codeType) => stateSet({ codeType }),
      previewWidth: '100%',
      setPreviewWidth: (previewWidth) => stateSet({ previewWidth }),
    }),
    {
      name: 'hyperui/preferences-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default usePreferencesStore
