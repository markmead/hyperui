import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const usePreferencesStore = create(
	persist((set) => ({
		isRtl: false,
		setIsRtl: (rtl) => set({ isRtl: rtl }),
		isDarkMode: false,
		setIsDarkMode: (dark) => set({ isDarkMode: dark }),
		codeType: 'html', // html | jsx | vue
		setCodeType: (code) => set({ codeType: code }),
		previewWidth: '100%', // 100% | 1024px | 768px | 640px | 340px
		setPreviewWidth: (size) => set({ previewWidth: size }),
	}), {
      name: 'hyperui/preferences-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
	}
))

export default usePreferencesStore