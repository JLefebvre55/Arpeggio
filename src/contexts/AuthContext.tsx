import { useContext, useState, createContext, useEffect, FC } from 'react';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';

// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDU64kw_EDKtl62ps1TYVeqlndR43b0QQQ",
    authDomain: "arpeggio-1113e.firebaseapp.com",
    projectId: "arpeggio-1113e",
    storageBucket: "arpeggio-1113e.appspot.com",
    messagingSenderId: "318274399334",
    appId: "1:318274399334:web:21e5f06babb4ece115d1a7",
    measurementId: "G-982T5WKLTM"
};
initializeApp(firebaseConfig);

type AuthState = null | undefined | User;

// Context
const AuthContext = createContext<AuthState>(undefined);

// Context hook
const useAuth = () : AuthState => {
    return useContext(AuthContext);
};

// Provider component
const AuthProvider:FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<AuthState>(undefined);

    useEffect(()=>{
        return onAuthStateChanged(getAuth(), user=>{
            setCurrentUser(user);
        });
    },[]);
    const value = currentUser;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;