import { useState, useEffect } from "react";
import { User, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

export interface UserProfile {
  username: string;
  displayName: string;
  slug: string;
  photoURL: string;
  bio: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            // 최초 로그인 시 프로필 생성
            const email = currentUser.email || "";
            const slug = email.split("@")[0] || currentUser.uid.slice(0, 8);
            const newProfile: UserProfile = {
              username: currentUser.displayName || slug,
              displayName: slug,
              slug: slug,
              photoURL: currentUser.photoURL || "",
              bio: "안녕하세요! 제 포트폴리오입니다",
            };
            
            await setDoc(userDocRef, {
              ...newProfile,
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.error("Error fetching or creating user profile:", error);
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { user, loading, loginWithGoogle, logout };
}
