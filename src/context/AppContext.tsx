"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // Ensure your Firebase configuration is in lib/firebase.ts

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQState {
  query: string;
  results: FAQ[];
  isLoading: boolean;
  selectedFAQ: FAQ | null;
}

interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  faqState: FAQState;
  setFAQState: React.Dispatch<React.SetStateAction<FAQState>>;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [faqState, setFAQState] = useState<FAQState>({
    query: "",
    results: [],
    isLoading: false,
    selectedFAQ: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, faqState, setFAQState, loginWithGoogle, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

/** Custom hook to use the AppContext */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
