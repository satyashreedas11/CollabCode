import { useAppContext } from "@/context/AppContext"
import { useFileSystem } from "@/context/FileContext"
import { getIconClassName } from "@/utils/getIconClassName"
import { Icon } from "@iconify/react"
import { IoClose } from "react-icons/io5"
import cn from "classnames"
import { useEffect, useRef } from "react"
import { LuLock } from "react-icons/lu"

function FileTab() {
    const { users, currentUser } = useAppContext()
    const {
        openFiles,
        closeFile,
        activeFile,
        updateFileContent,
        setActiveFile,
        getLockInfo,
    } = useFileSystem()
    const fileTabRef = useRef<HTMLDivElement>(null)

    const changeActiveFile = (fileId: string) => {
        // If the file is already active, do nothing
        if (activeFile?.id === fileId) return

        updateFileContent(activeFile?.id || "", activeFile?.content || "")

        const file = openFiles.find((file) => file.id === fileId)
        if (file) {
            setActiveFile(file)
        }
    }

    useEffect(() => {
        const fileTabNode = fileTabRef.current
        if (!fileTabNode) return

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                fileTabNode.scrollLeft += 100
            } else {
                fileTabNode.scrollLeft -= 100
            }
        }

        fileTabNode.addEventListener("wheel", handleWheel)

        return () => {
            fileTabNode.removeEventListener("wheel", handleWheel)
        }
    }, [])

    return (
        <div
            className="flex h-[50px] w-full select-none gap-2 overflow-x-auto p-2 pb-0"
            ref={fileTabRef}
        >
            {openFiles.map((file) => {
                const lockInfo = getLockInfo(file.id)
                const editingUsers = users.filter(
                    (u) =>
                        u.currentFile === file.id &&
                        u.typing &&
                        u.username !== currentUser.username,
                )
                return (
                    <span
                    key={file.id}
                    className={cn(
                        "flex w-fit cursor-pointer items-center rounded-t-md px-2 py-1 text-white",
                        { "bg-darkHover": file.id === activeFile?.id },
                    )}
                    onClick={() => changeActiveFile(file.id)}
                >
                    <Icon
                        icon={getIconClassName(file.name)}
                        fontSize={22}
                        className="mr-2 min-w-fit"
                    />
                    <p
                        className="flex-grow cursor-pointer overflow-hidden truncate"
                        title={file.name}
                    >
                        {file.name}
                    </p>
                    {lockInfo && (
                        <span
                            className="ml-2 flex items-center gap-1 text-[10px] text-white/60"
                            title={`Locked by ${lockInfo.lockedBy || "teammate"}`}
                        >
                            <LuLock size={12} />
                            Locked
                        </span>
                    )}
                    {editingUsers.length > 0 && (
                        <span
                            className="ml-2 text-[10px] text-white/50"
                            title={editingUsers
                                .map((u) => u.username)
                                .join(", ")}
                        >
                            Editing
                        </span>
                    )}
                    <IoClose
                        className="ml-3 inline rounded-md hover:bg-darkHover"
                        size={20}
                        onClick={() => closeFile(file.id)}
                    />
                </span>
                )
            })}
        </div>
    )
}

export default FileTab
