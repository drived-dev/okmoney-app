import { create } from "zustand";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  storeName: string;
  phoneNumber: string;
  rolePackage: string;
  tags: string[];
  email: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  smsAvailable: number;
  smsUsed: number;
  debtorSlotAvailable: number;
  socialProvider: string | null;
  profileImage: string | null;
  googleId: string | null;
  facebookId: string | null;
  lineId: string | null;

  // Methods to update state
  setUser: (user: Partial<UserState>) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  // Initial state
  id: "",
  firstName: "mel",
  lastName: "",
  storeName: "",
  phoneNumber: "",
  rolePackage: "premium",
  tags: [],
  email: "",
  createdAt: "",
  updatedAt: "",
  lastLogin: "",
  smsUsed: 0,
  smsAvailable: 20,
  debtorSlotAvailable: 10,
  socialProvider: null,
  profileImage: null,
  googleId: null,
  facebookId: null,
  lineId: null,

  // Set user data
  setUser: (user) => set((state) => ({ ...state, ...user })),

  // Tag management
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tag) =>
    set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
  clearTags: () => set({ tags: [] }),

  // Reset user data
  resetUser: () =>
    set({
      id: "",
      firstName: "",
      lastName: "",
      storeName: "",
      phoneNumber: "",
      rolePackage: "",
      tags: [],
      email: "",
      createdAt: "",
      updatedAt: "",
      lastLogin: "",
      smsAvailable: 0,
      debtorSlotAvailable: 0,
      socialProvider: null,
      profileImage: null,
      googleId: null,
      facebookId: null,
      lineId: null,
    }),
}));

export default useUserStore;
