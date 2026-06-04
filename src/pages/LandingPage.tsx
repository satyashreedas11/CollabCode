import illustration from "@/assets/illustration.svg"
import { Link } from "react-router-dom"

function LandingPage() {
    return (
        <div className="relative min-h-screen overflow-auto bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)]"></div>
            <div className="absolute right-0 top-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl delay-700"></div>

            <div className="relative flex min-h-screen flex-col items-center justify-between px-4 py-12">
                <div className="w-full max-w-5xl space-y-8 pt-8 text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        CollabCode Studio
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
                        Real-time collaborative coding with AI assistance.
                        <br />
                        Write, share, and ship code faster than ever.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/login"
                            className="rounded-xl bg-white px-8 py-3 text-base font-semibold text-black shadow-lg transition-all hover:bg-white/90"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="rounded-xl border border-white/30 px-8 py-3 text-base font-semibold text-white transition-all hover:border-white/60"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="my-10 w-full max-w-5xl rounded-3xl border border-white/15 bg-white/5 p-6 text-white/80 shadow-2xl backdrop-blur-xl">
                    <div className="grid gap-6 text-left sm:grid-cols-3">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                Live collaboration
                            </h3>
                            <p className="text-sm text-white/60">
                                Pair program with your team and sync changes in
                                real time.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                AI assistance
                            </h3>
                            <p className="text-sm text-white/60">
                                Generate, refactor, and explain code with AI
                                copilots.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                Instant rooms
                            </h3>
                            <p className="text-sm text-white/60">
                                Create or join a room in seconds with a secure
                                ID.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-center pb-8">
                    <img
                        src={illustration}
                        alt="CollabCode Studio Illustration"
                        className="w-[380px] animate-up-down opacity-90 transition-opacity hover:opacity-100 sm:w-[480px] lg:w-[560px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
