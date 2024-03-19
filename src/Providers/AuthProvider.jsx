import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // signUp
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signIn
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google signIn 
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // update profile 
    const updateUser = (userName, userPhoto) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: userPhoto
        })
    }

    // signOut
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            //send jwt request with email/phone/unique to get token
            if (currentUser) {
                const userEmail = currentUser.email;
                axiosPublic.post("/jwt", userEmail)
                    .then(res => {
                        console.log('access-jwt:', res.data?.token);
                        if (res.data?.token) {
                            setLoading(false);
                            localStorage.setItem("access-jwt", res.data?.token);
                        }
                        else {
                            setLoading(false);
                            localStorage.removeItem("access-jwt");
                        }
                    });
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic]);

    const authInfo = {
        user,
        signUp,
        logIn,
        googleSignIn,
        updateUser,
        logOut,
        loading,
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;