import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getCurrentUserId = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return unsubscribe;
  }, []);

  return userId;
};

export default getCurrentUserId;
