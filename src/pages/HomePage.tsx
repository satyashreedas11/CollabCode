import FormComponent from "@/components/forms/FormComponent"
import { useAuth } from "@/context/AuthContext"

function HomePage() {
    const { user, signOutUser } = useAuth()
    const displayName =
        user?.displayName || user?.email?.split("@")[0] || "Developer"

    return (
        <div className="relative min-h-screen overflow-auto bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)]"></div>
            <div className="absolute right-0 top-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl delay-700"></div>

            <div className="relative flex min-h-screen flex-col items-center justify-between px-4 py-12">
                <div className="flex w-full max-w-4xl items-center justify-between gap-4 pt-8 text-white">
                    <div>
                        <p className="text-sm text-white/60">
                            Welcome back,
                        </p>
                        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                            {displayName}
                        </h1>
                    </div>
                    <button
                        onClick={signOutUser}
                        className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-white/60"
                    >
                        Sign out
                    </button>
                </div>

                {/* Middle Section - Form */}
                <div className="my-8 w-full max-w-2xl">
                    <div className="group relative">
                        <div className="absolute -inset-1 rounded-3xl bg-white/10 opacity-20 blur-2xl transition-all group-hover:opacity-30"></div>
                        <div className="relative rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                            <FormComponent />
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-white/50">
                    Need a new room? Generate an ID and share it with your team.
                </div>
            </div>
        </div>
    )
}

export default HomePage
