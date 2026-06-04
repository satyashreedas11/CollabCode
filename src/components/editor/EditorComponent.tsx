import { useAppContext } from "@/context/AppContext"
import { useFileSystem } from "@/context/FileContext"
import useResponsive from "@/hooks/useResponsive"
import cn from "classnames"
import Editor from "./Editor"
import FileTab from "./FileTab"

function EditorComponent() {
    const { openFiles, activeFile, lockFile, unlockFile, getLockInfo } =
        useFileSystem()
    const { minHeightReached } = useResponsive()
    const { currentUser } = useAppContext()
    const lockInfo = getLockInfo(activeFile?.id || "")
    const isLocked = Boolean(lockInfo)
    const isLockedByMe =
        isLocked && lockInfo?.lockedById === currentUser.uid
    const lockDisabled = isLocked && !isLockedByMe
    const lockLabel = isLockedByMe ? "Unlock file" : "Lock file"

    if (openFiles.length <= 0) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <h1 className="text-xl text-white">
                    No file is currently open.
                </h1>
            </div>
        )
    }

    return (
        <main
            className={cn("flex w-full flex-col overflow-x-auto md:h-screen", {
                "h-[calc(100vh-50px)]": !minHeightReached,
                "h-full": minHeightReached,
            })}
        >
            <div className="relative">
                <FileTab />
                <div className="absolute right-3 top-2 flex items-center gap-3">
                    {isLocked && !isLockedByMe && (
                        <span className="text-xs text-white/60">
                            Locked by {lockInfo?.lockedBy || "teammate"}
                        </span>
                    )}
                    <button
                        onClick={() => {
                            if (!activeFile?.id) return
                            if (isLockedByMe) {
                                unlockFile(activeFile.id)
                                return
                            }
                            lockFile(activeFile.id)
                        }}
                        disabled={lockDisabled || !activeFile}
                        className={cn(
                            "rounded-lg border px-3 py-1 text-xs font-semibold transition-all",
                            {
                                "border-white/30 text-white hover:border-white/60":
                                    !lockDisabled,
                                "cursor-not-allowed border-white/10 text-white/40":
                                    lockDisabled,
                            },
                        )}
                    >
                        {lockDisabled ? "Locked" : lockLabel}
                    </button>
                </div>
            </div>
            <Editor />
        </main>
    )
}

export default EditorComponent
