import { useEffect, useContext, useState, createContext } from 'react';
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const authContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedShows : []
        });
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe();
    })

    return (
        <authContext.Provider value={{ signUp, logIn, logOut, user }}>
            {props.children}
        </authContext.Provider>
    );
}

export function UserAuth() {
    return useContext(authContext);
}