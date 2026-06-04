import { auth } from "@/lib/firebase"
import { upsertUserProfile } from "@/services/rtdb"
import {
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface AuthContextValue {
    user: User | null
    idToken: string | null
    loading: boolean
    signInWithGoogle: () => Promise<void>
    signInWithEmail: (email: string, password: string) => Promise<void>
    signUpWithEmail: (
        email: string,
        password: string,
        displayName: string,
    ) => Promise<void>
    signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [idToken, setIdToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken()
                setIdToken(token)
                try {
                    await upsertUserProfile({
                        uid: firebaseUser.uid,
                        displayName:
                            firebaseUser.displayName ||
                            firebaseUser.email?.split("@")[0] ||
                            "Developer",
                        email: firebaseUser.email,
                    })
                } catch (error) {
                    console.error(error)
                }
            } else {
                setIdToken(null)
            }
            setLoading(false)
        })
        return () => unsub()
    }, [])

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    }

    const signInWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const signUpWithEmail = async (
        email: string,
        password: string,
        displayName: string,
    ) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        )
        if (displayName.trim()) {
            await updateProfile(result.user, { displayName })
        }
    }

    const signOutUser = async () => {
        await signOut(auth)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                idToken,
                loading,
                signInWithGoogle,
                signInWithEmail,
                signUpWithEmail,
                signOutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
