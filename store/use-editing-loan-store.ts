import { create } from "zustand";

interface EditingLoanState {
  id: string;
  profileImage: string;
  name: string; // New field for name
  nickname: string; // New field for nickname
  status: string; // New field for status
  setId: (id: string) => void;
  setProfileImage: (profileImage: string) => void;
  setName: (name: string) => void; // Setter for name
  setNickname: (nickname: string) => void; // Setter for nickname
  setStatus: (status: string) => void; // Setter for status
  removeId: () => void;
  removeProfileImage: () => void;
  removeName: () => void; // Remover for name
  removeNickname: () => void; // Remover for nickname
  removeStatus: () => void; // Remover for status
}

const useEditingLoanStore = create<EditingLoanState>((set) => ({
  id: "",
  profileImage: "",
  name: "", // Initialize name
  nickname: "", // Initialize nickname
  status: "", // Initialize status
  setId: (id: string) => {
    set({ id });
  },
  setProfileImage: (profileImage: string) => {
    set({ profileImage });
  },
  setName: (name: string) => {
    set({ name });
  },
  setNickname: (nickname: string) => {
    set({ nickname });
  },
  setStatus: (status: string) => {
    set({ status });
  },
  removeId: () => {
    set({ id: "" });
  },
  removeProfileImage: () => {
    set({ profileImage: "" });
  },
  removeName: () => {
    set({ name: "" });
  },
  removeNickname: () => {
    set({ nickname: "" });
  },
  removeStatus: () => {
    set({ status: "" });
  },
}));

export default useEditingLoanStore;
