import { useAuth } from "@/context/AuthContext"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"

function AuthPage() {
    const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } =
        useAuth()
    const [isSignup, setIsSignup] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!loading && user) {
            const redirectTo =
                (location.state as { from?: { pathname?: string } })?.from
                    ?.pathname || "/app"
            navigate(redirectTo, { replace: true })
        }
    }, [loading, location.state, navigate, user])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (isSignup) {
                await signUpWithEmail(email, password, displayName)
                toast.success("Account created")
            } else {
                await signInWithEmail(email, password)
                toast.success("Welcome back")
            }
        } catch (error) {
            console.error(error)
            toast.error("Authentication failed. Check your details.")
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            toast.success("Signed in with Google")
        } catch (error) {
            console.error(error)
            toast.error("Google sign-in failed")
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)]"></div>
            <div className="absolute right-0 top-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl delay-700"></div>

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-12">
                <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex flex-col justify-center gap-6 text-white">
                        <div className="space-y-4">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                                CollabCode Studio
                            </p>
                            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                                {isSignup
                                    ? "Create your collaborative workspace"
                                    : "Welcome back to your rooms"}
                            </h1>
                            <p className="max-w-xl text-base text-white/70">
                                Spin up shared rooms instantly, sync code in
                                real time, and keep your team aligned with
                                built-in chat and whiteboard tools.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/70 backdrop-blur">
                                <p className="text-white">Live collaboration</p>
                                <p className="mt-1 text-xs text-white/50">
                                    Share cursors, files, and presence in a
                                    single room.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/70 backdrop-blur">
                                <p className="text-white">AI assistance</p>
                                <p className="mt-1 text-xs text-white/50">
                                    Generate, refactor, and explain code
                                    together.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full rounded-3xl border border-white/15 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold">
                                {isSignup ? "Create account" : "Sign in"}
                            </h2>
                            <p className="text-sm text-white/60">
                                {isSignup
                                    ? "Start collaborating in minutes."
                                    : "Continue to your dashboard."}
                            </p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/60"
                                type="button"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <FcGoogle className="text-lg" />
                                    Continue with Google
                                </span>
                            </button>

                            <div className="flex items-center gap-3 text-xs text-white/50">
                                <span className="h-px flex-1 bg-white/15"></span>
                                or use email
                                <span className="h-px flex-1 bg-white/15"></span>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {isSignup && (
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(event) =>
                                            setDisplayName(event.target.value)
                                        }
                                        placeholder="Display name"
                                        className="w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                                    />
                                )}
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Email address"
                                    className="w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                                    required
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Password"
                                    className="w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-lg transition-all hover:bg-white/90"
                                >
                                    {isSignup ? "Create account" : "Sign in"}
                                </button>
                            </form>
                        </div>

                        <div className="mt-6 text-center text-sm text-white/60">
                            {isSignup ? (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setIsSignup(false)}
                                        className="font-semibold text-white hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </>
                            ) : (
                                <>
                                    New here?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setIsSignup(true)}
                                        className="font-semibold text-white hover:underline"
                                    >
                                        Create an account
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="mt-4 text-center text-xs text-white/50">
                            <Link to="/" className="hover:text-white">
                                Back to landing page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
