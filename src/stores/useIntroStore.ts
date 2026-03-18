import { create } from 'zustand'

interface IntroStore {
  isIntroComplete: boolean
  setIntroComplete: (complete: boolean) => void
}

export const useIntroStore = create<IntroStore>((set) => ({
  isIntroComplete: false,
  setIntroComplete: (complete) => set({ isIntroComplete: complete }),
}))
