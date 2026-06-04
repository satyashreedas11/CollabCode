import { useNavigate } from "react-router-dom"

function ConnectionStatusPage() {
    return (
        <div className="relative flex h-screen min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)]"></div>
            <div className="absolute right-0 top-0 h-96 w-96 animate-pulse-slow rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse-slow rounded-full bg-white/10 blur-3xl delay-700"></div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
                <ConnectionError />
            </div>
        </div>
    )
}

const ConnectionError = () => {
    const navigate = useNavigate()
    const reloadPage = () => {
        window.location.reload()
    }

    const gotoHomePage = () => {
        navigate("/app")
    }

    return (
        <div className="group relative">
            <div className="absolute -inset-1 rounded-3xl bg-white/10 opacity-20 blur-2xl transition-all group-hover:opacity-30"></div>
            <div className="relative rounded-3xl border border-white/15 bg-white/5 p-12 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col gap-6">
                    {/* Error Icon */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-lg">
                        <svg
                            className="h-10 w-10 text-black"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">
                            Connection Failed
                        </h2>
                        <p className="max-w-md whitespace-break-spaces text-lg text-white/60">
                            Oops! Something went wrong. Please try again
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <button
                            className="group relative overflow-hidden rounded-lg bg-white px-8 py-3 font-bold text-black shadow-lg transition-all hover:scale-105"
                            onClick={reloadPage}
                        >
                            <span className="relative z-10">Try Again</span>
                        </button>
                        <button
                            className="rounded-lg border border-white/30 bg-white/5 px-8 py-3 font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/60"
                            onClick={gotoHomePage}
                        >
                            Go to dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectionStatusPage
